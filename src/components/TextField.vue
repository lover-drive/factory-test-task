<template lang="pug">
fieldset
	label(for='test'
				:class='{ placeholder: !isFocused && value?.length == 0 }')
				| Поиск
	input(name='test' placeholder=" "
				v-model='value'
				@focusin="isFocused = true"
				@focusout="isFocused = false")
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style lang='sass'>
fieldset
	position: relative

	font-size: 1.5rem
	font-weight: 300

	margin: 0 auto

input
	display: block
	width: 100%
	box-sizing: border-box
	padding: 1.25rem 2.5rem
	font-family: inherit
	font-size: inherit
	font-weight: inherit

	border: none
	outline: none

label
	position: absolute
	top: -2rem
	left: 50%
	transform: translateX(-50%)
	transition: .2s
	color: white
	font-weight: bold
	font-size: 1.25rem

label.placeholder
	top: 1.25rem
	left: 2.5rem
	transform: none
	font-weight: 300
	color: black
	font-size: 1.5rem
	pointer-events: none

@media (max-width: 30em)
	label.placeholder
		left: 1.5rem

	input
		padding: 1.25rem 1.5rem
</style>