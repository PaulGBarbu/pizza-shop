<script setup>

const greeting = ref('Hello from x')

const toppings = ref([
    { name: "Tomatos", price: 0.70, icon: "Tomato" },
    { name: "Onions", price: 0.70, icon: "Onion" },
    { name: "Bacon", price: 2.50, icon: "Bacon" },
    { name: "Mushrooms", price: 0.50, icon: "Mushroom" },
    { name: "Garlic", price: 0.70, icon: "Garlic" },
    { name: "Cheese", price: 1.00, icon: "Cheese" },
    { name: "Pepperoni", price: 1.50, icon: "Pepperoni" },
])
</script>

<template>
    <div class="grid grid-cols-2 lg:grid-cols-4 w-fit gap-4 ">
        <div v-for="top in toppings">
            <Toppings :name=top.name :price=top.price :icon=top.icon />
        </div>
    </div>
</template>