<template lang='pug'>
Header(:navLinks=`[
	{ target: '/favorites', icon: 'heart', text: 'Избранное' }
]`)

#search
	form(@submit='OnSearchFormSubmit')
		TextField(v-model='currentQuery')
		button Искать

main#photos
	Gallery(:photos='photos')
</template>

<style lang='sass' scoped>
#search
	display: block
	background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("~@/assets/bg_search.jpg")
	padding: 5.75rem
	border-bottom: 1rem solid #C4C4C4

form
	position: relative
	max-width: 54.125rem
	margin: 0 auto

form button
	position: absolute
	font-size: 0
	user-select: none

	border: none
	padding: 0
	background: url('~@/assets/search.svg')
	background-size: 1.5rem
	background-position: center
	background-repeat: no-repeat

	height: 100%
	aspect-ratio: 1
	top: 0
	right: 0

	cursor: pointer

	transition: background-color .2s

	&:hover
		background-color: #FFF200

@media (max-width: 30em)
	search
		padding: 5rem 1.25rem
</style>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import TextField from '@/components/TextField.vue'
import Gallery from '@/components/Gallery.vue'

import { onBeforeUnmount, ref } from 'vue'
import { onMounted } from 'vue'
import { createApi } from 'unsplash-js'
import router from '@/router'

let photos = ref([])

let currentPage = 0
let currentQuery = ref('')
let readyToLoadMore = true

const unsplash = createApi({
	accessKey: 'MuO4G_wfKoWOApzpCtY7ESFw697IJZymISbGkHkCiIc'
})

function OnSearchFormSubmit(e: SubmitEvent) {
	e?.preventDefault()
	if (currentQuery.value.length > 0) Search()
	else LoadRandom()
}

function LoadRandom() {
	readyToLoadMore = false
	unsplash.photos.getRandom({ count: 9 }) // в pdf-ке написано 8, но в дизайне выглядит как 9
		.then(result => {
			if (result.type != 'success') throw result.errors
			photos.value = result.response as any // иногда я ненавижу TypeScript, брррр
			console.log(photos.value)
		})
	router.replace({
		path: '/',
		query: {
			q: currentQuery.value
		}
	})
}

function Search() {
	readyToLoadMore = false
	currentPage = 0
	unsplash.search.getPhotos({ query: currentQuery.value, perPage: 9 * 9 })
		.then(result => {
			if (result.type != 'success') throw result.errors
			photos.value = result.response.results as any // иногда я ненавижу TypeScript, брррр
			readyToLoadMore = true
		})
}

function LoadMore() {
	if (!readyToLoadMore) return
	readyToLoadMore = false
	currentPage++
	console.log(currentPage)
	unsplash.search.getPhotos({ query: currentQuery.value, perPage: 9 * 9, page: currentPage })
		.then(result => {
			if (result.type != 'success') throw result.errors
			photos.value = photos.value.concat(result.response.results as any) // иногда я ненавижу TypeScript, брррр
			console.log(result.response.results)
			readyToLoadMore = true
		})
}

function OnScroll() {
	if (window.scrollY > document.body.scrollHeight - window.innerHeight) LoadMore()
}

onMounted(() => {
	const urlParams = new URLSearchParams(window.location.search)

	currentQuery.value = urlParams.get('q') || ''

	if (currentQuery.value.length > 0) Search()
	else LoadRandom()

	window.addEventListener('scroll', OnScroll)
	document.title = 'San Francisco Art Gallery'
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', OnScroll)
})

</script>
