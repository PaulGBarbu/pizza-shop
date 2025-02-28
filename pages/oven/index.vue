<script setup>
import { IconsBacon, IconsCheese, IconsGarlic, IconsMushroom, IconsOnion, IconsPepperoni, IconsTomato } from '#components';


const cartStore = useCartStore()

const toppings = shallowRef([
    { name: "Tomatos", price: 0.70, icon: IconsTomato },
    { name: "Onions", price: 0.70, icon: IconsOnion },
    { name: "Bacon", price: 2.50, icon: IconsBacon },
    { name: "Mushrooms", price: 0.50, icon: IconsMushroom },
    { name: "Garlic", price: 0.70, icon: IconsGarlic },
    { name: "Cheese", price: 1.00, icon: IconsCheese },
    { name: "Pepperoni", price: 1.50, icon: IconsPepperoni },
])
</script>

<template>
    Extras: {{ cartStore.getTotal.toFixed(2) }} €
    <div class="grid grid-cols-2 lg:grid-cols-4 w-fit gap-4 ">
        <div v-for="top in toppings">
            <Toppings :name=top.name :price=top.price :icon=top.icon />
        </div>
    </div>
</template>