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
                    

### 主要参数说明
|属性名称|类型|是否可选|默认值|说明|
|:--|:--|:--|:--:|:--|
|id|`string`|必填|-|插件编号|
|type|`string`|必填|-|插件类型，必填`SendToMessenger`|
|pageId|`string`|选填|-|当你需要此插件和初始化时设置的页面编号不同时，填入此项|
|color|`string`|选填|`'blue'`|主题颜色，待选值为`'blue' \| 'white'`|
|size|`string`|选填|`'large'`|插件大小，待选值为`'standard' \| 'large' \| 'xlarge'`|
|enforceLogin|`boolean`|选填|`false`|如果为`true`，则点击该按钮时，已登录用户也必须重新登录|
|ctaText|`string`|选填|-|显示在按钮中的文本，具体内容见下面的列表|
|position|`function`|选填|-|插件插入页面位置，当你无法在页面中添加对应插件编号的元素时可以使用此函数来定位，插件将会添加在该函数返回元素的后面。|
|message|`object` \| `function`|选填|-|点击按钮后向后端发送的数据|
|click|`function`|选填|-|点击按钮的回调函数。注：此回调和后端发送消息是相互独立的，不存在先后顺序。如果您还未登录 Facebook，点击此按钮也会立即触发此事件。|
|login|`function`|选填|-|用户登录或者是切换登录账号成功时触发此事件。|
|notYou|`function`|选填|-|用户点击插件下方`not_you`按钮时触发此事件。|
|rendered|`function`|选填|-|渲染完成的回调函数|



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




