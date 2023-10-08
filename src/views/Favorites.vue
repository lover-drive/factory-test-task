<template lang='pug'>
Header(:navLinks=`[
				{ target: '/favorites', icon: 'heart', text: 'Избранное' },
				{ target: '/', icon: 'search', text: 'Поиск' }
			]`,
			size='small')
main
	h2 Избранное
	Gallery(:photos='photos')
</template>

<style lang='sass' scoped>
h2
	font-size: 4.5rem
	font-weight: bold
	text-align: center
	margin: 6.25rem 0

@media (max-width: 30em)
	h2
		font-size: 2.25rem
		margin: 3.5rem 0
</style>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Gallery from '@/components/Gallery.vue'
import { Ref, onMounted, ref } from 'vue';
import { createApi } from 'unsplash-js';

const photos: Ref<any> = ref([])

const unsplash = createApi({
	accessKey: 'MuO4G_wfKoWOApzpCtY7ESFw697IJZymISbGkHkCiIc'
})

onMounted(async () => {
	var favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]')
	var requests = await Promise.all(favorites.map(_ => unsplash.photos.get({ photoId: _ })))
	photos.value = requests.map(_ => _.response)
	document.title = 'San Francisco Art Gallery - Избранное'
})
</script>
