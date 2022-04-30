<template>
	<Header />
	<main>
		<div class="slide-header margin-inline padding-bottom padding-top">
			<h1 class="title">Ich programmiere was Sie benötigen</h1>
			<p class="text">Genau auf Sie zugeschnitten</p>
		</div>
		<ImageSlider></ImageSlider>

		<div class="margin-inline padding-bottom" id="instructions-ref">
			<h2 class="title">Egal was Sie benötigen ich kann es für Sie programmieren</h2>
			<p class="text">
				In der heutigen Welt braucht jedes Restaurant, Startup, jeder Unternehmer und einige Privatpersonen eine eigene Website, eine API,
				ein unterstützdenden Bot oder andere Programme, welche den Alltag erleichtern, notwendig für die Arbeit sind oder einfach Daten
				sammeln, verarbeiten oder speichern.
				<!-- <br /> -->
				Doch nicht jeder der Software braucht hat die Zeit, das Wissen oder die Möglichkeit diese selber zu programmieren.
				<!-- <br /> -->
				Genau da springe ich ein - ein Softwareengineering Student bei der AKAD University in Stuttgart mit mehr als 3Jahren aktive
				Programmiererfahrung, einigen fertigen Projekten als Referenzen und über ein Jahr erfahrung am Praktischen arbeiten in einer
				regionalen und mittelständigen Softwarefirma mit mehr als 100 Mitarbeitern.
				<!-- <br /> -->
				Wenn Sie Software benötigen und nicht wissen wer das Programmiern soll,
				<a href="#contact-ref" class="filter underline" tabindex="-1">melden Sie sich gerne bei mir</a> und ich sehe was ich für Sie machen
				kann. Und wenn Sie noch unentschlossen sind finden sie unten hoffentlich für Sie interessante Referenzen um sich zu entscheiden.
			</p>
		</div>

		<div class="padding-bottom" id="references-ref">
			<h2 class="title padding-inline">Referenzen</h2>
			<References v-for="(refs, index) in references" :key="index" :referencData="refs" />
		</div>
	</main>
	<Footer />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from './components/Header.vue';
import ImageSlider from './components/ImageSlider.vue';
import Footer from './components/Footer.vue';
import { ReferencData } from './models/references.model';
import References from './components/References.vue';

