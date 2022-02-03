<template>
	<footer>
		<div class="contact margin-inline" id="contact-ref">
			<strong>Kontakt</strong>
			<div>
				<p>
					Telefon:&nbsp;
					<a href="tel:+4915224786034" class="filter">+49 1522 4786034</a>
				</p>
				<p>
					E-Mail:&nbsp;
					<a href="mailto:tim.zokki@gmail.com" class="filter">tim.zokki@gmail.com</a>
				</p>
			</div>
		</div>
		<p class="copyright">© Zokki &middot; Alle Rechte vorbehalten.</p>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Footer',
});
</script>

<style lang="scss" scoped>
footer {
	padding-top: var(--l);
	padding-bottom: var(--xxs);
	background-color: var(--bg-2);

	div.contact {
		display: flex;
		flex-direction: column;

		strong,
		p {
			margin: var(--xs) 0;
		}

		a {
			text-decoration: underline;
			transition: filter 0.1s;
		}
	}

	.copyright {
		font-size: var(--s);
		text-align: center;
		margin: var(--xs) var(--s);
	}
}
</style>
