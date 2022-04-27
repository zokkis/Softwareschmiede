<template>
	<header>
		<nav class="navbar">
			<div class="nav-title">
				<img src="@/assets/svg/logo.svg" alt="Zokki's" v-show="showLogo" @click="scrollTo(0, 'smooth')" />
				<h1 v-show="showLogo">-&nbsp;</h1>
				<h1>Softwareschmiede</h1>
			</div>
			<a class="nav-toggle" href="javascript:;" @click="onNavToggleClick">
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</a>
			<div class="nav-links-container">
				<ul>
					<li><a href="#" :[isTabindex()]="-1">Startseite</a></li>
					<li><a href="#references-ref" :[isTabindex()]="-1">Referenzen</a></li>
					<li><a href="#contact-ref" :[isTabindex()]="-1">Kontakt</a></li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { fromEvent } from 'rxjs';
import { sampleTime } from 'rxjs/operators';

export default defineComponent({
	name: 'Header',
	mounted() {
		this.setShowLogo();
		this.navLinkContainer.addEventListener('mouseout', ev => (ev.target as HTMLAnchorElement)?.blur());
		fromEvent(window, 'resize').pipe(sampleTime(250)).subscribe(this.onResize);

		if (!inject('reducedMotion')) {
			this.setHeightMultiplier();
			fromEvent(window, 'scroll').pipe(sampleTime(50)).subscribe(this.setHeightMultiplier);
		}
	},
	data() {
		return {
			navLinkFocusable: !window.matchMedia('(max-width: 685px)').matches,
			showLogo: true,
			multiplier: 1,
		};
	},
	methods: {
		onNavToggleClick(ev: MouseEvent): void {
			ev.stopPropagation();
			const navContainer = this.navLinkContainer;
			this.navLinkFocusable = navContainer.classList.toggle('active');

			document.addEventListener(
				'click',
				() => {
					navContainer.classList.remove('active');
					this.navLinkFocusable = false;
				},
				{ once: true }
			);
		},
		onResize() {
			this.navLinkFocusable = !window.matchMedia('(max-width: 685px)').matches;
			this.setShowLogo();
		},
		setShowLogo(): void {
			this.showLogo = document.documentElement.clientWidth > 400;
		},
		setHeightMultiplier(): void {
			const scrollTop = document.scrollingElement?.scrollTop || 0;
			const max = this.slideHeaderHeight;

			let multi = 1;
			if (scrollTop <= max) {
				const current = max - scrollTop;
				const percentage = (100 / max) * current;
				multi = Math.max(1, (percentage / 100) * 0.5 + 1);
			}

			if (this.multiplier !== multi) {
				document.documentElement.style.setProperty('--height-multiplier', multi + '');
				this.multiplier = multi;
			}
		},
		// eslint-disable-next-line no-undef
		scrollTo(top: number, behavior: ScrollBehavior = 'auto'): void {
			window.scrollTo({ top, behavior });
		},
		isTabindex(): string {
			return this.navLinkFocusable ? '' : 'tabindex';
		},
	},
	computed: {
		navLinkContainer(): HTMLDivElement {
			return this.$el.querySelector('.nav-links-container');
		},
		slideHeaderHeight(): number {
			return document.querySelector('.slide-header')!.clientHeight;
		},
	},
});
</script>

<style lang="scss" scoped>
header {
	box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.5);
	margin-bottom: 8px;
	position: fixed;
	width: 100%;
	z-index: 999;
	top: 0;
}

.navbar {
	background-color: var(--bg-2);
	justify-content: space-between;
	display: flex;
}

.nav-title {
	height: calc(var(--header-height) * var(--height-multiplier, 1));
	padding: var(--s);
	display: flex;
	align-items: center;

	> * {
		display: flex;
		align-items: center;
	}

	img {
		height: 100%;
		margin-right: var(--xs);
	}

	h1 {
		font-size: var(--xl);
	}
}

.nav-links-container {
	display: flex;
	align-items: center;
	margin-right: var(--xs);

	ul {
		margin: 0;
		padding: 0;
		display: flex;
		list-style: none;
	}

	li a {
		display: block;
		padding: 1rem 2vw;
		position: relative;

		&::before,
		&::after {
			content: '';
			position: absolute;
			left: 50%;
			width: calc(100% - 2vw - 5px);
			height: 2px;
			opacity: 0;
			background: #fff;
			transform: translate(-50%, 10px);
			transition: transform 0.3s, opacity 0.3s;
		}

		&:hover:after,
		&:focus:after {
			opacity: 1;
			transform: translate(-50%, 22px);
		}

		&:hover:before,
		&:focus:before {
			opacity: 1;
			transform: translate(-50%, -1px);
		}

		&:hover,
		&:focus-within {
			background-color: var(--bg-focus);
		}
	}
}

.nav-toggle {
	display: none;
	flex-direction: column;
	justify-content: space-between;
	width: 33px;
	height: 25px;
	margin: auto var(--m) auto 0;
	padding: 2px;

	.bar {
		height: 3px;
		background-color: white;
		border-radius: 12px;
	}

	@supports selector(:focus-visible) {
		&:hover,
		&:focus-visible {
			background-color: var(--bg-focus);
		}
	}

	@supports not selector(:focus-visible) {
		&:hover,
		&:focus-within {
			background-color: var(--bg-focus);
		}
	}
}

@media (max-width: 685px) {
	.navbar {
		flex-direction: row;
		align-items: flex-start;
	}

	.nav-toggle {
		display: flex;
	}

	.nav-links-container {
		transition: top 0.5s;
		position: absolute;
		background-color: var(--bg-2-5);
		top: -150%;
		width: 100%;
		z-index: -1;

		&.active {
			top: 100%;
			transition: top 0.5s, z-index 0s 0.5s;
			z-index: 10;
		}

		ul {
			width: 100%;
			flex-direction: column;
			li {
				text-align: center;
				a {
					padding: 0.5rem 1rem;
					font-size: clamp(16px, 3vw, 24px);

					&::before,
					&::after {
						width: 15%;
					}
				}
			}
		}
	}
}
</style>
