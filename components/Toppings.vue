<script setup lang="ts">

// Unfortunally it seems like AutoImports dont work if the Component is not inside the template itself?
// https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
import IconsMushroom from "./Icons/Mushroom"
import IconsTomato from "./Icons/Tomato"
import IconsOnion from "./Icons/Onion"
import IconsBacon from "./Icons/Bacon"
import IconsGarlic from "./Icons/Garlic"
import IconsCheese from "./Icons/Cheese"
import IconsPepperoni from "./Icons/Pepperoni"


const props = defineProps({
    name: String,
    price: Number,
    icon: String
})

const iconComponents = {
    Mushroom: IconsMushroom,
    Tomato: IconsTomato,
    Onion: IconsOnion,
    Bacon: IconsBacon,
    Garlic: IconsGarlic,
    Cheese: IconsCheese,
    Pepperoni: IconsPepperoni
}

// console.log(iconComponents.);


</script>

<template>
    <button>
        <div class="p-2 rounded-xl h-28 w-28 border-2 border-black hover:bg-gray-200">
            <div class="flex justify-center">
                <template v-if="iconComponents[props.icon]">
                    <component :is="iconComponents[props.icon]" class="h-11 w-11" />
                </template>
                <!-- Fallback if I have no Icon for it (yet) -->
                <template v-else>
                    <IconsPlus class="h-11 w-11"></IconsPlus>
                </template>
            </div>
            <div class="font-bold mt-2">
                {{ props.name }}
            </div>
            +{{ props.price }}€
        </div>
    </button>
</template>