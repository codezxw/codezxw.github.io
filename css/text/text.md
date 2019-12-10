# 文本

## direction

`direction`属性设置块级元素内部的文本阅读方向。

它的默认值是`ltr`（从左到右），适用于大部分语言。它还可以设成`rtl`（从右到左）。

```css
blockquote {
  direction: rtl;
}
```

一般采用 HTML 语言的`dir`属性控制文本阅读方向，而不是使用这个属性。

## text-align

`text-align`属性设置块级元素内部的文本对齐方式。

它可以取以下值。

- left：默认值，文本向左对齐
- right：右对齐
- center：居中对齐
- justify：两端对齐，除了最后一行是左对齐。
- inherit：继承父元素的值
- start：`direction`属性为从左到右时，为左对齐；从右到左时，为右对齐
- end：`direction`属性为从左到右时，为右对齐；从右到左时，为左对齐

## vertical-align

`vertical-align`设置一个元素与在同一条水平线上的其他元素如何对齐。这些元素需要都是`inline`。它可以取以下值。

- baseline：对齐父元素的基线，默认值
- length: 升高或降低特定的长度，可使用负值
- %：升高或降低`line-height`的百分比，不允许负值
- sub：设为下标
- super：设为上标
- top: 当前元素的顶部对齐最高元素的顶边
- text-top：当前元素的顶部对齐父元素字体的顶部
- middle：元素位于父元素的垂直中部
- bottom：当前元素的底部对齐本行最低元素的底部
- text-bottom：当前元素的底部，对齐父元素字体的底部
- initial：设置为默认值
- inherit：继承父元素的值

这个属性通常用于同一行的图标与文字的对齐。

```css
vertical-align: middle;
```

这个命令对设为`display: table-cell`的元素也有效，可以控制元素在单元格之中的垂直对齐方式。这时，一般使用`top`、`middle`和`bottom`等值。

## tab-size

`tab-size`属性设置 Tab 键的宽度，可以设置为整数（表示多少个空格），也可以设置为具体的长度单位。

```css
/* 整数植 */
tab-size: 4;
tab-size: 0;

/* 长度单位 */
tab-size: 10px;
tab-size: 2em;
```

该属性常用于`<pre>`标签之中。

```css
pre {-moz-tab-size: 16;} /* Code for Firefox */
pre {-o-tab-size: 16;} /* Code for Opera 10.6-12.1 */
pre {tab-size: 16;}
```

## word-wrap

`word-wrap`的正式名称是`overflow-wrap`，用于规定是否可以在一个词内部断行，避免溢出容器。

它可以取两个值。

- normal：只在可以断行的地方断行。
- break-word：可以在任意点断行，避免某个词过长，发生溢出。

## word-break

`word-break`用于规定是否可以在词内断行。

它可以取三个值。

- normal：使用浏览器默认的断行规则
- break-all：对于非 CJK 字符，可以任意字符之间断行。
- keep-all：对于 CJK 字符不允许换行。非 CJK 字符与`normal`相同。

## hyphens

浏览器打开连字号功能，需要两个步骤。第一个步骤是设置文本的语言。这将告诉浏览器使用哪个连字词典，正确的自动连字需要一个适合文本语言的连字词典。如果浏览器不知道文本的语言，即使打开 CSS 设置也不会自动连词。

设置网页语言，应该使用`<html>`标签的`lang`属性。

```html
<html lang="en">
```

CSS 里面使用自动连词，要开启`hyphens`属性。`hyphens`属性控制块级元素之中，文本是否显示连词线。

```css
hyphens: auto;
```

`hyphens`属性可以取以下三个值。

（1） none

`none`表示一个词不会在断行处被拆开，即断行处不会有连词线。

（2）manual

`manual`表示只有在一个词内部的字符表示可以有连词线时，才会在断行处拆开。断行处，会有连词线。

两个字符可以表示此处可以断行，并显示连词线，一个是`-`(U+2010)，表示此处可以有一个可见的断行，即使不在此处断行，这里也会有连词线显示；另一个是`U+00AD`，表示不可见的断行，HTML 文档里面可以用`&shy;`插入。

（3）auto

`auto`表示浏览器决定一个词是否可以在断行处拆开，以及是否会有连词线。

# text-decoration

文本可以附加装饰线（比如下划线），以下属性用来设置装饰线。

## text-decoration

`text-decoration`设置文本采用哪一种装饰线，主要有下划线（underline）、上划线（overline）和删除线（line-through）等类型。

```css
h3 {
  text-decoration: underline;
}
```

该属性可以取以下值。

- none：没有任何修饰
- underline：下划线，默认线宽`1px`
- overline：上划线，默认线宽`1px`
- line-through：删除线，默认线宽`1px`
- inherit：继承父元素的设置

多种装饰线可以同时存在。

```css
.multiple {
  text-decoration: underline overline line-through;
}
```

默认情况下，装饰线的颜色与文本的`color`属性一致。`text-decoration-color`属性可以修改颜色。

`text-decoration`属性还可以用作`text-decoration-style`和`text-decoration-color`的简写形式。

```css
.fancy-underline {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: red;

  /* 等同于 */
  text-decoration: underline wavy red;
}
```

## text-decoration-color

`text-decoration-color`设置文本的装饰线的颜色。

```css
a {
  text-decoration-color: #E18728;
}
```

## text-decoration-style

`text-decoration-style`设置文本的下划线（underline）、上划线（overline）和删除线（line-through）的样式。

```css
a {
  text-decoration-style: solid;
}
```

该属性支持以下样式。

- solid：单条直线
- double：双条直线
- dotted：多个点组成的直线
- dashed：多个短划线组成的直线
- wavy：波浪线

## text-decoration-line

