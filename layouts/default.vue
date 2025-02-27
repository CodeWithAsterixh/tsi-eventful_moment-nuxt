<script lang="ts" setup>

useHead({
  link:[
    {
      rel:'icon', type:'image/svg+xml', href:'/logo.svg'
    }
  ],
  title:'Eventful moment | Future in arms reach'
})
useSeoMeta({
  'title':'Eventful moment your future in arms reach',
  'description':'Always prepare for what is coming | Eventful moment, your future in arms reach',
  ogTitle:'Eventful moment your future in arms reach',
  ogDescription:'Find what you have to do instantly, no time waste, no moment lost'
})

</script>

<template>
  <HeaderComponent />
  <main class="container p-4 m-auto min-h-[83.4vh] min-[498px]:min-h-[81.2vh]">
    <slot />
  </main>
  <FooterComponent />
</template>
