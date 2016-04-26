var attribute = {
	get:function(obj,attr){
		var val;
		val = obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
		if(attr == 'opacity') val *= 100;
		return val;
	},
	set:function(obj,attr,val){
		if(attr == 'opacity'){
			obj.style.filter = 'alpha(opacity='+val+')';
			obj.style.opacity = val / 100;
		} else{
			obj.style[attr] = val + 'px';
		}
	}
}


var effect = {
	change:function(obj,json,fn){
		var complete = false;
		var cur = 0;
		var speed = 0;
		var attr = null;
		var arr = [];
		var counter = 0;
		for(var property in json){
			arr.push(property);
		}
		for(attr in json){
			cur = parseInt(parseFloat(attribute.get(obj,attr)));

			speed = (json[attr] - cur)/8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			cur += speed;
			attribute.set(obj,attr,cur);
			console.log('opacity: '+obj.style.opacity + '  left: '+ obj.style.left+'  speed: '+speed);
			if(json[attr] == cur){
				complete = true;
				break;
			}
		}
		if(complete){
			effect.stop(obj);
			if(fn) fn();
		}
	},
	stop:function(obj){
		clearInterval(obj.timer);
	},
	animate:function(obj,json,fps,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			effect.change(obj,json,fn);
		},fps);
	}
}