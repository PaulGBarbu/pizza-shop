<script setup lang="ts">

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    icon: Object,
    // Copied appraoch from, https://github.com/vuejs/vue/issues/7840#issuecomment-373638033
    type: {
        type: String,
        validator: (val: string) => ['Style', 'Dough', 'Topping'].includes(val)
    }
})

const cartStore = useCartStore()

const isActive = shallowRef(false)


function activate() {

    if (props.type === "Style") {
        console.log("Style Selected");
        cartStore.selectStyle(props.name, props.price)
    }

    if (props.type === "Dough") {
        console.log("Dough Selected");
        cartStore.selectDough(props.name, props.price)
    }

    if (props.type === "Topping") {
        // If was inactive, add ingredient, else add it to the cart
        if (!isActive.value) {
            console.log("Topping added");
            cartStore.addTopping(props.name, props.price)
        } else {
            console.log("Topping remove");
            cartStore.removeToppings(props.name)
        }
    }


    // Update the UI
    isActive.value = !isActive.value
}

</script>

<template>
    <button @click="activate">
        <div class="p-2 rounded-xl h-28 w-28 border-2 border-black group"
            :class="{ 'bg-pink-400 hover:bg-pink-400': isActive }">
            <div class="flex justify-center group-hover:scale-125 group-hover:rotate-12 transition duration-200">
                <component :is="props.icon" class="h-11 w-11 " />
            </div>
            <div class="font-bold mt-2">
                {{ props.name }}
            </div>
            +{{ props.price.toFixed(2) }}€
        </div>
    </button>
</template>