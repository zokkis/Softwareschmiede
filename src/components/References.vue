<template>
	<div :id="referencData.id + '-ref'" class="main">
		<h3 class="title padding-inline">{{ referencData.title }}</h3>
		<div>
			<div
				class="container padding-inline"
				v-for="(data, oIndex) in referencData.data"
				:key="oIndex"
				:id="data.id ? data.id + '-ref' : oIndex"
			>
				<div class="img-container">
					<LazyImage
						v-for="(img, iIndex) in data.imgs"
						:key="iIndex"
						:img="img"
						:show="showIDs.includes(data.id ? data.id + '-ref' : oIndex + '')"
					/>
				</div>
				<p class="text" v-html="data.text"></p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import LazyImage from './LazyImage.vue';
import { ReferencData, ReferencDataProps } from '@/models/references.model';
import { ImageDataProps } from '@/models/image.model';

export default defineComponent({
	name: 'References',
	components: { LazyImage },
	props: {
		referencData: {
			required: true,
			type: Object,
			validator: (data: ReferencData) => {
				return (
					ReferencDataProps.every(rdp => data[rdp]) &&
					!!data.data.length &&
					data.data.every(d => d.text && ImageDataProps.every(idp => d.imgs.every(img => !!img[idp])))
				);
			},
		},
	},
	data() {
		return {
			showIDs: [] as string[],
		};
	},
	mounted() {
		let lazyObjs = 0;
		let animationObjs = 0;

		const lazyObserver = new IntersectionObserver(
			entries => {
				entries
					.filter(entry => entry.isIntersecting)
					.forEach(entry => {
						lazyObserver.unobserve(entry.target);
						this.showIDs.push(entry.target.id);
						if (--lazyObjs <= 0) {
							lazyObserver.disconnect();
						}
					});
			},
			{ rootMargin: '0px 0px 250px 0px', threshold: 0.5 }
		);

		const animationObserver = inject('reducedMotion')
			? undefined
			: new IntersectionObserver(
					entries => {
						entries
							.filter(entry => entry.isIntersecting)
							.forEach(entry => {
								entry.target.classList.add('show');
								animationObserver!.unobserve(entry.target);
								if (--animationObjs <= 0) {
									animationObserver!.disconnect();
								}
							});
					},
					{ threshold: 0.5 }
			  );
		const container = (this.$el as HTMLDivElement).querySelectorAll('div.container');

		lazyObjs = animationObjs = container.length;

		container.forEach(el => {
			lazyObserver.observe(el);

			if (animationObserver) {
				animationObserver.observe(el);
			} else {
				(el as HTMLElement).style.opacity = '1';
			}
		});
	},
});
</script>

<style lang="scss" scoped>
div.main {
	.title {
		white-space: nowrap;
		font-size: clamp(calc(var(--m) + var(--xxs)), 3vw, var(--xl));
	}

	> div {
		overflow-x: hidden;
	}

	div.container {
		opacity: 0;

		.img-container {
			--width: 150px;
			--height: 150px;

			width: var(--width);
			height: var(--height);

			img {
				width: 100%;
				height: 100%;
			}
		}

		&.left {
			&.show {
				--translate-multi: -1;
				animation: fadeIn 1s forwards;
			}

			.img-container {
				float: left;
				margin-right: var(--s);

				img:not(:first-child) {
					margin-right: calc(var(--width) * -1);
				}
			}
		}

		&.right {
			&.show {
				--translate-multi: 1;
				animation: fadeIn 1s forwards;
			}

			.img-container {
				float: right;
				margin-left: var(--s);

				img:not(:first-child) {
					margin-left: calc(var(--width) * -1);
				}
			}
		}
	}

	p {
		font-size: clamp(var(--m), 2vw, 20px);
		line-height: 1.25em;
		hyphens: auto; // @TODO: check this
		margin: 0;
		margin-bottom: var(--l) !important;

		br {
			line-height: 1.5em;
		}
	}
}

@keyframes fadeIn {
	0% {
		transform: translateX(calc(50vw * var(--translate-multi, 1)));
		opacity: 0;
	}
	70% {
		opacity: 1;
	}
	100% {
		transform: translateX(0);
		opacity: 1; // for forwards in animation
	}
}

@media (min-width: 755px) {
	div.main {
		display: flex;
		justify-content: space-around;
		align-items: flex-start;

		&.left-ref {
			flex-direction: row;

			div.container.show {
				--translate-multi: 1;
				animation: fadeIn 1s forwards;
			}
		}

		&.right-ref {
			flex-direction: row-reverse;

			div.container.show {
				--translate-multi: -1;
				animation: fadeIn 1s forwards;
			}
		}

		.title {
			margin: 0;
			position: sticky;
			padding: var(--l);
			top: calc(var(--header-height) - var(--xs));
		}

		> div {
			padding: var(--l) 0;
		}

		div.container {
			p {
				margin: 0;
			}

			.img-container {
				--width: 200px;
				--height: 200px;
			}
		}
	}
}

@media (min-width: 900px) {
	div.main > div {
		max-width: 70%;
	}
}

@media (min-width: 1500px) {
	div.main > div {
		max-width: 60%;
	}
}

#api-ref .title {
	white-space: unset;
	width: min-content;
}

#api-ref,
#help-ref {
	.img-container {
		--width: 200px;
	}
}

@media (min-width: 755px) {
	#api-ref,
	#help-ref {
		.img-container {
			--width: 250px;
		}
	}
}
</style>
