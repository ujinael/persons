import { defineStore } from 'pinia';
import { Status } from '../../models';
import { SchedullePreset } from '../../models/schedulle_preset/schedulle_preset';
import { Api } from '../../server.api';
import { CreateSchedullePresetDto } from './dto/create-SchedullePreset.dto';
import { UpdateSchedullePresetDto } from './dto/update-SchedullePreset.dto';
type SchedullePresetsState = {
  loading: boolean;
  preset: SchedullePreset | null;
  presets: SchedullePreset[];
};
export const useSchedullePresetsStore = defineStore('SchedullePresets', {
  state: (): SchedullePresetsState => {
    return {
      loading: false,
      preset: null,
      presets: [],
    };
  },
  actions: {
    setSchedullePreset(preset?: SchedullePreset) {
      this.preset = preset ?? new SchedullePreset(new Date(), new Date());
    },
    setRemovingPreset() {
      const preset = new SchedullePreset(new Date(),new Date(),'whitesmoke',true,'Удалить',Status.CREATED)
      this.setSchedullePreset(preset)
      this.setActive(preset)
    },
    async fetchSchedullePresets() {
      this.loading = true;
      await Api.shared()
        .child('schedulle_presets')
        .get<SchedullePreset[]>([], SchedullePreset)
        .then((resp) => {          
          this.presets = resp;
          this.loading = false;
        });
    },
    async fetchOneSchedullePreset(id: string) {
      this.loading = true;
      await Api.shared()
        .child('schedulle_presets', id)
        .get<SchedullePreset>([], SchedullePreset)
        .then((resp) => {
          this.preset = resp;
          this.loading = false;
        });
    },
    async saveSchedullePreset() {
      this.loading = true;
      await Api.shared()
        .child('schedulle_presets')
        .post<CreateSchedullePresetDto, SchedullePreset>(
          this.preset!.toCreate(),
          SchedullePreset,
        )
        .then((preset) => {
          this.presets.push(preset);
          this.loading = false;
        });
    },
    async updateSchedullePreset() {
      this.loading = true;
      await Api.shared()
        .child('schedulle_presets', this.preset!.id!)
        .update<UpdateSchedullePresetDto, SchedullePreset>(
          this.preset!.toUpdate(),
          SchedullePreset,
        )
        .then((preset) => {
          this.presets.push(preset);
          this.loading = false;
        });
    },
    async removeSchedullePreset(id: string) {
      this.loading = true;
      await Api.shared()
        .child('schedulle_presets', id)
        .delete()
        .then((preset) => {
          this.presets = this.presets.filter((e) => e.id! !== id);
          this.loading = false;
        });
    },
    setActive(item: SchedullePreset) {
      this.presets.forEach((p) => (p.selected = false));
      item.selected = true;
      this.preset = item;
    },
  },
});
