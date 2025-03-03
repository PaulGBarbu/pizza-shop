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
    },
    active: {
        type: Boolean,
        default: false
    }
})
</script>
<!-- bg-red-200 w-1/2 h-1/2 -->
<template>
    <div class="cursor-pointer size-full">
        <div class="w-full h-full p-2 rounded-xl border-2 border-black group"
            :class="{ 'bg-primary-400 hover:bg-primary-400': props.active }">
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