<template>
	<img :[isSrc]="img.src" :alt="img.alt" :id="img.id" v-show="show" v-if="!img.srcset && onceShowen" loading="lazy" />
	<img :[isSrc]="img.src" :[isSrcSet]="img.srcset" :alt="img.alt" :id="img.id" v-show="show" v-else-if="onceShowen" loading="lazy" />
</template>

<script lang="ts">
import { ImageData, ImageDataProps } from '@/models/image.model';
import { defineComponent, inject } from 'vue';

export default defineComponent({
	name: 'LazyImage',
	props: {
		show: {
			required: false,
			type: Boolean,
			default: true,
		},
		img: {
			required: true,
			type: Object,
			validator: (data: ImageData): boolean => {
				return ImageDataProps.every(idp => !!data[idp]);
			},
		},
	},
	data() {
		return {
			canLazyLoad: inject('canLazyLoad'),
			onceShowen: this.show,
		};
	},
	computed: {
		isSrc(): string {
			return this.onceShowen || this.canLazyLoad ? 'src' : 'data-src';
		},
		isSrcSet(): string {
			return this.onceShowen || this.canLazyLoad ? 'srcset' : 'data-src';
		},
	},
	mounted() {
		if (!this.onceShowen) {
			const unwatch = this.$watch('show', () => {
				this.onceShowen = this.onceShowen || this.show;
				if (this.onceShowen) {
					unwatch();
				}
			});
		}
	},
});
</script>

<style lang="scss" scoped>
#help {
	object-fit: cover;
}
</style>
