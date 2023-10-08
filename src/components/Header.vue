<template lang='pug'>
header(:class='[size]')
	router-link(to='/') 
		h1 San Francisco Art Gallery
	nav
		ul
			li(v-for='link in navLinks')
				router-link(:to='link.target' :style='{ "--icon-url": `url(\'/factory/images/icons/${link.icon}.svg\')` }') {{ link.text }}
</template>

<style lang='sass' scoped>
header
	background: black
	padding: 2.25rem calc((100vw - var(--content-width)) / 2)
	display: flex
	align-items: center
	justify-content: space-between
	color: white

h1
	margin: 0
	user-select: none
	color: transparent
	background: url("~@/assets/logo.svg")
	height: 4.5rem
	background-size: contain
	background-repeat: no-repeat

a
	position: relative
	color: inherit
	text-decoration: none // впрочем, я не знаю насколько хорошая идея убирать
												// подчёркивание в ссылках, тем более когда нет больше
												// никаких других индикаторов, что она кликабельная

	&::after
		content: ''
		position: absolute
		left: -.25rem
		right: -.25rem
		bottom: -.25rem
		top: calc(100% + .25rem)
		// opacity: 0
		box-sizing: border-box
		transition: top .2s
		background: #FFF200
		z-index: -1

a:hover::after
	top: -.25rem

header nav
	display: flex

ul
	display: flex
	list-style: none

a
	margin-left: 2.25rem
	font-size: 1.25rem

a::before
	content: ''
	display: inline-block
	width: 1.5rem
	height: 1.5rem
	background-image: var(--icon-url)
	background-position: center center
	background-repeat: no-repeat
	background-size: contain
	vertical-align: middle
	margin-right: .5rem

header.small
	padding-top: 1.75rem
	padding-bottom: 1.75rem

	h1
		height: 2rem

@media (max-width: 30em)
	header
		padding: 1rem 2rem

	nav a
		font-size: 0
		user-select: none

	h1
		height: 2rem
</style>

<script setup lang='ts'>
import { computed, PropType } from 'vue'

const props = defineProps({
	navLinks: {
		type: Array,
		required: true
	},
	size: {
		type: String,
		required: false
	}
})
</script>