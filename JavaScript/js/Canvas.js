/**
 * Canvas 画布
 * 声明画布类型:            var ctx   = ele.getContext('2d');
 * 获得(生成)canvas图片URL: var imgURL = ele.toDataURL('image/png');
 * ctx.fillStyle = color;      ---填充色
 * ctx.strokeStyle = color;    ---描边色
 *
 * 绘制路径：
 * ctx.beginPath();            ---表示要绘制新路径
 * ctx.closePath();            ---结束当前路径绘制
 * ctx.stroke();               ---给绘制好的路径上描边色(否则不会显示)
 * ctx.fill();                 ---给绘制好的路径上填充色(否则不会显示)
 * ctx.clip();                 ---给绘制好的路径创建剪切区域
 *                            clip(之后创建的图形都必需在范围内才能显示)
 * ctx.moveTo(x, y);           ---设置绘制的坐标(移动画笔到指定坐标,不画线)
 * --从上一个点绘制曲线路径(半径经过的点坐标(夹角点坐标)，末尾坐标，曲线半径)
 * --获得与夹角的两边相切并且半径为r的圆上最短曲线
 * ctx.moveTo(10, 10);  //起始坐标
 * ctx.arcTo(x1,y1,x2,y2,r);
 * --从上一个点绘制贝塞尔曲线(控制点1坐标，控制点2坐标，末尾坐标)
 * ctx.moveTo(10, 10);  //起始坐标
 * ctx.bezierCurveTo(c1x,c1y,c2x,c2y,x,y);
 * --从上一个点绘制二次贝塞尔曲线(控制点坐标，末尾坐标)
 * ctx.moveTo(x, y);    //起始坐标
 * ctx.quadraticCurveTo(cx,cy,x,y)
 * --从上一个点绘制直线路径(末尾坐标)
 * ctx.moveTo(10, 10);  //起始坐标
 * ctx.arcTo(x, y);
 * --绘制圆形路径(圆心坐标，半径，起始角度，末尾角度，false表示顺时针(默认))
 * ctx.arc(x,y,r,start,end,false); //会连接上一个点
 * --绘制矩形路径(起始坐标，宽度，高度)
 * ctx.rect(x,y,w,h);              //不会连接上一个点
 *
 * 矩形：
 * ctx.fillRect(x, y, w, h)    ---绘制填充矩形
 * ctx.strokeRect(x, y, w, h)  ---绘制描边矩形
 * ctx.clearRect(x, y, w, h)   ---清除矩形(绘制透明矩形)
 * ctx.lineWidth = 3;          ---设置描边大小
 * ctx.lineCap = 'round';      ---控制线条末端形状
 *                                 (平butt圆round方square)
 * ctx.lineJoin = 'round';     ---控制线条连接方式
 *                                 (圆交round斜交bevel斜接miter)
 *
 * 绘制文本：(文本字符串，坐标，可选的最大像素宽度)
 * ctx.fillText(str,x,y,px);   ---填充型字符串
 * ctx.strokeText(str,x,y,px); ---描边型字符串
 * 绘制文本的属性：
 * .font           ---文本样式、大小及字体(与css一样的写法)
 * .textAlign      ---文本对齐方式(影响文本坐标的位置)
 * ["start"、"end"、"center"、"left"、"right"]
 * .textBaseline   ---文本的基线(影响文本坐标的位置)
 * ["top"、"bottom"、"middle"]
 * ["alphabetic"、"ideographic"和"hanging"]
 */

/**
 * Canvas画布常量
 */
var WIDTH  = 800,
    HEIGHT = 500,
    PI     = Math.PI;

