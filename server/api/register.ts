import { __BASEURL } from "~/assets/constants/api";

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const res = (await $fetch(__BASEURL + "/users/signup", {
    method: "post",
    body,
  })) as {
    status_code: number;
    message: string;
    token: string;
  };

  if (res.token) {
    setCookie(event, "token", res.token);
    return {
      status: res.status_code,
      data: res.token,
    };
  }

  return {
    status: 500,
    data: null,
  };
});
