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

const isActive = shallowRef(false)
function activate() {
    // Update the UI
    isActive.value = !isActive.value
}

</script>

<template>
    <div @click="activate" class="cursor-pointer">
        <div class="p-2 rounded-xl h-28 w-28 border-2 border-black group"
            :class="{ 'bg-pink-400 hover:bg-pink-400': isActive }">
            <div class="flex justify-center group-hover:scale-125 group-hover:rotate-12 transition duration-200">
                <component :is="props.icon" class="h-11 w-11 " />
            </div>
            <div class="font-bold mt-2 flex justify-center">
                {{ props.name }}
            </div>
            <div class="flex justify-center">
                +{{ props.price.toFixed(2) }}€
            </div>
        </div>
    </div>
</template>