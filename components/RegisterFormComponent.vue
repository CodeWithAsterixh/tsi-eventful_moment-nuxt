<script lang="ts" setup>
 import { toTypedSchema } from '@vee-validate/zod';
import {useForm, useField} from 'vee-validate'
import { RegisterSchema } from '~/assets/lib/validator';

  
  const {handleSubmit, errors} = useForm({validationSchema:toTypedSchema(RegisterSchema)})
  const {registerUser} = useAuth().actions

  const {value:fullname} = useField("fullname")
  const {value:email} = useField("email")
  const {value:password} = useField("password")

  const onSubmit = handleSubmit((vals)=>{
    registerUser(
      {
        fullname:vals.fullname,
        email:vals.email,
        password:vals.password
      }
    )
  })
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-2 items-center">

    <!-- Fullname -->
    <InputComponent
      label="Fullname"
      HtmlFor="fullname"
      v-model="fullname"
      :error="errors.fullname"
    />

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
      class="min-w-48 py-3 mt-4 rounded-xl text-white px-2 bg-tertiary border-accent border-[1px]"
    >
      Create
    </button>
  </form>
</template>
