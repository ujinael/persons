import { defineStore } from 'pinia';
import { Data, DataTree } from '../../models/DataTree';
import { MeasureUnit } from '../../models/measure_unit/MeasureUnit';
import {
  NomenclatureItem,
  NomenclatureType,
} from '../../models/nomenclature_item/NomenclatureItem';
import { Api, Query } from '../../server.api';
import { CreateNomenclatureItemDto } from './dto/create-nomenclatureItem.dto';
import { UpdateNomenclatureItemDto } from './dto/update-nomenclatureItem.dto';
type NomenclatureItemsState = {
  loading: boolean;
  nomenclatureItem: NomenclatureItem | null;
  nomenclatureItems: NomenclatureItem[];
  nomenclatureTree: DataTree<Data> | null;
  category: DataTree<Data> | null;
};
export const useNomenclatureItemsStore = defineStore('nomenclatureItems', {
  state: (): NomenclatureItemsState => {
    return {
      loading: false,
      nomenclatureItem: null,
      nomenclatureItems: [],
      nomenclatureTree: null,
      category: null,
    };
  },
  actions: {
    setNomenclatureItem(
      nomenclatureItem?: NomenclatureItem,
      categoryID?: string,
    ) {
      this.nomenclatureItem =
        nomenclatureItem ??
        new NomenclatureItem(
          '',
          '',
          '',
          NomenclatureType.PRODUCT,
          this.category!,
          undefined,
          undefined,
          categoryID,
        );
    },
    async fetchNomenclatureItems(searchStr?: string) {
      this.loading = true;
      const query = searchStr ? [{ key: 'title', value: searchStr }] : [];
      await Api.shared()
        .child('nomenclature_items')
        .get<NomenclatureItem[]>(query, NomenclatureItem)
        .then((resp) => {
          this.nomenclatureItems = resp;
          this.loading = false;
        });
    },
    addCategory() {
      if (this.category) {
        const newChild = new DataTree<Data>(
          '',
          [],
          [],
          true,
          undefined,
          undefined,
          this.category.id,
        );
        this.category.children.unshift(newChild);
      } else {
        const newChild = new DataTree<Data>(
          '',
          [],
          [],
          true,
          undefined,
          undefined,
          this.nomenclatureTree!.id,
        );
        this.nomenclatureTree!.children.unshift(newChild);
      }
    },
    async fetchRootCategory() {
      this.loading = true;
      await this.fetchTree().then((d) => {
        this.nomenclatureTree = d;
      });
    },
    async fetchTree(query: Query[] = [{ key: 'name', value: 'номенклатура' }]) {
      return Api.shared()
        .child('nomenclature')
        .child('categories')
        .get<DataTree<Data>>(query, DataTree<Data>);
    },
    async fetchCategory(id: string) {
      return Api.shared()
      .child('nomenclature')
        .child('categories', id)
        .get<DataTree<Data>>([], DataTree<Data>);
    },
    setCategory(category?: DataTree<Data>, parentId?: string) {
      if (category) this.category = category;
      else this.category = new DataTree<Data>('', [], []);
      if (parentId) this.category.parentID = parentId;
    },
    async saveCategory(category: DataTree<Data>) {
      if (this.category) {
        this.loading = true;
        Api.shared()
          .child('nomenclature')
          .child('categories')
          .post<DataTree<Data>, DataTree<Data>>(category, DataTree<Data>)
          .then((created) => {
            this.loading = false;
            this.category?.children.forEach((c) => {
              if (!c.id) {
                c.id = created.id;
                c.name = created.name;
                c.items = [];
                c.children = [];
              }
            });
          });
      }
    },
    async fetchOneNomenclatureItem(id: string) {
      this.loading = true;
      await Api.shared()
        .child('nomenclature_items', id)
        .get<NomenclatureItem>([], NomenclatureItem)
        .then((resp) => {
          this.nomenclatureItem = resp;
          this.loading = false;
        });
    },
    async saveNomenclatureItem() {
      this.loading = true;
      await Api.shared()
        .child('nomenclature_items')
        .post<CreateNomenclatureItemDto, NomenclatureItem>(
          this.nomenclatureItem!.toCreate(),
          NomenclatureItem,
        )
        .then((nomenclatureItem) => {
          this.nomenclatureItems.push(nomenclatureItem);
          if (this.category) this.category.items.push(nomenclatureItem);
          this.loading = false;
        });
    },
    async updateNomenclatureItem() {
      this.loading = true;
      await Api.shared()
        .child('nomenclature_items')
        .update<UpdateNomenclatureItemDto, NomenclatureItem>(
          this.nomenclatureItem!.toUpdate(),
          NomenclatureItem,
        )
        .then((nomenclatureItem) => {
          this.nomenclatureItems.push(nomenclatureItem);
          this.loading = false;
        });
    },
    async removeNomenclatureItem(id: string) {
      this.loading = true;
      await Api.shared()
        .child('nomenclature_items', id)
        .delete()
        .then((nomenclatureItem) => {
          this.nomenclatureItems = this.nomenclatureItems.filter(
            (e) => e.id! !== id,
          );
          this.loading = false;
        });
    },
  },
});
