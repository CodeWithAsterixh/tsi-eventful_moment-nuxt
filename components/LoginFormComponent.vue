<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField } from "vee-validate";
import { LoginSchema } from "~/assets/lib/validator";

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(LoginSchema),
});
const {loginUser} = useAuth().actions

const { value: email } = useField("email");
const { value: password } = useField("password");


const onSubmit = handleSubmit(({email,password}) => {
  loginUser({
    email,
    password,
  });
});

</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-2 items-center">
    <!-- email -->
    <InputComponent
      type="email"
      label="Email"
      HtmlFor="email"
      v-model="email"
      :error="errors.email"
    />
    <!-- password -->
    <InputComponent
      type="password"
      label="Password"
      HtmlFor="password"
      v-model="password"
      :error="errors.password"
    />

    <button
      type="submit"
      class="min-w-48 py-3 rounded-xl mt-4 text-white px-2 bg-tertiary border-accent border-[1px]"
    >
      Login
    </button>
  </form>
</template>
