const { defineConfig } = require('@vue/cli-service')

const webpack = require("webpack")

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//关闭语法检查

  // 添加bootstrap引入的
  // 配置插件参数
	configureWebpack: {
		plugins: [
			// 配置 jQuery 插件的参数
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				Popper: ['popper.js', 'default']
			})
		]
	}

  
})