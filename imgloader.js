define('ImgLoader', function (require,exports,module) {
	
	var $ = require('jquery');

	/**
	 * @description             初始化
	 * @param  {object} option  配置参数
	 * @return {null}        
	 */
	function ImgLoader (options) {
		this.settings = $.extend({
			skip_invisible : true,   // {[boolean]} skip_invisible[可选，是否加载隐藏的图片]
			threshold : 0,			 // {[number]} skip_invisible[可选，决定图片加载当距离可视区距离]	
			showEffect : 'show'      // {[string]} showEffect[可选，图片显示时动画]
		}, options);
	} 

	ImgLoader.prototype = {
		/**
		 * @description             容器事件绑定，开始加载
		 * @param  {null} 
		 * @return {null}        
		 */
		load : function() {
			this.udpateFunc = bindAsEventListener(this.update, this)
			$(window).on('resize scroll', this.udpateFunc);
			this.udpateFunc();
		},

		/**
		 * @description             根据图片状态决定加载
		 * @param  {null} 
		 * @return {null}        
		 */
		update : function() {
			var _this = this;

			$('.lazy_img').each(function(index, img) {
				if (_this.settings.skip_invisible && !$(img).is(":visible")) {
                    			return;
                		}
                
                		_this.isInWindow(img) && _this.showImg(img);
			})
		},

		/**
		 * @description                    检测图片是否在可视区域
		 * @param  {[element]} img         需要检测的图片
		 * @return {[boolean]} true|false      
		 */
		isInWindow : function(img) {
			var offset 	= $(img).offset(),
                	docElem = document.documentElement,
                	docBody = document.body;
   
	            	if ( Math.max(docBody.scrollTop, docElem.scrollTop) + docElem.clientHeight >= offset.top - this.settings.threshold
	              		&& Math.max(docBody.scrollLeft, docElem.scrollLeft) + docElem.clientWidth >= offset.left - this.settings.threshold 
	              		&& offset.top + img.offsetHeight >= Math.max(docBody.scrollTop, docElem.scrollTop) - this.settings.threshold
	              		&& offset.left + img.offsetWidth >= Math.max(docBody.scrollLeft, docElem.scrollLeft) - this.settings.threshold ) {
	            		return true;
	            	}else {
	            		return false;
	        	 }
		},

		/**
		 * @description             显示图片
		 * @param  {[element]} img 需要显示的图片 
		 * @return {null}        
		 */
		showImg : function(img) {
			if(!$(img).hasClass('lazy_img')) {
				return;
			}

	    		switch(this.settings.showEffect) {
	    			case 'fadeIn' :
	    				$(img).css('opacity', 0);

	    				if (img.complete) {
	    					$(img).animate({opacity : 1}, 400);
	    				} else {
	    					img.onload = img.onerror = function() {
		    				img.onload = img.onerror = null;
		    				$(img).animate({opacity : 1}, 400);
		    			}
	    			}
	    			break;
	    		}
	    		$(img).removeClass('lazy_img').attr('src', $(img).attr('_src')).removeAttr('_src');
	    	
	    	}
	}

	var bindAsEventListener = function(fun, context) {
        	return function(event) {
        		return fun.call(context, (event || window.event));
        	}
    	};

	module.exports = ImgLoader;	
});
