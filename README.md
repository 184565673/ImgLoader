# ImgLoader
图片延迟加载组件

# html中的图片设置
<img  class="lazy_img" _src="http://pic1.to8to.com/smallcase/1502/03/20150203_2a2eb4f24f51fbb540e8962cohozvjn2_284.jpg">
img添加上`lazy_img` `src`属性先换成`_src`


#调用方式通过seajs或者requirejs加载
```
var ImgLoader = require('ImgLoader');
imgloader = new ImgLoader({
	skip_invisible : true,  //如果图片未显示，则不加载
	showEffect : 'fadeIn'
});
imgloader.load();
```
