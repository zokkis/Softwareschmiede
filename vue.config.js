const { defineConfig } = require('@vue/cli-service');

const options = {
	excludeHtmlNames: [],
	fileWhitelist: [/^html(.)+\.webp$/],
};

module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: true,
	productionSourceMap: false,
	chainWebpack: config => {
		config.plugin('preload').use({
			apply: compiler => {
				const createHTMLElementString = href => `<link href=${href} rel="preload">`;
				const insertLinksIntoHead = (html, links = []) => (links.length ? html.replace('</head>', links.join('') + '</head>') : html);

				const addLinks = (compilation, htmlPluginData) => {
					const links = [];
					[...compilation.chunks]
						.find(c => c.id === 'app')
						.auxiliaryFiles.forEach(file => {
							if (options.fileWhitelist.every(regex => regex.test(file)) && !options.excludeHtmlNames.every(regex => regex.test(file))) {
								links.push(createHTMLElementString(file));
							}
						});

					htmlPluginData.html = insertLinksIntoHead(htmlPluginData.html, links);
					return htmlPluginData;
				};

				compiler.hooks.compilation.tap('PreloadPlugin', compilation => {
					let hook = compilation.hooks.htmlWebpackPluginAfterHtmlProcessing;
					if (!hook) {
						const [HtmlWebpackPlugin] = compiler.options.plugins.filter(plugin => plugin.constructor.name === 'HtmlWebpackPlugin');
						hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit;
					}

					hook.tapAsync('PreloadPlugin', (htmlPluginData, callback) => {
						try {
							callback(null, addLinks(compilation, htmlPluginData));
						} catch (error) {
							callback(error);
						}
					});
				});
			},
		});
		config.optimization.minimizer('terser').tap(args => {
			const opts = args[0];
			opts.extractComments = true;

			for (const i in opts.terserOptions.compress) {
				opts.terserOptions.compress[i] = true;
			}

			return args;
		});
	},
});
