<script setup>

const greeting = ref('Hello from x')

const toppings = ref([
    { name: "Tomatos", price: "0.70" },
    { name: "Onion", price: "0.70" }
])
</script>

<template>
    <ul>
        <li v-for="top in toppings" :key="top.name">
            {{ top.name }}
        </li>
    </ul>
    <Toppings :msg=greeting />
</template>