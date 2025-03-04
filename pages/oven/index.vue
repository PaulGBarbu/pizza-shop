<script setup>
import { IconsBacon, IconsCheese, IconsGarlic, IconsGlutenFree, IconsItalian, IconsMushroom, IconsNewYork, IconsOnion, IconsOven, IconsPepperoni, IconsPizzaOven, IconsSourdough, IconsTomato } from '#components';
useHead({ title: "Distopizza - Oven" })
const cartStore = useCartStore()

// After some research this is the best Pizza Distinction for American vs Italian Pizza I came up with (Refering to the Icons)  ¯\_(ツ)_/¯
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

// Picked a few Ingredients I could find good Icons for
const toppings = shallowRef([
    { name: "Tomatos", price: 0.70, icon: IconsTomato, vegetarian: true },
    { name: "Onions", price: 0.70, icon: IconsOnion, vegetarian: true },
    { name: "Bacon", price: 2.50, icon: IconsBacon, vegetarian: false },
    { name: "Mushrooms", price: 0.50, icon: IconsMushroom, vegetarian: true },
    { name: "Garlic", price: 0.70, icon: IconsGarlic, vegetarian: true },
    { name: "Cheese", price: 1.00, icon: IconsCheese, vegetarian: true },
    { name: "Pepperoni", price: 1.50, icon: IconsPepperoni, vegetarian: false },
])

const selectedStyle = ref()
const selectedDough = ref()
const selectedToppings = ref([])
const showOnlyVegetarian = ref(false)

function switchVeggie() {
    showOnlyVegetarian.value = !showOnlyVegetarian.value
}

// I'm sure this could be improved, but I dont 100% understand watch/watchEffect and why watch with an array behave differently
// All I know is that this version works, with the only downside of being more verbose. So for now I keep it.
watch(selectedToppings, () => {
    cartStore.updateToppings(selectedToppings)
})
watch(selectedDough, () => {
    cartStore.updateDough(selectedDough)
})
watch(selectedStyle, () => {
    cartStore.updateStyle(selectedStyle)
})


/* ------------------------------------- Modal Functionality ------------------------------------ */
const isOpen = ref(false)
const missingStyleOrDough = ref(false)
function openModal() {
    // Only open the Modal if Style and Dough are selected, toppings are Optional (A margherita basically)
    if (selectedStyle.value && selectedDough.value) {
        isOpen.value = true
    } else {
        missingStyleOrDough.value = true
    }
}

function print2Console() {
    console.log({
        style: cartStore.style.name,
        dough: cartStore.dough.name,
        toppings: cartStore.toppings.map(t => t.name)
    });
}
</script>

<template>
    <div class="container max-w-[768px] px-2 mx-auto py-8">
        <!-- /* --------------------------------------- Style Selector --------------------------------------- */ -->
        <h2 class="text-3xl font-bold mb-2 pt-8">Select Your Style</h2>
        <div>
            <div class="grid grid-cols-2 gap-4">
                <div v-for="style in styles">
                    <label>
                        <input class="hidden" id="style" name="style" type="radio" :value="style"
                            v-model="selectedStyle">
                        <Ingredient :name=style.name :price=style.price :icon=style.icon type="Style"
                            :active="style.name == selectedStyle?.name" />
                    </label>
                </div>
            </div>
        </div>

        <!-- /* --------------------------------------- Dough Selector --------------------------------------- */ -->
        <h2 class="text-3xl font-bold mb-2 mt-8">Select Your Dough</h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="dough in doughs">
                <label>
                    <input class="hidden" id="dough" name="dough" type="radio" :value="dough" v-model="selectedDough">
                    <Ingredient :name=dough.name :price=dough.price :icon=dough.icon type="Dough"
                        :active="dough.name == selectedDough?.name" />
                </label>
            </div>
        </div>

        <!-- /* -------------------------------------- Toppings Selector ------------------------------------- */ -->
        <h2 class="text-3xl font-bold mb-2 mt-8">Select Your Toppings</h2>
        <UButton class="my-2" :variant="showOnlyVegetarian ? 'solid' : 'outline'" @click="switchVeggie">
            Show only vegetarian
        </UButton>

        <div class="grid grid-cols-3 lg:grid-cols-4 gap-4 ">
            <div v-for="top in toppings.filter(t => t.vegetarian || !showOnlyVegetarian)">
                <label>
                    <input class="hidden" type="checkbox" :value=top v-model="selectedToppings">
                    <Ingredient :name=top.name :price=top.price :icon=top.icon name:top.name type="Topping"
                        :active="selectedToppings.some(t => t.name === top.name)" />
                </label>
            </div>
        </div>

        <!-- Total Price and Error Message -->
        <div class="mt-4 text-xl">
            Gesamtpreis: {{ cartStore.getTotal.toFixed(2) }} €
        </div>
        <div class="text-red-500 text-lg my-2" v-if="missingStyleOrDough">
            Please select a pizza style and dough before proceeding
        </div>

        <!-- /* -------------------------------------------- Modal ------------------------------------------- */ -->
        <div class="flex justify-center">
            <UButton size="xl" @click="openModal" class="text-xl mt-4 block w-full md:w-1/2">Order</UButton>
        </div>
        <UModal v-model="isOpen">
            <div class="p-4">
                <!-- /* ---------------------------------------- Modal Header ---------------------------------------- */ -->
                <div class="flex items-center justify-between">
                    <h3 class="text-3xl font-bold">
                        Your Order
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>

                <!-- /* ----------------------------------------- Price Table ---------------------------------------- */ -->
                <!-- Price Table -->
                <table class="table-auto w-full mt-6">
                    <!-- Header -->
                    <thead>
                        <tr class="text-lg border-b-2 w-full">
                            <th class="w-3/4 text-start">Item</th>
                            <th class="w-1/4 text-start">Price</th>
                        </tr>
                    </thead>

                    <!-- Style -->
                    <tbody>
                        <tr>
                            <th colspan="2" class="text-xl pt-3 text-start font-normal">Style</th>
                        </tr>
                        <tr class="border-b-2">
                            <td>{{ selectedStyle.name || "Style" }}</td>
                            <td>{{ selectedStyle.price.toFixed(2) }} €</td>
                        </tr>
                    </tbody>

                    <!-- Dough -->
                    <tbody>
                        <tr>
                            <th colspan="2" class="text-xl pt-3 text-start font-normal">Dough</th>
                        </tr>
                        <tr class="border-b-2">
                            <td>{{ selectedDough.name }}</td>
                            <td>{{ selectedDough.price.toFixed(2) }} €</td>
                        </tr>
                    </tbody>

                    <!-- Toppings -->
                    <tbody>
                        <tr>
                            <th colspan="2" class="text-xl pt-3 text-start font-normal">Toppings</th>
                        </tr>
                        <tr class="border-b-2" v-for="top in selectedToppings">
                            <td>{{ top.name }}</td>
                            <td>{{ top.price.toFixed(2) }} €</td>
                        </tr>
                    </tbody>

                    <!-- Total Price -->
                    <tfoot class="font-bold">
                        <tr>
                            <th class="text-start">Total</th>
                            <td>{{ cartStore.getTotal.toFixed(2) }} €</td>
                        </tr>
                    </tfoot>
                </table>

                <!-- /* ---------------------------------------- Order Button ---------------------------------------- */ -->
                <div class="mt-4 flex justify-center">
                    <UButton size="xl" @click="print2Console">Order Now</UButton>
                </div>
            </div>
        </UModal>
    </div>

</template>
