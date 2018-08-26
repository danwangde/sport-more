function doMove(obj,json,fn) {
    clearInterval(obj.iTimer);
    var iCur=0;
    var iSpeed=0;
    obj.iTimer=setInterval(function () {
        //定时器每走一下，就要把要运动的属性推进一次
        var iBtn=true;
        for(var attr in json){
            //什么时候停止定时器？所有属性都运动到了目标点的时候。
            var target=json[attr];
            if (attr=='opacity'){
                iCur=Math.round(css(obj,'opacity')*100);
            }else{
                iCur=parseInt(css(obj,attr));
            }
            iSpeed=(target-iCur)/8;
            iSpeed=iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (iCur!=target){
                //只要一个属性没到就为false
                iBtn=false;
                if (attr=='opacity'){
                    obj.style.opacity=(iCur+iSpeed)/100;
                    obj.style.filter='alpha(opacity='+(iCur+iSpeed)+')';
                } else{
                    obj.style[attr]=iCur+iSpeed+'px';
                }


            }
        }
        //在这里看所有的属性是不是都到了目标点
        if (iBtn) {//所有属性都到了
            clearInterval(obj.iTimer);
            fn && fn.call(obj);//判断是否有回调函数,fn.call(obj)改变this的指向
        }

    },30)
}
function css(obj,attr) {
    if (obj.currentStyle){
        return obj.currentStyle[attr];
    } else{
        return getComputedStyle(obj,false)[attr];
    }
}