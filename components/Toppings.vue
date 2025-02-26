<script setup lang="ts">
const props = defineProps({
    msg: String
})
</script>

<template>
    <h2>{{ msg || 'No props passed yet' }}</h2>
    <button>

        <div class="p-2 rounded-xl h-28 w-28 border-2 border-black hover:bg-gray-200">
            <div class="flex justify-center">
                <IconsMushroom class="h-12 w-12" />
            </div>
            <div class="font-bold mt-2">
                Mushrooms
            </div>
        </div>
    </button>


</template>