@Options({
	components: {
		Header,
		ImageSlider,
		References,
		Footer,
	},
	mounted() {
		document.querySelectorAll('#references-ref div.container').forEach((paragraph, index) => {
			paragraph.classList.add(index % 2 === 0 ? 'right' : 'left');
		});
		document.querySelectorAll('#references-ref .main').forEach((main, index) => {
			main.classList.add(index % 2 === 0 ? 'left-ref' : 'right-ref');
		});
	},
	data() {
		return {
			references: [
				{
					title: 'Websites',
					id: 'website',
					data: [
						{
							text: 'Diese Seite hier wurde von mir komplett in Vue.js programmiert und umfasst Animationen, Lazyloading, eigens erstellte Bilder und umfangreiche Browserkompatiblität. Außerdem werden Tastaturnavigation und reduzierte Animationen unterstützt. Zudem sind die Ladezeiten der Seite durch optimierungen und 100%tig selbst Programmierten Anteil sehr gering. Somit ist es auch möglich mit schechten Internet immer auf die Seite zuzugreifen. Genauso wurde auf Mobile kompatiblität geachtet und es ist alles genauso möglich auf dem Handy oder kleineren Bildschirmen die Seite in vollem Umfang zu betrachten.',
							imgs: [
								{
									src: require('@/assets/svg/vue.svg'),
									alt: 'Website',
								},
							],
						},
						{
							text: 'Aber nicht nur diese Internetseite hab ich programmiert. In dem Unternehmen bin ich täglich dabei eine Website für Businesskunden im Bereich Bahn, Instandhaltung und Logistik mitzuentwickeln. Dabei benutze ich Ionic, Angular, Primeng und viele weitere Techniken um die Seite sowohl anschaulich als auch gut bedienbar zu machen. Zudem benötigt man nicht nur die Website für solch eine Anwendung sondern auch ein Server im Hintergrund der Daten speichert, sendet und für alle möglichen Anwendungszwecke aufbereitet. Aber darüber können Sie unten bei <a href="#api-ref" class="filter underline" tabindex="-1">APIs und Datenbanken</a> lesen.',
							imgs: [
								{
									src: require('@/assets/svg/angular-primeng.svg'),
									alt: 'Website',
								},
							],
						},
					],
				},
				{
					title: 'APIs und Datenbanken',
					id: 'api',
					data: [
						{
							text: 'Um schnell und unkompliziert eine API zu programmieren hilft Node.js in kombination mit Express.js. Über einfache Anfragen an die API bekommt man immer schnell und zuverlässig die benötigeten Daten und genauso einfach ist es Daten an die API zu senden, welche alles wie benötigt zb. in eine MySQL Datenbank gespeichert, als E-Mail weiter geleitet oder einfach als Datei auf Ihren Computer gepeichert werden kann. Alles das habe bereits für die API für meine App <a href="#foodmood-ref" class="filter underline" tabindex="-1">FoodMood</a> im Einsatz und kann jeder unkompliziert verwenden. Genauso greift die Business-App und -Website auf meiner Arbeit auf der von mir mitentwickelte API zu und habe dabei auch Praxis mit Oracle-Datenbankmanagementsystem. Wenn Sie genaueres erfahren möchten stehe ich jeder Zeit zur verfügung unter der unten genannten <a href="#contact-ref" class="filter underline" tabindex="-1">Nummer und E-Mail</a>.',
							imgs: [
								{
									src: require('@/assets/webp/api-bg.webp'),
									alt: 'API-bg',
								},
								{
									src: require('@/assets/svg/api-fg.svg'),
									alt: 'API-fg',
								},
							],
						},
					],
				},
				{
					title: 'Apps',
					id: 'app',
					data: [
						{
							text: 'Und ich kann nicht nur APIs. Ich habe bereits 2 App Projekte mit dem Ionic Framework abgeschlossen. Eine davon ist wie bereits erwähnt FoodMood welche eine einfache Möglichkeit für meine Familie und mich ist Einkaufslisten online zu erstellen, aber auch alles was wir mal gekauft haben zu bewerten, Bilder hochzuladen, an dem Barcode zu erkennen und viels mehr. Somit ist es einfach möglich nur noch Dinge einzukaufen die einen gefallen ohne vor dem Regal zu stehen und nicht mehr zu wissen was gut ist und was nicht. Dabei war es wichtig auf eine gute und übersichtliche Oberfläche zu setzen die jeder versteht und verwenden kann als auch eine schnelle und robuste API dafür zu haben.',
							id: 'foodmood',
							imgs: [
								{
									src: require('@/assets/svg/foodmood-logo.svg'),
									alt: 'App',
								},
							],
						},
						{
							text: 'Die andere App ist das Equivalent zur Website die ich in der Firma mit programmiert habe. Aus rechtlichen Gründen kann ich da nicht als zu viel sagen, aber es ist auch eine durchaus gute App für IOS und Android sowohl für Tablets als auch für Handys. Da die App von mehr als 2500 Personen im Außeneinsatz benutzen und ich für die Problemlösung und dem beheben von Fehlern beauftragt war hab ich viel Erfahrung darin sammeln können mit Ionic eine App zu entwickeln und die Wünsche der Kunden umzusetzen als auch mit den Kunden zu Kommunizieren. Zudem war ich der Deutsche Ansprechpartner bei allen Fragen rund um die App. Generell kann jede Idee die Sie für Apps haben umgesetzt werden und ich weiß wie.',
							imgs: [
								{
									src: require('@/assets/svg/ionic-angular-logo.svg'),
									alt: 'App',
								},
							],
						},
					],
				},
				{
					title: 'Projekt hilfe',
					id: 'help',
					data: [
						{
							text: 'Auch wenn Sie zur Zeit ein Projekt haben und nicht weiter kommen oder hilfe dabei benötigen bin ich dafür bereit. Ich musste mich schon öfter in bestehende Projekte einarbeiten und habe das immer sehr schnell und zuverlässig gemacht. Genauso kann ich auch als Aussenstehender ihre Projekte auf intuitive Bedienung, funktion und vieles mehr testen. Dabei kann ich Ihnen auch gerne für Ihr Projekt in einen passenden Testframework automatische Tests programmieren. Dabei habe ich Erfahrung in den Programmiersprachen Java, Python, Javascript und Ruby.',
							imgs: [
								{
									src: require('@/assets/webp/code.webp'),
									alt: 'Help',
								},
							],
						},
					],
				},
				{
					title: 'Und vieles mehr',
					id: 'more',
					data: [
						{
							text: 'Genauso habe ich alle Bilder auf dieser Internetseite erstellt. Aber auch Spiele in Javascript, in der Unity-Engine mit C# oder in Java sind kein Problem und lassen sich immer umsetzen. Oder benötigen Sie eine Progressive Web App? Einen Bot um etwas zu automatisieren oder zb für Discord? Ein Script für repetitive Aufgaben am Computer? Das alles und noch viel mehr ist alles möglich, wenn Sie nicht das passende gefunden haben können Sie sich auch gerne bei mir <a href="#contact-ref" class="filter underline" tabindex="-1">melden</a> und ich werde sehen was ich alles für Sie machen kann.',
							imgs: [
								{
									src: require('@/assets/svg/pwa.svg'),
									alt: 'more',
								},
							],
						},
					],
				},
			] as ReferencData[],
		};
	},
})
export default class App extends Vue {}
</script>

