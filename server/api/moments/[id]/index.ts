import { __BASEURL } from "~/assets/constants/api";
import { Moment } from "~/assets/types";

export default eventHandler(async (event) => {
  const {id} = event.context.params as {id:string}

  try {
    const token = getCookie(event, "token");

    if (token) {
      const res = await $fetch<{ data: Moment }>(__BASEURL + `/moment/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return {
        status: 200,
        data: res.data,
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
});
