<script lang="ts" setup>
const { logOutUser } = useAuth().actions;
const { auth } = useAuth();
const isSmallMenuOpened = ref(false);
const toggleOpen = () => {
  isSmallMenuOpened.value = !isSmallMenuOpened.value;
};
</script>

<template>
  <button
    @click="toggleOpen"
    :class="[
      'size-5 cursor-pointer relative flex items-center justify-center gap-2 flex-col min-[498px]:hidden z-20',
      'before:absolute after:absolute before:duration-300 after:duration-300',
      'before:w-full after:w-full',
      'before:h-0.5 after:h-0.5',
      'before:bg-white after:bg-white',
      isSmallMenuOpened
        ? 'before:rotate-45 before:top-1/2 before:-translate-y-1/2 after:-rotate-45 after:top-1/2 after:-translate-y-1/2'
        : 'before:-translate-y-1.5 after:translate-y-1.5',
    ]"
  ></button>
  <nav
    :class="[
      'flex flex-col bg-primary shadow-md duration-300 text-white p-2 rounded-bl-md absolute gap-2 min-[498px]:hidden right-0',
      isSmallMenuOpened
        ? 'top-[100%] z-10'
        : 'top-0 !p-0 -z-10 pointer-events-none opacity-0',
    ]"
  >
    <RouterLink
      v-if="!auth.isAuthenticated"
      to="/auth/login"
      class="px-2 py-1 min-w-32 max-w-[70vw] duration-300 rounded-md w-full hover:bg-black/20"
    >
      Login
    </RouterLink>
    <RouterLink
      v-if="!auth.isAuthenticated"
      to="/auth/register"
      class="px-2 py-1 min-w-32 max-w-[70vw] duration-300 rounded-md w-full hover:bg-black/20"
    >
      Register
    </RouterLink>
    <button
      v-if="auth.isAuthenticated"
      @click="logOutUser"
      class="px-2 py-1 min-w-32 max-w-[70vw] text-left duration-300 rounded-md w-full hover:bg-black/20"
    >
      Log out
    </button>
    <RouterLink
      v-if="auth.isAuthenticated"
      to="/"
      class="px-2 py-1 min-w-32 max-w-[70vw] duration-300 rounded-md w-full hover:bg-black/20"
    >
      My Bucket
    </RouterLink>
  </nav>
</template>
