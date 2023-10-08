<template lang='pug'>
.gallery
	article.photo(v-for='photo in photos' :key='photo.id')
		router-link(:to='`/${photo.id}`')
			img(:src='photo.urls.regular'
				:alt='photo.alt_description'
				:title='photo.alt_description')
</template>

<style lang='sass' scoped>
.gallery
	display: flex
	flex-wrap: wrap
	max-width: var(--content-width)
	margin: 7.125rem auto
	margin-bottom: 2rem
	gap: 1.875rem

	article
		aspect-ratio: 1
		flex: 1 0 30%
	
	article img
		width: 100%
		height: 100%
		object-fit: cover
		border-radius: .5rem

@media (max-width: 30em)
	.gallery
		display: block
		margin: 3.125rem 0

	article
		margin: 1.25rem
</style>

<script setup lang='ts'>
import { computed, PropType } from 'vue'

const props = defineProps({
	photos: {
		type: Array,
		required: true
	}
})
</script>