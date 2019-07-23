/** 
     * @since   2017-09-05
     * @author  ruanjq
     * @desc    [瀑布流布局插件]
     * @demo
     *
     *  
     *  Marsonry({
            containerId:'J_masonry_list',
            selectorItem:'.masonry-item',
            itemMargin:20,
            resize:true,
            after:function(dom){
                // complete to do
            }
        });

        <div class="masonry-list" id="J_masonry_list">
            <ul>
                <li class="masonry-item masonry-item-1">1</li>
                <li class="masonry-item masonry-item-2">2</li>
                <li class="masonry-item masonry-item-3">3</li>
                <li class="masonry-item masonry-item-4">4</li>
                <li class="masonry-item masonry-item-5">5</li>
                <li class="masonry-item masonry-item-6">6</li>
                <li class="masonry-item masonry-item-7">7</li>
                <li class="masonry-item masonry-item-8">8</li>
                <li class="masonry-item masonry-item-9">9</li>
                <li class="masonry-item masonry-item-10">10</li>
                <li class="masonry-item masonry-item-11">11</li>
                <li class="masonry-item masonry-item-12">12</li>
                <li class="masonry-item masonry-item-13">13</li>
                <li class="masonry-item masonry-item-14">14</li>
            </ul>
        </div>
     *
     */
;
(function() {
    var moduleName = (function(window) {
        function Marsonry(options) {
            this.options = {
                containerId: options.containerId,
                selectorItem: options.selectorItem,
                itemMargin: 0 || parseInt(options.itemMargin),
                after: options.after
            }
            this.col = 0;
            this.elem = document.getElementById(this.options.containerId);
            this.setStyle("position", "relative");
        }

        Marsonry.prototype = {
            init: function() {


                this.colHeight = [];

                this.AllItem = this.elem.querySelectorAll(this.options.selectorItem);

                // 获取列数
                this.col = Math.floor(this.elem.clientWidth / (parseInt(this.AllItem[0].offsetWidth) + this.options.itemMargin));
                this.AllItem.forEach(_callBack.bind(this));

                function _callBack(item, index) {
                    this.setPositon(item, index);
                }
                return this;
            },
            setPositon: function(elem, index) {
                var size = {
                    width: elem.offsetWidth,
                    height: elem.offsetHeight
                }
                var p = { left: 0, top: 0 }

                // 非最左边
                if (index % this.col != 0) {
                    p.left = (index % this.col) * (size.width + this.options.itemMargin);
                }

                // 非第一行
                if (index >= this.col) {
                    var disMin = this.getDistanceTopMin(elem);
                    p.left = (disMin.i % this.col) * (size.width + this.options.itemMargin);
                    p.top = disMin.distanceTop;
                    this.updeteColHeight(disMin.i, size.height);
                } else {
                    this.colHeight.push(elem.offsetHeight + this.options.itemMargin)
                }
                // console.log( this.colHeight);
                elem.style.position = "absolute";
                elem.style.top = p.top + "px";
                elem.style.left = p.left + "px";

                if (index == this.AllItem.length - 1) {
                    this.complete();
                }
            },
            getDistanceTopMin: function(elem) {
                // 找出距离顶部最小的位置
                var minVal = Math.min.apply(null, this.colHeight)
                return {
                    i: this.colHeight.indexOf(minVal),
                    distanceTop: minVal
                }
            },
            updeteColHeight(i, height) {
                this.colHeight[i] += height + this.options.itemMargin;
            },
            complete: function() {
                var maxVal = Math.max.apply(null, this.colHeight);
                this.setStyle("height", maxVal + "px");
                this.options.after(this);
            },
            setStyle: function(attr, val) {
                this.elem.style[attr] = val;
                return this;
            }
        }

        window.Marsonry = function(options) {
            var masonry = new Marsonry(options);
            if (options.resize === true) {
                window.onresize = function() {
                    masonry.init();
                }
            }
            return masonry.init();
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