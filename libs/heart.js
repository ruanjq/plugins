


/**
 *
 * canvas 爱心❥(^_-)，不依赖任何插件，引入snowflake.js 即可，调用方式
 * 
 *  Heart({
        canvasSelector:'#canvas',   // canvas dom 选择器
        height:768,                 // canvas 高度
        width:1200,                 // canvas 宽度
        heartNum:100            // 爱心总数
    });
 *
 *  Heart()   window 的全局函数。

 */

(function() {
var moduleName = (function(window) {
    var fps = 500;
    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;
    var delayCb = function(callback) {
        now = Date.now();
        delta = now - then;
        // 时间差
        if (delta > interval) {
            then = now - (delta % interval);
            if (typeof callback === "function") callback();
        }
    }
    var snowflake_arr = [];


    var requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                return window.setTimeout(callback, 1000 / 60);
            };
    }();

    window.Heart = function(ops) {
        var ops = ops || {
            canvasSelector: null,
            height: 600,
            width: 800,
            heartNum: 100
        }
        if (!ops.canvasSelector) {
            console.error("canvas is not defined");
            return;
        }

        var canvas = document.querySelector(ops.canvasSelector);
        canvas.width = ops.width;
        canvas.height = ops.height;
        if (!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        // 初始化爱心总数量
        for (var i = 0; i < ops.heartNum; i++) {
            var sf = new Heart(ctx);
            snowflake_arr.push(sf);
        }

        requestAnimFrame(snowing); // 

        function snowing() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimFrame(snowing);
            delayCb(function() {
                for (var i = 0; i < snowflake_arr.length; i++) {
                    var ssItem = snowflake_arr[i];
                    ssItem.falling();
                }
            });
        }
    }




    /**
     * [ 爱心构造函数 ]
     */
    function Heart(ctx) {


        this.setImgSize();

        // x 坐标
        this.x = this.setX();

        // y 坐标
        this.y = this.setY();

        // 初始化x坐标
        this.initx = this.x;

        // x轴方向偏移速度
        this.vx = 0.3;
        

        // 爱心飘落x 坐标最大偏移范围
        this.x_range_max = 50;

        this.ctx = ctx;


        this.setSpeed();
    }

    Heart.prototype.setX = function(){
        var x = Math.floor(Math.random() * canvas.width);
        // 超过边界
        if(x + this.wx >= canvas.width){
            x = x - this.wx;
        }
        if(x >= canvas.width / 2){
            this.direction = "left";
        }else{
            this.direction = "right";
        }
        return x;
    }


    Heart.prototype.setY = function(){
        var y = Math.floor(Math.random() * canvas.height);
        // 超过边界
        if (y + this.wx >= canvas.height) {
            y = y - this.wx;
        }
        return y; 
        // return (Math.floor(Math.random() * 20) + 15) + canvas.height;
    };




    /**
     * [ 爱心重置 ]
     * @return {[type]} [description]
     */
    Heart.prototype.reset = function() {
        this.x = this.setX();
        this.y = (Math.floor(Math.random() * 20) + 15) + canvas.height;
        return this;
    };

    /**
     * [ 设置爱心大小 随机数 [10,20] ]
     * @param {[type]} wx [description]
     */
    Heart.prototype.setImgSize = function() {
        this.wx = (Math.floor(Math.random() * 20) + 15);
        return this;
    };

    // 设置当前爱心的运动速度基数,根据图片大小设置，图片越大，速度越快
    Heart.prototype.setSpeed = function() {
        this.speed = this.wx * 0.04;
        return this;
    }


    /**
     * [ 更新图像画布 ]
     * @param  {[type]} speed [description]
     * @return {[type]}       [description]
     */
    Heart.prototype.falling = function(speed) {
        var speed = this.speed || 1;


        
        // 爱心飘落右偏移范围
        if (this.direction == "left") {
            this.x = this.x - this.vx; 
        } else { // 左偏移范围
            this.x = this.x + this.vx;
        }



        // 飘落顶部
        this.y = this.y - 1 * speed;

        // 爱心飘落到底部重新生成
        if (this.y <= -this.wx) {
            this.reset();
        }
        this.draw(this.ctx, this.img);
        return this;
    };



    Heart.prototype.draw = function(t) {
        t.fillStyle = "rgba(255, 255, 255, 0.25)";
        // t.globalAlpha = 0.5;
        var x = this.x;
        var y = this.y;
        var width = this.wx;
        var height = this.wx;
        var num1 = 50;
        var num2 = 56;
        var num3 = 25;
        var num4 = 38;

        
        t.save();
        t.beginPath();
        t.moveTo(x + getPercentage(width, num1), y + getPercentage(height, num3));
        t.bezierCurveTo(x + getPercentage(width, num1), y, x, y, x, y + getPercentage(height, num4));
        t.bezierCurveTo(x, y + getPercentage(height, num2), x + getPercentage(width, num4), y + height, x + getPercentage(width, num1), y + height);
        t.bezierCurveTo(x + getPercentage(width, num2), y + height, x + width, y + getPercentage(height, num2), x + width, y + getPercentage(height, num4));
        t.bezierCurveTo(x + width, y, x + getPercentage(width, num1), y, x + getPercentage(width, num1), y + getPercentage(height, num3));
        t.fill();
        t.restore();
        function getPercentage(x, y) {
            return (x * y) / 100;
        }
        return this;
    }

})(window);
if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = moduleName;
} else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(function() { return moduleName; });
} else {
    this.moduleName = moduleName;
}
}).call(function() {
return this || (typeof window !== 'undefined' ? window : global);
});