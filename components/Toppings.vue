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
    icon: Object
})

const cartStore = useCartStore()

const isActive = shallowRef(false)
function activate() {

    // If was inactive, add ingredient, else add it to the cart
    if (!isActive.value) {
        console.log("Add");
        cartStore.addTopping(props.name, props.price)
    } else {
        console.log("Remove");
        cartStore.removeToppings(props.name)
    }
    isActive.value = !isActive.value
}

</script>

<template>
    <button @click="activate">
        <div class="p-2 rounded-xl h-28 w-28 border-2 border-black hover:bg-orange-100"
            :class="{ 'bg-pink-400': isActive }">
            <div class="flex justify-center">
                <component :is="props.icon" class="h-11 w-11" />
            </div>
            <div class="font-bold mt-2">
                {{ props.name }}
            </div>
            +{{ props.price }}€
        </div>
    </button>
</template>