<style lang="scss">
:root {
	--color: white;
	--bg-0: #000;
	--bg-1: #111;
	--bg-2: #222;
	--bg-2-5: #252525;
	--bg-3: #333;
	--bg-4: #444;
	--bg-5: #555;
	--bg-6: #666;
	--bg-7: #777;
	--bg-8: #888;
	--bg-9: #999;
	--bg-focus: var(--bg-6);

	--xxs: 4px;
	--xs: 8px;
	--s: 12px;
	--m: 16px;
	--l: 24px;
	--xl: 32px;
	--xxl: 40px;
	--xxxl: 48px;
	--header-height: 54px;
}

*,
*::after,
*::before {
	box-sizing: border-box;
}

html {
	scroll-padding-top: calc(var(--header-height) + var(--xs));
}

body {
	margin: 0;
	padding: 0;
	background-color: var(--bg-4);
	color: var(--color);
	-webkit-tap-highlight-color: transparent;
}

#app {
	font-family: 'PT Sans', Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

/* for alt of img */
img {
	color: #bada55;
	font-weight: bolder;
	font-size: var(--l);
	text-transform: uppercase;
	text-align: center;
}

.margin-inline {
	margin-inline: var(--l);
}

.padding-inline {
	padding: 0 var(--l);
}

.padding-bottom {
	padding-bottom: var(--l);
}

.padding-top {
	padding-top: var(--l);
}

a {
	color: var(--color);
	cursor: pointer;

	&:not(.underline) {
		text-decoration: none;
	}

	&.filter:hover {
		filter: brightness(75%);
		transition: filter 0.1s;
	}

	@supports selector(:focus-visible) {
		&:focus-visible {
			outline: currentColor solid 2px;
			outline-offset: 2px;
		}
	}

	@supports not selector(:focus-visible) {
		&:focus {
			outline: currentColor solid 2px;
			outline-offset: 2px;
		}
	}
}

@media (prefers-reduced-motion: reduce) {
	* {
		transition-property: none !important;
		transition-duration: none !important;
		transition-timing-function: none !important;
		transition-delay: none !important;
		animation: none !important;
	}
}
</style>

<style lang="scss" scoped>
.slide-header {
	margin-top: calc(var(--header-height) * var(--height-multiplier, 1));

	h1 {
		margin-top: 0;
		margin-bottom: var(--xxs);
		font-size: clamp(var(--l), 5vw, var(--xxxl));
	}

	p {
		margin-top: var(--s);
		font-size: clamp(var(--m), 2.5vw, var(--l));
	}
}

#instructions-ref,
#references-ref {
	> .title {
		font-size: clamp(var(--m), 4vw, var(--xxl));
		line-height: 1.25em;
	}

	> .text {
		font-size: clamp(var(--m), 2.5vw, var(--l));
		line-height: 1.2em;
	}
}
</style>
