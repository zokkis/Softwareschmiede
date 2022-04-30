<template>
	<div class="slide" v-bind:class="{ active: active }">
		<div>
			<h4>{{ slideData.title }}</h4>
			<a :href="'#' + slideData.href + '-ref'" :[isTabindex()]="-1" class="filter underline">Referenzen</a>
		</div>
		<LazyImage v-for="(img, index) in slideData.imgs" :key="index" :img="img" :show="active" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LazyImage from './LazyImage.vue';
import { SlideData, SlideDataProps } from '@/models/slide.model';
import { ImageDataProps } from '@/models/image.model';

export default defineComponent({
	name: 'Slide',
	components: { LazyImage },
	props: {
		slideData: {
			required: true,
			type: Object,
			validator: (data: SlideData) => {
				return SlideDataProps.every(sdp => !!data[sdp]) && ImageDataProps.every(idp => !!data.imgs.every(img => !!img[idp]));
			},
		},
		active: Boolean,
		index: Number,
	},
	methods: {
		isTabindex(): string {
			return this.active ? '' : 'tabindex';
		},
	},
});
</script>

<style lang="scss" scoped>
.slide {
	aspect-ratio: var(--view-width, 1920) / var(--aspect-height, 600);
	position: relative;
	width: 100%;

	height: 0;
	opacity: 0;

	&:deep(img) {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 100%;
	}

	&.active {
		transition: opacity 0.5s;
		overflow: hidden;
		height: auto;
		opacity: 1;

		div {
			transform: translateX(15vw);
			z-index: 9;

			* {
				transform: translateX(0vw);
			}
		}
	}

	div {
		box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.8);
		transform: translateX(-100%);
		background-color: #345a;
		transition: transform 1s cubic-bezier(0.2, 0.8, 0.3, 1.1);
		position: absolute;
		max-width: 75%;
		padding: 8px;
		top: 5%;

		h4 {
			font-size: clamp(var(--xl), 3vw, var(--xxl));
			margin: 0;
		}

		a {
			font-size: clamp(var(--l), 2.5vw, var(--xl));
			margin-top: 8px;
			float: right;
			margin: 0;
		}

		* {
			transition: transform 1s;
			transform: translateX(-15vw);
		}
	}
}
</style>
