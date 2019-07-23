
(function() {
    var moduleName = (function(window) {
        var fps = 500;
        var now;
        var insertParent;
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
        
        var canvas = createCanvas();

        var requestAnimFrame  = function(){
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                    return window.setTimeout(callback, 1000 / 60);
                };
        }();

        window.snowflake = function(ops){
            var ops = {
                insert:ops.insert || "body",
                snowflakeNum:ops.snowflakeNum || 100,
                hoverSnowflakeNum:ops.hoverSnowflakeNum || 0
            }
            insertParent = document.querySelector(ops.insert);
            canvas.width = insertParent.clientWidth;
            canvas.height = insertParent.clientHeight;
            insertParent.appendChild(canvas);
            var ctx = canvas.getContext("2d");
            // 初始化雪花总数量
            for (var i = 0; i < ops.snowflakeNum; i++) {
                var sf = new Snowflake(ctx);
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


            if(ops.hoverSnowflakeNum != 0){
            	// 鼠标滑过的间距
            	var mouseDistanceMin = 30;
		        var cur_position = [0, 0];
		        insertParent.addEventListener("mousemove", function(e) {
		            var critical = 0;
		            /* if(document.documentElement.clientWidth <= 1366){
		                critical = 0;
                    }*/
                   
		            var pageY = e.pageY - getElementTop(insertParent);
		            var pageX = e.pageX - insertParent.offsetLeft -critical;
		            if(snowflake_arr.length >= (ops.hoverSnowflakeNum + ops.snowflakeNum)){
   						insertParent.removeEventListener("mousemove",function(){});
		            	return;
		            }
		            if (cur_position[0] === 0 || Math.abs(pageX - cur_position[0]) >= mouseDistanceMin || Math.abs(pageY - cur_position[1]) >= mouseDistanceMin) {
		                cb(pageX, pageY);
		                cur_position = [pageX, pageY];
		            }

		            function cb(x,y) {
		                var sf = new Snowflake(ctx,x,y);
		                snowflake_arr.push(sf);
		            }
		        });
            }
        }


        function createCanvas(){
        	var canvas = document.createElement("canvas");
        	canvas.id = "snowflake";
        	return canvas;
        }

        function getElementTop(elem){

            var elemTop=elem.offsetTop;//获得elem元素距相对定位的父元素的top
            elem=elem.offsetParent;//将elem换成起相对定位的父元素
            while(elem!=null){//只要还有相对定位的父元素 
            
                /*获得父元素 距他父元素的top值,累加到结果中 */
                
                elemTop+=elem.offsetTop;
                //再次将elem换成他相对定位的父元素上;
                elem=elem.offsetParent;
            }
            return elemTop;
        }
            
      


        /**
         * [ 雪花构造函数 ]
         */
        function Snowflake(ctx, x, y) {
            // x 坐标
            this.x = x || Math.floor(Math.random() * canvas.width);

            // y 坐标
            this.y = y || Math.floor(Math.random() * canvas.height);

            // 初始化x坐标
            this.initx = this.x;

            // x轴方向偏移速度
            this.vx = 0.5;

            // 雪花图像初始宽度
            this.wx = 15;

            // 雪花透明度
            this.opacity = 1;

            // 雪花飘落x 坐标最大偏移范围
            this.x_range_max = 30;

            this.ctx = ctx;
            this.draw(ctx).setImgSize().setSpeed();

        }

       

        /**
         * [ 雪花重置 ]
         * @return {[type]} [description]
         */
        Snowflake.prototype.reset = function() {
            this.y = -48;
            this.opacity = 1;
            this.x = Math.floor(Math.random() * canvas.width); //[0,1) 
            return this;
        };

        /**
         * [ 设置雪花大小 随机数 [10,20] ]
         * @param {[type]} wx [description]
         */
        Snowflake.prototype.setImgSize = function() {
            this.wx = (Math.floor(Math.random() * 10) + 1);
            return this;
        };

        // 设置当前雪花的运动速度基数,根据图片大小设置，图片越大，速度越快
        Snowflake.prototype.setSpeed = function() {
            this.speed = this.wx * 0.1;
            return this;
        }


        /**
         * [ 更新图像画布 ]
         * @param  {[type]} speed [description]
         * @return {[type]}       [description]
         */
        Snowflake.prototype.falling = function(speed) {
            var speed = this.speed || 1;

            // 雪花飘落右偏移范围
            if (this.x - this.initx >= this.x_range_max) {
                this.x = this.x - this.vx;
            } else { // 左偏移范围
                this.x = this.x + this.vx;
            }
            // 飘落距离
            this.y = this.y + 1.5 * speed;

            // 距离底部100 像素透明度减小
            if (canvas.height - this.y <= 40) {
                if (this.opacity >= 0.1) {
                    this.opacity -= 0.05;
                }
            }

            // 雪花飘落到底部重新生成
            if (this.y >= canvas.height) {
                this.reset();
            }
            this.draw(this.ctx, this.img);
            return this;
        };

        /**
         * [绘制雪花图像]
         * @param  {[type]} ctx [ 上下文文本对象 ]
         * @param  {[type]} img [ 绘制图像 ]
         * @return {[type]}     [description]
         */
        /* Snowflake.prototype.draw = function(ctx, img) {
             ctx.globalAlpha = this.opacity;
             ctx.drawImage(img, this.x, this.y, this.wx, this.wx);
             ctx.restore();
             return this;
         };*/

        /**
         * [ 径向渐变绘制雪花图形 ]
         * @param  {[type]} t [description]
         * @return {[type]}   [description]
         */
        Snowflake.prototype.draw = function(t) {
            t.globalAlpha = this.opacity;
            var i = t.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.wx);
            i.addColorStop(0, "rgba(255, 255, 255, 0.9)"),
                i.addColorStop(.5, "rgba(255, 255, 255, 0.5)"),
                i.addColorStop(1, "rgba(255, 255, 255, 0)"),
                t.save(),
                t.fillStyle = i,
                t.beginPath(),
                t.arc(this.x, this.y, this.wx, 0, 2 * Math.PI),
                t.fill(),
                t.restore();
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