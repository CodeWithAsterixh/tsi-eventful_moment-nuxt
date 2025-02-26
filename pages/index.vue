<script setup lang="ts">

  const {auth} = useAuth()
  const extraLimit = 4
  const limit = ref<number|false>(extraLimit)

  const handleAll = () => {
    
  if (auth.user?.moments) {
    // Only act if limit is still a number
    if (typeof limit.value === "number") {
      // Check if adding 4 exceeds or equals the total moments length
      if (limit.value + extraLimit < auth.user.moments.length) {
        limit.value += extraLimit;
      } else {
        // Otherwise, set limit to false to indicate no further limit
        limit.value = false;
      }
    }
  }
};
</script>

<template>
  <div class="w-full flex flex-col items-center gap-20">
    <div class="w-full text-black flex flex-wrap gap-3 items-center justify-between">
    <!-- greetings -->
    <div class="w-full basis-[300px]">
      <h2 class="text-2xl">Welcome <LoadingComponent :isLoading="!auth.error&&(auth.loading || !auth.user?.fullname)"/> {{!auth.loading?auth.user?.fullname:''}},</h2>
      <p>Here are items in your eventful moment bucket.</p>
    </div>
    <RouterLink
      to="/add"
      class="px-10 py-3 rounded-xl shrink-0 text-white bg-tertiary border-accent border-[1px]"
    >
      {{ auth.user?.moments&&auth.user?.moments.length ==0 ?'Create new moment':'Add item' }}
    </RouterLink>
  </div>
  <div class="w-full flex py-10 items-center justify-center" v-if="!auth.error&&(auth.loading)">
    <LoadingComponent className="!text-3xl" :isLoading="true"/>
  </div>
  <div v-if="!auth.loading&&auth.user?.moments&&auth.user?.moments.length == 0"  class="w-full flex items-center flex-col justify-center py-10 gap-2">
    <p class="text-neutral-400">No moment available</p>

  </div>
  <div v-if="!auth.loading&&auth.user?.moments && auth.user?.moments.length>0"  class="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
    <BucketCardComponent v-for="(moment, index) in limit?auth.user?.moments.slice(0,limit):auth.user?.moments" :key="index" :moment="moment" />
  </div>
  <button
  @click="handleAll"
  v-if="limit && (auth.user?.moments&&auth.user?.moments.length>limit)"
    class="px-10 py-3 rounded-xl shrink-0 text-white bg-tertiary border-accent border-[1px]"
  >
  Load More
  </button>
 </div>
</template>
