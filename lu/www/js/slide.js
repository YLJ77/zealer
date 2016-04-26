var attribute = {
	get:function(elem,attr){
		var val;
		if(elem.currentStyle){
			val = elem.currentStyle[attr];
		} else{
			val = getComputedStyle(elem,false)[attr];
		}
		if(attr === "opacity"){
			val = val * 100;
		}
		return val;
	},
	set:function(elem,attr,val){
		if(attr === "opacity"){
			elem.style.opacity = (val) / 100;
			elem.style.filter = 'alpha(opacity='+(val)+')';
		}else{
			elem.style[attr] = val + 'px';
		}
	}
}

var effect = {
	animate:function(elem,json,fn){
		clearTimeout(elem.timer);
		setTimeout(function(){
			effect.change(elem,json,fn);
			elem.timer = setTimeout(arguments.callee,30);
		},30)
	},
	stop:function(elem){
		clearTimeout(elem.timer);
	},
	change:function(elem,json,fn){
		var attr = null;
		var speed = 0;
		var complete = false;
		var cur = 0;
		for(attr in json){
			cur = parseInt(parseFloat(attribute.get(elem,attr))) || 0;
			if(cur == json[attr]){
				complete = true;
				break;
			}
			speed = (json[attr] - cur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			cur += speed;
			attribute.set(elem,attr,cur);
		}
		if(complete){
			effect.stop(elem);
			if(fn) fn();
		}
	}
}

function PicSlide(){
	var list = document.getElementById('lists').getElementsByTagName('li');
	var control = document.getElementById('control').getElementsByTagName('li');
	var l_arrow = document.getElementById('l_arrow');
	var r_arrow = document.getElementById('r_arrow');

	var self = this;
	self.list = list;
	self.control = control;
	self.active = 0;

	for(var i=0; i<control.length; i++){
		control[i].index = i;
		control[i].onmouseenter = function(){
			if(self.active === this.index) return;
			clearInterval(self.timer);
			self.clear();
			self.select(this);
		}
		control[i].onmouseleave = function(){
			clearInterval(self.timer);
			self.timer = setInterval(function(){self.run()},3000)
		}
	}

	l_arrow.onclick = function(){
		clearInterval(self.timer);
		var active = self.active;
		var control = self.control;
		var list = self.list;
		self.clear();
		active = active > 0 ? active-1 : control.length - 1;
		self.select(control[active]);
		self.active = active;
		self.timer = setInterval(function(){self.run()},3000);
	}

	r_arrow.onclick = function(){
		clearInterval(self.timer);
		var active = self.active;
		var control = self.control;
		var list = self.list;
		self.clear();
		active = active >= control.length - 1 ? 0 : active + 1;
		self.select(control[active]);
		self.active = active;
		self.timer = setInterval(function(){self.run()},3000);
	}

	self.timer = setInterval(function(){self.run()},3000);
}

PicSlide.prototype = {
	select:function(target){
		this.active = target.index;
		this.control[this.active].childNodes[0].className = 'active';
		effect.animate(this.list[target.index],{'opacity':100});
	},
	clear:function(){
		this.control[this.active].childNodes[0].className = "";
		effect.animate(this.list[this.active],{'opacity':0});
	},
	run:function(){
		var active = this.active;
		var control = this.control;
		var list = this.list;
		this.clear();
		active +=1;
		active = active % control.length;
		control[active].childNodes[0].className = 'active';
		effect.animate(list[active],{'opacity':100});
		this.active = active;
	}
}