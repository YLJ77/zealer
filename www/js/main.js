(function(){
	/*small-screen-menu*/
	function slide_nav(){
		var small_nav = document.getElementById('small_nav');
		var menu = document.getElementById('menu');
		var close = document.getElementById('close');
		menu.onclick = function(){
			effect.animate(small_nav,{'top':0});
		}
		close.onclick = function(){
			effect.animate(small_nav,{'top':-404});
		}
	}





	/*pic-slide*/

	function PicSlide(){
		var list = document.getElementsByClassName('slider_container')
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
			this.control[this.active].className = 'active';
			effect.animate(this.list[target.index],{'opacity':100},30);
		},
		clear:function(){
			this.control[this.active].className = "";
			effect.animate(this.list[this.active],{'opacity':0},30);
		},
		run:function(){
			var active = this.active;
			var control = this.control;
			var list = this.list;
			this.clear();
			active +=1;
			active = active % control.length;
			control[active].className = 'active';
			effect.animate(list[active],{'opacity':100},30);
			this.active = active;
		}
	}


	/*video-play-list*/

	function play(){
		var left_line = document.getElementsByClassName('left_line');
		var right_line = document.getElementsByClassName('right_line');
		var list_play = document.getElementsByClassName('list_play');
		var video_list = document.getElementById('video_list').getElementsByTagName('li');

		for(var i=0;i<video_list.length;i++){
			video_list[i].index = i;
			video_list[i].onmouseenter = function(){
				var self = this;
				effect.animate(left_line[this.index],{'opacity':100,'left':111},30,function(){effect.animate(left_line[self.index],{'opacity':100},30);});
				effect.animate(right_line[this.index],{'right':111,'opacity':100},30,function(){effect.animate(right_line[self.index],{'opacity':100},30);});
				effect.animate(list_play[this.index],{'top':0,'opacity':100},30,function(){effect.animate(list_play[self.index],{'opacity':100},30);});
			}

			video_list[i].onmouseleave = function(){
				var self = this;
				effect.animate(left_line[this.index],{'left':90,'opacity':0},30,function(){effect.animate(left_line[self.index],{'opacity':0},30);});
				effect.animate(right_line[this.index],{'right':90,'opacity':0},30,function(){effect.animate(right_line[self.index],{'opacity':0},30);});
				effect.animate(list_play[this.index],{'top':20,'opacity':0},30,function(){effect.animate(list_play[self.index],{'opacity':0},30);});
			}
		}

		//left_line = null;
		
	}

	flag = false;
	function menu(){
		var sel = document.getElementById('sel');
		var options = document.getElementById('options');
		var values = document.getElementsByClassName('des_select');
		

		sel.onclick = function(event){
			event = event || window.event;
			event.stopPropagation();
			options.style.display = 'block';
		}

		sel.onblur = function(){
			options.style.display = 'none';
		}

		for(var i=0;i<values.length;i++){
			values[i].onclick = function(event){
				event = event || window.event;
				event.stopPropagation();
				flag = true;
				sel.innerText = this.innerText;
				options.style.display = 'none';
			}
		}

		document.onclick = function(){
			options.style.display = 'none';
		}
	}

	slide_nav();
	new PicSlide();
	play();
	menu();
}())




