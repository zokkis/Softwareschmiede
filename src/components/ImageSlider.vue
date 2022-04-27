<template>
	<div class="slide-container">
		<div class="slide-progress" :style="{ width: 'calc((' + fill + '% * 100) / ' + fillMax + ')' }"></div>
		<Slide v-for="(slide, index) in sliders" :key="index" :slideData="slide" :active="index === slideActiveId" :index="index" />

		<div class="dots" v-for="s in sliders" :key="s"></div>

		<a href="javascript:;" class="slide-btn" id="prev" @click="setSlideActive(slideActiveId - 1)">&#10094;</a>
		<a href="javascript:;" class="slide-btn" id="next" @click="setSlideActive(slideActiveId + 1)">&#10095;</a>
	</div>
</template>

<script lang="ts">
import { SlideData } from '@/models/slide.model';
import { defineComponent, inject } from 'vue';
import Slide from './Slide.vue';

export default defineComponent({
	name: 'ImageSlider',
	components: { Slide },
	mounted() {
		this.sliders.forEach((_, index) => this.createDot(index, this.$options.__scopeId));
		this.setDotActive();
		window.addEventListener('resize', () => this.setAspectRatio());
		this.setAspectRatio();
		if (!inject('reducedMotion')) {
			setInterval(() => {
				if (++this.fill >= this.fillMax) {
					this.setSlideActive(this.slideActiveId + 1);
				}
			}, this.fillInterval);
		}
	},
	data() {
		return {
			fill: 0,
			fillMax: 250,
			fillInterval: 25,
			slideActiveId: 0,
			sliders: [
				{
					title: 'Eine Website?',
					href: 'website',
					imgs: [
						{
							src: require('@/assets/webp/html.webp'),
							alt: 'Code Image',
							id: 'code',
							lazy: false,
						},
					],
				},
				{
					title: 'Eine API?',
					href: 'api',
					imgs: [
						{
							src: require('@/assets/webp/api-bg.webp'),
							alt: 'API bg Image',
							id: 'app-bg',
						},
						{
							src: require('@/assets/svg/api-fg.svg'),
							alt: 'API front Image',
							id: 'app-fg',
						},
					],
				},
				{
					title: 'Oder eine App?',
					href: 'app',
					imgs: [
						{
							src: require('@/assets/svg/ionic-angular.svg'),
							alt: 'App Image',
							id: 'app',
						},
					],
				},
				{
					title: 'Hilfe bei Ihren Projekten?',
					href: 'help',
					imgs: [
						{
							src: require('@/assets/webp/code.webp'),
							alt: 'Help Image',
							id: 'help',
						},
					],
				},
				/* {
					title: 'Oder etwas anderes?',
					href: 'more',
					imgs: [
						{
							src: require('@/assets/full/html-1x.jpeg'),
							alt: 'More Image',
							id: 'edit',
						},
					],
				}, */
			] as SlideData[],
		};
	},
	methods: {
		createDot(index: number, attName?: string): void {
			const dot = document.createElement('span');
			dot.classList.add('dot');
			attName && dot.setAttribute(attName, '');
			dot.addEventListener('click', () => this.setSlideActive(index));
			this.dotsContainer.appendChild(dot);
		},
		setDotActive(): void {
			this.dotsArray.forEach((dot, i) => {
				if (this.slideActiveId === i) {
					dot.classList.add('active');
				} else {
					dot.classList.contains('active') && dot.classList.remove('active');
				}
			});
		},
		setSlideActive(index: number): void {
			this.fill = 0;
			this.slideActiveId = index;
			if (this.slideActiveId >= this.sliders.length) {
				this.slideActiveId = 0;
			} else if (this.slideActiveId < 0) {
				this.slideActiveId = this.sliders.length - 1;
			}
			this.setDotActive();
		},
		setAspectRatio(): void {
			this.$el.style.setProperty('--view-width', window.innerWidth + '');
			this.$el.style.setProperty('--aspect-height', window.innerHeight / 2.5 + '');
		},
	},
	computed: {
		// eslint-disable-next-line no-undef
		slides(): NodeListOf<HTMLDivElement> {
			return this.$el.querySelectorAll('.slide');
		},
		dotsContainer(): HTMLDivElement {
			return this.$el.querySelector('.dots');
		},
		dots(): HTMLCollection {
			return this.dotsContainer.children;
		},
		dotsArray(): Element[] {
			return Array.from(this.dots);
		},
	},
});
</script>

<style lang="scss" scoped>
.slide-container {
	position: relative;

	.slide-progress {
		position: absolute;
		height: var(--xxs);
		background-color: rgba(48, 209, 88, 0.7);
		z-index: 9;
	}

	.dots {
		transform: translateX(-50%);
		position: absolute;
		display: flex;
		bottom: 8px;
		left: 50%;
		gap: 4px;

		span {
			background-color: var(--bg-focus);
			transition: background-color 0.3s ease;
			border: white solid 2px;
			display: inline-block;
			border-radius: 50%;
			cursor: pointer;
			margin: 0 2px;
			height: 15px;
			width: 15px;

			&.active,
			&:hover {
				background-color: var(--bg-4);
			}
		}
	}

	a.slide-btn {
		background-color: var(--bg-4);
		transform: translateY(-50%);
		border-radius: 0 8px 8px 0;
		transition: 0.3s ease;
		position: absolute;
		user-select: none;
		font-size: 18px;
		padding: 16px;
		top: 50%;

		&#next {
			border-radius: 8px 0 0 8px;
			right: 0;
		}

		@supports selector(:focus-visible) {
			&:hover,
			&:focus-visible {
				background-color: var(--bg-focus);
			}
		}

		@supports not selector(:focus-visible) {
			&:hover,
			&:focus {
				background-color: var(--bg-focus);
			}
		}
	}
}
</style>
