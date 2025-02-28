import { defineStore } from 'pinia'

interface Ingredient {
  name: String,
  price: number
}


export const useCartStore = defineStore('cart', {
  state: () => ({
    // Price needs to be set to zero, otherwise the getTotal wont work properly
    style: { price: 0 } as Ingredient,
    dough: { price: 0 } as Ingredient,
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
    updateToppings(toppings: Ingredient[]) {
      this.toppings = toppings
    }
  },
  getters: {
    getTotal: (state) => {
      // Total Price: Style + Dough + Sum of all Ingredients
      return state.style.price + state.dough.price + state.toppings.reduce((total, item) => total = total + item.price, 0)
    }
  }
})
