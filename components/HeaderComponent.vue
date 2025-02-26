<script setup>
const { logOutUser } = useAuth().actions;
const { auth } = useAuth();
</script>

<template>
  <header class="bg-primary sticky top-0 w-full text-white py-4 px-4 sm:px-8">
    <div class="container flex items-center justify-between m-auto">
      <h1 class="italic !p-0 !bg-transparent !font-semibold">
        Eventful moments
      </h1>

      <nav
      v-if="!auth.loading"
        class="hidden min-[498px]:flex gap-2 min-[498px]:gap-6 duration-300 *:p-2 items-center"
      >
        <RouterLink v-if="!auth.isAuthenticated" to="/auth/login">
          Login
        </RouterLink>
        <RouterLink v-if="!auth.isAuthenticated" to="/auth/register">
          Register
        </RouterLink>
        <button v-if="auth.isAuthenticated" @click="logOutUser">Log out</button>
        <RouterLink v-if="auth.isAuthenticated" to="/"> My Buckets </RouterLink>
      </nav>

      <!--for really small screens-->
      <MobileMenuComponent />
    </div>
  </header>
</template>
