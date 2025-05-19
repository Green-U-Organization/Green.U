export function webpack(config) {
	config.module.rules.push({
		test: /\.(png|jpg|gif)$/i,
		use: [
			{
				loader: "url-loader",
				options: {
					limit: 8192,
				},
			},
		],
	});
	return config;
}
export const images = {
	domains: ["localhost"],
};