`text-decoration-line`设置文本采用何种装饰线，与`text-decoration`单个值的写法相同。建议采用后者，因为浏览器的支持度更好。

```css
p {
  text-decoration-line: underline;
}
```

它的取值参考`text-decoration`。

## text-decoration-skip

`text-decoration-skip`设置文本的装饰线应该在哪里中断，主要用于改善文本被装饰以后的可读性。

```css
a {
  text-decoration-skip: ink;
}
```

上面代码中，下划线遇到英语字母`y`和`p`会中断，让它们较长的下划会更清晰地显示出来。

该属性可以取以下值。

- objects：默认值，装饰线遇到图片或其他`inline-block`对象时中断。
- none：装饰线不会有任何中断，包括遇到行内对象。
- spaces：装饰线在空格、断词处中断。
- ink：装饰线遇到有笔画下降或上升的字母时中断。
- edges：装饰线在内容开始后和结束前都收缩一点，主要用于多个连续的装饰线，可以看上去连成一条。
- box-decoration：装饰线在继承的 margin、border 和 padding 处中断。

# 空格

## 基本规则

HTML 代码的空格通常会被浏览器忽略。

![](https://www.wangbase.com/blogimg/asset/201807/bg2018073106.jpg)

```html
<p>◡◡hello◡◡world◡◡</p>
```

上面是一行 HTML 代码，文字的前部、内部和后部各有两个空格。为了便于识别，这里使用半圆形符号`◡`表示空格。

浏览器的输出结果如下。

```html
hello world
```

可以看到，文字的前部和后部的空格都会忽略，内部的连续空格只会算作一个。这就是浏览器处理空格的基本规则。

如果希望空格原样输出，可以使用`<pre>`标签。

```html
<pre>◡◡hello◡◡world◡◡</pre>
```

另一种方法是，改用 HTML 实体`&nbsp;`表示空格。

```html
<p>&nbsp;&nbsp;hello&nbsp;&nbsp;world&nbsp;&nbsp;</p>
```

## 空格字符

HTML 处理空格的规则，适用于多种字符。除了普通的空格键，还包括制表符（`\t`）和换行符（`\r`和`\n`）。

浏览器会自动把这些符号转成普通的空格键。

```html
<p>hello
world</p>
```

上面代码中，文本内部包含了一个换行符，浏览器视同为空格，输出结果如下。

```html
hello world
```

所以，文本内部的换行是无效的（除非文本放在`<pre>`标签内）。

```html
<p>hello<br>world</p>
```

上面代码使用`<br>`标签显式表示换行。

## CSS 的 white-space 属性

HTML 语言的空格处理，基本上就是直接过滤。这样的处理过于粗糙，完全忽视了原始文本内部的空格可能是有意义的。

CSS 提供了一个 white-space 属性，可以提供更精确一点的空格处理方式。该属性共有六个值，除了一个通用的`inherit`（继承父元素），下面依次介绍剩下的五个值。

###  white-space: normal

`white-space`属性的默认值为`normal`，表示浏览器以正常方式处理空格。

```html
<p>◡◡hellohellohello◡hello
world
</p>
```

上面代码中，文本前部有两个空格，内部有一个长单词和一个换行符。

然后，容器`<p>`指定一个比较小的宽度。为了便于识别，背景色设为红色。

```css
p {
  width: 100px;
  background: red;
}
```

显示效果如下图。

![](https://www.wangbase.com/blogimg/asset/201807/bg2018073101.png)

可以看到，文首的空格被忽略。由于容器太窄，第一个单词溢出容器，然后在后面一个空格处换行。文本内部的换行符自动转成了空格。

###  white-space: nowrap

`white-space`属性为`nowrap`时，不会因为超出容器宽度而发生换行。

```css
p {
  white-space: nowrap;
}
```

显示效果如下图。

![](https://www.wangbase.com/blogimg/asset/201807/bg2018073102.png)

所有文本显示为一行，不会换行。

###  white-space: pre

`white-space`属性为`pre`时，就按照`<pre>`标签的方式处理。

```css
p {
  white-space: pre;
}
```

显示效果如下图。

![](https://www.wangbase.com/blogimg/asset/201807/bg2018073103.png)

上面结果与原始文本完全一致，所有空格和换行符都保留了。

###  white-space: pre-wrap

`white-space`属性为`pre-wrap`时，基本还是按照`<pre>`标签的方式处理，唯一区别是超出容器宽度时，会发生换行。

```css
p {
  white-space: pre-wrap;
}
```

显示效果如下图。

![](https://www.wangbase.com/blogimg/asset/201807/bg2018073104.png)

文首的空格、内部的空格和换行符都保留了，超出容器的地方发生了折行。

###  white-space: pre-line

`white-space`属性为`pre-line`时，意为保留换行符。除了换行符会原样输出，其他都与`white-space:normal`规则一致。

```css
p {
  white-space: pre-line;
}
```

显示效果如下图。

![](https://www.wangbase.com/blogimg/asset/201807/bg2018073105.png)

除了文本内部的换行符没有转成空格，其他都与`normal`的处理规则一致。这对于诗歌类型的文本很有用。

##  参考链接

- [When does white space matter in HTML?](https://medium.com/@patrickbrosset/when-does-white-space-matter-in-html-b90e8a7cdd33)，by Patrick Brosset
- [white-space](https://css-tricks.com/almanac/properties/w/whitespace/)，by Sara Cope 
- [text-decoration](https://css-tricks.com/almanac/properties/t/text-decoration/), by Sara Cope
- [text-decoration-skip](https://css-tricks.com/almanac/properties/t/text-decoration-skip/), by Marie Mosley
- [All you need to know about hyphenation in CSS](http://clagnut.com/blog/2395), Richard Rutter
