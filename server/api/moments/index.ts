import { __BASEURL } from "~/assets/constants/api";
import { Moment } from "~/assets/types";

export default eventHandler(async (event) => {

  const body = await readBody(event);
  console.log(body)

  try {
    const token = getCookie(event, "token");

    if (token) {
      const res = await $fetch<{ data: Moment }>(__BASEURL + `/moment`, {
        method: "POST",
        body: {
          title: body.title,
          details: body.details,
          futureDate: body.date,
        },
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
