
import { defineStore } from 'pinia'
import { PriceItem } from '../../models';
import { Price } from '../../models/price/Price';
import {  Api } from '../../server.api';
import { CreatePriceItemDto } from '../price_items/dto/create-priceItem.dto';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
type PricesState = {
  loading: boolean,
  price: Price | null,
  prices: Price[],
  sortDirection?:'asc'|'desc'
}
export const usePricesStore = defineStore('prices', {
  state: ():PricesState => {
    return {
      loading:false,
      price: null,
      prices: [],
     sortDirection:undefined
    }
  },
  getters: {
     sortedPriceItems: (state)=>{
      if(state.price)
      if(state.sortDirection){
         const values = state.price.priceItems.filter(i=>i.item)
         const notItems = state.price.priceItems.filter(i=>!i.item)
         if(state.sortDirection == 'asc') {
   const sorted = values.sort((a,b)=>{
           return b.item!.title < a.item!.title ? -1 : 1
         })
        return [...notItems,...sorted]}
         else {
             const sorted = values.sort((a,b)=>{
           return b.item!.title > a.item!.title ? -1 : 1
         })
         return [...notItems,...sorted]
         }
      }
      return state.price?.priceItems
   }
  },
  actions: {
    removeUsavedItems() {
      if(this.price)
      this.price.priceItems = this.price.priceItems.filter(i=>i.id)
},
setPrice(price?: Price) {
this.price = price ?? new Price()
},
async fetchPrices() {
this.loading = true
await Api.shared().child('prices')
.get<Price[]>([], Price).then(resp =>
{
this.prices = resp
this.loading = false
}
)
},
async fetchOnePrice(id:string) {
this.loading = true
await Api.shared().child('prices',id)
.get<Price>([], Price).then(resp =>
{
this.price = resp
this.loading = false
}
)
},
async savePrice() {
this.loading = true
await Api.shared().child('prices')
.post<CreatePriceDto, Price>(this.price!.toCreate(), Price)
.then(price => {
this.prices.push(price)
this.loading = false
})
 },
async updatePrice() {
this.loading = true
await Api.shared().child('prices',this.price!.id!)
.update<UpdatePriceDto, Price>(this.price!.toUpdate(), Price)
.then(price => {
  this.price!.title = price.title
  this.price!.status = price.status
this.loading = false
})
},
async removePrice(id:string) {
this.loading = true
await Api.shared().child('prices',id)
.delete()
.then(price => {
this.prices = this.prices.filter(e=>e.id! !==id)
this.loading = false
})
    },
    createNewPriceItem() {
      if (this.price)
      {
        const created = this.price.priceItems.find(i => !i.id)
        if(!created)
          this.price.priceItems.unshift(new PriceItem(0,0,true))
else {throw new Error('Ранее созданная сущность не сохранена')}
        }
    },
    async addPriceItem(item:PriceItem) {
      await Api.shared().child('prices', `${this.price?.id}/add_price_item`)
        .post<CreatePriceItemDto, PriceItem>(item.toCreate(), PriceItem)
        .then(pI => {
          console.log(pI);
          if (this.price) {
            this.price.priceItems = this.price.priceItems.filter(i => i.id)
            this.price.priceItems.unshift(pI)
          }
      })
}
  }


  })

