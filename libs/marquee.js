/**
 * @desc   文本纵向滚动插件
 * @since  2018-01-16
 * @author xxx
 * @element
 * 	<div id="J_scroll_body">
 * 		<ul>
 * 			<li>滚动文本1</li>
 * 			<li>滚动文本2</li>
 * 			<li>滚动文本3</li>
 * 		<ul>
 * 		
 * 	</div>
 * 	
 * @demo
 *  var marquee = new Marquee({
		dom:"#J_scroll_body",
		visible:5,
		speed:20
	});
	marquee.init();
 */

(function(global, name, factory) {
    'use strict';
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        global[name] = factory.apply(this);

    }
})(this, "Marquee", function() {

    // to do code
    this.requestAnimFrame = (function() {
        return this.requestAnimationFrame || this.webkitRequestAnimationFrame || this.mozRequestAnimationFrame || this.oRequestAnimationFrame || this.msRequestAnimationFrame ||
            function(callback) {
                return this.setTimeout(callback, 1000 / 60);
            };
    })();

    this.cancelAnimationFrame = (function(){
    	return this.cancelAnimationFrame || this.mozCancelAnimationFrame || this.clearTimeout;
    })();


    function Marquee(ops) {
        this.dom = document.querySelector(ops.dom);
        this.visible = ops.visible;
        this.speed = ops.speed || 40;
        this.initY = 0;
        this.scrollList = this.dom.getElementsByTagName("ul")[0];
        this.scrollListReadyHeight = this.scrollListHeight();
        this.timer = null;;
    }

    Marquee.prototype.init = function() {
        if (this.scrollListReadyHeight <= this.dom.clientHeight) return;
        this.copyItem();
        this.scroll();
        this.mouseHanld();
    };


    Marquee.prototype.scroll = function(argument) {
        var _height = this.scrollListHeight();
        var timestamp = new Date().getTime();
        this.timer = requestAnimFrame(scrollInterval.bind(this))

        function scrollInterval(argument) {
            var now = new Date().getTime();
            if (now - timestamp >= this.speed) {
                timestamp = new Date().getTime();
                this.initY += 1;
                this.transform(this.initY);
                this.reduction();
            }
            this.timer = requestAnimFrame(scrollInterval.bind(this));
        }
    };

    Marquee.prototype.reduction = function(argument) {
        if (this.initY >= this.scrollListReadyHeight) {
            this.initY = 0;
        }
    };

    Marquee.prototype.transform = function(y) {
        this.postCSS(this.scrollList, 'transform', "translateY(-" + y + "px)");
        this.scrollList.style.willChange = "transform";
    }

    Marquee.prototype.mouseHanld = function() {
        var _self = this;
        this.dom.addEventListener("mouseenter", function() {
            cancelAnimationFrame(_self.timer);
        }, false);

        this.dom.addEventListener("mouseleave", function() {
            _self.scroll();
        }, false);
    }


    Marquee.prototype.scrollListHeight = function() {
        return this.scrollList.clientHeight;
    }

    Marquee.prototype.copyItem = function() {
        var itemList = this.dom.getElementsByTagName("li");
        for (var i = 0; i < itemList.length; i++) {
            if (i < this.visible) {
                var copyNode = itemList[i].cloneNode(true);
                copyNode.className += " clone";
                this.scrollList.appendChild(copyNode);
            }
        }
    };

    Marquee.prototype.postCSS = function(dom, name, value) {
        dom.style["-webkit-" + name] = value;
        dom.style["-ms-" + name] = value;
        dom.style["-moz-" + name] = value;
        dom.style["-o-" + name] = value;
        dom.style[name] = value;
    }

    return Marquee;
});