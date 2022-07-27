import { defineStore } from 'pinia';
import { useDateUtils } from '../../../composition';
import { Employer } from '../../models';
import { EmployerSchedulle } from '../../models/employerSchedulle/EmployerSchedulle';
import { Api } from '../../server.api';

const { daysInMonth } = useDateUtils();

type EmployerSchedullesState = {
  loading: boolean;
  employerRow: EmployerSchedulle | null;
  employerRows: EmployerSchedulle[];
  currentDate: Date;
};
export const useEmployerSchedullesStore = defineStore('employerSchedulles', {
  state: (): EmployerSchedullesState => {
    return {
      loading: false,
      employerRow: null,
      employerRows: [],
      currentDate: new Date(),
    };
  },
  getters: {
    getDaysOfMonth: (state) => {
      return daysInMonth(state.currentDate);
    },
  },
  actions: {
    async fetchEmployers() {
      this.loading = true;
      await Api.shared()
        .child('employers')
        .get<Employer[]>([], Employer)
        .then((r) => {
    r.forEach(
            (e) => this.createEmployerRow(e)
          );
        });
    },
    createEmployerRow(employer:Employer) {
      const newRow = new EmployerSchedulle(
                new Date(),
                new Date(),
                employer.id!,
                this.currentDate.getMonth(),
                this.currentDate.getFullYear(),
                employer
      )
      newRow.days = [...Array(this.getDaysOfMonth).keys()].map(
        i => ({
          start: new Date(),
          end: new Date(),
          employerId: employer.id!,
          month: this.currentDate.getMonth(),
          year: this.currentDate.getFullYear(),
        })
      )
      this.employerRows.unshift(newRow)
    },
    increaseMonth() {
      this.currentDate = new Date(
        this.currentDate.setMonth(this.currentDate.getMonth() + 1),
      );
    },
    decreaseMonth() {
      this.currentDate = new Date(
        this.currentDate.setMonth(this.currentDate.getMonth() - 1),
      );
    },
  },
});
