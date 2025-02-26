<script lang="ts" setup>
const {
  error = "",
  HtmlFor,
  modelValue,
  label,
  type = "text",
} = defineProps(["type", "modelValue", "HtmlFor", "label", "error"]);

const emit = defineEmits();

const updateValue = (event: { target: { value: any } }) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <label :for="HtmlFor" class="w-full flex flex-col gap-2">
    <span class="text-sm">{{ label }}</span>
    <input
      v-if="type !== 'textBox'"
      class="w-full p-2 border-2 border-accent rounded-md"
      :type="type"
      :name="HtmlFor"
      :id="HtmlFor"
      :value="modelValue"
      @input="updateValue"
    />

    <textarea v-if="type === 'textBox'" class="w-full scroller p-2 border-2 border-accent rounded-md h-36 resize-none"
      :type="type"
      :name="HtmlFor"
      :id="HtmlFor"
      :value="modelValue"
      @input="updateValue"></textarea>
    <p
      :class="`text-xs -mt-1 animate-shake duration-300 text-red-500 ${
        error ? 'opacity-100' : 'opacity-0 h-4'
      }`"
    >
      {{ error }}
    </p>
  </label>
</template>


