import { defineStore } from 'pinia'

interface Ingredient {
  name: String,
  price: number
}


export const useCartStore = defineStore('cart', {
  state: () => ({
    style: {} as Ingredient,
    dough: {} as Ingredient,
    toppings: [] as Ingredient[],
  }),
  actions: {
    selectStyle(name: string, price: number) {
      this.style.name = name
      this.style.price = price
    },
    selectDough(name: string, price: number) {
      this.dough.name = name
      this.dough.price = price
    },
    addTopping(name: string, price: number) {
      this.toppings.push({
        name: name,
        price: price
      })
    },
    removeToppings(name: string) {
      // Remove the entry with given name
      this.toppings = this.toppings.filter(topping => topping.name !== name);
    }
  },
  getters: {
    getTotal: (state) => {
      return state.toppings.reduce((total, item) => total = total + item.price, 0)
    }
  }
})
