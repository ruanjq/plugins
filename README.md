# [一些实用创意的小工具插件集](https://ruanjq.github.io/plugins/)



- ### [1:基于canvas 绘制动态时钟](https://ruanjq.github.io/plugins/clock.html)

![canvas 时钟](https://raw.githubusercontent.com/ruanjq/plugins/master/images/clock.gif)



- ### [2:canvas+svg 绘制生日蛋糕表白爱心](https://ruanjq.github.io/plugins/birthday.html)

![绘制生日蛋糕表白爱心](https://raw.githubusercontent.com/ruanjq/plugins/master/images/heart.png)




- ### [3:canvas 圣诞节雪花效果](https://ruanjq.github.io/plugins/snowflake.html)

![圣诞节雪花效果](https://raw.githubusercontent.com/ruanjq/plugins/master/images/snowflake.png)

#### 调用示例
```javascript
var snowflakeConfig = {
	insert:"#js_christmas",
	snowflakeNum:50,
	hoverSnowflakeNum:150
}
window.onload = function(){
	snowflake(snowflakeConfig);
}
```

```html
<div class="canvas-wrap" id="js_christmas"></div>
```

### snowflake 参数说明
|属性名称|类型|是否可选|说明|
|:--------:|:-----:|:----:|:----:|:----:|
|insert|string|必填|父容器id 选择器|
|snowflakeNum|number|必填|初始化雪花数量|
|hoverSnowflakeNum|number|必填|鼠标悬浮最大飘落的雪花数量|
                    




<br>
- ### [4:原生js 瀑布流布局插件](https://ruanjq.github.io/plugins/masonry.html)

![原生js 瀑布流布局插件](https://raw.githubusercontent.com/ruanjq/plugins/master/images/masonry.png)

#### 调用示例
```javascript
Marsonry({
	containerId:'J_masonry_list',
	selectorItem:'.masonry-item',
	itemMargin:20,
	resize:true,
	after:function(dom){
		// complete to do
	}
});
```
```html
<div class="masonry-list" id="J_masonry_list">
	<ul>
    <li class="masonry-item masonry-item-1">1</li>
    <li class="masonry-item masonry-item-2">2</li>
    <li class="masonry-item masonry-item-3">3</li>
    <li class="masonry-item masonry-item-4">4</li>
    <li class="masonry-item masonry-item-5">5</li>
	</ul>
</div>
```
                    
### Marsonry 参数说明
|属性名称|类型|是否可选|说明|
|:--------:|:-----:|:----:|:----:|:----:|
|containerId |string|必填|父容器id 选择器|
|selectorItem|string|必填|瀑布流子项选择器|
|itemMargin|number|可选|左右边距|
|resize|boolean|可选|resize 事件是否重新调整布局|
|after|function|可选|渲染完成的回调函数|
                    


<br>
- ### [5:原生js 抽奖列表滚动插件](https://ruanjq.github.io/plugins/marquee.html)

![原生js 抽奖列表滚动插件](https://raw.githubusercontent.com/ruanjq/plugins/master/images/marquee.gif)

#### 调用示例
```javascript
var marquee = new Marquee({
	dom:"#J_scroll_body",
	visible:5,
	speed:20
	});
marquee.init();
```

```html
<div class="srcoll-body" id="J_scroll_body">
	<ul>
    <li>滚动内容1</li>
    <li>滚动内容2</li>
    <li>滚动内容3</li>
    <li>滚动内容4</li>
    <li>滚动内容5</li>
    <li>滚动内容6</li>
    <li>滚动内容7</li>
	</ul>
</div>
```

### Marquee 参数说明
|属性名称|类型|是否可选|说明|
|:--------:|:-----:|:----:|:----:|:----:|
|dom|string|必填|父容器id 选择器|
|visible|number|必填|可视高度区域内看到的行数|
|speed|number|必填|滚动速度，数值越大，滚动越慢|
                    


<br>
- ### [6:未完，待续.......](https://ruanjq.github.io/plugins/index.html)




