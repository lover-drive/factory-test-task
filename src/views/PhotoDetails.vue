<template lang='pug'>
Header(:navLinks=`[
				{ target: '/favorites', icon: 'heart', text: 'Избранное' },
				{ target: '/', icon: 'search', text: 'Поиск' }
			]`,
			size='small')
main(:style='{ "--background": `url(\'${photoURL}\')` }')
	h2 {{ photoName }}
	article(v-if='author')
		section#top-bar
			img#author-picture(:src='author.profile_image.medium' alt='Аватар фотографа')
			div
				address(rel='author') {{ author.name }}
				a(:href='author.links.html' target='_blank') {{ author.username }}
			div.buttons
				button(@click='Favorite' :class='{ active: isFavorited }').favorite Добавить в избранное
				button(@click='Download').download Скачать
		img#photo(:src='photoURL')
</template>

<style lang='sass' scoped>
h2
	display: none

main
	position: relative
	margin-bottom: 6.25rem
	
	&::before
		content: ''
		position: absolute
		inset: -4rem
		bottom: 14rem
		background: var(--background)
		background-repeat: no-repeat
		background-size: cover
		background-position: center top

		filter: saturate(0) blur(.5rem) brightness(50%)
		z-index: -1

	&::after
		content: ''
		position: absolute
		width: 100%
		height: 14rem
		bottom: 0
		background: white

	img#photo
		position: relative
		width: 100%
		display: block
		margin: 0 auto

		box-shadow: 0 .25rem 3.125rem rgba(black, .5)

		z-index: 1

article
	max-width: var(--content-width)
	margin: 0 auto

#top-bar
	background: var(--profile-picture)
	background-position: le
	color: white

	margin: 2.5rem 0

	display: flex
	gap: .625rem

	address
		font-size: 1.875rem

	a
		display: block
		color: inherit
		text-decoration: none

		&::before
			content: '@'

	img
		border: .0625rem solid currentColor
		border-radius: .5rem

.buttons
	margin-left: auto
	display: flex
	align-items: center
	gap: 1.25rem

	button
		padding: .75rem 1.25rem
		border: none
		outline: none
		border-radius: .5rem
		font-family: inherit
		font-size: 1.25rem
		background-repeat: no-repeat
		background-position: 1.25rem center
		padding-left: 4rem
		cursor: pointer

		&.favorite
			background-color: white
			background-image: url('~@/assets/heart.svg')
			font-size: 0
			width: 3rem
			height: 3rem
			padding: 0
			background-position: center

			&.active
				background-image: url('~@/assets/heart_full.svg')

		&.download
			background-color: #FFF200
			background-image: url('~@/assets/download.svg')
	
@media (max-width: 30em)
	main
		margin: 1.25rem

	main::before
		display: none

	button
		box-shadow: 0 0 .25rem rgba(black, .25)

	.buttons button.download
		font-size: 0
		width: 3rem
		height: 3rem
		padding: 0
		background-position: center

	#top-bar
		color: black

		address
			font-size: 1rem
</style>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import TextField from '@/components/TextField.vue'

import { Ref, onBeforeUnmount, ref } from 'vue'
import { onMounted } from 'vue'
import { createApi } from 'unsplash-js'
import router from '@/router'

const isFavorited = ref(false)

const photoName = ref('')
const photoURL = ref('')
const author: Ref<any> = ref(null)

const unsplash = createApi({
	accessKey: 'MuO4G_wfKoWOApzpCtY7ESFw697IJZymISbGkHkCiIc'
})

function Favorite() {
	var currentFavorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]')
	currentFavorites.push(router.currentRoute.value.params.id as string)
	currentFavorites = currentFavorites.filter((_, i, arr) => arr.indexOf(_) == arr.lastIndexOf(_))
	isFavorited.value = currentFavorites.includes(router.currentRoute.value.params.id as string)
	localStorage.setItem('favorites', JSON.stringify(currentFavorites))
}

function Download() {
	fetch(photoURL.value)
		.then(_ => _.blob())
		.then(_ => {
			var a = document.createElement('a')
			a.href = window.URL.createObjectURL(_)
			a.download = photoName.value + '.jpg'
			a.style.display = 'none'
			document.body.appendChild(a)
			a.click()
			a.remove()
		})
}

onMounted(() => {
	unsplash.photos.get({
		photoId: router.currentRoute.value.params.id as string
	})
		.then(_ => {
			photoURL.value = _.response?.urls.raw ?? ''
			photoName.value = _.response?.alt_description ?? ''
			author.value = _.response?.user
		})
	isFavorited.value = JSON.parse(localStorage.getItem('favorites') || '[]').includes(router.currentRoute.value.params.id)
})

</script>
