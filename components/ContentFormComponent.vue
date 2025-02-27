<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField } from "vee-validate";
import { formatDate } from "~/assets/lib/dateFormatter";
import { ContentSchema } from "~/assets/lib/validator";

const { dataFor = "ADD", dataFill } = defineProps<{
  dataFor?: "ADD" | "EDIT";
  dataFill?: {
    date: string;
    title: string;
    description: string;
  };
}>();
const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(ContentSchema),
});
const response = reactive({
  loading: false,
  error: false,
  successFinal: false
});
// auth
const {auth} = useAuth()
// toast
const {$toast} = useNuxtApp()



const dateContent = dataFill?.date ? formatDate(dataFill?.date) : null;
const { value: date } = useField("date", undefined, {
  initialValue: dateContent || "",
});
const { value: title } = useField("title", undefined, {
  initialValue: dataFill?.title || "",
});
const { value: description } = useField("description", undefined, {
  initialValue: dataFill?.description || "",
});

const route = useRoute();
const { id } = route.params;

const onSubmit = handleSubmit(async (vals) => {
  response.loading = true;
  if (dataFor === "EDIT") {
    try {
      await useFetch(`/api/moments/${id}/edit`, {
        method: "patch",
        body: {
          date: date.value,
          title: title.value,
          details: description.value,
        },
      });
      auth.user = null
      $toast.success(`Content for ${dataFill?.title} has been updated`)
      response.successFinal = true
      setTimeout(() => {
      return navigateTo(`/moments/${id}`);
        
      }, 2000);
    } catch (error) {
      response.error = true;
      $toast.error("Something went wrong")
    } finally {
      response.loading = false;
    }
  } else if (dataFor === "ADD") {
    try {
      const res = await useFetch(`/api/moments/`, {
        method: "post",
        body: {
          date: vals.date,
          title: vals.title,
          details: vals.description,
        },
      });
      auth.user = null
      $toast.success(`New moment has been added`)

      response.successFinal = true
      setTimeout(() => {
        return navigateTo(`/moments/${res.data.value?.data?._id}`);
      }, 2000);
    } catch (error) {
      response.error = true;
      $toast.error("Something went wrong")
    } finally {
      response.loading = false;
    }
  }
});

useSeoMeta({
  title:`${dataFor==="ADD"?"Create new moment | make a new event, your'e never gonna miss it":'Edit | '+dataFill?.title.slice(0,20) + '...'}`,
  ogTitle:`${dataFor==="ADD"?"Create new moment | make a new event, your'e never gonna miss it":dataFill?.title}`
})
</script>

<template>
  <div v-if="response.successFinal" class="w-full py-10 flex items-center justify-center">
    <LoadingComponent :isLoading="true" />
  </div>
  <div v-if="!response.successFinal" class="w-full text-black p-2 max-w-md flex flex-col gap-3">
    <form  @submit.prevent="onSubmit" class="flex flex-col gap-5 items-center">
    <!--Date  -->
    <InputComponent
      label="Date in the future"
      type="date"
      HtmlFor="futureDate"
      v-model="date"
      :error="errors.date"
    />
    <!--Title  -->
    <InputComponent
      label="Title"
      HtmlFor="title"
      v-model="title"
      :error="errors.title"
    />
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
      class="min-w-48 py-3 rounded-xl flex items-center justify-center text-white px-2 bg-tertiary border-accent border-[1px]"
    >
      {{ dataFor === "ADD" ? "Save" : "Update" }}
      <LoadingComponent :isLoading="response.loading" class="!p-0 !w-fit"/>
    </button>
  </form>
    </div>
  
</template>
