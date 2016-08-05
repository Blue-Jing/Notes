# Canvas画布
### 声明
> ``<canvas>Canvas画布</canvas>``

```javascript
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
```

---

### 颜色、样式、阴影

属性              | 描述
:------           | :------:
**fillStyle**     | 填充颜色(样式)
**strokeStyle**   | 描边颜色(样式)
**shadowColor**   | 阴影颜色(样式)
**shadowBlur**    | 阴影模糊级别
**shadowOffsetX** | 阴影水平偏移量
**shadowOffsetY** | 阴影垂直偏移量
**globalAlpha**   | 透明度 (0.0-1.0)

> **方法(渐变):**
> * ``createPattern(element, repeat)``  
>
>   重复指定元素：repeat(平铺)、repeat-x(水平)、repeat-y(垂直)、no-repeat(不重复)  
>
> * ``createLinearGradient(x0,y0, x1,y1)``  
>
>   线性渐变：坐标0到坐标1之间  
>
> * ``createRadialGradient(x0,y0,r0, x1,y1,r1)``  
>
>   径向渐变：圆0到圆1之间  
>
> * ``addColorStop(stop, color)``  
>
>   渐变位置的颜色：stop(0-1之间)、color(当前位置的颜色)  

---

### 线条样式

属性              | 描述
:------           | :------:
**lineCap**       | 端点样式 (``butt``  平直 \| ``round`` 圆帽 \| ``square`` 方帽)
**lineJoin**      | 拐角类型 (``miter`` 尖角 \| ``round`` 圆角 \| ``bevel``  平角)
**lineWidth**     | 线条宽度
**miterLimit**    | 两线交汇处内角和外角之间的距离

---

### 矩形
> * ``fillRect(x,y, w,h)``  
>
>   绘制填充矩形  
>
> * ``strokeRect(x,y, w,h)``  
>
>   绘制边框矩形  
>
> * ``clearRect(x,y, w,h)``  
>
>   清除矩形范围内的像素

---

### 路径
> * ``beginPath()``  
>
>   起始(重置)路径  
>
> * ``closePath()``  
>
>   闭合路径(创建当前点回到原点的路径)  
>
> * ``moveTo(x, y)``  
>
>   把当前点移动到指定点坐标(定义起始点)  
>
> * ``lineTo(x, y)``  
>
>   定义线条  
>
> * ``arcTo(x1,y1, x2,y2, r)``  
>
>   定义弧：弧起点、第二切点、弧半径
>
> * ``quadraticCurveTo(cpx,cpy, x,y)``  
>
>   二次贝塞尔曲线：控制点、结束点  
>
> * ``bezierCurveTo(cpx1,cpy1, cpx2,cpy2, x,y)``  
>
>   三次贝塞尔曲线：控制点1、控制点2、结束点  
>
> * ``arc(x,y, r, sAngle,eAngle, false)``  
>
>   定义圆(曲线)路径：圆心、半径、起始弧度、结束弧度、顺时针  
>
> * ``rect(x,y, w,h)``  
>
>   定义矩形路径  
>
> * ``fill()``  
>
>   填充当前路径区域  
>
> * ``stroke()``  
>
>   绘制已定义的路径  

---

### 变换
> * ``scale(w, h)``  
>
>   缩放 ``ctx`` 当前绘图大小：w(倍数)、h(倍数)  
>
> * ``rotate(angle)``  
>
>   旋转 ``ctx`` 当前绘图：angle(弧度)  
>
> * ``translate(x, y)``  
>
>   偏移 ``ctx`` 当前绘图：偏移坐标  
>
> * ``transform(a,b,c,d,e,f)``  
>
>   替换 ``ctx`` 当前绘图的转换矩阵：水平缩放、水平倾斜、垂直倾斜、垂直缩放、水平偏移、垂直偏移  
>
> * ``setTransform(a,b,c,d,e,f)`` **不叠加变换**  
>
>    重置为单位矩阵后，再执行 ``transform()`` ：水平缩放、水平倾斜、垂直倾斜、垂直缩放、水平偏移、垂直偏移  

