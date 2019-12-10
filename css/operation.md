# 基本操作

## 垂直置中

（1）方法一

原理：子元素的 top, right, bottom, left, margin, and padding属性，针对的是父元素的维度；transform针对的子元素本身的维度。

父元素、子元素需有明确高度，不能是auto。

```css

.children{
	background: #ffdb4c;
	height: 300px;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
}

```

（2）方法二

```css

.parent { position: relative; }

.child {
    position: absolute;

    left: 50%;
    top: 50%;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

```

（3）方法三

```css
.parent { display: table; }

.child {
  display: table-cell;
  vertical-align: middle;
}
```

（5）行内置中

```css
.parent { line-height: 500px; }

.child {
    display: inline-block;
    vertical-align: middle;
}
```

（6）方法四（只对图片有效）

```css
.thumb {
  background-image: url(my-img.jpg);
  background-position: center;
  /* is this supported by IE8? I don't know */
  background-size: cover;

  height: 0;
  overflow: hidden;
  padding-bottom: 50%;
  width: 50%;
}
```

（7）方法五

```css
.children {
  margin-top: calc(50% - 12.5%);
}
```

（8）方法六

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

（9）参考链接

- [Alignment and sizing in CSS](https://github.com/timseverien/timseverien.github.io/blob/master/_posts/2013-11-25-css-alignment-and-sizing.md)

## 清理浮动

```css

.clearfix:after{
  visibility:hidden;
  display:block;
  font-size:0;
  content:" ";
  clear:both;
  height:0;
}

.clearfix{
  zoom:1; /* for IE6 IE7 */
}

```

# 图像处理

## filter

`filter`命令支持以下函数。

- url()：使用svg滤镜
- blur()：高斯模糊
- brightness()：亮度
- contrast()：对比度
- drop-shadow()：阴影
- grayscale()：灰度
- hue-rotate()：色调旋转
- invert()：色调分离
- opacity()：透明
- saturate()：饱和度
- sepia()：加入褐色色调

```css
filter: saturate(200%);
filter: sepia(100%);
filter: opacity(50%);
filter: url(resources.svg#c1);
filter: blur(5px);
filter: invert(100%);
filter: hue-rotate(90deg);
filter: brightness(0.5);
filter: contrast(200%);
filter: grayscale(50%);
filter: grayscale(0.5) blur(10px);
filter: drop-shadow(16px 16px 10px black);
```
# 常用组件

## 对话框

显示屏幕居中的对话框。

```html
<div id="dialog">
  <p>I am the dialog's content</p>
  <button type="button">close dialog</button>
</div>
```

```css
#dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 200px;
  transform: translate3d(-50%,-50%,0);
  background: white;
  border: 100% solid rgba(0, 0, 0, 2.5);
}

#dialog:before {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 999;

  /* fade in */
  transition: opacity 0.2s ease-in-out;
}

#dialog[hidden] {
  /*
    [hidden] usually sets display:none, which we
    need to revert in order to allow animations
  */
  display: block;
  /*
    actually hide the element,
    making its contents unaccessible
  */
  visibility: hidden;
  /*
    make sure the element is out of viewport
  */
  transform: translate3d(0px, -1px, 0px) scale(0);
  /*
    delay transform until animations are done
  */
  transition:
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}
```
# 常用功能

## 置中

`transform`方法。

容器设置相对定位。

```css
.container {
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
```

元素的左上角先定位在容器中央，然后向西北方向移动自身的`50%`。

```css
.container div {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
}
```

## 隐藏元素

彻底隐藏一个元素。

```css
[hidden] {
  display: none;
}
```

在视觉上隐藏一个元素。

```css
.visuallyhidden {
  position: absolute;

  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;

  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
```
# 函数

CSS 提供一些函数，方便操作。

## minmax

`minmax`提供一个长度范围，不小于较小值，不大于较大值。

```css
minmax( min, max )
```

如果第二个参数`max`小于第一个参数`min`，那么`max`会被忽略，等同于将长度设置为`min`。

```css
minmax(400px, 50%)
minmax(30%, 300px)
```

网格布局中，`max`也允许设置为比例因子`fr`，但`min`不能设置为`fr`。

```css
minmax(200px, 1fr)
```

网格布局中，还可以使用关键字`max-content`和`min-content`，分别表示最大的和最小的可分配宽度。

```css
minmax(100px, max-content)
minmax(min-content, 400px)
```

关键字`auto`在`max`位置等同于`max-content`，在`min`位置等同于`min-content`。

```css
minmax(max-content, auto)
minmax(auto, 300px)
minmax(min-content, auto)
```

## image-set()

`image-set()`用来选取符合响应式条件的图片。

```css
background-image: image-set( "foo.png" 1x, "foo-2x.png" 2x);
```

# 变形

`transform`命令用于元素的变形，它有多种设置。

```css
transform: scaleX(-1);
```

上面命令设置元素的`x`坐标沿水平轴翻转，`y`坐标不变。`scaleX(-1)`会起到水平翻转的效果。



## 参考链接

- [Hiding DOM elements](https://allyjs.io/tutorials/hiding-elements.html)
- [Accessible dialog tutorial](https://allyjs.io/tutorials/accessible-dialog.html)
