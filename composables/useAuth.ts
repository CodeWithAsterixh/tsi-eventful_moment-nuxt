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

const authState = reactive({
  isAuthenticated: false,
  loading: false,
  error: false,
  user: null as UserProfile | null,
  token: null as string | null,
});

// const isClient = typeof window !== "undefined";

const actions = {
  loginUser: async (loginData: LoginData) => {
    authState.loading = true;
    try {
      const res = await $fetch<LoginResponse>("/api/login", {
        method: "post",
        body: loginData,
      });
      const token = res.data;
      authState.token = token;
      if (authState.token) {
        authState.error = false;
        useCookie("token").value = token;
        authState.isAuthenticated = true;
        // Navigate to the home page

        navigateTo("/");
      }
    } catch (error) {
      authState.error = true;
      console.error("Login error:", error);
    } finally {
      authState.loading = false;
    }
  },

  loadUser: async (token: string) => {
    authState.token = token;
    authState.loading = true;

    try {
      const res = await $fetch<ProfileResponse>("/api/profile");
      if (res?.data) {
        authState.user = res.data;
        authState.isAuthenticated = true;
      }
    } catch (error) {
      authState.error = true;
      authState.isAuthenticated = false;
    } finally {
      authState.loading = false;
    }
  },

  logOutUser: () => {
    // Clear the token from cookies and state
    const tokenCookie = useCookie("token");
    tokenCookie.value = null;
    authState.isAuthenticated = false;
    authState.token = null;
    authState.user = null;
    return navigateTo("/auth/login");
  },

  registerUser: async (registerData: RegisterData) => {
    authState.loading = true;
    try {
      await $fetch("/api/register", {
        method: "post",
        body: registerData,
      });
      authState.error = false;

      return navigateTo("/");
    } catch (error) {
      authState.error = true;
      console.error("Registration error:", error);
    } finally {
      authState.loading = false;
    }
  },
};
export const useAuth = () => {
  return {
    auth: authState,
    actions,
  };
};
