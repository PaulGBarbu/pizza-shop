<script setup lang="ts">

const props = defineProps({
    name: String,
    price: Number,
    icon: Object
})

const counterStore = useCounterStore()

const isActive = shallowRef(false)
function activate() {
    isActive.value = !isActive.value
    counterStore.increment()
}

</script>

<template>
    <!-- TODO: Make Store filled with reciep in a sensical JSON format -->
    {{ counterStore.count }}
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