---

### 文字

属性              | 描述
:------           | :------:
**font**          | 字体属性 ( ``'32px/64px Arial'`` )
**textAlign**     | 对齐方式 ( ``start`` 起始对齐 \| ``end`` 末尾对齐 \| ``center``  居中 \| ``left`` 左对齐 \| ``right`` 右对齐 )
**textBaseline**  | 文本的基线 ( ``alphabetic`` 默认 \| ``top`` 顶端 \| ``bottom``  底端 \| ``middle`` 正中 \| ``hanging`` 数字顶端 \| ``ideographic`` 汉字底端 )  

![基线](../../illustration/gif/Canvas-textBaseline.gif)  

> **方法：**
> * ``fillText(txt, x,y, maxWidth)``  
>
>   填充文本：文本字符串、绘制坐标、最大宽度  
>
> * ``strokeText(txt, x,y, maxWidth)``  
>
>   描边文本：文本字符串、绘制坐标、最大宽度  
>
> * ``measureText(txt).width``  
>
>   返回指定 ``txt`` 文本宽度

---

### 像素操作

属性       | 描述
:------    | :------:
**width**  | 返回 ``ImageData`` 对象的宽度
**height** | 返回 ``ImageData`` 对象的高度
**data**   | 返回 ``ImageData`` 的图像数据对象

> **方法：**
> * ``createImageData(w, h|imageData)``  
>
>   创建空白的 ``ImageData`` 对象：宽高值 | 或基于另一个ImageData对象的宽高  
>
> * ``getImageData(x,y, w,h)``  
>
>   获得(复制) ``ImageData`` 对象：复制矩形区域 - 左上角坐标、宽高  
>
> * ``putImageData(imgData, x,y, dirtyX,dirtyY, dirtyWidth,dirtyHeight)``  
>
>   把获得的 ``ImageData`` 图像数据放回到画布上：要放回画布的 ``ImageData`` 对象、放回位置左上角坐标、在画布上放置图像的水平位置(可选)、在画布上放置图像的垂直位置(可选)、绘制图像所使用的宽高值

---

### 其它
方法                              | 描述
:------                           | :------:
**``ctx.save()``**                | 保存当前路径状态
**``ctx.restore()``**             | 返回之前保存过的路径状态和属性
**``ctx.clip()``**                | 从原始画布剪切任意形状和尺寸的区域
**``ctx.isPointInPath(x, y)``**   | 判断指定点是否位于当前路径中(**布尔**)
**``ctx.clearRect(x,y, w,h)``**   | 清除矩形区域的像素

---

###### Canvas小知识
* **变换时的注意事项**  
 > 1.图形变换的基点在 ``ctx`` 绘制对象的左上角  
 > 2.当使用了变换方法，将会影响之后绘制的图形 ( **变换会叠加** )  
 > 3.在变换前使用 ``ctx.save()`` ; 在变换后使用 ``ctx.restore()`` ( **防止变换叠加** )  
 > 4.制作动画时经常使用 ``ctx.clearRect(x,y, w,h)`` 清除画布  
* **三角函数**  
 > **弧度：** ``Math.PI/180``  
 > **震荡：** ``50 + 20*Math.sin(num++)``  
 > **旋转角度 θ：**  ``Math.atan(Δy/Δx)``  
 > **极坐标(圆)：**  ``x = rx + r * cos(θ); y = ry + r * sin(θ)`` ---旋转角度 ``(θ)``
```
x: rx + r * Math.cos(2*Math.PI * num)
y: ry + r * Math.sin(2*Math.PI * num)
```  
> **极坐标(球体)：**  ``x = r * sin(φ)sin(θ); y = r * cos(φ); z = r * sin(φ)cos(θ)`` ---垂直轴夹角 ``(φ)`` ---平面中心旋转夹角 ``(θ)``
```
x: r * Math.sin(Math.PI * num) * Math.sin(2*Math.PI * num)
y: r * Math.cos(Math.PI * num)
z: r * Math.sin(Math.PI * num) * Math.cos(2*Math.PI * num)
```
　
  