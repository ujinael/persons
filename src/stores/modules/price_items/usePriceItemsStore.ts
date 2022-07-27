
import { defineStore } from 'pinia'
import { PriceItem } from '../../models/price_item/PriceItem';
import {  Api } from '../../server.api';
import { CreatePriceItemDto } from './dto/create-priceItem.dto';
import { UpdatePriceItemDto } from './dto/update-priceItem.dto';
type PriceItemsState = {
  loading: boolean
  priceItem: PriceItem | null
  priceItems:PriceItem[]
}
export const usePriceItemsStore = defineStore('priceItems', {
  state: ():PriceItemsState => {
    return {
      loading:false,
      priceItem: null,
     priceItems:[]
    }
  },
  actions: {
setPriceItem(priceItem?: PriceItem) {
this.priceItem = priceItem ?? new PriceItem()
},
async fetchPriceItems() {
this.loading = true
await Api.shared().child('price_items')
.get<PriceItem[]>([], PriceItem).then(resp =>
{
this.priceItems = resp
this.loading = false
}
)
},
async fetchOnePriceItem(id:string) {
this.loading = true
await Api.shared().child('price_items',id)
.get<PriceItem>([], PriceItem).then(resp =>
{
this.priceItem = resp
this.loading = false
}
)
},
async savePriceItem() {
this.loading = true
await Api.shared().child('price_items')
.post<CreatePriceItemDto, PriceItem>(this.priceItem!.toCreate(), PriceItem)
.then(priceItem => {
this.priceItems.push(priceItem)
this.loading = false
})
 },
async updatePriceItem() {
this.loading = true
await Api.shared().child('price_items',this.priceItem!.id)
.update<UpdatePriceItemDto, PriceItem>(this.priceItem!.toUpdate(), PriceItem)
.then(priceItem => {
this.priceItems.push(priceItem)
this.loading = false
})
},
async removePriceItem(id:string) {
this.loading = true
await Api.shared().child('price_items',id)
.delete()
.then(priceItem => {
// this.priceItems = this.priceItems.filter(e=>e.id! !==id)
this.loading = false
})
},
  }
  })