(function () {
    'use strict';

    window.CanvasUtil = {
        getImg   : getImgFn,
        drawRect : drawRectFn,
        drawPath : drawPathFn,
        drawClock: drawClockFn
    };

    /**
     * 得到canvas画布内的图片
     * @param canvas
     * @param type
     * @returns {Element}
     */
    function getImgFn(canvas, type) {
        var imgURL = canvas.toDataURL(type);
        var img = document.createElement('img');
        img.src = imgURL;
        return img;
    }

    /**
     * 绘制矩形
     * @param draw
     */
    function drawRectFn(draw) {
        draw.fillStyle = '#3498db';
        draw.fillRect(10, 10, 60, 60);
        draw.fillStyle = 'rgba(0, 200, 0, 0.6)';
        draw.fillRect(30, 30, 60, 60);

        draw.strokeStyle = '#0c0';
        draw.strokeRect(100, 10, 60, 60);
        draw.strokeStyle = '#3498db';
        draw.lineWidth = 3;
        draw.lineJoin = 'round';
        draw.strokeRect(120, 30, 60, 60);

        draw.strokeStyle = '#3498db';
        draw.lineWidth = 4;
        draw.strokeRect(210, 30, 60, 60);
        draw.clearRect(190, 10, 60, 60);
    }

    /**
     * 绘制路径
     * @param draw
     */
    function drawPathFn(draw) {
        draw.fillStyle   = '#3498db';
        draw.strokeStyle = '#0c0';
        draw.lineWidth = 1;

        //圆形路径
        draw.beginPath();
        draw.arc(40, 150, 30, 0, 0.5*PI, true);
        draw.stroke();
        draw.closePath();

        draw.beginPath();
        draw.arc(90, 150, 30, 0, 0.5*PI, false);
        draw.stroke();
        draw.closePath();

        //直线路径
        draw.beginPath();
        draw.moveTo(140, 120);
        draw.lineTo(180, 120);
        draw.lineTo(180, 180);
        draw.stroke();
        draw.closePath();

        //矩形路径
        draw.beginPath();
        draw.rect(210, 120, 60, 60);
        draw.stroke();
        draw.closePath();

        //曲线路径
        draw.beginPath();
        draw.strokeStyle = '#f00';
        draw.moveTo(10, 200);
        draw.arcTo(60, 200, 60, 260, 30);
        draw.stroke();
        draw.beginPath();
        draw.strokeStyle = '#0c0';
        draw.moveTo(10, 200); //起始点
        draw.lineTo(60, 200); //夹角点
        draw.lineTo(60, 260); //末尾点
        draw.stroke();
        draw.closePath();

        //贝塞尔曲线路径
        draw.beginPath();
        draw.strokeStyle = '#f00';
        draw.moveTo(90, 220);
        draw.quadraticCurveTo(100, 260, 180, 200);
        draw.stroke();
        draw.beginPath();
        draw.strokeStyle = '#0c0';
        draw.moveTo(90, 220);  //起始点
        draw.lineTo(100, 260); //控制点
        draw.lineTo(180, 200); //末尾点
        draw.stroke();
        draw.closePath();

        draw.beginPath();
        draw.strokeStyle = '#f00';
        draw.moveTo(240, 200);
        draw.bezierCurveTo(200, 220, 280, 220, 240, 240);
        draw.stroke();
        draw.beginPath();
        draw.strokeStyle = '#0c0';
        draw.moveTo(240, 200); //起始点
        draw.lineTo(240, 240); //末尾点
        draw.moveTo(200, 220); //控制点1
        draw.lineTo(280, 220); //控制点2
        draw.stroke();
        draw.closePath();

        //没有剪切的区域
        draw.beginPath();
        draw.strokeStyle = '#000';
        draw.rect(20, 310, 240, 30);
        draw.stroke();
        draw.fillRect(0, 320, 280, 10);
        draw.closePath();
        //创建剪切区域
        draw.beginPath();
        draw.rect(20, 270, 240, 30);
        draw.stroke();
        draw.clip();           //声明剪切区域
        // (之后创建的所有图像都必须在区域内，才可以显示出来)
        draw.fillRect(0, 280, 280, 10);
        draw.closePath();

    }

    function drawClockFn(draw) {
        //大圈
        draw.beginPath();
        draw.strokeStyle = '#f2c922';
        draw.lineWidth = 3;
        draw.arc(140, 420, 70, 0, 2*PI, false);
        draw.stroke();

        //小圈
        draw.beginPath();
        draw.strokeStyle = '#3498db';
        draw.lineWidth = 1;
        draw.arc(140, 420, 64, 0, 2*PI, false);
        draw.stroke();

        //时针
        draw.beginPath();
        draw.strokeStyle = '#f39c12';
        draw.lineWidth = 3;
        draw.lineCap = 'round';
        draw.moveTo(140, 420);
        draw.lineTo(140, 380);
        draw.stroke();

        //分针
        draw.beginPath();
        draw.strokeStyle = '#e74c3c';
        draw.lineCap = 'round';
        draw.lineWidth = 2;
        draw.moveTo(140, 420);
        draw.lineTo(110, 420);
        draw.stroke();

        //12点
        draw.beginPath();
        draw.fillStyle = '#f2c922';
        draw.lineWidth = 0.5;
        draw.font = 'bold 14px Arial';
        draw.textAlign = 'center';
        draw.textBaseline = 'middle';
        draw.fillText('12', 140, 370, 12);

        //中心
        draw.beginPath();
        draw.fillStyle = '#3498db';
        draw.arc(140, 420, 3, 0, 2*PI, false);
        draw.fill();
    }

})();

/**
 * 运行区
 */
EventUtil.addEvent(window, 'load', function () {
    'use strict';

    var drawing1 = document.getElementById('canvas1');
    /* 设置画布宽高 */
    drawing1.width = WIDTH;
    drawing1.height = HEIGHT;

    // try {
        if (CanvasRenderingContext2D) {
            var draw1 = drawing1.getContext('2d');
            draw1.fillStyle   = '#3498db';
            draw1.strokeStyle = '#0c0';

            /**
             * 绘制时钟
             */
            CanvasUtil.drawClock(draw1);

            /**
             * 绘制矩形
             */
            CanvasUtil.drawRect(draw1);

            /**
             * 绘制路径(内部包含剪切区域所有需要最后绘制)
             */
            CanvasUtil.drawPath(draw1);

            /**
             * 提取canvas画布内的图片
             */
            document.body.appendChild(CanvasUtil.getImg(drawing1,'image/png'));

        }
    // } catch(e) {
    //     alert('您的浏览器不支持canvas，部分功能无法显示!')
    // }
    
});


