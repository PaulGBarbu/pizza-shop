<script setup>
useHead({ title: "Distopizza" })
</script>

<template>
    <div class="h-[100vh] bg-[url(/bg.jpg)] bg-center bg-cover">
        <div class="backdrop-brightness-50 h-full text-white">
            <div class="container max-w-[768px] px-8 mx-auto text-orange-500x">
                <h1 class="text-5xl md:text-6xl font-bold pt-12 text-shadow">Welcome to Dystopizza</h1>

                <div class="text-3xl pt-12 text-shadow">Where AI-enhanced pizzas serve up a slice of the future...
                    today!
                </div>

                <p class="text-shadow text-xl mt-8 text-justify">Tired of mediocre pizza? Longing for a dining
                    experience that feels
                    like
                    it was
                    designed by a robot
                    overlord? Look no further than Dystopizza, where the future of food is now.</p>
                <div class="flex justify-center">

                    <UButton class="mt-12 p-4 text-2xl rounded-xl" to="/oven">Order Your Pizza Now</UButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-shadow {
    /* text-shadow: 5px 5px #558ABB; */
    text-shadow: 3px 3px 2px black;
}
</style>
