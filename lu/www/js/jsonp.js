(function(){
    var formatParams = function(data) {//格式化参数
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return arr.join('&');
    }
    var JSONP = function(url,options) {
        options = options || {};
        if (!url || !options.callback) {
            throw new Error("参数不合法");
        }
 
        //创建 script 标签并加入到页面中
        var oHead = document.getElementsByTagName('head')[0];
        var params = "";
        params += formatParams(options.data);
        var oS = document.createElement('script');
        oHead.appendChild(oS);
 
        //创建jsonp回调函数c
        window["success"] = function (json) {
                  oHead.removeChild(oS);
                  clearTimeout(oS.timer);
                  window['callback'] = null;
                  options.success && options.success(json);
              };
        window['callback'] = options.callback;
        //发送请求
        oS.src = url + '?' + params;
 
        //超时处理
        if (options.time) {
            oS.timer = setTimeout(function () {
                window['callback'] = null;
                oHead.removeChild(oS);
                options.fail && options.fail({ message: "超时" });
            }, options.time);
        }
    };
    window.JSONP = JSONP;
})();