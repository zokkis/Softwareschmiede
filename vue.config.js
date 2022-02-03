const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: true,
	productionSourceMap: false,
	chainWebpack: config => {
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
