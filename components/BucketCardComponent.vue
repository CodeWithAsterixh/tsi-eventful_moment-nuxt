<script setup lang="ts">
import type { Moment } from '~/assets/types';



const {moment} = defineProps<{ 
  moment: Moment
}>();
const datePrev = new Date(moment.createdAt) 
const dateFut = new Date(moment.futureDate) 
</script>

<template>
  <div class="w-full text-black shadow-[0px_3px_6px]  shadow-[#00000029] p-4 hover duration-300 rounded-xs cursor-pointer">
    <!-- greetings -->
    <div class="w-full h-full flex flex-col justify-between gap-3">
      <div class="w-full flex flex-col gap-3">
        <h4 class="text-sm !font-semibold">
        {{ moment.title }}
      </h4>
      <p class="text-sm line-clamp-[10]">
        {{ moment.details }}
      </p>
      </div>
      <div class="w-full text-sm flex items-center justify-between flex-wrap py-2">
        <RouterLink :to="`/moments/${moment._id}`" class="text-tertiary">View Details</RouterLink>
        <div class="flex gap-4 items-center *:!not-italic">
            <i class="text-accent">{{ `${datePrev.getDate()}/${datePrev.getMonth()+1}/${datePrev.getFullYear()}` }}</i>
            <i>{{ `${dateFut.getDate()}/${dateFut.getMonth()+1}/${dateFut.getFullYear()}` }}</i>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .hover:hover{
    background: #fff5a7;
  }
</style>
