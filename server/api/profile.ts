import { __BASEURL } from "~/assets/constants/api";
import { UserProfile } from "~/assets/types";

export default eventHandler(async (event) => {
  try {
    const token = getCookie(event, "token");

    if (token) {
      
      const res = await $fetch<{ data: UserProfile[] }>(__BASEURL + "/users/me", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return {
        status: 200,
        data: res.data[0],
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
});
