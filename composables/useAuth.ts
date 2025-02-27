import type { UserProfile } from "~/assets/types";

// Define interfaces for input data
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  fullname: string;
}

// Optional: Define expected response shapes
interface LoginResponse {
  data: string; // token string
}

interface ProfileResponse {
  data: UserProfile;
}

const userAuthenticationState = reactive({
  isAuthenticated: false,
  loading: false,
  error: false,
  user: null as UserProfile | null,
  token: null as string | null,
});

const actions = {
  loginUser: async (loginData: LoginData) => {
    const { $toast } = useNuxtApp();

    userAuthenticationState.loading = true;
    try {
      const res = await $fetch<LoginResponse>("/api/login", {
        method: "post",
        body: loginData,
      });
      const token = res.data;
      userAuthenticationState.token = token;
      if (userAuthenticationState.token) {
        userAuthenticationState.error = false;
        useCookie("token").value = token;
        userAuthenticationState.isAuthenticated = true;
        // Navigate to the home page
        $toast.success("Login successful");
        setTimeout(() => {
          return navigateTo("/");
        }, 2000);
      }
    } catch (error) {
      $toast.error("Something went wrong");
      userAuthenticationState.error = true;
      console.error("Login error:", error);
    } finally {
      userAuthenticationState.loading = false;
    }
  },

  loadUser: async (token: string) => {
    userAuthenticationState.token = token;
    userAuthenticationState.loading = true;

    try {
      const res = await $fetch<ProfileResponse>("/api/profile");
      if (res?.data) {
        userAuthenticationState.user = res.data;
        userAuthenticationState.isAuthenticated = true;
      }
    } catch (error) {
      userAuthenticationState.error = true;

      userAuthenticationState.isAuthenticated = false;
    } finally {
      userAuthenticationState.loading = false;
    }
  },

  logOutUser: () => {
    const { $toast } = useNuxtApp();

    // Clear the token from cookies and state
    const tokenCookie = useCookie("token");
    tokenCookie.value = null;
    userAuthenticationState.isAuthenticated = false;
    userAuthenticationState.token = null;
    userAuthenticationState.user = null;
    $toast.success("User logged out");
    setTimeout(() => {
      return navigateTo("/auth/login");
    }, 2000);
  },

  registerUser: async (registerData: RegisterData) => {
    const { $toast } = useNuxtApp();

    userAuthenticationState.loading = true;
    try {
      await $fetch("/api/register", {
        method: "post",
        body: registerData,
      });
      userAuthenticationState.error = false;
      $toast.success(
        `Welcome ${registerData.fullname}, your account has been created, have fun...`
      );

      setTimeout(() => {
        return navigateTo("/");
      }, 2000);
    } catch (error) {
      userAuthenticationState.error = true;
      $toast.error(`Something went wrong`);
    } finally {
      userAuthenticationState.loading = false;
    }
  },
};
export const useAuth = () => {
  return {
    auth: userAuthenticationState,
    actions,
  };
};
