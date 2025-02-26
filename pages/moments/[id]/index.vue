<script lang="ts" setup>
  import type { Moment } from "~/assets/types";
    const {params} = useRoute()
    const {id} = params
    const data = reactive<{
      loading: boolean,
      error:boolean,
      data: Moment | null
    }>({
      loading: true,
      error: false,
      data: null
    })

    try{
      const res = await useFetch(`/api/moments/${id}`)
      data.data = res.data.value?.data as Moment
    }catch (e){
      console.log(e)
    }


    // set date
    const dateFut = data.data?.futureDate?new Date(data.data?.futureDate) :null

    const handleDelete = async ()=>{
      try{
      await useFetch(`/api/moments/${id}/delete`, {
        method:"delete"
      })
      data.data = null

      return navigateTo("/")
    }catch (e){
      console.log(e)

    }
    }


</script>

<template>
    <div class="w-full">
    <h1 class="text-lg sm:text-2xl !font-semibold">
      {{data.data?.title}}
    </h1>
    <p class="text-tertiary text-sm !mt-2">{{dateFut&& `${dateFut.getDate()}/${dateFut.getMonth()+1}/${dateFut.getFullYear()}` }}</p>

    <br />
    <br />
    <p v-if="data.data?.details" v-for="(paragraph, index) in data.data?.details.split('.')">
      {{ paragraph }}.
      <br v-if="index !==data.data?.details.length-1 " />
      <br v-if="index !==data.data?.details.length-1 " />
    </p>
    <br />
    
    <br />

    <div class="w-full !mt-5 flex items-center gap-2">
        <RouterLink :to="`/moments/${params.id}/edit`" class="px-16 py-4 bg-others2 text-white rounded-xl text-sm">Edit</RouterLink>
        <button @click="handleDelete" class="px-16 py-4 bg-others1 text-white rounded-xl text-sm">Delete</button>
    </div>
  </div>
</template>
