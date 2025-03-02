<script setup>
import { IconsBacon, IconsCheese, IconsGarlic, IconsGlutenFree, IconsItalian, IconsMushroom, IconsNewYork, IconsOnion, IconsOven, IconsPepperoni, IconsPizzaOven, IconsSourdough, IconsTomato } from '#components';


const cartStore = useCartStore()

// After some research this is the best Pizza Distinction for American vs Italian Pizza I came up with  ¯\_(ツ)_/¯
const styles = shallowRef([
    { name: "Italian", price: 6.70, icon: IconsPizzaOven },
    { name: "American", price: 5.70, icon: IconsOven },
])

// https://eu.gozney.com/blogs/news/types-of-pizza-dough
const doughs = shallowRef([
    { name: "Gluten Free", price: 1.00, icon: IconsGlutenFree },
    { name: "Neapolitan", price: 1.20, icon: IconsItalian },
    { name: "New Yorker", price: 1.00, icon: IconsNewYork },
    { name: "Sourdough", price: 1.50, icon: IconsSourdough },
])

const toppings = shallowRef([
    { name: "Tomatos", price: 0.70, icon: IconsTomato },
    { name: "Onions", price: 0.70, icon: IconsOnion },
    { name: "Bacon", price: 2.50, icon: IconsBacon },
    { name: "Mushrooms", price: 0.50, icon: IconsMushroom },
    { name: "Garlic", price: 0.70, icon: IconsGarlic },
    { name: "Cheese", price: 1.00, icon: IconsCheese },
    { name: "Pepperoni", price: 1.50, icon: IconsPepperoni },
])

const selectedStyle = ref()
const selectedDough = ref()
const selectedToppings = ref([])

watch(selectedToppings, () => {
    cartStore.updateToppings(selectedToppings)
})
watch(selectedDough, () => {
    cartStore.updateDough(selectedDough)
})
watch(selectedStyle, () => {
    cartStore.updateStyle(selectedStyle)
})
</script>

<template>
    <h2 class="text-3xl font-bold mb-2 mt-8">Select Your Style</h2>
    <div>
        <div class="grid grid-cols-2 w-fit gap-4 ">
            <div v-for="style in styles">
                <label>
                    <input class="hidden" id="style" name="style" type="radio" :value="style" v-model="selectedStyle">
                    <Ingredient :name=style.name :price=style.price :icon=style.icon type="Style"
                        :active="style.name == selectedStyle?.name" />
                </label>
            </div>
        </div>
    </div>

    <h2 class="text-3xl font-bold mb-2 mt-8">Select Your Dough</h2>
    <div>
        <div class="grid grid-cols-2 lg:grid-cols-4 w-fit gap-4 ">
            <div v-for="dough in doughs">
                <label>
                    <input class="hidden" id="dough" name="dough" type="radio" :value="dough" v-model="selectedDough">
                    <Ingredient :name=dough.name :price=dough.price :icon=dough.icon type="Dough"
                        :active="dough.name == selectedDough?.name" />
                </label>
            </div>
        </div>
    </div>

    <h2 class="text-3xl font-bold mb-2 mt-8">Select Your Toppings</h2>
    <div class="grid grid-cols-2 lg:grid-cols-4 w-fit gap-4 ">
        <div v-for="top in toppings">
            <label>
                <input class="hidden" type="checkbox" :value=top v-model="selectedToppings">
                <Ingredient :name=top.name :price=top.price :icon=top.icon name:top.name type="Topping"
                    :active="selectedToppings.some(t => t.name === top.name)" />
            </label>
        </div>
    </div>
    Extras: {{ cartStore.getTotal.toFixed(2) }} €
</template>
