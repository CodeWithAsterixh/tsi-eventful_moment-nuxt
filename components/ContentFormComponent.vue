<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField } from "vee-validate";
import { formatDate } from "~/assets/lib/dateFormatter";
import { ContentSchema } from "~/assets/lib/validator";

const { dataFor = "ADD" , dataFill} = defineProps<{ dataFor?: "ADD" | "EDIT", dataFill?:{
  date:string,
  title:string,
  description:string
} }>();
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(ContentSchema),
});

const dateContent = dataFill?.date?formatDate(dataFill?.date):null
const { value: date } = useField("date", undefined, { initialValue:dateContent||'' });
const { value: title } = useField("title", undefined, { initialValue: dataFill?.title || "" });
const { value: description } = useField("description", undefined, { initialValue: dataFill?.description || "" });

const route = useRoute();
const {id} = route.params

const onSubmit = handleSubmit(async (vals) => {
  if(dataFor==="EDIT"){
    await useFetch(`/api/moments/${id}/edit`, {
      method: 'patch',
      body:{
        date:date.value,
        title:title.value,
        details:description.value,
      }
    })
   return navigateTo(`/moments/${id}`)
  }else if(dataFor==="ADD"){
    const res = await useFetch(`/api/moments/`, {
      method: 'post',
      body:{
        date:date.value,
        title:title.value,
        details:description.value,
      }
    })
   return navigateTo(`/moments/${res.data.value.data._id}`)
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-5 items-center">
    <!--Date  -->
    <InputComponent
      label="Date in the future"
      type="date"
      HtmlFor="futureDate"
      v-model="date"
      :error="errors.date"
    />
    <!--Title  -->
    <InputComponent label="Title" HtmlFor="title" v-model="title" :error="errors.title" />
    <!--Description  -->
    <InputComponent
      label="Description"
      HtmlFor="description"
      v-model="description"
      :error="errors.description"
      type="textBox"
    />

    <button
      type="submit"
      class="min-w-48 py-3 rounded-xl text-white px-2 bg-tertiary border-accent border-[1px]"
    >
      {{ dataFor === "ADD" ? "Save" : "Update" }}
    </button>
  </form>
</template>
