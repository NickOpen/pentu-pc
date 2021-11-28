const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
	runtimeCompiler:true,

	chainWebpack: (config) => {
			config.resolve.alias
					.set("@components", resolve('src/components'))
					.set('@assets', resolve('src/assets'))
					.set("@pages", resolve('src/pages'))
					.set('@rest', resolve('src/rest'))
					.set('@utils', resolve('src/utils'))
					.set('@config', resolve('src/config'))


			const svgRule = config.module.rule('svg')
			svgRule.uses.clear()
			svgRule.oneOf('inline')
					.resourceQuery(/inline/)
					.use('vue-svg-loader')
					.loader('vue-svg-loader')
					.end()
					.end()
					.oneOf('external')
					.use('file-loader')
					.loader('file-loader')
					.options({
												name: 'assets/[name].[hash:8].[ext]'
										})
	},
	configureWebpack: {
		output: {
			filename: '[name].[hash].js',
		}
	},
	outputDir: 'dist',
	pluginOptions: {
			'style-resources-loader': {
					preProcessor: 'less',
					patterns: [path.resolve(__dirname, 'src/assets/style/global.less')]
			}
	},

	devServer: {
		hot: true,
		proxy: {
			'/pentu/api': {
					target: 'http://localhost:8001',
					//target: 'https://wwww.pentu.nickshi.com:8001',
					ws: false, //是否代理 websocket
					changeOrigin: true,
					secure: false,
			},
			'/pentu/login': {
					target: 'http://localhost:8001',
					//target: 'https://wwww.pentu.nickshi.com:8001',
					ws: false, //是否代理 websocket
					changeOrigin: true,
					secure: false,
			}
		}
	}
}