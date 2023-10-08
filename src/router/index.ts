import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PhotoDetails from '@/views/PhotoDetails.vue'
import Favorites from '@/views/Favorites.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/:id',
		name: 'photo-details',
		component: PhotoDetails
	},
	{
		path: '/favorites',
		name: 'favorites',
		component: Favorites
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
