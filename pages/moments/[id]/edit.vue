<script lang="ts" setup>
import type { Moment } from "~/assets/types";
const { params } = useRoute();
const { id } = params;
const data = reactive<{
  loading: boolean;
  error: boolean;
  data: Moment | null;
}>({
  loading: true,
  error: false,
  data: null,
});

try {
  const res = await useFetch(`/api/moments/${id}`);
  data.data = res.data.value?.data as Moment;
} catch (e) {
  console.log(e);
}
</script>

<template>
  <div class="w-full min-h-[calc(100vh-10rem)] flex items-center">
    <ContentFormComponent
        :data-fill="{
          date: data.data?.futureDate ? data.data?.futureDate : '',
          description: data.data?.details ? data.data?.details : '',
          title: data.data?.title ? data.data?.title : '',
        }"
        data-for="EDIT"
      />
  </div>
</template>
