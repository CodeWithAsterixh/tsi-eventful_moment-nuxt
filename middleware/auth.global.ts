export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token").value;
  const { loadUser } = useAuth().actions;
  const { auth } = useAuth();

  // if a token exists, load the user profile
  if (token) {
    loadUser(token);
  }

  // If no token exists and the target route isn't the login page, redirect to login
  if (!token && !to.path.includes("auth")) {
    return navigateTo('/auth/login');
  }
});
