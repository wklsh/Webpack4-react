module.exports = {
	plugins: {
		autoprefixer: {
			browsers: ["defaults"]
		},
		cssnano: {
			zindex: false,
			reduceIdents: false
		},

		"postcss-flexbugs-fixes": {},

		"css-mqpacker": {}
	}
};
