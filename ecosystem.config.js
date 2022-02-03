module.exports = {
	apps: [
		{
			name: 'Softwareschmiede',
			script: 'serve -s dist --ssl-key ./privkey.pem --ssl-cert ./fullchain.pem',
			env: {
				NODE_ENV: 'development',
				PORT: 3000,
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			env_production: {
				NODE_ENV: 'production',
				PORT: 3000,
			},
		},
	],
};
