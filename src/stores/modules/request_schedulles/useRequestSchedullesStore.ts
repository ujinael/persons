import { defineStore } from 'pinia';
import { SchedulleInterval } from '../../models';
import { EmployerSchedulle } from '../../models/employer_schedulle/EmployerSchedulle';
import { RequestSchedulle } from '../../models/request_schedulle/request_schedulle';
import { Api } from '../../server.api';
import { CreateRequestSchedulleDto } from './dto/create-request-schedulle.dto';
import { UpdateRequestSchedulleDto } from './dto/update-request-schedulle.dto';
type RequestSchedullesState = {
  loading: boolean;
  currentDate: Date;
  requestSchedulle: RequestSchedulle | null;
  requestSchedulles: RequestSchedulle[];
};
export const useRequestSchedullesStore = defineStore('requestSchedulles', {
  state: (): RequestSchedullesState => {
    return {
      currentDate: new Date(),
      loading: false,
      requestSchedulle: null,
      requestSchedulles: [],
  
    };
  },
  actions: {
    setRequestSchedulle(requestSchedulle?: RequestSchedulle) {
      this.requestSchedulle = requestSchedulle ?? new RequestSchedulle();
    },
  
    async fetchRequestSchedulles() {
      this.loading = true;
      await Api.shared()
        .child('request_schedulles')
        .get<RequestSchedulle[]>([], RequestSchedulle)
        .then((resp) => {
          this.requestSchedulles = resp;
          this.loading = false;
        });
    },
    async fetchOneRequestSchedulle(id: string) {
      this.loading = true;
      await Api.shared()
        .child('request_schedulles', id)
        .get<RequestSchedulle>([], RequestSchedulle)
        .then((resp) => {
          this.requestSchedulle = resp;
          this.loading = false;
        });
    },
    async saveRequestSchedulle() {
      this.loading = true;
      await Api.shared()
        .child('request_schedulles')
        .post<CreateRequestSchedulleDto, RequestSchedulle>(
          this.requestSchedulle!.toCreate(),
          RequestSchedulle,
        )
        .then((requestSchedulle) => {
          this.requestSchedulles.push(requestSchedulle);
          this.loading = false;
        });
    },
    async updateRequestSchedulle() {
      this.loading = true;
      await Api.shared()
        .child('request_schedulles', this.requestSchedulle!.id!)
        .update<UpdateRequestSchedulleDto, RequestSchedulle>(
          this.requestSchedulle!.toUpdate(),
          RequestSchedulle,
        )
        .then((requestSchedulle) => {
          this.requestSchedulles.push(requestSchedulle);
          this.loading = false;
        });
    },
    async removeRequestSchedulle(id: string) {
      this.loading = true;
      await Api.shared()
        .child('request_schedulles', id)
        .delete()
        .then((requestSchedulle) => {
          this.requestSchedulles = this.requestSchedulles.filter((e) => e.id! !== id);
          this.loading = false;
        });
    },
  },
});
