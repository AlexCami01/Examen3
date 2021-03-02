(function () {
	"use strict";var TweenCanvas={defaults:{width:0,height:0,fill:0,canvas:0,tempCanvas:0,ctx:0,tempctx:0,paused:!1,objects:[],preload:[],idCount:0},create:function(t,e,i){return this.defaults.width=t,this.defaults.height=e,i&&(this.defaults.fill=i),this.defaults.canvas=document.getElementById("banner1_655127626"),this.defaults.tempCanvas=document.createElement("canvas"),this.defaults.canvas.width=t,this.defaults.canvas.height=e,this.defaults.canvas.style.position="absolute",this.defaults.tempCanvas.width=t,this.defaults.tempCanvas.height=e,this.defaults.ctx=this.defaults.canvas.getContext("2d"),this.defaults.tempctx=this.defaults.tempCanvas.getContext("2d"),this.rafFix(),this.defaults.canvas},rafFix:function(){for(var t=0,e=["webkit","moz"],i=0;i<e.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[e[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[i]+"CancelAnimationFrame"]||window[e[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,i){var a=(new Date).getTime(),s=Math.max(0,16-(a-t)),n=window.setTimeout(function(){e(a+s)},s);return t=a+s,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})},extend:function(t,e){for(var i in e)if("object"!=typeof e[i]||Array.isArray(e[i]))e.hasOwnProperty(i)&&(t[i]=e[i]);else for(var a in e[i])e[i].hasOwnProperty(a)&&(t[i][a]=e[i][a]);return t},createEmptyObject:function(t){var e={id:0,x:0,y:0,scaleX:1,scaleY:1,centerX:0,centerY:0,transformOrigin: "50% 50%",rotation:0,alpha:1,mask:[],invertMask:!1,blendmode:"source-over",filter:"none"};return t.imageObj&&(e.imageObj={url:0,src:0}),t.pointObj&&(e.pointObj={points:[],closePath:!0,fill:{color:"white"},stroke:0}),t.textObj&&(e.textObj={text:0,font:"Arial",fontSize:10,lineHeight:0,textWidth:0,textHeight:0,textAlign:"left",lines:[],fill:{color:"white"},stroke:0,fontLoaded:0,bitmapText:0,bitMap:0}),t.arcObj&&(e.arcObj={radius:0,startAngle:0,endAngle:0,counterclockwise:!1,stroke:{color:"white",width:0}}),e=this.extend(e,t||{})},createObject:function(t){var e=this.createEmptyObject(t);return e.imageObj||e.textObj?this.defaults.preload.push(e):this.calcCenter(e),e.id||(e.id=this.defaults.idCount++),e.textObj&&(e.textObj.lines=e.textObj.text.split("<br>"),e.textObj.lineHeight||(e.textObj.lineHeight=e.textObj.fontSize)),this.defaults.objects.push(e),e},deleteObject:function(t){for(var e=0;e<this.defaults.objects.length;e++)if(this.defaults.objects[e].id===t.id){this.defaults.objects.splice(e,1);break}},setMask:function(t,e){for(var i=0;i<this.defaults.objects.length;i++)if(this.defaults.objects[i].id===e.id){t.mask.push(this.defaults.objects.splice(i,1)[0]);break}},preload:function(t){var e=this;if(this.defaults.preload.length){var i=this.defaults.preload.pop();if(i.imageObj){var a=new Image;a.onload=function(){i.imageObj.src=this,e.calcCenter(i),e.preload(t)},a.onerror=function(){console.warn("Image doesnt exist: "+this.src),e.preload(t)},a.src=i.imageObj.url;a.width=i.imageObj.width;a.height=i.imageObj.height;}if(i.textObj){var s=this.createTextMeasuringObj(i);document.body.appendChild(s);var n=setInterval(function(){if(e.defaults.ctx.font=i.textObj.fontSize+"pt "+i.textObj.font,e.fontLoaded(s,i.textObj.font)){if(clearInterval(n),i.textObj.textWidth=s.clientWidth,i.textObj.textHeight=s.clientHeight,i.textObj.fontLoaded=!0,document.body.removeChild(s),i.textObj.bitmapText){e.defaults.tempCanvas.width=i.textObj.textWidth,e.defaults.tempCanvas.height=i.textObj.textHeight;var a={id:0,x:0,y:0,scaleX:1,scaleY:1,centerX:0,centerY:0,rotation:0,alpha:1,textObj:i.textObj};e.drawObject(a,e.defaults.tempctx);var r=new Image;r.src=e.defaults.tempCanvas.toDataURL(),i.textObj.bitMap=r,e.defaults.tempctx.clearRect(0,0,e.defaults.width,e.defaults.height),e.defaults.tempCanvas.width=e.defaults.width,e.defaults.tempCanvas.height=e.defaults.height}e.calcCenter(i),e.preload(t)}},100)}}else t&&t()},calcCenter:function(t){if(t.pointObj){for(var e=t.pointObj.points.length,i=-1/0,a=-1/0,s=1/0,n=1/0;e--;)t.pointObj.points[e][0]>i&&(i=t.pointObj.points[e][0]),t.pointObj.points[e][1]>a&&(a=t.pointObj.points[e][1]),t.pointObj.points[e][0]<s&&(s=t.pointObj.points[e][0]),t.pointObj.points[e][1]<n&&(n=t.pointObj.points[e][1]);t.centerX=(i+s)/2,t.centerY=(a+n)/2,t.transformOrigin&&this.setTransformOrigin(t)}t.arcObj&&(t.centerX=t.centerY=t.arcObj.radius/2,t.transformOrigin&&this.setTransformOrigin(t)),t.imageObj&&(t.centerX=t.imageObj.src.width/2,t.centerY=t.imageObj.src.height/2,t.transformOrigin&&this.setTransformOrigin(t)),t.textObj&&(t.centerX=t.textObj.textWidth/2,t.centerY=t.textObj.textHeight/2,t.transformOrigin&&this.setTransformOrigin(t))},createTextMeasuringObj:function(t){var e=document.createElement("span");return e.style.width="auto",e.style.height="auto",e.style.display="inline-block",e.style.whiteSpace="nowrap",e.style.position="absolute",e.style.fontFamily=t.textObj.font,e.style.fontSize=t.textObj.fontSize+"pt",e.style.lineHeight=t.textObj.lineHeight+"pt",e.style.top="-3000px",e.style.left="-3000px",e.style.color="black",e.style.border="1px solid red",e.innerHTML=t.textObj.text,e},setTransformOrigin:function(t){var e=t.transformOrigin.replace(/%/gi,"").split(" ");2!=e.length||isNaN(Number(e[0]))||isNaN(Number(e[1]))?console.warn("transformOrigin values incorrect: "+t.transformOrigin):(t.centerX=Number(e[0])/100*t.centerX*2,t.centerY=Number(e[1])/100*t.centerY*2)},fontLoaded:function(t,e){for(var i=["serif","sans-serif","monospace","cursive","fantasy"],a=0,s=0,n=0;n<i.length;++n){if(t.style.fontFamily='"'+e+'",'+i[n],a=t.offsetWidth,n>0&&a!=s)return!1;s=a}return!0},clear:function(){this.defaults.ctx.clearRect(0,0,this.defaults.width,this.defaults.height)},listObjects:function(){for(var t=0;t<this.defaults.objects.length;t++)console.log(this.defaults.objects[t])},render:function(){if(!this.defaults.paused){this.clear(),this.defaults.ctx.save(),this.defaults.fill&&(this.defaults.ctx.fillStyle=this.defaults.fill,this.defaults.ctx.fillRect(0,0,this.defaults.width,this.defaults.height)),this.defaults.ctx.restore();for(var t=0;t<this.defaults.objects.length;t++){if(this.defaults.ctx.save(),this.defaults.objects[t].mask.length){this.defaults.tempctx.clearRect(0,0,this.defaults.width,this.defaults.height);for(var e=0;e<this.defaults.objects[t].mask.length;e++)this.defaults.tempctx.save(),this.drawObject(this.defaults.objects[t].mask[e],this.defaults.tempctx),this.defaults.tempctx.restore();this.defaults.objects[t].invertMask?this.defaults.tempctx.globalCompositeOperation="source-out":this.defaults.tempctx.globalCompositeOperation="source-in",this.defaults.tempctx.save(),this.drawObject(this.defaults.objects[t],this.defaults.tempctx),this.defaults.tempctx.restore(),this.defaults.ctx.globalCompositeOperation=this.defaults.objects[t].blendmode,this.defaults.ctx.drawImage(this.defaults.tempCanvas,0,0),this.defaults.tempctx.globalCompositeOperation="source-over",this.defaults.ctx.globalCompositeOperation="source-over"}else this.defaults.ctx.globalCompositeOperation=this.defaults.objects[t].blendmode,this.defaults.ctx.filter=this.defaults.objects[t].filter,this.drawObject(this.defaults.objects[t],this.defaults.ctx),this.defaults.ctx.filter="none",this.defaults.ctx.globalCompositeOperation="source-over";this.defaults.ctx.restore()}window.requestAnimationFrame(this.render.bind(this))}},drawObject:function(t,e){if(e.translate(t.x+t.centerX,t.y+t.centerY),e.rotate(t.rotation*Math.PI/180),e.scale(t.scaleX,t.scaleY),e.translate(-t.centerX,-t.centerY),e.globalAlpha=t.alpha,t.pointObj){e.beginPath(),e.moveTo(t.pointObj.points[0][0],t.pointObj.points[0][1]);for(var i=1;i<t.pointObj.points.length;i++)e.lineTo(t.pointObj.points[i][0],t.pointObj.points[i][1]);t.pointObj.closePath&&e.closePath(),t.pointObj.fill&&(t.pointObj.fill.gradient?e.fillStyle=this.gradient(t.pointObj.fill.gradient,e):e.fillStyle=t.pointObj.fill.color,e.fill()),t.pointObj.stroke&&(t.pointObj.stroke.gradient?e.strokeStyle=this.gradient(t.pointObj.fill.gradient,e):e.strokeStyle=t.pointObj.stroke.color,e.lineWidth=t.pointObj.stroke.width,e.stroke())}t.arcObj&&(e.beginPath(),e.arc(0,0,t.arcObj.radius,t.arcObj.startAngle/180*Math.PI,t.arcObj.endAngle/180*Math.PI,t.arcObj.counterclockwise),t.arcObj.fill&&(t.arcObj.fill.gradient?e.fillStyle=this.gradient(t.arcObj.fill.gradient,e):e.fillStyle=t.arcObj.fill.color,e.fill()),t.arcObj.stroke&&(t.arcObj.stroke.gradient?e.strokeStyle=this.gradient(t.arcObj.stroke.gradient,e):e.strokeStyle=t.arcObj.stroke.color,e.lineWidth=t.arcObj.stroke.width,e.stroke())),t.textObj&&t.textObj.fontLoaded&&(t.textObj.bitMap?e.drawImage(t.textObj.bitMap,0,0,t.textObj.bitMap.width,t.textObj.bitMap.height):(e.font=t.textObj.fontSize+"pt "+t.textObj.font,e.textBaseline="alphabetic",e.textAlign=t.textObj.textAlign,t.textObj.fill&&(e.fillStyle=t.textObj.fill.color),t.textObj.stroke&&(e.strokeStyle=t.textObj.stroke.color,e.lineWidth=t.textObj.stroke.width),t.textObj.lines.forEach(function(i,a){t.textObj.fill&&("left"===t.textObj.textAlign&&e.fillText(i,0,(a+1.25)*t.textObj.lineHeight),"center"===t.textObj.textAlign&&e.fillText(i,t.textObj.textWidth/2,(a+1)*t.textObj.lineHeight),"right"===t.textObj.textAlign&&e.fillText(i,t.textObj.textWidth,(a+1)*t.textObj.lineHeight)),t.textObj.stroke&&("left"===t.textObj.textAlign&&e.strokeText(i,0,(a+1.25)*t.textObj.lineHeight),"center"===t.textObj.textAlign&&e.strokeText(i,t.textObj.textWidth/2,(a+1)*t.textObj.lineHeight),"right"===t.textObj.textAlign&&e.strokeText(i,t.textObj.textWidth,(a+1)*t.textObj.lineHeight))}))),t.imageObj&&e.drawImage(t.imageObj.src,0,0,t.imageObj.src.width,t.imageObj.src.height)},gradient:function(t,e){var i;return"radial"==t.type&&(i=e.createRadialGradient(t.startX,t.startY,t.startRadius,t.endX,t.endY,t.endRadius),t.colorStop.forEach(function(e,a){i.addColorStop(t.colorStop[a][0],t.colorStop[a][1])})),"linear"==t.type&&(i=e.createLinearGradient(t.startX,t.startY,t.endX,t.endY),t.colorStop.forEach(function(e,a){i.addColorStop(t.colorStop[a][0],t.colorStop[a][1])})),i},pause:function(){this.defaults.paused=!0,window.cancelAnimationFrame(this.render)},start:function(){this.defaults.paused=!1,window.requestAnimationFrame(this.render.bind(this))}};
		
		var bannerCanvas = TweenCanvas.create(3231, 2238, "#ffffff");
		document.body.appendChild(bannerCanvas);
		
		var img_1086 = TweenCanvas.createObject({
			x: 2191,
			y: 0,
			alpha: 0,
			imageObj: {
				url: "images/rectangle-125_698645149.svg",
				width: 1040,
				height: 2238,
			},
		});
		
		var img_33 = TweenCanvas.createObject({
			x: 0,
			y: 0,
			alpha: 0,
			imageObj: {
				url: "images/g14_791257851.svg",
				width: 2199,
				height: 1120,
			},
		});
		
		var img_1012 = TweenCanvas.createObject({
			x: 0,
			y: 1117.7694702148438,
			alpha: 0,
			imageObj: {
				url: "images/g14_437196117.svg",
				width: 2199,
				height: 1120,
			},
		});
		
		var img_336 = TweenCanvas.createObject({
			x: 513.625244140625,
			y: 45.194793701171875,
			alpha: 0,
			imageObj: {
				url: "images/path80_443927974.svg",
				width: 243,
				height: 334,
			},
		});
		
		var img_337 = TweenCanvas.createObject({
			x: 527.756649017334,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path82_736093923.svg",
				width: 13,
				height: 8,
			},
		});
		
		var img_338 = TweenCanvas.createObject({
			x: 529.4219889640808,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path84_623150981.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_339 = TweenCanvas.createObject({
			x: 535.0926594734192,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path86_791471443.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_340 = TweenCanvas.createObject({
			x: 547.9306554794312,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path88_427073201.svg",
				width: 13,
				height: 8,
			},
		});
		
		var img_341 = TweenCanvas.createObject({
			x: 549.5953450202942,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path90_141172540.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_342 = TweenCanvas.createObject({
			x: 555.2653238773346,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path92_602431729.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_343 = TweenCanvas.createObject({
			x: 568.1039795875549,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path94_060967076.svg",
				width: 13,
				height: 8,
			},
		});
		
		var img_344 = TweenCanvas.createObject({
			x: 569.7686848640442,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path96_274114931.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_345 = TweenCanvas.createObject({
			x: 575.4393391609192,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path98_965616821.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_346 = TweenCanvas.createObject({
			x: 588.2773351669312,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path100_765271312.svg",
				width: 13,
				height: 8,
			},
		});
		
		var img_347 = TweenCanvas.createObject({
			x: 589.9426920413971,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path102_318317507.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_348 = TweenCanvas.createObject({
			x: 595.6133463382721,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path104_433181102.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_349 = TweenCanvas.createObject({
			x: 608.951334476471,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path106_059492017.svg",
				width: 12,
				height: 8,
			},
		});
		
		var img_350 = TweenCanvas.createObject({
			x: 610.1160318851471,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path108_232282907.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_351 = TweenCanvas.createObject({
			x: 615.7860351800919,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path110_610611848.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_352 = TweenCanvas.createObject({
			x: 628.6253576278687,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path112_144359132.svg",
				width: 13,
				height: 8,
			},
		});
		
		var img_353 = TweenCanvas.createObject({
			x: 630.2899088859558,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path114_544964433.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_354 = TweenCanvas.createObject({
			x: 635.959993481636,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path116_406755467.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_355 = TweenCanvas.createObject({
			x: 648.7986078262329,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path118_195624255.svg",
				width: 13,
				height: 8,
			},
		});
		
		var img_356 = TweenCanvas.createObject({
			x: 650.4632487297058,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path120_338961035.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_357 = TweenCanvas.createObject({
			x: 656.1333658695221,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path122_762122348.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_358 = TweenCanvas.createObject({
			x: 668.9720373153687,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path124_429843009.svg",
				width: 13,
				height: 8,
			},
		});
		
		var img_359 = TweenCanvas.createObject({
			x: 670.6365885734558,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path126_404533374.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_360 = TweenCanvas.createObject({
			x: 676.3072428703308,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path128_880087470.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_361 = TweenCanvas.createObject({
			x: 689.1452550888062,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path130_509800302.svg",
				width: 13,
				height: 8,
			},
		});
		
		var img_362 = TweenCanvas.createObject({
			x: 690.8106119632721,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path132_589667410.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_363 = TweenCanvas.createObject({
			x: 696.9806152582169,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path134_534873272.svg",
				width: 3,
				height: 31,
			},
		});
		
		var img_364 = TweenCanvas.createObject({
			x: 709.3192868232727,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path136_634606921.svg",
				width: 13,
				height: 8,
			},
		});
		
		var img_365 = TweenCanvas.createObject({
			x: 710.9846110343933,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path138_264953224.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_366 = TweenCanvas.createObject({
			x: 716.6539225578308,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path140_598843532.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_367 = TweenCanvas.createObject({
			x: 729.9932775497437,
			y: 56.00210762023926,
			alpha: 0,
			imageObj: {
				url: "images/path142_354965319.svg",
				width: 12,
				height: 8,
			},
		});
		
		var img_368 = TweenCanvas.createObject({
			x: 731.1572916507721,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path144_389061546.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_369 = TweenCanvas.createObject({
			x: 736.8279459476471,
			y: 28.114787101745605,
			alpha: 0,
			imageObj: {
				url: "images/path146_499015428.svg",
				width: 4,
				height: 31,
			},
		});
		
		var img_3175 = TweenCanvas.createObject({
			x: 814.9646453857422,
			y: 34.394134521484375,
			alpha: 0,
			imageObj: {
				url: "images/path362_938191489.png",
				width: 157,
				height: 309,
			},
		});
		
		var img_3176 = TweenCanvas.createObject({
			x: 821.9645690917969,
			y: 43.89405822753906,
			alpha: 0,
			imageObj: {
				url: "images/path364_115502762.svg",
				width: 143,
				height: 290,
			},
		});
		
		var img_3280 = TweenCanvas.createObject({
			x: 814.9646453857422,
			y: 384.0327911376953,
			alpha: 0,
			imageObj: {
				url: "images/path572_844135687.png",
				width: 157,
				height: 63,
			},
		});
		
		var img_3281 = TweenCanvas.createObject({
			x: 922.6166172027588,
			y: 388.0327911376953,
			alpha: 0,
			imageObj: {
				url: "images/path574_752740479.svg",
				width: 45,
				height: 55,
			},
		});
		
		var img_3282 = TweenCanvas.createObject({
			x: 918.7706379890442,
			y: 388.0327911376953,
			alpha: 0,
			imageObj: {
				url: "images/path576_279108653.svg",
				width: 5,
				height: 55,
			},
		});
		
		var img_3313 = TweenCanvas.createObject({
			x: 58.218414306640625,
			y: 32.92413330078125,
			alpha: 0,
			imageObj: {
				url: "images/path638_456721086.svg",
				width: 374,
				height: 534,
			},
		});
		
		var img_3314 = TweenCanvas.createObject({
			x: 75.71858215332031,
			y: 58.040069580078125,
			alpha: 0,
			imageObj: {
				url: "images/path640_713336368.svg",
				width: 339,
				height: 490,
			},
		});
		
		var img_3315 = TweenCanvas.createObject({
			x: 82.21774291992188,
			y: 65.71348571777344,
			alpha: 0,
			imageObj: {
				url: "images/path642_138762060.svg",
				width: 326,
				height: 473,
			},
		});
		
		var img_3316 = TweenCanvas.createObject({
			x: 122.625732421875,
			y: 565.9054203033447,
			alpha: 0,
			imageObj: {
				url: "images/path644_262265548.svg",
				width: 249,
				height: 56,
			},
		});
		
		var img_3413 = TweenCanvas.createObject({
			x: 118.94554036855698,
			y: 121.69081725180149,
			alpha: 0,
			imageObj: {
				url: "images/path838_451078781.svg",
				width: 1,
				height: 1,
			},
		});
		
		var img_3420 = TweenCanvas.createObject({
			x: 180.71332550048828,
			y: 509.91733598709106,
			alpha: 0,
			imageObj: {
				url: "images/path852_088713443.svg",
				width: 146,
				height: 3,
			},
		});
		
		var img_3421 = TweenCanvas.createObject({
			x: 151.7130584716797,
			y: 522.3913858532906,
			alpha: 0,
			imageObj: {
				url: "images/path854_113221000.svg",
				width: 204,
				height: 3,
			},
		});
		
		var img_3422 = TweenCanvas.createObject({
			x: 122.625732421875,
			y: 565.856071472168,
			alpha: 0,
			imageObj: {
				url: "images/path856_463473843.svg",
				width: 249,
				height: 27,
			},
		});
		
		var img_3423 = TweenCanvas.createObject({
			x: 1004.1033325195312,
			y: 54.8067626953125,
			alpha: 0,
			imageObj: {
				url: "images/path858_510718447.png",
				width: 283,
				height: 423,
			},
		});
		
		var img_3424 = TweenCanvas.createObject({
			x: 1259.0139646530151,
			y: 58.91412353515625,
			alpha: 0,
			imageObj: {
				url: "images/path860_308263519.svg",
				width: 18,
				height: 414,
			},
		});
		
		var img_3425 = TweenCanvas.createObject({
			x: 1041.1740188598633,
			y: 54.79075622558594,
			alpha: 0,
			imageObj: {
				url: "images/path862_263214316.png",
				width: 246,
				height: 422,
			},
		});
		
		var img_172 = TweenCanvas.createObject({
			x: 1032,
			y: 89,
			alpha: 0,
			imageObj: {
				url: "images/decoracion-corporativa-2-1_772306153.jpg",
				width: 228,
				height: 346,
			},
		});
		
		var img_3427 = TweenCanvas.createObject({
			x: 1128.103286743164,
			y: 73.0187554359436,
			alpha: 0,
			imageObj: {
				url: "images/path866_017092179.svg",
				width: 35,
				height: 5,
			},
		});
		
		var img_3428 = TweenCanvas.createObject({
			x: 1171.1470012664795,
			y: 73.24882245063782,
			alpha: 0,
			imageObj: {
				url: "images/path868_677855460.svg",
				width: 5,
				height: 5,
			},
		});
		
		var img_3429 = TweenCanvas.createObject({
			x: 1129.1033363342285,
			y: 444.0654716491699,
			alpha: 0,
			imageObj: {
				url: "images/path870_072622479.svg",
				width: 33,
				height: 18,
			},
		});
		
		var img_3430 = TweenCanvas.createObject({
			x: 1057.011897802353,
			y: 263.1081074476242,
			alpha: 0,
			imageObj: {
				url: "images/path872_498376967.svg",
				width: 2,
				height: 4,
			},
		});
		
		var img_3431 = TweenCanvas.createObject({
			x: 1063.874610900879,
			y: 88.1614990234375,
			alpha: 0,
			imageObj: {
				url: "images/path874_886309445.svg",
				width: 199,
				height: 348,
			},
		});
		
		var img_3532 = TweenCanvas.createObject({
			x: 776.6399993896484,
			y: 547.9613265991211,
			alpha: 0,
			imageObj: {
				url: "images/path1076_764114537.svg",
				width: 181,
				height: 134,
			},
		});
		
		var img_3533 = TweenCanvas.createObject({
			x: 783.1406936645508,
			y: 570.9741821289062,
			alpha: 0,
			imageObj: {
				url: "images/path1078_392097746.svg",
				width: 168,
				height: 104,
			},
		});
		
		var img_3534 = TweenCanvas.createObject({
			x: 796.8141117095947,
			y: 584.7827072143555,
			alpha: 0,
			imageObj: {
				url: "images/path1080_311594876.svg",
				width: 57,
				height: 76,
			},
		});
		
		var img_3535 = TweenCanvas.createObject({
			x: 800.3141117095947,
			y: 589.2834243774414,
			alpha: 0,
			imageObj: {
				url: "images/path1082_122110637.svg",
				width: 50,
				height: 67,
			},
		});
		
		var img_3536 = TweenCanvas.createObject({
			x: 855.6407136917114,
			y: 553.2753252983093,
			alpha: 0,
			imageObj: {
				url: "images/path1084_382269868.svg",
				width: 23,
				height: 7,
			},
		});
		
		var img_3537 = TweenCanvas.createObject({
			x: 873.9627418518066,
			y: 572.3260538578033,
			alpha: 0,
			imageObj: {
				url: "images/path1086_123247076.svg",
				width: 49,
				height: 9,
			},
		});
		
		var img_3538 = TweenCanvas.createObject({
			x: 857.9685325622559,
			y: 578.4307291507721,
			alpha: 0,
			imageObj: {
				url: "images/path1088_285037364.svg",
				width: 43,
				height: 8,
			},
		});
		
		var img_3539 = TweenCanvas.createObject({
			x: 959.8846598267555,
			y: 530.8901000916958,
			alpha: 0,
			imageObj: {
				url: "images/path1090_854364246.svg",
				width: 2,
				height: 2,
			},
		});
		
		var img_3540 = TweenCanvas.createObject({
			x: 880.4206199645996,
			y: 579.8873615264893,
			alpha: 0,
			imageObj: {
				url: "images/path1092_110463301.svg",
				width: 71,
				height: 8,
			},
		});
		
		var img_3541 = TweenCanvas.createObject({
			x: 865.0095067024231,
			y: 589.9673502445221,
			alpha: 0,
			imageObj: {
				url: "images/path1094_947355246.svg",
				width: 8,
				height: 9,
			},
		});
		
		var img_3542 = TweenCanvas.createObject({
			x: 870.0346593856812,
			y: 589.9573566913605,
			alpha: 0,
			imageObj: {
				url: "images/path1096_363887428.svg",
				width: 11,
				height: 9,
			},
		});
		
		var img_3543 = TweenCanvas.createObject({
			x: 879.6754231452942,
			y: 589.9573566913605,
			alpha: 0,
			imageObj: {
				url: "images/path1098_035567183.svg",
				width: 10,
				height: 9,
			},
		});
		
		var img_3544 = TweenCanvas.createObject({
			x: 893.8560628890991,
			y: 589.9626953601837,
			alpha: 0,
			imageObj: {
				url: "images/path1100_135162980.svg",
				width: 9,
				height: 9,
			},
		});
		
		var img_3545 = TweenCanvas.createObject({
			x: 901.7720050811768,
			y: 589.9573566913605,
			alpha: 0,
			imageObj: {
				url: "images/path1102_979326497.svg",
				width: 9,
				height: 9,
			},
		});
		
		var img_3546 = TweenCanvas.createObject({
			x: 909.1940670013428,
			y: 589.9573566913605,
			alpha: 0,
			imageObj: {
				url: "images/path1104_736748713.svg",
				width: 10,
				height: 9,
			},
		});
		
		var img_3547 = TweenCanvas.createObject({
			x: 918.6692867279053,
			y: 589.9573566913605,
			alpha: 0,
			imageObj: {
				url: "images/path1106_397793040.svg",
				width: 11,
				height: 9,
			},
		});
		
		var img_3548 = TweenCanvas.createObject({
			x: 927.1846923828125,
			y: 589.9573566913605,
			alpha: 0,
			imageObj: {
				url: "images/path1108_589384084.svg",
				width: 5,
				height: 9,
			},
		});
		
		var img_3549 = TweenCanvas.createObject({
			x: 931.1174118518829,
			y: 589.9673502445221,
			alpha: 0,
			imageObj: {
				url: "images/path1110_521840910.svg",
				width: 9,
				height: 9,
			},
		});
		
		var img_3551 = TweenCanvas.createObject({
			x: 864.8367838859558,
			y: 583.3074178695679,
			alpha: 0,
			imageObj: {
				url: "images/path1114_943342120.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_3552 = TweenCanvas.createObject({
			x: 860.5973875522614,
			y: 584.8100626468658,
			alpha: 0,
			imageObj: {
				url: "images/path1116_398640914.svg",
				width: 4,
				height: 6,
			},
		});
		
		var img_3553 = TweenCanvas.createObject({
			x: 871.0480793714523,
			y: 601.1633788943291,
			alpha: 0,
			imageObj: {
				url: "images/path1118_833174719.svg",
				width: 3,
				height: 2,
			},
		});
		
		var img_3554 = TweenCanvas.createObject({
			x: 864.7887694835663,
			y: 601.0060831308365,
			alpha: 0,
			imageObj: {
				url: "images/path1120_842564102.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_3555 = TweenCanvas.createObject({
			x: 858.1053059101105,
			y: 589.8600912094116,
			alpha: 0,
			imageObj: {
				url: "images/path1122_637670588.svg",
				width: 4,
				height: 9,
			},
		});
		
		var img_3556 = TweenCanvas.createObject({
			x: 861.7940266132355,
			y: 583.3193683624268,
			alpha: 0,
			imageObj: {
				url: "images/path1124_038437863.svg",
				width: 9,
				height: 6,
			},
		});
		
		var img_3557 = TweenCanvas.createObject({
			x: 859.3580236434937,
			y: 594.831392288208,
			alpha: 0,
			imageObj: {
				url: "images/path1126_381935915.svg",
				width: 13,
				height: 10,
			},
		});
		
		var img_3558 = TweenCanvas.createObject({
			x: 871.6579990386963,
			y: 599.9220621585846,
			alpha: 0,
			imageObj: {
				url: "images/path1128_034618025.svg",
				width: 34,
				height: 3,
			},
		});
		
		var img_3559 = TweenCanvas.createObject({
			x: 859.0253742933273,
			y: 589.7273478507996,
			alpha: 0,
			imageObj: {
				url: "images/path1130_567038611.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_3560 = TweenCanvas.createObject({
			x: 860.9180175065994,
			y: 597.6986570358276,
			alpha: 0,
			imageObj: {
				url: "images/path1132_765485014.svg",
				width: 4,
				height: 6,
			},
		});
		
		var img_3561 = TweenCanvas.createObject({
			x: 871.0960286408663,
			y: 601.0713907852769,
			alpha: 0,
			imageObj: {
				url: "images/path1134_084933167.svg",
				width: 2,
				height: 1,
			},
		});
		
		var img_3562 = TweenCanvas.createObject({
			x: 861.0313148498535,
			y: 585.0006303787231,
			alpha: 0,
			imageObj: {
				url: "images/path1136_191485391.svg",
				width: 14,
				height: 18,
			},
		});
		
		var img_3563 = TweenCanvas.createObject({
			x: 862.1193277835846,
			y: 586.5720944404602,
			alpha: 0,
			imageObj: {
				url: "images/path1138_237711114.svg",
				width: 8,
				height: 15,
			},
		});
		
		var img_3564 = TweenCanvas.createObject({
			x: 869.7906246185303,
			y: 586.9367228150368,
			alpha: 0,
			imageObj: {
				url: "images/path1140_594727702.svg",
				width: 26,
				height: 3,
			},
		});
		
		var img_3565 = TweenCanvas.createObject({
			x: 869.7906246185303,
			y: 598.125329554081,
			alpha: 0,
			imageObj: {
				url: "images/path1142_327075033.svg",
				width: 26,
				height: 3,
			},
		});
		
		var img_3566 = TweenCanvas.createObject({
			x: 870.5533528327942,
			y: 584.6913329958916,
			alpha: 0,
			imageObj: {
				url: "images/path1144_530551972.svg",
				width: 3,
				height: 2,
			},
		});
		
		var img_3567 = TweenCanvas.createObject({
			x: 871.7920246124268,
			y: 584.9367390871048,
			alpha: 0,
			imageObj: {
				url: "images/path1146_640236435.svg",
				width: 33,
				height: 3,
			},
		});
		
		var img_3568 = TweenCanvas.createObject({
			x: 911.2530755996704,
			y: 606.7867838442326,
			alpha: 0,
			imageObj: {
				url: "images/path1148_146392809.svg",
				width: 22,
				height: 2,
			},
		});
		
		var img_3569 = TweenCanvas.createObject({
			x: 895.1253743171692,
			y: 606.7867838442326,
			alpha: 0,
			imageObj: {
				url: "images/path1150_065455705.svg",
				width: 13,
				height: 2,
			},
		});
		
		var img_3570 = TweenCanvas.createObject({
			x: 871.3006753921509,
			y: 606.7867838442326,
			alpha: 0,
			imageObj: {
				url: "images/path1152_652313719.svg",
				width: 19,
				height: 2,
			},
		});
		
		var img_3571 = TweenCanvas.createObject({
			x: 871.4106025695801,
			y: 618.7387491762638,
			alpha: 0,
			imageObj: {
				url: "images/path1154_933791840.svg",
				width: 62,
				height: 2,
			},
		});
		
		var img_3572 = TweenCanvas.createObject({
			x: 871.4106025695801,
			y: 636.6680704653263,
			alpha: 0,
			imageObj: {
				url: "images/path1156_498557782.svg",
				width: 62,
				height: 2,
			},
		});
		
		var img_3573 = TweenCanvas.createObject({
			x: 871.4106025695801,
			y: 642.6435058414936,
			alpha: 0,
			imageObj: {
				url: "images/path1158_439399080.svg",
				width: 62,
				height: 2,
			},
		});
		
		var img_3574 = TweenCanvas.createObject({
			x: 871.4106025695801,
			y: 648.6200968325138,
			alpha: 0,
			imageObj: {
				url: "images/path1160_676111824.svg",
				width: 62,
				height: 2,
			},
		});
		
		var img_3575 = TweenCanvas.createObject({
			x: 871.4106025695801,
			y: 655.0960489809513,
			alpha: 0,
			imageObj: {
				url: "images/path1162_606201574.svg",
				width: 62,
				height: 1,
			},
		});
		
		var img_3576 = TweenCanvas.createObject({
			x: 531.8212738037109,
			y: 440.76677322387695,
			alpha: 0,
			imageObj: {
				url: "images/path1164_077718174.svg",
				width: 164,
				height: 35,
			},
		});
		
		var img_3577 = TweenCanvas.createObject({
			x: 486.90050506591797,
			y: 486.29044342041016,
			alpha: 0,
			imageObj: {
				url: "images/path1166_271594494.svg",
				width: 46,
				height: 129,
			},
		});
		
		var img_3578 = TweenCanvas.createObject({
			x: 531.8213806152344,
			y: 457.0414276123047,
			alpha: 0,
			imageObj: {
				url: "images/path1168_867530584.svg",
				width: 164,
				height: 209,
			},
		});
		
		var img_3579 = TweenCanvas.createObject({
			x: 660.9333419799805,
			y: 465.5334656238556,
			alpha: 0,
			imageObj: {
				url: "images/path1170_248816239.svg",
				width: 25,
				height: 7,
			},
		});
		
		var img_3580 = TweenCanvas.createObject({
			x: 661.0163011550903,
			y: 465.70008850097656,
			alpha: 0,
			imageObj: {
				url: "images/path1172_623927577.svg",
				width: 25,
				height: 161,
			},
		});
		
		var img_3581 = TweenCanvas.createObject({
			x: 541.8772449493408,
			y: 465.98413491249084,
			alpha: 0,
			imageObj: {
				url: "images/path1174_499043363.svg",
				width: 30,
				height: 7,
			},
		});
		
		var img_3582 = TweenCanvas.createObject({
			x: 540.7713928222656,
			y: 465.98148345947266,
			alpha: 0,
			imageObj: {
				url: "images/path1176_076836297.svg",
				width: 31,
				height: 181,
			},
		});
		
		var img_3583 = TweenCanvas.createObject({
			x: 564.0726718902588,
			y: 441.96948623657227,
			alpha: 0,
			imageObj: {
				url: "images/path1178_393060055.svg",
				width: 23,
				height: 32,
			},
		});
		
		var img_3584 = TweenCanvas.createObject({
			x: 487.2606830596924,
			y: 486.7847595214844,
			alpha: 0,
			imageObj: {
				url: "images/path1180_074717248.svg",
				width: 39,
				height: 128,
			},
		});
		
		var img_3585 = TweenCanvas.createObject({
			x: 522.8126544952393,
			y: 582.9497203826904,
			alpha: 0,
			imageObj: {
				url: "images/path1182_003450201.svg",
				width: 10,
				height: 32,
			},
		});
		
		var img_3586 = TweenCanvas.createObject({
			x: 524.6085772514343,
			y: 486.2554340362549,
			alpha: 0,
			imageObj: {
				url: "images/path1184_431731041.svg",
				width: 8,
				height: 26,
			},
		});
		
		var img_3587 = TweenCanvas.createObject({
			x: 494.840030670166,
			y: 493.2510747909546,
			alpha: 0,
			imageObj: {
				url: "images/path1186_449729548.svg",
				width: 20,
				height: 22,
			},
		});
		
		var img_3588 = TweenCanvas.createObject({
			x: 491.96700859069824,
			y: 572.0212726593018,
			alpha: 0,
			imageObj: {
				url: "images/path1188_493969186.svg",
				width: 19,
				height: 33,
			},
		});
		
		var img_3613 = TweenCanvas.createObject({
			x: 1000.8359069824219,
			y: 539.0474243164062,
			alpha: 0,
			imageObj: {
				url: "images/path1238_442713531.svg",
				width: 306,
				height: 428,
			},
		});
		
		var img_3614 = TweenCanvas.createObject({
			x: 1016.6492023468018,
			y: 539.048095703125,
			alpha: 0,
			imageObj: {
				url: "images/path1240_689520583.svg",
				width: 5,
				height: 428,
			},
		});
		
		var img_3724 = TweenCanvas.createObject({
			x: 771.2726593017578,
			y: 1002.1087436676025,
			alpha: 0,
			imageObj: {
				url: "images/path1464_033656505.svg",
				width: 426,
				height: 31,
			},
		});
		
		var img_3725 = TweenCanvas.createObject({
			x: 1144.8352212905884,
			y: 1002.1087436676025,
			alpha: 0,
			imageObj: {
				url: "images/path1466_223325353.svg",
				width: 18,
				height: 31,
			},
		});
		
		var img_3726 = TweenCanvas.createObject({
			x: 771.080623626709,
			y: 1002.1087436676025,
			alpha: 0,
			imageObj: {
				url: "images/path1468_321005316.svg",
				width: 41,
				height: 31,
			},
		});
		
		var img_3727 = TweenCanvas.createObject({
			x: 1161.9552402496338,
			y: 1002.1087436676025,
			alpha: 0,
			imageObj: {
				url: "images/path1470_406847569.svg",
				width: 35,
				height: 31,
			},
		});
		
		var img_3728 = TweenCanvas.createObject({
			x: 810.9326057434082,
			y: 1002.1087436676025,
			alpha: 0,
			imageObj: {
				url: "images/path1472_199709785.svg",
				width: 99,
				height: 31,
			},
		});
		
		var img_3729 = TweenCanvas.createObject({
			x: 1016.6700286865234,
			y: 989.7913818359375,
			alpha: 0,
			imageObj: {
				url: "images/path1474_392690303.svg",
				width: 137,
				height: 15,
			},
		});
		
		var img_3730 = TweenCanvas.createObject({
			x: 757.569896697998,
			y: 1055.0299682617188,
			alpha: 0,
			imageObj: {
				url: "images/path1476_720335848.svg",
				width: 57,
				height: 23,
			},
		});
		
		var img_3731 = TweenCanvas.createObject({
			x: 757.6659736633301,
			y: 1066.150577545166,
			alpha: 0,
			imageObj: {
				url: "images/path1478_513919820.svg",
				width: 57,
				height: 12,
			},
		});
		
		var img_3732 = TweenCanvas.createObject({
			x: 757.6852531433105,
			y: 1055.2867674827576,
			alpha: 0,
			imageObj: {
				url: "images/path1480_321588154.svg",
				width: 57,
				height: 11,
			},
		});
		
		var img_3733 = TweenCanvas.createObject({
			x: 806.9613189697266,
			y: 1055.0907020568848,
			alpha: 0,
			imageObj: {
				url: "images/path1482_879275091.svg",
				width: 361,
				height: 24,
			},
		});
		
		var img_3734 = TweenCanvas.createObject({
			x: 757.8138742446899,
			y: 1062.892240524292,
			alpha: 0,
			imageObj: {
				url: "images/path1484_155321778.svg",
				width: 14,
				height: 7,
			},
		});
		
		var img_3735 = TweenCanvas.createObject({
			x: 1204.945984840393,
			y: 1057.3112773895264,
			alpha: 0,
			imageObj: {
				url: "images/path1486_657557741.svg",
				width: 25,
				height: 21,
			},
		});
		
		var img_3736 = TweenCanvas.createObject({
			x: 1204.7428169250488,
			y: 1057.288166999817,
			alpha: 0,
			imageObj: {
				url: "images/path1488_294842558.svg",
				width: 12,
				height: 21,
			},
		});
		
		var img_3737 = TweenCanvas.createObject({
			x: 806.9400024414062,
			y: 1070.1598942279816,
			alpha: 0,
			imageObj: {
				url: "images/path1490_292643426.svg",
				width: 361,
				height: 9,
			},
		});
		
		var img_3738 = TweenCanvas.createObject({
			x: 806.9700012207031,
			y: 1062.0213947296143,
			alpha: 0,
			imageObj: {
				url: "images/path1492_791134399.svg",
				width: 361,
				height: 9,
			},
		});
		
		var img_3739 = TweenCanvas.createObject({
			x: 1164.2273292541504,
			y: 1056.2219161987305,
			alpha: 0,
			imageObj: {
				url: "images/path1494_894570852.svg",
				width: 47,
				height: 23,
			},
		});
		
		var img_3740 = TweenCanvas.createObject({
			x: 1164.1872215270996,
			y: 1070.3573851585388,
			alpha: 0,
			imageObj: {
				url: "images/path1496_636948489.svg",
				width: 47,
				height: 9,
			},
		});
		
		var img_3741 = TweenCanvas.createObject({
			x: 1164.1532535552979,
			y: 1055.8859827518463,
			alpha: 0,
			imageObj: {
				url: "images/path1498_628893645.svg",
				width: 47,
				height: 7,
			},
		});
		
		var img_3766 = TweenCanvas.createObject({
			x: 69.14266967773438,
			y: 678.6103057861328,
			alpha: 0,
			imageObj: {
				url: "images/path1548_897164611.svg",
				width: 285,
				height: 401,
			},
		});
		
		var img_3767 = TweenCanvas.createObject({
			x: 68.9253921508789,
			y: 727.974796295166,
			alpha: 0,
			imageObj: {
				url: "images/path1550_705063731.svg",
				width: 117,
				height: 72,
			},
		});
		
		var img_3781 = TweenCanvas.createObject({
			x: 307.6199544072151,
			y: 760.0313883423805,
			alpha: 0,
			imageObj: {
				url: "images/path1578_820776070.svg",
				width: 2,
				height: 2,
			},
		});
		
		var img_3818 = TweenCanvas.createObject({
			x: 119.97251892089844,
			y: 803.1581786870956,
			alpha: 0,
			imageObj: {
				url: "images/path1652_673152047.svg",
				width: 207,
				height: 3,
			},
		});
		
		var img_3819 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 816.9588582515717,
			alpha: 0,
			imageObj: {
				url: "images/path1654_078782923.svg",
				width: 225,
				height: 2,
			},
		});
		
		var img_3820 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 830.259362757206,
			alpha: 0,
			imageObj: {
				url: "images/path1656_701974614.svg",
				width: 225,
				height: 2,
			},
		});
		
		var img_3821 = TweenCanvas.createObject({
			x: 102.27947998046875,
			y: 843.0606933236122,
			alpha: 0,
			imageObj: {
				url: "images/path1658_527819609.svg",
				width: 163,
				height: 3,
			},
		});
		
		var img_3822 = TweenCanvas.createObject({
			x: 119.97251892089844,
			y: 856.861413538456,
			alpha: 0,
			imageObj: {
				url: "images/path1660_813248756.svg",
				width: 207,
				height: 2,
			},
		});
		
		var img_3823 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 870.1623616218567,
			alpha: 0,
			imageObj: {
				url: "images/path1662_034238173.svg",
				width: 225,
				height: 2,
			},
		});
		
		var img_3824 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 882.9628255367279,
			alpha: 0,
			imageObj: {
				url: "images/path1664_345593478.svg",
				width: 225,
				height: 3,
			},
		});
		
		var img_3825 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 896.7623372077942,
			alpha: 0,
			imageObj: {
				url: "images/path1666_439768450.svg",
				width: 225,
				height: 2,
			},
		});
		
		var img_3826 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 910.0633788704872,
			alpha: 0,
			imageObj: {
				url: "images/path1668_408642516.svg",
				width: 225,
				height: 2,
			},
		});
		
		var img_3827 = TweenCanvas.createObject({
			x: 102.26947784423828,
			y: 922.8640380501747,
			alpha: 0,
			imageObj: {
				url: "images/path1670_913166849.svg",
				width: 208,
				height: 3,
			},
		});
		
		var img_3828 = TweenCanvas.createObject({
			x: 119.97251892089844,
			y: 936.1645426750183,
			alpha: 0,
			imageObj: {
				url: "images/path1672_254178563.svg",
				width: 207,
				height: 3,
			},
		});
		
		var img_3829 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 949.9655110836029,
			alpha: 0,
			imageObj: {
				url: "images/path1674_852961538.svg",
				width: 225,
				height: 2,
			},
		});
		
		var img_3830 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 963.2660766243935,
			alpha: 0,
			imageObj: {
				url: "images/path1676_362934278.svg",
				width: 225,
				height: 2,
			},
		});
		
		var img_3831 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 976.0673461556435,
			alpha: 0,
			imageObj: {
				url: "images/path1678_055883017.svg",
				width: 225,
				height: 3,
			},
		});
		
		var img_3832 = TweenCanvas.createObject({
			x: 102.33414459228516,
			y: 989.8682210445404,
			alpha: 0,
			imageObj: {
				url: "images/path1680_684658389.svg",
				width: 225,
				height: 2,
			},
		});
		
		var img_3833 = TweenCanvas.createObject({
			x: 262.316837310791,
			y: 1023.7972168028355,
			alpha: 0,
			imageObj: {
				url: "images/path1682_689054027.svg",
				width: 65,
				height: 2,
			},
		});
		
		var img_3834 = TweenCanvas.createObject({
			x: 246.42206954956055,
			y: 1037.098152667284,
			alpha: 0,
			imageObj: {
				url: "images/path1684_267409081.svg",
				width: 81,
				height: 2,
			},
		});
		
		var img_3835 = TweenCanvas.createObject({
			x: 102.26947784423828,
			y: 1003.1683430671692,
			alpha: 0,
			imageObj: {
				url: "images/path1686_432160669.svg",
				width: 208,
				height: 2,
			},
		});
		
		var img_3836 = TweenCanvas.createObject({
			x: 402.1886749267578,
			y: 929.0865325927734,
			alpha: 0,
			imageObj: {
				url: "images/path1688_805898889.svg",
				width: 291,
				height: 145,
			},
		});
		
		var img_3837 = TweenCanvas.createObject({
			x: 402.1886749267578,
			y: 879.174144744873,
			alpha: 0,
			imageObj: {
				url: "images/path1690_255564025.svg",
				width: 291,
				height: 51,
			},
		});
		
		var img_3838 = TweenCanvas.createObject({
			x: 402.1886749267578,
			y: 929.0865936279297,
			alpha: 0,
			imageObj: {
				url: "images/path1692_681697425.svg",
				width: 291,
				height: 145,
			},
		});
		
		var img_3839 = TweenCanvas.createObject({
			x: 402.1886749267578,
			y: 696.7261276245117,
			alpha: 0,
			imageObj: {
				url: "images/path1694_664309569.svg",
				width: 291,
				height: 145,
			},
		});
		
		var img_3840 = TweenCanvas.createObject({
			x: 568.1859359741211,
			y: 770.624828338623,
			alpha: 0,
			imageObj: {
				url: "images/path1696_532608847.svg",
				width: 108,
				height: 51,
			},
		});
		
		var img_3885 = TweenCanvas.createObject({
			x: 433.9957227706909,
			y: 779.009838104248,
			alpha: 0,
			imageObj: {
				url: "images/path1786_181648902.svg",
				width: 15,
				height: 19,
			},
		});
		
		var img_3886 = TweenCanvas.createObject({
			x: 441.3813228607178,
			y: 789.222110748291,
			alpha: 0,
			imageObj: {
				url: "images/path1788_115203973.svg",
				width: 9,
				height: 9,
			},
		});
		
		var img_3887 = TweenCanvas.createObject({
			x: 436.99674701690674,
			y: 785.9571591615677,
			alpha: 0,
			imageObj: {
				url: "images/path1790_288620338.svg",
				width: 9,
				height: 3,
			},
		});
		
		var img_3888 = TweenCanvas.createObject({
			x: 436.94533824920654,
			y: 788.9371779561043,
			alpha: 0,
			imageObj: {
				url: "images/path1792_964034199.svg",
				width: 9,
				height: 2,
			},
		});
		
		var img_3889 = TweenCanvas.createObject({
			x: 436.97900772094727,
			y: 790.9149377346039,
			alpha: 0,
			imageObj: {
				url: "images/path1794_108754356.svg",
				width: 7,
				height: 3,
			},
		});
		
		var img_3890 = TweenCanvas.createObject({
			x: 439.79532063007355,
			y: 794.8080688714981,
			alpha: 0,
			imageObj: {
				url: "images/path1796_931780513.svg",
				width: 5,
				height: 5,
			},
		});
		
		var img_3891 = TweenCanvas.createObject({
			x: 447.98743975162506,
			y: 787.1184984445572,
			alpha: 0,
			imageObj: {
				url: "images/path1798_612320783.svg",
				width: 5,
				height: 4,
			},
		});
		
		var img_3892 = TweenCanvas.createObject({
			x: 447.3426432609558,
			y: 788.2500894069672,
			alpha: 0,
			imageObj: {
				url: "images/path1800_990355422.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_3893 = TweenCanvas.createObject({
			x: 440.9940022826195,
			y: 780.860042317654,
			alpha: 0,
			imageObj: {
				url: "images/path1802_456570257.svg",
				width: 1,
				height: 1,
			},
		});
		
		var img_3894 = TweenCanvas.createObject({
			x: 489.8821324110031,
			y: 787.0747628211975,
			alpha: 0,
			imageObj: {
				url: "images/path1804_087906224.svg",
				width: 3,
				height: 10,
			},
		});
		
		var img_3895 = TweenCanvas.createObject({
			x: 486.58035802841187,
			y: 790.0612826347351,
			alpha: 0,
			imageObj: {
				url: "images/path1806_953430895.svg",
				width: 3,
				height: 7,
			},
		});
		
		var img_3896 = TweenCanvas.createObject({
			x: 476.77942752838135,
			y: 782.792384147644,
			alpha: 0,
			imageObj: {
				url: "images/path1808_931949960.svg",
				width: 16,
				height: 9,
			},
		});
		
		var img_3897 = TweenCanvas.createObject({
			x: 479.97568678855896,
			y: 792.0514554977417,
			alpha: 0,
			imageObj: {
				url: "images/path1810_089793929.svg",
				width: 3,
				height: 5,
			},
		});
		
		var img_3898 = TweenCanvas.createObject({
			x: 483.27707052230835,
			y: 793.0465896129608,
			alpha: 0,
			imageObj: {
				url: "images/path1812_698037114.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_3899 = TweenCanvas.createObject({
			x: 476.6746093034744,
			y: 793.8765599727631,
			alpha: 0,
			imageObj: {
				url: "images/path1814_315193226.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3900 = TweenCanvas.createObject({
			x: 517.183235168457,
			y: 778.1160764694214,
			alpha: 0,
			imageObj: {
				url: "images/path1816_640275622.svg",
				width: 18,
				height: 20,
			},
		});
		
		var img_3901 = TweenCanvas.createObject({
			x: 430.9766194820404,
			y: 803.8180419206619,
			alpha: 0,
			imageObj: {
				url: "images/path1818_277763759.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_3902 = TweenCanvas.createObject({
			x: 433.7793456315994,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1820_588129797.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3903 = TweenCanvas.createObject({
			x: 436.10525715351105,
			y: 804.6667764782906,
			alpha: 0,
			imageObj: {
				url: "images/path1822_918196076.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_3904 = TweenCanvas.createObject({
			x: 437.023942053318,
			y: 804.6887776851654,
			alpha: 0,
			imageObj: {
				url: "images/path1824_748504446.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3905 = TweenCanvas.createObject({
			x: 438.8753580749035,
			y: 803.818115234375,
			alpha: 0,
			imageObj: {
				url: "images/path1826_138393393.svg",
				width: 2,
				height: 4,
			},
		});
		
		var img_3906 = TweenCanvas.createObject({
			x: 439.79062497615814,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1828_426808880.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3907 = TweenCanvas.createObject({
			x: 441.7086669206619,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1830_628281656.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3908 = TweenCanvas.createObject({
			x: 445.1507160663605,
			y: 803.818115234375,
			alpha: 0,
			imageObj: {
				url: "images/path1832_014094155.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_3909 = TweenCanvas.createObject({
			x: 448.0506672859192,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1834_841515833.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_3910 = TweenCanvas.createObject({
			x: 450.1739501953125,
			y: 804.6667764782906,
			alpha: 0,
			imageObj: {
				url: "images/path1836_239809852.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3911 = TweenCanvas.createObject({
			x: 452.7712889909744,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1838_833053263.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3924 = TweenCanvas.createObject({
			x: 440.1085443496704,
			y: 815.830106601119,
			alpha: 0,
			imageObj: {
				url: "images/path1864_813749164.svg",
				width: 20,
				height: 1,
			},
		});
		
		var img_3925 = TweenCanvas.createObject({
			x: 427.1085934638977,
			y: 815.830106601119,
			alpha: 0,
			imageObj: {
				url: "images/path1866_432720464.svg",
				width: 11,
				height: 1,
			},
		});
		
		var img_3926 = TweenCanvas.createObject({
			x: 438.8241696357727,
			y: 818.9754475951195,
			alpha: 0,
			imageObj: {
				url: "images/path1868_585758371.svg",
				width: 14,
				height: 2,
			},
		});
		
		var img_3927 = TweenCanvas.createObject({
			x: 434.6526691913605,
			y: 818.9754475951195,
			alpha: 0,
			imageObj: {
				url: "images/path1870_828080493.svg",
				width: 4,
				height: 2,
			},
		});
		
		var img_3928 = TweenCanvas.createObject({
			x: 472.71793615818024,
			y: 803.8180419206619,
			alpha: 0,
			imageObj: {
				url: "images/path1872_253171988.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_3929 = TweenCanvas.createObject({
			x: 475.02000319957733,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1874_516411294.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3930 = TweenCanvas.createObject({
			x: 477.34593909978867,
			y: 804.6667764782906,
			alpha: 0,
			imageObj: {
				url: "images/path1876_821462802.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_3931 = TweenCanvas.createObject({
			x: 478.2652750611305,
			y: 804.6887776851654,
			alpha: 0,
			imageObj: {
				url: "images/path1878_301035037.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3932 = TweenCanvas.createObject({
			x: 480.1165852844715,
			y: 803.818115234375,
			alpha: 0,
			imageObj: {
				url: "images/path1880_048797384.svg",
				width: 2,
				height: 4,
			},
		});
		
		var img_3933 = TweenCanvas.createObject({
			x: 481.03128254413605,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1882_038327337.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3934 = TweenCanvas.createObject({
			x: 482.9500162601471,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1884_769332189.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3935 = TweenCanvas.createObject({
			x: 486.392578125,
			y: 803.818115234375,
			alpha: 0,
			imageObj: {
				url: "images/path1886_749228269.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_3936 = TweenCanvas.createObject({
			x: 488.7919840812683,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1888_777115983.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3937 = TweenCanvas.createObject({
			x: 490.915283203125,
			y: 804.6667764782906,
			alpha: 0,
			imageObj: {
				url: "images/path1890_764637580.svg",
				width: 4,
				height: 3,
			},
		});
		
		var img_3938 = TweenCanvas.createObject({
			x: 494.0126219987869,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1892_074167921.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3951 = TweenCanvas.createObject({
			x: 480.8498773574829,
			y: 815.830106601119,
			alpha: 0,
			imageObj: {
				url: "images/path1918_737008325.svg",
				width: 21,
				height: 1,
			},
		});
		
		var img_3952 = TweenCanvas.createObject({
			x: 467.8500485420227,
			y: 815.830106601119,
			alpha: 0,
			imageObj: {
				url: "images/path1920_987854153.svg",
				width: 12,
				height: 1,
			},
		});
		
		var img_3953 = TweenCanvas.createObject({
			x: 480.065242767334,
			y: 818.9754475951195,
			alpha: 0,
			imageObj: {
				url: "images/path1922_026222980.svg",
				width: 14,
				height: 2,
			},
		});
		
		var img_3954 = TweenCanvas.createObject({
			x: 475.8945231437683,
			y: 818.9754475951195,
			alpha: 0,
			imageObj: {
				url: "images/path1924_924934975.svg",
				width: 4,
				height: 2,
			},
		});
		
		var img_3955 = TweenCanvas.createObject({
			x: 514.1220052242279,
			y: 803.8180419206619,
			alpha: 0,
			imageObj: {
				url: "images/path1926_389495437.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_3956 = TweenCanvas.createObject({
			x: 516.9239420890808,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1928_491942327.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_3957 = TweenCanvas.createObject({
			x: 518.7506591677666,
			y: 804.6667764782906,
			alpha: 0,
			imageObj: {
				url: "images/path1930_175231742.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_3958 = TweenCanvas.createObject({
			x: 519.6693277955055,
			y: 804.6887776851654,
			alpha: 0,
			imageObj: {
				url: "images/path1932_006775276.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3959 = TweenCanvas.createObject({
			x: 522.0206217467785,
			y: 803.818115234375,
			alpha: 0,
			imageObj: {
				url: "images/path1934_037970286.svg",
				width: 1,
				height: 4,
			},
		});
		
		var img_3960 = TweenCanvas.createObject({
			x: 522.9358886480331,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1936_230062175.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_3961 = TweenCanvas.createObject({
			x: 524.3539305925369,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1938_068391720.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3962 = TweenCanvas.createObject({
			x: 527.7959635257721,
			y: 803.818115234375,
			alpha: 0,
			imageObj: {
				url: "images/path1940_139748907.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_3963 = TweenCanvas.createObject({
			x: 530.1959147453308,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1942_902466062.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3964 = TweenCanvas.createObject({
			x: 532.8193359375,
			y: 804.6667764782906,
			alpha: 0,
			imageObj: {
				url: "images/path1944_384716037.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_3965 = TweenCanvas.createObject({
			x: 535.9165689945221,
			y: 804.6887817382812,
			alpha: 0,
			imageObj: {
				url: "images/path1946_637206220.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_3978 = TweenCanvas.createObject({
			x: 522.7539300918579,
			y: 815.830106601119,
			alpha: 0,
			imageObj: {
				url: "images/path1972_829987583.svg",
				width: 20,
				height: 1,
			},
		});
		
		var img_3979 = TweenCanvas.createObject({
			x: 509.2539792060852,
			y: 815.830106601119,
			alpha: 0,
			imageObj: {
				url: "images/path1974_818207019.svg",
				width: 12,
				height: 1,
			},
		});
		
		var img_3980 = TweenCanvas.createObject({
			x: 521.9694333076477,
			y: 818.9754475951195,
			alpha: 0,
			imageObj: {
				url: "images/path1976_639756836.svg",
				width: 13,
				height: 2,
			},
		});
		
		var img_3981 = TweenCanvas.createObject({
			x: 517.2986979484558,
			y: 818.9754475951195,
			alpha: 0,
			imageObj: {
				url: "images/path1978_452140281.svg",
				width: 4,
				height: 2,
			},
		});
		
		var img_3982 = TweenCanvas.createObject({
			x: 570.6480598449707,
			y: 749.9106730222702,
			alpha: 0,
			imageObj: {
				url: "images/path1980_985077028.svg",
				width: 89,
				height: 2,
			},
		});
		
		var img_3983 = TweenCanvas.createObject({
			x: 570.8313941955566,
			y: 758.8781534731388,
			alpha: 0,
			imageObj: {
				url: "images/path1982_482967332.svg",
				width: 103,
				height: 2,
			},
		});
		
		var img_3984 = TweenCanvas.createObject({
			x: 767.5673294067383,
			y: 696.9200592041016,
			alpha: 0,
			imageObj: {
				url: "images/path1984_697579997.svg",
				width: 201,
				height: 121,
			},
		});
		
		var img_3999 = TweenCanvas.createObject({
			x: 767.5673294067383,
			y: 847.9986763000488,
			alpha: 0,
			imageObj: {
				url: "images/path2014_926229490.svg",
				width: 201,
				height: 121,
			},
		});
		
		var img_266 = TweenCanvas.createObject({
			x: 833,
			y: 922,
			alpha: 0,
			imageObj: {
				url: "images/building-technology_178543109.svg",
				width: 29,
				height: 12,
			},
		});
		
		var img_31096 = TweenCanvas.createObject({
			x: 873.1799207925797,
			y: 926.7519659996033,
			alpha: 0,
			imageObj: {
				url: "images/path2208_225763408.svg",
				width: 4,
				height: 6,
			},
		});
		
		var img_31097 = TweenCanvas.createObject({
			x: 874.1799500584602,
			y: 927.7520608901978,
			alpha: 0,
			imageObj: {
				url: "images/path2210_995049240.svg",
				width: 2,
				height: 2,
			},
		});
		
		var img_31098 = TweenCanvas.createObject({
			x: 872.8678934574127,
			y: 896.0788083076477,
			alpha: 0,
			imageObj: {
				url: "images/path2212_284663358.svg",
				width: 4,
				height: 7,
			},
		});
		
		var img_31099 = TweenCanvas.createObject({
			x: 872.9830248355865,
			y: 896.0263566970825,
			alpha: 0,
			imageObj: {
				url: "images/path2214_239295507.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31100 = TweenCanvas.createObject({
			x: 874.9414148926735,
			y: 899.7781901359558,
			alpha: 0,
			imageObj: {
				url: "images/path2216_593058394.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31101 = TweenCanvas.createObject({
			x: 872.1799902915955,
			y: 907.5546432733536,
			alpha: 0,
			imageObj: {
				url: "images/path2218_820565053.svg",
				width: 6,
				height: 4,
			},
		});
		
		var img_31102 = TweenCanvas.createObject({
			x: 872.120640039444,
			y: 916.6534876823425,
			alpha: 0,
			imageObj: {
				url: "images/path2220_049963627.svg",
				width: 6,
				height: 6,
			},
		});
		
		var img_31145 = TweenCanvas.createObject({
			x: 866.0679117739201,
			y: 893.9382476806641,
			alpha: 0,
			imageObj: {
				url: "images/path2306_383600994.svg",
				width: 2,
				height: 42,
			},
		});
		
		var img_31146 = TweenCanvas.createObject({
			x: 1787.8800048828125,
			y: 24.260711669921875,
			alpha: 0,
			imageObj: {
				url: "images/path2308_571545909.png",
				width: 373,
				height: 525,
			},
		});
		
		var img_31147 = TweenCanvas.createObject({
			x: 1340.106674194336,
			y: 24.260711669921875,
			alpha: 0,
			imageObj: {
				url: "images/path2310_551866854.png",
				width: 93,
				height: 525,
			},
		});
		
		var img_31148 = TweenCanvas.createObject({
			x: 1423.88671875,
			y: 540.4301223754883,
			alpha: 0,
			imageObj: {
				url: "images/path2312_189413028.png",
				width: 373,
				height: 139,
			},
		});
		
		var img_31149 = TweenCanvas.createObject({
			x: 1427.886734008789,
			y: 28.260711669921875,
			alpha: 0,
			imageObj: {
				url: "images/path2314_530613010.svg",
				width: 365,
				height: 517,
			},
		});
		
		var img_31200 = TweenCanvas.createObject({
			x: 1426.1066589355469,
			y: 28.039398193359375,
			alpha: 0,
			imageObj: {
				url: "images/path2416_786785565.svg",
				width: 367,
				height: 519,
			},
		});
		
		var img_31201 = TweenCanvas.createObject({
			x: 1426.1066731214523,
			y: 28.260711669921875,
			alpha: 0,
			imageObj: {
				url: "images/path2418_622785648.svg",
				width: 3,
				height: 517,
			},
		});
		
		var img_31202 = TweenCanvas.createObject({
			x: 1427.88671875,
			y: 544.1553874015808,
			alpha: 0,
			imageObj: {
				url: "images/path2420_900227253.svg",
				width: 365,
				height: 3,
			},
		});
		
		var img_31203 = TweenCanvas.createObject({
			x: 1427.88671875,
			y: 28.260711669921875,
			alpha: 0,
			imageObj: {
				url: "images/path2422_798207986.svg",
				width: 365,
				height: 517,
			},
		});
		
		var img_31204 = TweenCanvas.createObject({
			x: 1613.932975769043,
			y: 380.05278116464615,
			alpha: 0,
			imageObj: {
				url: "images/path2424_696096599.svg",
				width: 54,
				height: 2,
			},
		});
		
		var img_31205 = TweenCanvas.createObject({
			x: 1513.0065078735352,
			y: 380.05278116464615,
			alpha: 0,
			imageObj: {
				url: "images/path2426_368698083.svg",
				width: 92,
				height: 2,
			},
		});
		
		var img_31206 = TweenCanvas.createObject({
			x: 1638.9132318496704,
			y: 392.1754007935524,
			alpha: 0,
			imageObj: {
				url: "images/path2428_518668712.svg",
				width: 29,
				height: 2,
			},
		});
		
		var img_31207 = TweenCanvas.createObject({
			x: 1547.9268035888672,
			y: 392.1754007935524,
			alpha: 0,
			imageObj: {
				url: "images/path2430_115000376.svg",
				width: 80,
				height: 2,
			},
		});
		
		var img_31208 = TweenCanvas.createObject({
			x: 1513.033332824707,
			y: 392.1754007935524,
			alpha: 0,
			imageObj: {
				url: "images/path2432_263120838.svg",
				width: 25,
				height: 2,
			},
		});
		
		var img_31209 = TweenCanvas.createObject({
			x: 1571.2797164916992,
			y: 403.79725539684296,
			alpha: 0,
			imageObj: {
				url: "images/path2434_962504491.svg",
				width: 97,
				height: 3,
			},
		});
		
		var img_31210 = TweenCanvas.createObject({
			x: 1512.906509399414,
			y: 403.79725539684296,
			alpha: 0,
			imageObj: {
				url: "images/path2436_171186192.svg",
				width: 51,
				height: 3,
			},
		});
		
		var img_31211 = TweenCanvas.createObject({
			x: 1613.932975769043,
			y: 434.2194681763649,
			alpha: 0,
			imageObj: {
				url: "images/path2438_987595174.svg",
				width: 54,
				height: 3,
			},
		});
		
		var img_31212 = TweenCanvas.createObject({
			x: 1513.0065078735352,
			y: 434.2194681763649,
			alpha: 0,
			imageObj: {
				url: "images/path2440_441500259.svg",
				width: 92,
				height: 3,
			},
		});
		
		var img_31213 = TweenCanvas.createObject({
			x: 1638.9132318496704,
			y: 446.84208780527115,
			alpha: 0,
			imageObj: {
				url: "images/path2442_687011667.svg",
				width: 29,
				height: 2,
			},
		});
		
		var img_31214 = TweenCanvas.createObject({
			x: 1547.9268035888672,
			y: 446.84208780527115,
			alpha: 0,
			imageObj: {
				url: "images/path2444_338382134.svg",
				width: 80,
				height: 2,
			},
		});
		
		var img_31215 = TweenCanvas.createObject({
			x: 1513.033332824707,
			y: 446.84208780527115,
			alpha: 0,
			imageObj: {
				url: "images/path2446_891400400.svg",
				width: 25,
				height: 2,
			},
		});
		
		var img_31216 = TweenCanvas.createObject({
			x: 1571.2797164916992,
			y: 458.9639424085617,
			alpha: 0,
			imageObj: {
				url: "images/path2448_930122634.svg",
				width: 97,
				height: 2,
			},
		});
		
		var img_31217 = TweenCanvas.createObject({
			x: 1512.906509399414,
			y: 458.9639424085617,
			alpha: 0,
			imageObj: {
				url: "images/path2450_044047452.svg",
				width: 51,
				height: 2,
			},
		});
		
		var img_31218 = TweenCanvas.createObject({
			x: 1613.932975769043,
			y: 495.0488138794899,
			alpha: 0,
			imageObj: {
				url: "images/path2452_814582050.svg",
				width: 54,
				height: 3,
			},
		});
		
		var img_31219 = TweenCanvas.createObject({
			x: 1513.0065078735352,
			y: 495.0488138794899,
			alpha: 0,
			imageObj: {
				url: "images/path2454_088058238.svg",
				width: 92,
				height: 3,
			},
		});
		
		var img_31220 = TweenCanvas.createObject({
			x: 1638.9132318496704,
			y: 507.1714945435524,
			alpha: 0,
			imageObj: {
				url: "images/path2456_487503001.svg",
				width: 29,
				height: 3,
			},
		});
		
		var img_31221 = TweenCanvas.createObject({
			x: 1547.9268035888672,
			y: 507.1714945435524,
			alpha: 0,
			imageObj: {
				url: "images/path2458_471843454.svg",
				width: 80,
				height: 3,
			},
		});
		
		var img_31222 = TweenCanvas.createObject({
			x: 1513.033332824707,
			y: 507.1714945435524,
			alpha: 0,
			imageObj: {
				url: "images/path2460_551251433.svg",
				width: 25,
				height: 3,
			},
		});
		
		var img_31223 = TweenCanvas.createObject({
			x: 1571.2797164916992,
			y: 519.7938557863235,
			alpha: 0,
			imageObj: {
				url: "images/path2462_643150947.svg",
				width: 97,
				height: 2,
			},
		});
		
		var img_31224 = TweenCanvas.createObject({
			x: 1512.906509399414,
			y: 519.7938557863235,
			alpha: 0,
			imageObj: {
				url: "images/path2464_859694334.svg",
				width: 51,
				height: 2,
			},
		});
		
		var img_31225 = TweenCanvas.createObject({
			x: 1450.6198892593384,
			y: 432.72808837890625,
			alpha: 0,
			imageObj: {
				url: "images/path2466_669393328.svg",
				width: 30,
				height: 30,
			},
		});
		
		var img_31226 = TweenCanvas.createObject({
			x: 1462.679931640625,
			y: 451.9497904777527,
			alpha: 0,
			imageObj: {
				url: "images/path2468_692044249.svg",
				width: 6,
				height: 4,
			},
		});
		
		var img_31227 = TweenCanvas.createObject({
			x: 1455.1199216842651,
			y: 440.04625368118286,
			alpha: 0,
			imageObj: {
				url: "images/path2470_370185549.svg",
				width: 21,
				height: 12,
			},
		});
		
		var img_31228 = TweenCanvas.createObject({
			x: 1457.7028212547302,
			y: 442.0898325443268,
			alpha: 0,
			imageObj: {
				url: "images/path2472_796819299.svg",
				width: 6,
				height: 5,
			},
		});
		
		var img_31229 = TweenCanvas.createObject({
			x: 1457.4363210201263,
			y: 442.60011184215546,
			alpha: 0,
			imageObj: {
				url: "images/path2474_214396100.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31230 = TweenCanvas.createObject({
			x: 1459.6740790903568,
			y: 441.74339056015015,
			alpha: 0,
			imageObj: {
				url: "images/path2476_447515074.svg",
				width: 2,
				height: 2,
			},
		});
		
		var img_31231 = TweenCanvas.createObject({
			x: 1450.6198892593384,
			y: 493.6707763671875,
			alpha: 0,
			imageObj: {
				url: "images/path2478_352481910.svg",
				width: 30,
				height: 30,
			},
		});
		
		var img_31232 = TweenCanvas.createObject({
			x: 1454.1196460723877,
			y: 499.8507730960846,
			alpha: 0,
			imageObj: {
				url: "images/path2480_481038671.svg",
				width: 23,
				height: 7,
			},
		});
		
		var img_31233 = TweenCanvas.createObject({
			x: 1457.1175317764282,
			y: 503.80274868011475,
			alpha: 0,
			imageObj: {
				url: "images/path2482_832994459.svg",
				width: 17,
				height: 6,
			},
		});
		
		var img_31234 = TweenCanvas.createObject({
			x: 1460.1204166412354,
			y: 507.6847491264343,
			alpha: 0,
			imageObj: {
				url: "images/path2484_870047048.svg",
				width: 11,
				height: 5,
			},
		});
		
		var img_31235 = TweenCanvas.createObject({
			x: 1462.6199705600739,
			y: 511.6087646484375,
			alpha: 0,
			imageObj: {
				url: "images/path2486_258315595.svg",
				width: 6,
				height: 6,
			},
		});
		
		var img_31236 = TweenCanvas.createObject({
			x: 1450.6198892593384,
			y: 378.1748046875,
			alpha: 0,
			imageObj: {
				url: "images/path2488_543127864.svg",
				width: 30,
				height: 30,
			},
		});
		
		var img_31237 = TweenCanvas.createObject({
			x: 1454.61457157135,
			y: 384.1864070892334,
			alpha: 0,
			imageObj: {
				url: "images/path2490_283216041.svg",
				width: 22,
				height: 21,
			},
		});
		
		var img_31238 = TweenCanvas.createObject({
			x: 1464.1133787631989,
			y: 380.99144077301025,
			alpha: 0,
			imageObj: {
				url: "images/path2492_898968102.svg",
				width: 3,
				height: 13,
			},
		});
		
		var img_31239 = TweenCanvas.createObject({
			x: 1532.7866859436035,
			y: 156.67673641443253,
			alpha: 0,
			imageObj: {
				url: "images/path2494_112091465.svg",
				width: 57,
				height: 2,
			},
		});
		
		var img_31240 = TweenCanvas.createObject({
			x: 1592.799885749817,
			y: 156.67673641443253,
			alpha: 0,
			imageObj: {
				url: "images/path2496_620850303.svg",
				width: 15,
				height: 2,
			},
		});
		
		var img_31241 = TweenCanvas.createObject({
			x: 1484.7998046875,
			y: 156.67673641443253,
			alpha: 0,
			imageObj: {
				url: "images/path2498_548889513.svg",
				width: 45,
				height: 2,
			},
		});
		
		var img_31242 = TweenCanvas.createObject({
			x: 1611.2398433685303,
			y: 156.67673641443253,
			alpha: 0,
			imageObj: {
				url: "images/path2500_630131139.svg",
				width: 39,
				height: 2,
			},
		});
		
		var img_31243 = TweenCanvas.createObject({
			x: 1453.973225593567,
			y: 156.67673641443253,
			alpha: 0,
			imageObj: {
				url: "images/path2502_145250538.svg",
				width: 27,
				height: 2,
			},
		});
		
		var img_31244 = TweenCanvas.createObject({
			x: 1655.299934387207,
			y: 156.67673641443253,
			alpha: 0,
			imageObj: {
				url: "images/path2504_254394825.svg",
				width: 24,
				height: 2,
			},
		});
		
		var img_31245 = TweenCanvas.createObject({
			x: 1518.2598133087158,
			y: 170.94679152965546,
			alpha: 0,
			imageObj: {
				url: "images/path2506_843607128.svg",
				width: 34,
				height: 2,
			},
		});
		
		var img_31246 = TweenCanvas.createObject({
			x: 1626.219970703125,
			y: 170.94679152965546,
			alpha: 0,
			imageObj: {
				url: "images/path2508_884148724.svg",
				width: 53,
				height: 2,
			},
		});
		
		var img_31247 = TweenCanvas.createObject({
			x: 1476.0265293121338,
			y: 170.94679152965546,
			alpha: 0,
			imageObj: {
				url: "images/path2510_977439641.svg",
				width: 28,
				height: 2,
			},
		});
		
		var img_31248 = TweenCanvas.createObject({
			x: 1453.7732257843018,
			y: 170.94679152965546,
			alpha: 0,
			imageObj: {
				url: "images/path2512_777200490.svg",
				width: 19,
				height: 2,
			},
		});
		
		var img_31249 = TweenCanvas.createObject({
			x: 1507.1264972686768,
			y: 170.94679152965546,
			alpha: 0,
			imageObj: {
				url: "images/path2514_573588845.svg",
				width: 8,
				height: 2,
			},
		});
		
		var img_31250 = TweenCanvas.createObject({
			x: 1556.0266761779785,
			y: 170.94679152965546,
			alpha: 0,
			imageObj: {
				url: "images/path2516_680415322.svg",
				width: 17,
				height: 2,
			},
		});
		
		var img_31251 = TweenCanvas.createObject({
			x: 1576.8133125305176,
			y: 170.94679152965546,
			alpha: 0,
			imageObj: {
				url: "images/path2518_971856860.svg",
				width: 34,
				height: 2,
			},
		});
		
		var img_31252 = TweenCanvas.createObject({
			x: 1613.9532387256622,
			y: 170.94679152965546,
			alpha: 0,
			imageObj: {
				url: "images/path2520_094270350.svg",
				width: 9,
				height: 2,
			},
		});
		
		var img_31253 = TweenCanvas.createObject({
			x: 1529.8866539001465,
			y: 185.21671444177628,
			alpha: 0,
			imageObj: {
				url: "images/path2522_192237236.svg",
				width: 35,
				height: 2,
			},
		});
		
		var img_31254 = TweenCanvas.createObject({
			x: 1567.9198570251465,
			y: 185.21671444177628,
			alpha: 0,
			imageObj: {
				url: "images/path2524_774610039.svg",
				width: 32,
				height: 2,
			},
		});
		
		var img_31255 = TweenCanvas.createObject({
			x: 1619.1598777770996,
			y: 185.21671444177628,
			alpha: 0,
			imageObj: {
				url: "images/path2526_211634369.svg",
				width: 60,
				height: 2,
			},
		});
		
		var img_31256 = TweenCanvas.createObject({
			x: 1602.9533042907715,
			y: 185.21671444177628,
			alpha: 0,
			imageObj: {
				url: "images/path2528_651182130.svg",
				width: 13,
				height: 2,
			},
		});
		
		var img_31257 = TweenCanvas.createObject({
			x: 1508.6866207122803,
			y: 185.21671444177628,
			alpha: 0,
			imageObj: {
				url: "images/path2530_012219618.svg",
				width: 18,
				height: 2,
			},
		});
		
		var img_31258 = TweenCanvas.createObject({
			x: 1453.9932117462158,
			y: 185.21671444177628,
			alpha: 0,
			imageObj: {
				url: "images/path2532_648133152.svg",
				width: 51,
				height: 2,
			},
		});
		
		var img_31259 = TweenCanvas.createObject({
			x: 1551.7998046875,
			y: 142.26551711559296,
			alpha: 0,
			imageObj: {
				url: "images/path2534_866163952.svg",
				width: 34,
				height: 2,
			},
		});
		
		var img_31260 = TweenCanvas.createObject({
			x: 1516.2666015625,
			y: 142.26551711559296,
			alpha: 0,
			imageObj: {
				url: "images/path2536_194652733.svg",
				width: 32,
				height: 2,
			},
		});
		
		var img_31261 = TweenCanvas.createObject({
			x: 1453.946533203125,
			y: 142.26551711559296,
			alpha: 0,
			imageObj: {
				url: "images/path2538_508147548.svg",
				width: 43,
				height: 2,
			},
		});
		
		var img_31262 = TweenCanvas.createObject({
			x: 1500.7333984375,
			y: 142.26551711559296,
			alpha: 0,
			imageObj: {
				url: "images/path2540_783013492.svg",
				width: 12,
				height: 2,
			},
		});
		
		var img_31263 = TweenCanvas.createObject({
			x: 1589.106559753418,
			y: 142.26551711559296,
			alpha: 0,
			imageObj: {
				url: "images/path2542_200850631.svg",
				width: 34,
				height: 2,
			},
		});
		
		var img_31264 = TweenCanvas.createObject({
			x: 1500.0133304595947,
			y: 198.9867980480194,
			alpha: 0,
			imageObj: {
				url: "images/path2544_008669746.svg",
				width: 53,
				height: 3,
			},
		});
		
		var img_31265 = TweenCanvas.createObject({
			x: 1454.1131992340088,
			y: 198.9867980480194,
			alpha: 0,
			imageObj: {
				url: "images/path2546_134495718.svg",
				width: 42,
				height: 3,
			},
		});
		
		var img_31266 = TweenCanvas.createObject({
			x: 1634.9531898498535,
			y: 198.9867980480194,
			alpha: 0,
			imageObj: {
				url: "images/path2548_127815470.svg",
				width: 44,
				height: 3,
			},
		});
		
		var img_31267 = TweenCanvas.createObject({
			x: 1600.913215637207,
			y: 198.9867980480194,
			alpha: 0,
			imageObj: {
				url: "images/path2550_851182697.svg",
				width: 32,
				height: 3,
			},
		});
		
		var img_31268 = TweenCanvas.createObject({
			x: 1588.2398924827576,
			y: 198.9867980480194,
			alpha: 0,
			imageObj: {
				url: "images/path2552_369890275.svg",
				width: 10,
				height: 3,
			},
		});
		
		var img_31269 = TweenCanvas.createObject({
			x: 1556.0665855407715,
			y: 198.9867980480194,
			alpha: 0,
			imageObj: {
				url: "images/path2554_944789332.svg",
				width: 29,
				height: 3,
			},
		});
		
		var img_31270 = TweenCanvas.createObject({
			x: 1485.8932619094849,
			y: 212.02884823083878,
			alpha: 0,
			imageObj: {
				url: "images/path2556_142070080.svg",
				width: 32,
				height: 2,
			},
		});
		
		var img_31271 = TweenCanvas.createObject({
			x: 1454.139892578125,
			y: 212.02884823083878,
			alpha: 0,
			imageObj: {
				url: "images/path2558_712495617.svg",
				width: 28,
				height: 2,
			},
		});
		
		var img_31272 = TweenCanvas.createObject({
			x: 1520.759765625,
			y: 212.02884823083878,
			alpha: 0,
			imageObj: {
				url: "images/path2560_362823191.svg",
				width: 29,
				height: 2,
			},
		});
		
		var img_31273 = TweenCanvas.createObject({
			x: 1456.4265460968018,
			y: 89.09675788879395,
			alpha: 0,
			imageObj: {
				url: "images/path2562_049411703.svg",
				width: 11,
				height: 23,
			},
		});
		
		var img_31274 = TweenCanvas.createObject({
			x: 1468.9266271591187,
			y: 89.59685134887695,
			alpha: 0,
			imageObj: {
				url: "images/path2564_281234606.svg",
				width: 11,
				height: 22,
			},
		});
		
		var img_31275 = TweenCanvas.createObject({
			x: 1479.7799801826477,
			y: 89.59685134887695,
			alpha: 0,
			imageObj: {
				url: "images/path2566_760086676.svg",
				width: 13,
				height: 22,
			},
		});
		
		var img_31276 = TweenCanvas.createObject({
			x: 1494.7734375,
			y: 89.59685134887695,
			alpha: 0,
			imageObj: {
				url: "images/path2568_946449256.svg",
				width: 11,
				height: 22,
			},
		});
		
		var img_31277 = TweenCanvas.createObject({
			x: 1506.8931798934937,
			y: 89.59685134887695,
			alpha: 0,
			imageObj: {
				url: "images/path2570_719688638.svg",
				width: 12,
				height: 22,
			},
		});
		
		var img_31278 = TweenCanvas.createObject({
			x: 1525.9133462905884,
			y: 89.59685134887695,
			alpha: 0,
			imageObj: {
				url: "images/path2572_040376088.svg",
				width: 17,
				height: 22,
			},
		});
		
		var img_31279 = TweenCanvas.createObject({
			x: 1545.266666650772,
			y: 89.59685134887695,
			alpha: 0,
			imageObj: {
				url: "images/path2574_812839148.svg",
				width: 4,
				height: 22,
			},
		});
		
		var img_31280 = TweenCanvas.createObject({
			x: 1550.9933919906616,
			y: 89.59685134887695,
			alpha: 0,
			imageObj: {
				url: "images/path2576_481672014.svg",
				width: 12,
				height: 22,
			},
		});
		
		var img_31281 = TweenCanvas.createObject({
			x: 1564.7933430671692,
			y: 89.59685134887695,
			alpha: 0,
			imageObj: {
				url: "images/path2578_032155266.svg",
				width: 11,
				height: 22,
			},
		});
		
		var img_31282 = TweenCanvas.createObject({
			x: 1584.8933429718018,
			y: 89.73204135894775,
			alpha: 0,
			imageObj: {
				url: "images/path2580_381045170.svg",
				width: 11,
				height: 22,
			},
		});
		
		var img_31283 = TweenCanvas.createObject({
			x: 1598.0266437530518,
			y: 89.09675788879395,
			alpha: 0,
			imageObj: {
				url: "images/path2582_923362220.svg",
				width: 11,
				height: 23,
			},
		});
		
		var img_31284 = TweenCanvas.createObject({
			x: 1501.8932453393936,
			y: 238.849440574646,
			alpha: 0,
			imageObj: {
				url: "images/path2584_842354908.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_31285 = TweenCanvas.createObject({
			x: 1509.0265461206436,
			y: 238.849440574646,
			alpha: 0,
			imageObj: {
				url: "images/path2586_307620244.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_31286 = TweenCanvas.createObject({
			x: 1516.1732746362686,
			y: 238.849440574646,
			alpha: 0,
			imageObj: {
				url: "images/path2588_883516555.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_31287 = TweenCanvas.createObject({
			x: 1525.199935913086,
			y: 239.85020139813423,
			alpha: 0,
			imageObj: {
				url: "images/path2590_095299287.svg",
				width: 115,
				height: 2,
			},
		});
		
		var img_31411 = TweenCanvas.createObject({
			x: 1517.6199055984616,
			y: 287.79144287109375,
			alpha: 0,
			imageObj: {
				url: "images/path2844_692845666.svg",
				width: 1,
				height: 1,
			},
		});
		
		var img_31428 = TweenCanvas.createObject({
			x: 1359.1673889160156,
			y: 695.9874267578125,
			alpha: 0,
			imageObj: {
				url: "images/path2878_656826311.svg",
				width: 832,
				height: 327,
			},
		});
		
		var img_31429 = TweenCanvas.createObject({
			x: 1835.159927368164,
			y: 760.0927581787109,
			alpha: 0,
			imageObj: {
				url: "images/path2880_008338917.svg",
				width: 321,
				height: 244,
			},
		});
		
		var img_31430 = TweenCanvas.createObject({
			x: 1359.2126770019531,
			y: 729.8901214599609,
			alpha: 0,
			imageObj: {
				url: "images/path2882_866598659.svg",
				width: 832,
				height: 279,
			},
		});
		
		var img_31431 = TweenCanvas.createObject({
			x: 1835.159927368164,
			y: 760.0927581787109,
			alpha: 0,
			imageObj: {
				url: "images/path2884_879966680.svg",
				width: 321,
				height: 244,
			},
		});
		
		var img_31432 = TweenCanvas.createObject({
			x: 1672.1065521240234,
			y: 760.0654678344727,
			alpha: 0,
			imageObj: {
				url: "images/path2886_665115015.svg",
				width: 159,
				height: 244,
			},
		});
		
		var img_31435 = TweenCanvas.createObject({
			x: 1478.7798156738281,
			y: 770.922737121582,
			alpha: 0,
			imageObj: {
				url: "images/path2892_600887782.svg",
				width: 157,
				height: 86,
			},
		});
		
		var img_31436 = TweenCanvas.createObject({
			x: 1501.8198547363281,
			y: 770.922737121582,
			alpha: 0,
			imageObj: {
				url: "images/path2894_252997565.svg",
				width: 134,
				height: 86,
			},
		});
		
		var img_31437 = TweenCanvas.createObject({
			x: 1578.913314819336,
			y: 799.5928077697754,
			alpha: 0,
			imageObj: {
				url: "images/path2896_413299678.svg",
				width: 55,
				height: 55,
			},
		});
		
		var img_31438 = TweenCanvas.createObject({
			x: 1481.933364868164,
			y: 770.890739440918,
			alpha: 0,
			imageObj: {
				url: "images/path2898_937858204.svg",
				width: 81,
				height: 82,
			},
		});
		
		var img_31439 = TweenCanvas.createObject({
			x: 1602.9465808868408,
			y: 862.8235511779785,
			alpha: 0,
			imageObj: {
				url: "images/path2900_482998643.svg",
				width: 23,
				height: 38,
			},
		});
		
		var img_31440 = TweenCanvas.createObject({
			x: 1612.5865716934204,
			y: 862.8234939575195,
			alpha: 0,
			imageObj: {
				url: "images/path2902_882713636.svg",
				width: 13,
				height: 38,
			},
		});
		
		var img_31441 = TweenCanvas.createObject({
			x: 1362.0613269805908,
			y: 857.7427291870117,
			alpha: 0,
			imageObj: {
				url: "images/path2904_417241238.svg",
				width: 61,
				height: 60,
			},
		});
		
		var img_31445 = TweenCanvas.createObject({
			x: 1834.78662109375,
			y: 880.110066652298,
			alpha: 0,
			imageObj: {
				url: "images/path2912_069029199.svg",
				width: 87,
				height: 7,
			},
		});
		
		var img_31446 = TweenCanvas.createObject({
			x: 1612.6332397460938,
			y: 704.3201332092285,
			alpha: 0,
			imageObj: {
				url: "images/path2914_118191122.svg",
				width: 549,
				height: 11,
			},
		});
		
		var img_31447 = TweenCanvas.createObject({
			x: 1554.2266235351562,
			y: 738.0474691390991,
			alpha: 0,
			imageObj: {
				url: "images/path2916_552665531.svg",
				width: 586,
				height: 11,
			},
		});
		
		var img_31448 = TweenCanvas.createObject({
			x: 1578.7333011627197,
			y: 941.0960569381714,
			alpha: 0,
			imageObj: {
				url: "images/path2918_363303789.svg",
				width: 61,
				height: 11,
			},
		});
		
		var img_31449 = TweenCanvas.createObject({
			x: 1489.199935913086,
			y: 859.0693845748901,
			alpha: 0,
			imageObj: {
				url: "images/path2920_802590958.svg",
				width: 91,
				height: 11,
			},
		});
		
		var img_31450 = TweenCanvas.createObject({
			x: 1460.053352355957,
			y: 941.0960569381714,
			alpha: 0,
			imageObj: {
				url: "images/path2922_117461138.svg",
				width: 71,
				height: 11,
			},
		});
		
		var img_31451 = TweenCanvas.createObject({
			x: 1349.2306213378906,
			y: 941.0960569381714,
			alpha: 0,
			imageObj: {
				url: "images/path2924_086986191.svg",
				width: 80,
				height: 11,
			},
		});
		
		var img_31452 = TweenCanvas.createObject({
			x: 2147.6533527374268,
			y: 941.0960569381714,
			alpha: 0,
			imageObj: {
				url: "images/path2926_233800886.svg",
				width: 46,
				height: 11,
			},
		});
		
		var img_31454 = TweenCanvas.createObject({
			x: 1840.0264625549316,
			y: 941.0960569381714,
			alpha: 0,
			imageObj: {
				url: "images/path2930_376334406.svg",
				width: 93,
				height: 11,
			},
		});
		
		var img_31471 = TweenCanvas.createObject({
			x: 1672.1065521240234,
			y: 760.0654678344727,
			alpha: 0,
			imageObj: {
				url: "images/path2964_209037821.svg",
				width: 159,
				height: 244,
			},
		});
		
		var img_31475 = TweenCanvas.createObject({
			x: 1829.8332030773163,
			y: 760.0934448242188,
			alpha: 0,
			imageObj: {
				url: "images/path2972_968908793.svg",
				width: 6,
				height: 244,
			},
		});
		
		var img_31478 = TweenCanvas.createObject({
			x: 1829.6532063782215,
			y: 760.0934448242188,
			alpha: 0,
			imageObj: {
				url: "images/path2978_819889500.svg",
				width: 1,
				height: 244,
			},
		});
		
		var img_61 = TweenCanvas.createObject({
			x: 948,
			y: 283,
			alpha: 0,
			imageObj: {
				url: "images/furgo-2-1_725303649.png",
				width: 1701,
				height: 956,
			},
		});
		
		var img_31433 = TweenCanvas.createObject({
			x: 1338.2146530151367,
			y: 935.6781158447266,
			alpha: 0,
			imageObj: {
				url: "images/path2888_862423306.svg",
				width: 169,
				height: 87,
			},
		});
		
		var img_31443 = TweenCanvas.createObject({
			x: 2160.979784011841,
			y: 862.069465637207,
			alpha: 0,
			imageObj: {
				url: "images/path2908_935910992.svg",
				width: 30,
				height: 27,
			},
		});
		
		var img_31442 = TweenCanvas.createObject({
			x: 2160.979784011841,
			y: 888.0194492340088,
			alpha: 0,
			imageObj: {
				url: "images/path2906_960126386.svg",
				width: 30,
				height: 43,
			},
		});
		
		var img_31434 = TweenCanvas.createObject({
			x: 2130,
			y: 926,
			alpha: 0,
			imageObj: {
				url: "images/path2890_885919846.svg",
				width: 74,
				height: 97,
			},
		});
		
		var img_31453 = TweenCanvas.createObject({
			x: 1987.2266578674316,
			y: 941.0960569381714,
			alpha: 0,
			imageObj: {
				url: "images/path2928_433119736.svg",
				width: 80,
				height: 11,
			},
		});
		
		var img_31455 = TweenCanvas.createObject({
			x: 1837.5732727050781,
			y: 892.8040974140167,
			alpha: 0,
			imageObj: {
				url: "images/path2932_294193433.svg",
				width: 82,
				height: 7,
			},
		});
		
		var img_31456 = TweenCanvas.createObject({
			x: 1843.9398498535156,
			y: 766.2101278305054,
			alpha: 0,
			imageObj: {
				url: "images/path2934_878150637.svg",
				width: 296,
				height: 11,
			},
		});
		
		var img_31457 = TweenCanvas.createObject({
			x: 1927.2734069824219,
			y: 945.8126068115234,
			alpha: 0,
			imageObj: {
				url: "images/path2936_263968609.svg",
				width: 152,
				height: 153,
			},
		});
		
		var img_31458 = TweenCanvas.createObject({
			x: 1955.273323059082,
			y: 974.3139572143555,
			alpha: 0,
			imageObj: {
				url: "images/path2938_732664667.svg",
				width: 96,
				height: 96,
			},
		});
		
		var img_31459 = TweenCanvas.createObject({
			x: 1960.779800415039,
			y: 979.8133773803711,
			alpha: 0,
			imageObj: {
				url: "images/path2940_563961864.svg",
				width: 85,
				height: 85,
			},
		});
		
		var img_31460 = TweenCanvas.createObject({
			x: 1969.7732391357422,
			y: 988.8126373291016,
			alpha: 0,
			imageObj: {
				url: "images/path2942_222156559.svg",
				width: 67,
				height: 67,
			},
		});
		
		var img_31461 = TweenCanvas.createObject({
			x: 1986.273323059082,
			y: 1005.3140869140625,
			alpha: 0,
			imageObj: {
				url: "images/path2944_861458427.svg",
				width: 34,
				height: 34,
			},
		});
		
		var img_31462 = TweenCanvas.createObject({
			x: 1991.273274421692,
			y: 1010.3141145706177,
			alpha: 0,
			imageObj: {
				url: "images/path2946_661175232.svg",
				width: 24,
				height: 24,
			},
		});
		
		var img_31463 = TweenCanvas.createObject({
			x: 1435.886489868164,
			y: 945.8126068115234,
			alpha: 0,
			imageObj: {
				url: "images/path2948_843150707.svg",
				width: 153,
				height: 153,
			},
		});
		
		var img_31464 = TweenCanvas.createObject({
			x: 1464.893196105957,
			y: 974.3139572143555,
			alpha: 0,
			imageObj: {
				url: "images/path2950_977001288.svg",
				width: 95,
				height: 96,
			},
		});
		
		var img_31465 = TweenCanvas.createObject({
			x: 1469.886489868164,
			y: 979.8133773803711,
			alpha: 0,
			imageObj: {
				url: "images/path2952_929697083.svg",
				width: 85,
				height: 85,
			},
		});
		
		var img_31466 = TweenCanvas.createObject({
			x: 1478.8933563232422,
			y: 988.8126373291016,
			alpha: 0,
			imageObj: {
				url: "images/path2954_129065041.svg",
				width: 67,
				height: 67,
			},
		});
		
		var img_31467 = TweenCanvas.createObject({
			x: 1495.893196105957,
			y: 1005.3140869140625,
			alpha: 0,
			imageObj: {
				url: "images/path2956_810944586.svg",
				width: 33,
				height: 34,
			},
		});
		
		var img_31468 = TweenCanvas.createObject({
			x: 1500.393147468567,
			y: 1010.3141145706177,
			alpha: 0,
			imageObj: {
				url: "images/path2958_522238641.svg",
				width: 24,
				height: 24,
			},
		});
		
		var img_31469 = TweenCanvas.createObject({
			x: 1478.9597644805908,
			y: 824.8847370147705,
			alpha: 0,
			imageObj: {
				url: "images/path2960_347208459.svg",
				width: 30,
				height: 40,
			},
		});
		
		var img_31470 = TweenCanvas.createObject({
			x: 1508.2866044044495,
			y: 824.8847370147705,
			alpha: 0,
			imageObj: {
				url: "images/path2962_440612240.svg",
				width: 12,
				height: 40,
			},
		});
		
		var img_31472 = TweenCanvas.createObject({
			x: 1677.733169555664,
			y: 766.2101278305054,
			alpha: 0,
			imageObj: {
				url: "images/path2966_167897019.svg",
				width: 147,
				height: 11,
			},
		});
		
		var img_31473 = TweenCanvas.createObject({
			x: 1677.733169555664,
			y: 941.0960569381714,
			alpha: 0,
			imageObj: {
				url: "images/path2968_729310917.svg",
				width: 147,
				height: 11,
			},
		});
		
		var img_31474 = TweenCanvas.createObject({
			x: 1672.033187866211,
			y: 929.9173541069031,
			alpha: 0,
			imageObj: {
				url: "images/path2970_208205107.svg",
				width: 159,
				height: 7,
			},
		});
		
		var img_31479 = TweenCanvas.createObject({
			x: 1829.653076171875,
			y: 929.9173541069031,
			alpha: 0,
			imageObj: {
				url: "images/path2980_449469333.svg",
				width: 1,
				height: 7,
			},
		});
		
		var img_31480 = TweenCanvas.createObject({
			x: 1730.9734363555908,
			y: 781.321403503418,
			alpha: 0,
			imageObj: {
				url: "images/path2982_580763547.svg",
				width: 61,
				height: 61,
			},
		});
		
		var img_31481 = TweenCanvas.createObject({
			x: 1686.1597633361816,
			y: 817.0814094543457,
			alpha: 0,
			imageObj: {
				url: "images/path2984_414006709.svg",
				width: 108,
				height: 109,
			},
		});
		
		var img_31482 = TweenCanvas.createObject({
			x: 1779.453239440918,
			y: 807.0707244873047,
			alpha: 0,
			imageObj: {
				url: "images/path2986_439389018.svg",
				width: 39,
				height: 67,
			},
		});
		
		var img_31483 = TweenCanvas.createObject({
			x: 1755.946662902832,
			y: 806.096773147583,
			alpha: 0,
			imageObj: {
				url: "images/path2988_620051437.svg",
				width: 36,
				height: 30,
			},
		});
		
		var img_173 = TweenCanvas.createObject({
			x: 155,
			y: 0,
			alpha: 0,
			imageObj: {
				url: "images/furgo-3-2_298665999.png",
				width: 2163,
				height: 764,
			},
		});
		
		var img_1087 = TweenCanvas.createObject({
			x: 1900,
			y: 0,
			alpha: 0,
			imageObj: {
				url: "images/png-uniforme-1_292863086.png",
				width: 1331,
				height: 1390,
			},
		});
		
		var img_31484 = TweenCanvas.createObject({
			x: 1781.6198568344116,
			y: 836.5674524307251,
			alpha: 0,
			imageObj: {
				url: "images/path2990_566966542.svg",
				width: 9,
				height: 7,
			},
		});
		
		var img_31485 = TweenCanvas.createObject({
			x: 1749.1933250427246,
			y: 819.7320823669434,
			alpha: 0,
			imageObj: {
				url: "images/path2992_144330469.svg",
				width: 45,
				height: 56,
			},
		});
		
		var img_31486 = TweenCanvas.createObject({
			x: 1707.6866369247437,
			y: 892.9107582569122,
			alpha: 0,
			imageObj: {
				url: "images/path2994_994659797.svg",
				width: 11,
				height: 8,
			},
		});
		
		var img_31487 = TweenCanvas.createObject({
			x: 1719.2398924827576,
			y: 892.9940915107727,
			alpha: 0,
			imageObj: {
				url: "images/path2996_427755536.svg",
				width: 8,
				height: 8,
			},
		});
		
		var img_31488 = TweenCanvas.createObject({
			x: 1726.966617822647,
			y: 892.9940915107727,
			alpha: 0,
			imageObj: {
				url: "images/path2998_620668757.svg",
				width: 9,
				height: 8,
			},
		});
		
		var img_31489 = TweenCanvas.createObject({
			x: 1736.0597982406616,
			y: 890.7774291038513,
			alpha: 0,
			imageObj: {
				url: "images/path3000_264749372.svg",
				width: 6,
				height: 10,
			},
		});
		
		var img_31490 = TweenCanvas.createObject({
			x: 1742.1932940483093,
			y: 893.0707516670227,
			alpha: 0,
			imageObj: {
				url: "images/path3002_178905885.svg",
				width: 7,
				height: 8,
			},
		});
		
		var img_31491 = TweenCanvas.createObject({
			x: 1749.9597980976105,
			y: 893.1214189529419,
			alpha: 0,
			imageObj: {
				url: "images/path3004_780711659.svg",
				width: 8,
				height: 10,
			},
		});
		
		var img_31492 = TweenCanvas.createObject({
			x: 1761.0132322311401,
			y: 892.9940915107727,
			alpha: 0,
			imageObj: {
				url: "images/path3006_832117840.svg",
				width: 6,
				height: 8,
			},
		});
		
		var img_31493 = TweenCanvas.createObject({
			x: 1766.6398763656616,
			y: 892.9940915107727,
			alpha: 0,
			imageObj: {
				url: "images/path3008_490179755.svg",
				width: 8,
				height: 8,
			},
		});
		
		var img_31494 = TweenCanvas.createObject({
			x: 1774.3533527851105,
			y: 890.7774291038513,
			alpha: 0,
			imageObj: {
				url: "images/path3010_337513269.svg",
				width: 5,
				height: 10,
			},
		});
		
		var img_31495 = TweenCanvas.createObject({
			x: 1706.8266274929047,
			y: 902.9207437038422,
			alpha: 0,
			imageObj: {
				url: "images/path3012_004454505.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_31496 = TweenCanvas.createObject({
			x: 1709.940006494522,
			y: 903.732751429081,
			alpha: 0,
			imageObj: {
				url: "images/path3014_715592301.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31497 = TweenCanvas.createObject({
			x: 1713.0797525644302,
			y: 902.9207437038422,
			alpha: 0,
			imageObj: {
				url: "images/path3016_062062223.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_31498 = TweenCanvas.createObject({
			x: 1715.353238940239,
			y: 903.7114298343658,
			alpha: 0,
			imageObj: {
				url: "images/path3018_082698076.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31499 = TweenCanvas.createObject({
			x: 1716.313297510147,
			y: 903.732751429081,
			alpha: 0,
			imageObj: {
				url: "images/path3020_661074937.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31500 = TweenCanvas.createObject({
			x: 1719.0666177272797,
			y: 902.9227497577667,
			alpha: 0,
			imageObj: {
				url: "images/path3022_157140828.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_31501 = TweenCanvas.createObject({
			x: 1721.959977209568,
			y: 903.7114298343658,
			alpha: 0,
			imageObj: {
				url: "images/path3024_001925079.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31502 = TweenCanvas.createObject({
			x: 1722.913151025772,
			y: 903.732751429081,
			alpha: 0,
			imageObj: {
				url: "images/path3026_015063955.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31503 = TweenCanvas.createObject({
			x: 1725.0331867933273,
			y: 903.732751429081,
			alpha: 0,
			imageObj: {
				url: "images/path3028_500651422.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31504 = TweenCanvas.createObject({
			x: 1727.2198892831802,
			y: 902.9207437038422,
			alpha: 0,
			imageObj: {
				url: "images/path3030_297632029.svg",
				width: 2,
				height: 4,
			},
		});
		
		var img_31505 = TweenCanvas.createObject({
			x: 1728.0931315124035,
			y: 902.9207437038422,
			alpha: 0,
			imageObj: {
				url: "images/path3032_153203242.svg",
				width: 2,
				height: 4,
			},
		});
		
		var img_31506 = TweenCanvas.createObject({
			x: 1728.8133137822151,
			y: 903.7314046025276,
			alpha: 0,
			imageObj: {
				url: "images/path3034_048727480.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31507 = TweenCanvas.createObject({
			x: 1730.7667317390442,
			y: 903.732751429081,
			alpha: 0,
			imageObj: {
				url: "images/path3036_872861341.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31508 = TweenCanvas.createObject({
			x: 1733.9666503667831,
			y: 902.9207437038422,
			alpha: 0,
			imageObj: {
				url: "images/path3038_040402522.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_31509 = TweenCanvas.createObject({
			x: 1736.179996728897,
			y: 903.732751429081,
			alpha: 0,
			imageObj: {
				url: "images/path3040_364783643.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31510 = TweenCanvas.createObject({
			x: 1738.3399413824081,
			y: 903.732751429081,
			alpha: 0,
			imageObj: {
				url: "images/path3042_852513836.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31511 = TweenCanvas.createObject({
			x: 1739.8065104186535,
			y: 902.9207437038422,
			alpha: 0,
			imageObj: {
				url: "images/path3044_682655554.svg",
				width: 1,
				height: 4,
			},
		});
		
		var img_31512 = TweenCanvas.createObject({
			x: 1740.179996728897,
			y: 904.0574259757996,
			alpha: 0,
			imageObj: {
				url: "images/path3046_701721039.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31513 = TweenCanvas.createObject({
			x: 1742.7931965589523,
			y: 903.7114298343658,
			alpha: 0,
			imageObj: {
				url: "images/path3048_829144086.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31514 = TweenCanvas.createObject({
			x: 1742.2798664569855,
			y: 793.9173786640167,
			alpha: 0,
			imageObj: {
				url: "images/path3050_422481592.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_31515 = TweenCanvas.createObject({
			x: 1744.666520178318,
			y: 794.7067952156067,
			alpha: 0,
			imageObj: {
				url: "images/path3052_161548506.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31516 = TweenCanvas.createObject({
			x: 1745.619938135147,
			y: 794.7280557751656,
			alpha: 0,
			imageObj: {
				url: "images/path3054_477863791.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31517 = TweenCanvas.createObject({
			x: 1747.7399739027023,
			y: 794.7280557751656,
			alpha: 0,
			imageObj: {
				url: "images/path3056_258889811.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31518 = TweenCanvas.createObject({
			x: 1749.933398425579,
			y: 793.9154784679413,
			alpha: 0,
			imageObj: {
				url: "images/path3058_786028313.svg",
				width: 2,
				height: 4,
			},
		});
		
		var img_31519 = TweenCanvas.createObject({
			x: 1751.2999837175012,
			y: 793.9154784679413,
			alpha: 0,
			imageObj: {
				url: "images/path3060_501101749.svg",
				width: 1,
				height: 4,
			},
		});
		
		var img_31520 = TweenCanvas.createObject({
			x: 1752.0198567509651,
			y: 794.7260945439339,
			alpha: 0,
			imageObj: {
				url: "images/path3062_202928396.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31521 = TweenCanvas.createObject({
			x: 1753.973209619522,
			y: 794.7280557751656,
			alpha: 0,
			imageObj: {
				url: "images/path3064_587888721.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31522 = TweenCanvas.createObject({
			x: 1756.9266601204872,
			y: 793.9154784679413,
			alpha: 0,
			imageObj: {
				url: "images/path3066_712273705.svg",
				width: 2,
				height: 4,
			},
		});
		
		var img_31523 = TweenCanvas.createObject({
			x: 1758.2665201425552,
			y: 794.747416138649,
			alpha: 0,
			imageObj: {
				url: "images/path3068_481609718.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31524 = TweenCanvas.createObject({
			x: 1760.359830737114,
			y: 794.7280557751656,
			alpha: 0,
			imageObj: {
				url: "images/path3070_904250698.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31525 = TweenCanvas.createObject({
			x: 1761.8331868425012,
			y: 793.9154784679413,
			alpha: 0,
			imageObj: {
				url: "images/path3072_295218957.svg",
				width: 1,
				height: 4,
			},
		});
		
		var img_31526 = TweenCanvas.createObject({
			x: 1762.139925122261,
			y: 794.7067952156067,
			alpha: 0,
			imageObj: {
				url: "images/path3074_480897785.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31527 = TweenCanvas.createObject({
			x: 1764.179996728897,
			y: 794.7280557751656,
			alpha: 0,
			imageObj: {
				url: "images/path3076_582074426.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31528 = TweenCanvas.createObject({
			x: 1766.3399413824081,
			y: 794.7280557751656,
			alpha: 0,
			imageObj: {
				url: "images/path3078_440509593.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31529 = TweenCanvas.createObject({
			x: 1767.600065112114,
			y: 794.7280557751656,
			alpha: 0,
			imageObj: {
				url: "images/path3080_928672389.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31530 = TweenCanvas.createObject({
			x: 1769.8333659172058,
			y: 793.9154784679413,
			alpha: 0,
			imageObj: {
				url: "images/path3082_810252587.svg",
				width: 3,
				height: 4,
			},
		});
		
		var img_31531 = TweenCanvas.createObject({
			x: 1772.086490869522,
			y: 795.0527913570404,
			alpha: 0,
			imageObj: {
				url: "images/path3084_649521044.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31532 = TweenCanvas.createObject({
			x: 1774.273258447647,
			y: 794.7280557751656,
			alpha: 0,
			imageObj: {
				url: "images/path3086_268124997.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31533 = TweenCanvas.createObject({
			x: 1776.8066242933273,
			y: 794.7067952156067,
			alpha: 0,
			imageObj: {
				url: "images/path3088_964843301.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31534 = TweenCanvas.createObject({
			x: 1778.346451818943,
			y: 794.7280557751656,
			alpha: 0,
			imageObj: {
				url: "images/path3090_066725117.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31535 = TweenCanvas.createObject({
			x: 1780.2532551884651,
			y: 795.0368163585663,
			alpha: 0,
			imageObj: {
				url: "images/path3092_287499373.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31536 = TweenCanvas.createObject({
			x: 1707.080013036728,
			y: 906.8327351808548,
			alpha: 0,
			imageObj: {
				url: "images/path3094_061336104.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31537 = TweenCanvas.createObject({
			x: 1708.4332031011581,
			y: 906.8307046890259,
			alpha: 0,
			imageObj: {
				url: "images/path3096_111177983.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31538 = TweenCanvas.createObject({
			x: 1709.9664713144302,
			y: 907.1627116203308,
			alpha: 0,
			imageObj: {
				url: "images/path3098_989469895.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31539 = TweenCanvas.createObject({
			x: 1712.0198730230331,
			y: 906.8527098894119,
			alpha: 0,
			imageObj: {
				url: "images/path3100_421186998.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31540 = TweenCanvas.createObject({
			x: 1713.9932779967785,
			y: 906.8307046890259,
			alpha: 0,
			imageObj: {
				url: "images/path3102_219238348.svg",
				width: 1,
				height: 3,
			},
		});
		
		var img_31541 = TweenCanvas.createObject({
			x: 1714.373225927353,
			y: 907.143395960331,
			alpha: 0,
			imageObj: {
				url: "images/path3104_795158117.svg",
				width: 3,
				height: 3,
			},
		});
		
		var img_31542 = TweenCanvas.createObject({
			x: 1717.3866860866547,
			y: 906.8307046890259,
			alpha: 0,
			imageObj: {
				url: "images/path3106_748296417.svg",
				width: 4,
				height: 3,
			},
		});
		
		var img_31543 = TweenCanvas.createObject({
			x: 1720.9998860359192,
			y: 907.143395960331,
			alpha: 0,
			imageObj: {
				url: "images/path3108_956259810.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31544 = TweenCanvas.createObject({
			x: 1723.133268237114,
			y: 907.1213908195496,
			alpha: 0,
			imageObj: {
				url: "images/path3110_517657795.svg",
				width: 1,
				height: 3,
			},
		});
		
		var img_31545 = TweenCanvas.createObject({
			x: 1723.9397460222244,
			y: 906.8307046890259,
			alpha: 0,
			imageObj: {
				url: "images/path3112_490149103.svg",
				width: 2,
				height: 3,
			},
		});
		
		var img_31546 = TweenCanvas.createObject({
			x: 1729.6530923843384,
			y: 863.0814781188965,
			alpha: 0,
			imageObj: {
				url: "images/path3114_327258575.svg",
				width: 21,
				height: 17,
			},
		});
		
		var img_31547 = TweenCanvas.createObject({
			x: 1736.16002035141,
			y: 868.5747842788696,
			alpha: 0,
			imageObj: {
				url: "images/path3116_335989876.svg",
				width: 8,
				height: 8,
			},
		});
		
		var img_31548 = TweenCanvas.createObject({
			x: 1780.3065266609192,
			y: 834.0680947303772,
			alpha: 0,
			imageObj: {
				url: "images/path3118_736584373.svg",
				width: 11,
				height: 11,
			},
		});
		
		var img_31549 = TweenCanvas.createObject({
			x: 1777.8931798934937,
			y: 836.025426864624,
			alpha: 0,
			imageObj: {
				url: "images/path3120_281304268.svg",
				width: 9,
				height: 9,
			},
		});
		
		var img_31550 = TweenCanvas.createObject({
			x: 1782.2270183563232,
			y: 837.1353921890259,
			alpha: 0,
			imageObj: {
				url: "images/path3122_537897437.svg",
				width: 5,
				height: 6,
			},
		});
		
		var img_31551 = TweenCanvas.createObject({
			x: 1781.7264654636383,
			y: 838.1134114265442,
			alpha: 0,
			imageObj: {
				url: "images/path3124_626939834.svg",
				width: 4,
				height: 5,
			},
		});
		
		var img_31552 = TweenCanvas.createObject({
			x: 1756.9982290267944,
			y: 801.8380653858185,
			alpha: 0,
			imageObj: {
				url: "images/path3126_595375409.svg",
				width: 10,
				height: 8,
			},
		});
		
		var img_31553 = TweenCanvas.createObject({
			x: 1759.9995484352112,
			y: 804.284717798233,
			alpha: 0,
			imageObj: {
				url: "images/path3128_158597501.svg",
				width: 4,
				height: 4,
			},
		});
		
		var img_31568 = TweenCanvas.createObject({
			x: 1886.9332031011581,
			y: 863.3667439520359,
			alpha: 0,
			imageObj: {
				url: "images/path3158_057206093.svg",
				width: 2,
				height: 2,
			},
		});
		
		var img_31646 = TweenCanvas.createObject({
			x: 2018.919954419136,
			y: 873.1054321229458,
			alpha: 0,
			imageObj: {
				url: "images/path3314_637995039.svg",
				width: 2,
				height: 1,
			},
		});
		
		var img_31653 = TweenCanvas.createObject({
			x: 2135.386621057987,
			y: 860.7207559943199,
			alpha: 0,
			imageObj: {
				url: "images/path3328_410584790.svg",
				width: 2,
				height: 2,
			},
		});
		
		var img_31676 = TweenCanvas.createObject({
			x: 2037.846451818943,
			y: 863.9801025390625,
			alpha: 0,
			imageObj: {
				url: "images/path3374_580667357.svg",
				width: 1,
				height: 1,
			},
		});
		
		var img_31693 = TweenCanvas.createObject({
			x: 2138.886555969715,
			y: 868.1907796263695,
			alpha: 0,
			imageObj: {
				url: "images/path3408_884414005.svg",
				width: 1,
				height: 1,
			},
		});
		
		var img_31699 = TweenCanvas.createObject({
			x: 2021.8998372331262,
			y: 871.738777667284,
			alpha: 0,
			imageObj: {
				url: "images/path3420_951631172.svg",
				width: 1,
				height: 1,
			},
		});
		
		var img_31705 = TweenCanvas.createObject({
			x: 2084.8665852844715,
			y: 896.674812823534,
			alpha: 0,
			imageObj: {
				url: "images/path3432_231314020.svg",
				width: 1,
				height: 1,
			},
		});
		
		var img_31706 = TweenCanvas.createObject({
			x: 2084.8665852844715,
			y: 896.0354492142797,
			alpha: 0,
			imageObj: {
				url: "images/path3434_863110898.svg",
				width: 1,
				height: 2,
			},
		});
		
		var img_1914 = TweenCanvas.createObject({
			x: 1896,
			y: 260,
			alpha: 0,
			imageObj: {
				url: "images/logo-png-sin-r-1_195357005.png",
				width: 145,
				height: 27,
			},
		});
		
		var img_1915 = TweenCanvas.createObject({
			x: 1430,
			y: 29,
			alpha: 0,
			imageObj: {
				url: "images/portada-documentos-1_001017993.jpg",
				width: 363,
				height: 514,
			},
		});
		
		var img_51 = TweenCanvas.createObject({
			x: 1821,
			y: 623,
			alpha: 0,
			imageObj: {
				url: "images/png-con-r-1_592093352.png",
				width: 339,
				height: 339,
			},
		});
		
		var img_90 = TweenCanvas.createObject({
			x: 997,
			y: 302,
			alpha: 0,
			imageObj: {
				url: "images/furgo-3-1_273648060.png",
				width: 1646,
				height: 926,
			},
		});
		
		var img_120 = TweenCanvas.createObject({
			x: 969,
			y: 280,
			alpha: 0,
			imageObj: {
				url: "images/redes-1_929293340.png",
				width: 1693,
				height: 953,
			},
		});
		
		var img_177 = TweenCanvas.createObject({
			x: 759,
			y: 224,
			alpha: 0,
			imageObj: {
				url: "images/redes8negro-1_124930232.png",
				width: 537,
				height: 302,
			},
		});
		
		var img_180 = TweenCanvas.createObject({
			x: 1198,
			y: 91,
			alpha: 0,
			imageObj: {
				url: "images/png-con-rblanco-1_032678695.png",
				width: 64,
				height: 13,
			},
		});
		
		var img_181 = TweenCanvas.createObject({
			x: 827,
			y: 116,
			alpha: 0,
			imageObj: {
				url: "images/png-con-r-2_517932092.png",
				width: 132,
				height: 132,
			},
		});
		
		var img_281 = TweenCanvas.createObject({
			x: 571,
			y: 685,
			alpha: 0,
			imageObj: {
				url: "images/png-con-r-3_579851438.png",
				width: 88,
				height: 88,
			},
		});
		
		var img_187 = TweenCanvas.createObject({
			x: 833,
			y: 409,
			alpha: 0,
			imageObj: {
				url: "images/logo-png-sin-r-2_029861595.png",
				width: 74,
				height: 14,
			},
		});
		
		var img_264 = TweenCanvas.createObject({
			x: 838,
			y: 873,
			alpha: 0,
			imageObj: {
				url: "images/logo-png-sin-r-3_086374285.png",
				width: 60,
				height: 11,
			},
		});
		
		var img_200 = TweenCanvas.createObject({
			x: 567,
			y: 544,
			alpha: 0,
			imageObj: {
				url: "images/png-con-rblanco-2_566317396.png",
				width: 102,
				height: 21,
			},
		});
		
		var img_291 = TweenCanvas.createObject({
			x: 497,
			y: 1012,
			alpha: 0,
			imageObj: {
				url: "images/png-con-rblanco-6_876518352.png",
				width: 102,
				height: 21,
			},
		});
		
		var img_2611 = TweenCanvas.createObject({
			x: 560,
			y: 193,
			alpha: 0,
			imageObj: {
				url: "images/png-con-rblanco-5_727693820.png",
				width: 150,
				height: 31,
			},
		});
		
		var img_263 = TweenCanvas.createObject({
			x: 817,
			y: 746,
			alpha: 0,
			imageObj: {
				url: "images/png-con-rblanco-4_452335617.png",
				width: 102,
				height: 21,
			},
		});
		
		var img_311 = TweenCanvas.createObject({
			x: 1027,
			y: 729,
			alpha: 0,
			imageObj: {
				url: "images/png-con-rblanco-7_755826503.png",
				width: 267,
				height: 55,
			},
		});
		
		var img_262 = TweenCanvas.createObject({
			x: 820,
			y: 1010,
			alpha: 0,
			imageObj: {
				url: "images/png-con-rblanco-3_152423377.png",
				width: 78,
				height: 15,
			},
		});
		
		var img_265 = TweenCanvas.createObject({
			x: 829,
			y: 895,
			alpha: 0,
			imageObj: {
				url: "images/build-tech_596981229.svg",
				width: 33,
				height: 42,
			},
		});
		
		var img_267 = TweenCanvas.createObject({
			x: 881,
			y: 917,
			alpha: 0,
			imageObj: {
				url: "images/wwwbuildtechcom_445221561.svg",
				width: 36,
				height: 5,
			},
		});
		
		var img_269 = TweenCanvas.createObject({
			x: 882,
			y: 907,
			alpha: 0,
			imageObj: {
				url: "images/infobuildtechcom_367521476.svg",
				width: 36,
				height: 5,
			},
		});
		
		var img_268 = TweenCanvas.createObject({
			x: 882,
			y: 927,
			alpha: 0,
			imageObj: {
				url: "images/c-verge-de-montserrat-9_240950667.svg",
				width: 44,
				height: 5,
			},
		});
		
		var img_2610 = TweenCanvas.createObject({
			x: 882,
			y: 897,
			alpha: 0,
			imageObj: {
				url: "images/34-662285999_490215276.svg",
				width: 28,
				height: 5,
			},
		});
		
		var img_280 = TweenCanvas.createObject({
			x: 778,
			y: 547,
			alpha: 0,
			imageObj: {
				url: "images/tarjeta-jan-1_977946889.png",
				width: 182,
				height: 135,
			},
		});
		
		var img_282 = TweenCanvas.createObject({
			x: 427,
			y: 810,
			alpha: 0,
			imageObj: {
				url: "images/domotic-systems_280735437.svg",
				width: 32,
				height: 5,
			},
		});
		
		var img_283 = TweenCanvas.createObject({
			x: 472,
			y: 810,
			alpha: 0,
			imageObj: {
				url: "images/server-rental_059395112.svg",
				width: 24,
				height: 5,
			},
		});
		
		var img_290 = TweenCanvas.createObject({
			x: 509,
			y: 810,
			alpha: 0,
			imageObj: {
				url: "images/corporative-design_413220400.svg",
				width: 34,
				height: 5,
			},
		});
		
		var img_300 = TweenCanvas.createObject({
			x: 70,
			y: 676,
			alpha: 0,
			imageObj: {
				url: "images/manual-implantacion-gophish-1-1_195678776.png",
				width: 286,
				height: 405,
			},
		});
		
		var img_310 = TweenCanvas.createObject({
			x: 192,
			y: 74,
			alpha: 0,
			imageObj: {
				url: "images/logo-negro-sobre-blanco-1_867271719.jpg",
				width: 107,
				height: 107,
			},
		});
		
		var img_1025 = TweenCanvas.createObject({
			x: 1492,
			y: 1109.1786499023438,
			alpha: 0,
			imageObj: {
				url: "images/iphone-12-black_964172463.png",
				width: 719,
				height: 1108,
			},
		});
		
		var img_1050 = TweenCanvas.createObject({
			x: 81,
			y: 1133.8772583007812,
			alpha: 0,
			imageObj: {
				url: "images/group-457_942798879.png",
				width: 1447,
				height: 1061,
			},
		});
		
		var img_1081 = TweenCanvas.createObject({
			x: 113,
			y: 1174,
			alpha: 0,
			imageObj: {
				url: "images/image-1_597314941.jpg",
				width: 1383,
				height: 778,
			},
		});
		
		var img_1082 = TweenCanvas.createObject({
			x: 779,
			y: 1969,
			alpha: 0,
			imageObj: {
				url: "images/apple-logo-black-1_388260726.png",
				width: 51,
				height: 61,
			},
		});
		
		var img_1088 = TweenCanvas.createObject({
			x: 2047.586181640625,
			y: 1255.9753723144531,
			alpha: 0,
			imageObj: {
				url: "images/group-5357_293666085.svg",
				width: 1148,
				height: 831,
			},
		});
		
		var img_10813 = TweenCanvas.createObject({
			x: 2254,
			y: 2018,
			alpha: 0,
			imageObj: {
				url: "images/ellipse-117_935136976.png",
				width: 964,
				height: 154,
			},
		});
		
		var img_210 = TweenCanvas.createObject({
			x: 713,
			y: 347,
			alpha: 0,
			imageObj: {
				url: "images/tarjetajan-1_222617082.png",
				width: 324,
				height: 313,
			},
		});
		
		var img_1110 = TweenCanvas.createObject({
			x: 1450,
			y: 920,
			alpha: 0,
			imageObj: {
				url: "images/jan-redes-1_860819780.png",
				width: 1781,
				height: 1262,
			},
		});
		
		TweenCanvas.preload(function() {
			startAnimation();
		});
		
		function startAnimation() {
			TweenCanvas.start();
			
			gsap.defaults({ transformOrigin: '0.5, 0.5' });
			
			gsap.to(img_1086, { alpha: 0, x: 2191, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1086, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2191, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2191, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_33, { alpha: 0, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_33, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1012, { alpha: 0, x: 0, y: 1117.7694702148438, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1012, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 0, y: 1117.7694702148438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 0, y: 1117.7694702148438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_336, { alpha: 0, x: 513.625244140625, y: 45.194793701171875, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_336, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 513.625244140625, y: 45.194793701171875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 513.625244140625, y: 45.194793701171875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_337, { alpha: 0, x: 527.756649017334, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_337, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 527.756649017334, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 527.756649017334, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_338, { alpha: 0, x: 529.4219889640808, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_338, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 529.4219889640808, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 529.4219889640808, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_339, { alpha: 0, x: 535.0926594734192, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_339, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 535.0926594734192, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 535.0926594734192, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_340, { alpha: 0, x: 547.9306554794312, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_340, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 547.9306554794312, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 547.9306554794312, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_341, { alpha: 0, x: 549.5953450202942, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_341, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 549.5953450202942, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 549.5953450202942, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_342, { alpha: 0, x: 555.2653238773346, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_342, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 555.2653238773346, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 555.2653238773346, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_343, { alpha: 0, x: 568.1039795875549, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_343, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 568.1039795875549, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 568.1039795875549, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_344, { alpha: 0, x: 569.7686848640442, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_344, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 569.7686848640442, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 569.7686848640442, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_345, { alpha: 0, x: 575.4393391609192, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_345, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 575.4393391609192, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 575.4393391609192, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_346, { alpha: 0, x: 588.2773351669312, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_346, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 588.2773351669312, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 588.2773351669312, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_347, { alpha: 0, x: 589.9426920413971, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_347, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 589.9426920413971, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 589.9426920413971, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_348, { alpha: 0, x: 595.6133463382721, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_348, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 595.6133463382721, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 595.6133463382721, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_349, { alpha: 0, x: 608.951334476471, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_349, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 608.951334476471, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 608.951334476471, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_350, { alpha: 0, x: 610.1160318851471, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_350, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 610.1160318851471, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 610.1160318851471, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_351, { alpha: 0, x: 615.7860351800919, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_351, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 615.7860351800919, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 615.7860351800919, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_352, { alpha: 0, x: 628.6253576278687, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_352, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 628.6253576278687, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 628.6253576278687, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_353, { alpha: 0, x: 630.2899088859558, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_353, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 630.2899088859558, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 630.2899088859558, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_354, { alpha: 0, x: 635.959993481636, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_354, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 635.959993481636, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 635.959993481636, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_355, { alpha: 0, x: 648.7986078262329, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_355, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 648.7986078262329, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 648.7986078262329, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_356, { alpha: 0, x: 650.4632487297058, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_356, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 650.4632487297058, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 650.4632487297058, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_357, { alpha: 0, x: 656.1333658695221, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_357, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 656.1333658695221, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 656.1333658695221, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_358, { alpha: 0, x: 668.9720373153687, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_358, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 668.9720373153687, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 668.9720373153687, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_359, { alpha: 0, x: 670.6365885734558, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_359, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 670.6365885734558, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 670.6365885734558, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_360, { alpha: 0, x: 676.3072428703308, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_360, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 676.3072428703308, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 676.3072428703308, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_361, { alpha: 0, x: 689.1452550888062, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_361, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 689.1452550888062, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 689.1452550888062, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_362, { alpha: 0, x: 690.8106119632721, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_362, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 690.8106119632721, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 690.8106119632721, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_363, { alpha: 0, x: 696.9806152582169, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_363, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 696.9806152582169, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 696.9806152582169, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_364, { alpha: 0, x: 709.3192868232727, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_364, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 709.3192868232727, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 709.3192868232727, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_365, { alpha: 0, x: 710.9846110343933, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_365, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 710.9846110343933, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 710.9846110343933, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_366, { alpha: 0, x: 716.6539225578308, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_366, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 716.6539225578308, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 716.6539225578308, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_367, { alpha: 0, x: 729.9932775497437, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_367, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 729.9932775497437, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 729.9932775497437, y: 56.00210762023926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_368, { alpha: 0, x: 731.1572916507721, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_368, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 731.1572916507721, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 731.1572916507721, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_369, { alpha: 0, x: 736.8279459476471, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_369, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 736.8279459476471, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 736.8279459476471, y: 28.114787101745605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3175, { alpha: 0, x: 814.9646453857422, y: 34.394134521484375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3175, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 814.9646453857422, y: 34.394134521484375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 814.9646453857422, y: 34.394134521484375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3176, { alpha: 0, x: 821.9645690917969, y: 43.89405822753906, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3176, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 821.9645690917969, y: 43.89405822753906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 821.9645690917969, y: 43.89405822753906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3280, { alpha: 0, x: 814.9646453857422, y: 384.0327911376953, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3280, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 814.9646453857422, y: 384.0327911376953, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 814.9646453857422, y: 384.0327911376953, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3281, { alpha: 0, x: 922.6166172027588, y: 388.0327911376953, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3281, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 922.6166172027588, y: 388.0327911376953, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 922.6166172027588, y: 388.0327911376953, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3282, { alpha: 0, x: 918.7706379890442, y: 388.0327911376953, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3282, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 918.7706379890442, y: 388.0327911376953, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 918.7706379890442, y: 388.0327911376953, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3313, { alpha: 0, x: 58.218414306640625, y: 32.92413330078125, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3313, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 58.218414306640625, y: 32.92413330078125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 58.218414306640625, y: 32.92413330078125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3314, { alpha: 0, x: 75.71858215332031, y: 58.040069580078125, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3314, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 75.71858215332031, y: 58.040069580078125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 75.71858215332031, y: 58.040069580078125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3315, { alpha: 0, x: 82.21774291992188, y: 65.71348571777344, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3315, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 82.21774291992188, y: 65.71348571777344, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 82.21774291992188, y: 65.71348571777344, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3316, { alpha: 0, x: 122.625732421875, y: 565.9054203033447, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3316, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 122.625732421875, y: 565.9054203033447, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 122.625732421875, y: 565.9054203033447, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3413, { alpha: 0, x: 118.94554036855698, y: 121.69081725180149, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3413, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 118.94554036855698, y: 121.69081725180149, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 118.94554036855698, y: 121.69081725180149, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3420, { alpha: 0, x: 180.71332550048828, y: 509.91733598709106, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3420, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 180.71332550048828, y: 509.91733598709106, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 180.71332550048828, y: 509.91733598709106, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3421, { alpha: 0, x: 151.7130584716797, y: 522.3913858532906, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3421, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 151.7130584716797, y: 522.3913858532906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 151.7130584716797, y: 522.3913858532906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3422, { alpha: 0, x: 122.625732421875, y: 565.856071472168, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3422, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 122.625732421875, y: 565.856071472168, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 122.625732421875, y: 565.856071472168, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3423, { alpha: 0, x: 1004.1033325195312, y: 54.8067626953125, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3423, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1004.1033325195312, y: 54.8067626953125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1004.1033325195312, y: 54.8067626953125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3424, { alpha: 0, x: 1259.0139646530151, y: 58.91412353515625, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3424, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1259.0139646530151, y: 58.91412353515625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1259.0139646530151, y: 58.91412353515625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3425, { alpha: 0, x: 1041.1740188598633, y: 54.79075622558594, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3425, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1041.1740188598633, y: 54.79075622558594, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1041.1740188598633, y: 54.79075622558594, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_172, { alpha: 0, x: 1032, y: 89, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_172, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1032, y: 89, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1032, y: 89, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3427, { alpha: 0, x: 1128.103286743164, y: 73.0187554359436, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3427, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1128.103286743164, y: 73.0187554359436, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1128.103286743164, y: 73.0187554359436, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3428, { alpha: 0, x: 1171.1470012664795, y: 73.24882245063782, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3428, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1171.1470012664795, y: 73.24882245063782, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1171.1470012664795, y: 73.24882245063782, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3429, { alpha: 0, x: 1129.1033363342285, y: 444.0654716491699, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3429, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1129.1033363342285, y: 444.0654716491699, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1129.1033363342285, y: 444.0654716491699, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3430, { alpha: 0, x: 1057.011897802353, y: 263.1081074476242, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3430, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1057.011897802353, y: 263.1081074476242, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1057.011897802353, y: 263.1081074476242, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3431, { alpha: 0, x: 1063.874610900879, y: 88.1614990234375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3431, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1063.874610900879, y: 88.1614990234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1063.874610900879, y: 88.1614990234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3532, { alpha: 0, x: 776.6399993896484, y: 547.9613265991211, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3532, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 776.6399993896484, y: 547.9613265991211, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 776.6399993896484, y: 547.9613265991211, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3533, { alpha: 0, x: 783.1406936645508, y: 570.9741821289062, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3533, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 783.1406936645508, y: 570.9741821289062, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 783.1406936645508, y: 570.9741821289062, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3534, { alpha: 0, x: 796.8141117095947, y: 584.7827072143555, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3534, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 796.8141117095947, y: 584.7827072143555, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 796.8141117095947, y: 584.7827072143555, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3535, { alpha: 0, x: 800.3141117095947, y: 589.2834243774414, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3535, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 800.3141117095947, y: 589.2834243774414, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 800.3141117095947, y: 589.2834243774414, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3536, { alpha: 0, x: 855.6407136917114, y: 553.2753252983093, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3536, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 855.6407136917114, y: 553.2753252983093, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 855.6407136917114, y: 553.2753252983093, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3537, { alpha: 0, x: 873.9627418518066, y: 572.3260538578033, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3537, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 873.9627418518066, y: 572.3260538578033, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 873.9627418518066, y: 572.3260538578033, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3538, { alpha: 0, x: 857.9685325622559, y: 578.4307291507721, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3538, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 857.9685325622559, y: 578.4307291507721, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 857.9685325622559, y: 578.4307291507721, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3539, { alpha: 0, x: 959.8846598267555, y: 530.8901000916958, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3539, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 959.8846598267555, y: 530.8901000916958, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 959.8846598267555, y: 530.8901000916958, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3540, { alpha: 0, x: 880.4206199645996, y: 579.8873615264893, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3540, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 880.4206199645996, y: 579.8873615264893, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 880.4206199645996, y: 579.8873615264893, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3541, { alpha: 0, x: 865.0095067024231, y: 589.9673502445221, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3541, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 865.0095067024231, y: 589.9673502445221, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 865.0095067024231, y: 589.9673502445221, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3542, { alpha: 0, x: 870.0346593856812, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3542, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 870.0346593856812, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 870.0346593856812, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3543, { alpha: 0, x: 879.6754231452942, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3543, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 879.6754231452942, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 879.6754231452942, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3544, { alpha: 0, x: 893.8560628890991, y: 589.9626953601837, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3544, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 893.8560628890991, y: 589.9626953601837, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 893.8560628890991, y: 589.9626953601837, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3545, { alpha: 0, x: 901.7720050811768, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3545, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 901.7720050811768, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 901.7720050811768, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3546, { alpha: 0, x: 909.1940670013428, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3546, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 909.1940670013428, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 909.1940670013428, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3547, { alpha: 0, x: 918.6692867279053, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3547, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 918.6692867279053, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 918.6692867279053, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3548, { alpha: 0, x: 927.1846923828125, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3548, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 927.1846923828125, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 927.1846923828125, y: 589.9573566913605, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3549, { alpha: 0, x: 931.1174118518829, y: 589.9673502445221, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3549, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 931.1174118518829, y: 589.9673502445221, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 931.1174118518829, y: 589.9673502445221, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3551, { alpha: 0, x: 864.8367838859558, y: 583.3074178695679, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3551, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 864.8367838859558, y: 583.3074178695679, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 864.8367838859558, y: 583.3074178695679, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3552, { alpha: 0, x: 860.5973875522614, y: 584.8100626468658, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3552, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 860.5973875522614, y: 584.8100626468658, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 860.5973875522614, y: 584.8100626468658, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3553, { alpha: 0, x: 871.0480793714523, y: 601.1633788943291, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3553, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.0480793714523, y: 601.1633788943291, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.0480793714523, y: 601.1633788943291, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3554, { alpha: 0, x: 864.7887694835663, y: 601.0060831308365, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3554, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 864.7887694835663, y: 601.0060831308365, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 864.7887694835663, y: 601.0060831308365, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3555, { alpha: 0, x: 858.1053059101105, y: 589.8600912094116, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3555, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 858.1053059101105, y: 589.8600912094116, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 858.1053059101105, y: 589.8600912094116, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3556, { alpha: 0, x: 861.7940266132355, y: 583.3193683624268, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3556, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 861.7940266132355, y: 583.3193683624268, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 861.7940266132355, y: 583.3193683624268, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3557, { alpha: 0, x: 859.3580236434937, y: 594.831392288208, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3557, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 859.3580236434937, y: 594.831392288208, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 859.3580236434937, y: 594.831392288208, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3558, { alpha: 0, x: 871.6579990386963, y: 599.9220621585846, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3558, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.6579990386963, y: 599.9220621585846, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.6579990386963, y: 599.9220621585846, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3559, { alpha: 0, x: 859.0253742933273, y: 589.7273478507996, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3559, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 859.0253742933273, y: 589.7273478507996, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 859.0253742933273, y: 589.7273478507996, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3560, { alpha: 0, x: 860.9180175065994, y: 597.6986570358276, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3560, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 860.9180175065994, y: 597.6986570358276, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 860.9180175065994, y: 597.6986570358276, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3561, { alpha: 0, x: 871.0960286408663, y: 601.0713907852769, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3561, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.0960286408663, y: 601.0713907852769, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.0960286408663, y: 601.0713907852769, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3562, { alpha: 0, x: 861.0313148498535, y: 585.0006303787231, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3562, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 861.0313148498535, y: 585.0006303787231, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 861.0313148498535, y: 585.0006303787231, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3563, { alpha: 0, x: 862.1193277835846, y: 586.5720944404602, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3563, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 862.1193277835846, y: 586.5720944404602, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 862.1193277835846, y: 586.5720944404602, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3564, { alpha: 0, x: 869.7906246185303, y: 586.9367228150368, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3564, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 869.7906246185303, y: 586.9367228150368, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 869.7906246185303, y: 586.9367228150368, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3565, { alpha: 0, x: 869.7906246185303, y: 598.125329554081, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3565, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 869.7906246185303, y: 598.125329554081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 869.7906246185303, y: 598.125329554081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3566, { alpha: 0, x: 870.5533528327942, y: 584.6913329958916, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3566, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 870.5533528327942, y: 584.6913329958916, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 870.5533528327942, y: 584.6913329958916, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3567, { alpha: 0, x: 871.7920246124268, y: 584.9367390871048, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3567, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.7920246124268, y: 584.9367390871048, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.7920246124268, y: 584.9367390871048, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3568, { alpha: 0, x: 911.2530755996704, y: 606.7867838442326, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3568, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 911.2530755996704, y: 606.7867838442326, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 911.2530755996704, y: 606.7867838442326, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3569, { alpha: 0, x: 895.1253743171692, y: 606.7867838442326, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3569, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 895.1253743171692, y: 606.7867838442326, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 895.1253743171692, y: 606.7867838442326, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3570, { alpha: 0, x: 871.3006753921509, y: 606.7867838442326, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3570, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.3006753921509, y: 606.7867838442326, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.3006753921509, y: 606.7867838442326, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3571, { alpha: 0, x: 871.4106025695801, y: 618.7387491762638, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3571, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.4106025695801, y: 618.7387491762638, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.4106025695801, y: 618.7387491762638, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3572, { alpha: 0, x: 871.4106025695801, y: 636.6680704653263, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3572, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.4106025695801, y: 636.6680704653263, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.4106025695801, y: 636.6680704653263, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3573, { alpha: 0, x: 871.4106025695801, y: 642.6435058414936, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3573, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.4106025695801, y: 642.6435058414936, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.4106025695801, y: 642.6435058414936, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3574, { alpha: 0, x: 871.4106025695801, y: 648.6200968325138, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3574, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.4106025695801, y: 648.6200968325138, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.4106025695801, y: 648.6200968325138, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3575, { alpha: 0, x: 871.4106025695801, y: 655.0960489809513, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3575, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 871.4106025695801, y: 655.0960489809513, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 871.4106025695801, y: 655.0960489809513, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3576, { alpha: 0, x: 531.8212738037109, y: 440.76677322387695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3576, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 531.8212738037109, y: 440.76677322387695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 531.8212738037109, y: 440.76677322387695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3577, { alpha: 0, x: 486.90050506591797, y: 486.29044342041016, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3577, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 486.90050506591797, y: 486.29044342041016, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 486.90050506591797, y: 486.29044342041016, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3578, { alpha: 0, x: 531.8213806152344, y: 457.0414276123047, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3578, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 531.8213806152344, y: 457.0414276123047, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 531.8213806152344, y: 457.0414276123047, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3579, { alpha: 0, x: 660.9333419799805, y: 465.5334656238556, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3579, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 660.9333419799805, y: 465.5334656238556, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 660.9333419799805, y: 465.5334656238556, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3580, { alpha: 0, x: 661.0163011550903, y: 465.70008850097656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3580, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 661.0163011550903, y: 465.70008850097656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 661.0163011550903, y: 465.70008850097656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3581, { alpha: 0, x: 541.8772449493408, y: 465.98413491249084, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3581, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 541.8772449493408, y: 465.98413491249084, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 541.8772449493408, y: 465.98413491249084, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3582, { alpha: 0, x: 540.7713928222656, y: 465.98148345947266, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3582, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 540.7713928222656, y: 465.98148345947266, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 540.7713928222656, y: 465.98148345947266, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3583, { alpha: 0, x: 564.0726718902588, y: 441.96948623657227, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3583, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 564.0726718902588, y: 441.96948623657227, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 564.0726718902588, y: 441.96948623657227, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3584, { alpha: 0, x: 487.2606830596924, y: 486.7847595214844, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3584, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 487.2606830596924, y: 486.7847595214844, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 487.2606830596924, y: 486.7847595214844, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3585, { alpha: 0, x: 522.8126544952393, y: 582.9497203826904, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3585, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 522.8126544952393, y: 582.9497203826904, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 522.8126544952393, y: 582.9497203826904, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3586, { alpha: 0, x: 524.6085772514343, y: 486.2554340362549, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3586, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 524.6085772514343, y: 486.2554340362549, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 524.6085772514343, y: 486.2554340362549, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3587, { alpha: 0, x: 494.840030670166, y: 493.2510747909546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3587, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 494.840030670166, y: 493.2510747909546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 494.840030670166, y: 493.2510747909546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3588, { alpha: 0, x: 491.96700859069824, y: 572.0212726593018, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3588, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 491.96700859069824, y: 572.0212726593018, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 491.96700859069824, y: 572.0212726593018, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3613, { alpha: 0, x: 1000.8359069824219, y: 539.0474243164062, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3613, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1000.8359069824219, y: 539.0474243164062, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1000.8359069824219, y: 539.0474243164062, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3614, { alpha: 0, x: 1016.6492023468018, y: 539.048095703125, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3614, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1016.6492023468018, y: 539.048095703125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1016.6492023468018, y: 539.048095703125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3724, { alpha: 0, x: 771.2726593017578, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3724, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 771.2726593017578, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 771.2726593017578, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3725, { alpha: 0, x: 1144.8352212905884, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3725, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1144.8352212905884, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1144.8352212905884, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3726, { alpha: 0, x: 771.080623626709, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3726, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 771.080623626709, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 771.080623626709, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3727, { alpha: 0, x: 1161.9552402496338, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3727, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1161.9552402496338, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1161.9552402496338, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3728, { alpha: 0, x: 810.9326057434082, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3728, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 810.9326057434082, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 810.9326057434082, y: 1002.1087436676025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3729, { alpha: 0, x: 1016.6700286865234, y: 989.7913818359375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3729, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1016.6700286865234, y: 989.7913818359375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1016.6700286865234, y: 989.7913818359375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3730, { alpha: 0, x: 757.569896697998, y: 1055.0299682617188, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3730, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 757.569896697998, y: 1055.0299682617188, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 757.569896697998, y: 1055.0299682617188, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3731, { alpha: 0, x: 757.6659736633301, y: 1066.150577545166, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3731, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 757.6659736633301, y: 1066.150577545166, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 757.6659736633301, y: 1066.150577545166, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3732, { alpha: 0, x: 757.6852531433105, y: 1055.2867674827576, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3732, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 757.6852531433105, y: 1055.2867674827576, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 757.6852531433105, y: 1055.2867674827576, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3733, { alpha: 0, x: 806.9613189697266, y: 1055.0907020568848, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3733, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 806.9613189697266, y: 1055.0907020568848, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 806.9613189697266, y: 1055.0907020568848, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3734, { alpha: 0, x: 757.8138742446899, y: 1062.892240524292, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3734, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 757.8138742446899, y: 1062.892240524292, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 757.8138742446899, y: 1062.892240524292, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3735, { alpha: 0, x: 1204.945984840393, y: 1057.3112773895264, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3735, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1204.945984840393, y: 1057.3112773895264, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1204.945984840393, y: 1057.3112773895264, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3736, { alpha: 0, x: 1204.7428169250488, y: 1057.288166999817, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3736, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1204.7428169250488, y: 1057.288166999817, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1204.7428169250488, y: 1057.288166999817, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3737, { alpha: 0, x: 806.9400024414062, y: 1070.1598942279816, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3737, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 806.9400024414062, y: 1070.1598942279816, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 806.9400024414062, y: 1070.1598942279816, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3738, { alpha: 0, x: 806.9700012207031, y: 1062.0213947296143, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3738, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 806.9700012207031, y: 1062.0213947296143, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 806.9700012207031, y: 1062.0213947296143, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3739, { alpha: 0, x: 1164.2273292541504, y: 1056.2219161987305, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3739, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1164.2273292541504, y: 1056.2219161987305, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1164.2273292541504, y: 1056.2219161987305, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3740, { alpha: 0, x: 1164.1872215270996, y: 1070.3573851585388, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3740, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1164.1872215270996, y: 1070.3573851585388, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1164.1872215270996, y: 1070.3573851585388, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3741, { alpha: 0, x: 1164.1532535552979, y: 1055.8859827518463, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3741, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1164.1532535552979, y: 1055.8859827518463, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1164.1532535552979, y: 1055.8859827518463, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3766, { alpha: 0, x: 69.14266967773438, y: 678.6103057861328, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3766, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 69.14266967773438, y: 678.6103057861328, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 69.14266967773438, y: 678.6103057861328, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3767, { alpha: 0, x: 68.9253921508789, y: 727.974796295166, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3767, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 68.9253921508789, y: 727.974796295166, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 68.9253921508789, y: 727.974796295166, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3781, { alpha: 0, x: 307.6199544072151, y: 760.0313883423805, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3781, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 307.6199544072151, y: 760.0313883423805, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 307.6199544072151, y: 760.0313883423805, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3818, { alpha: 0, x: 119.97251892089844, y: 803.1581786870956, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3818, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 119.97251892089844, y: 803.1581786870956, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 119.97251892089844, y: 803.1581786870956, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3819, { alpha: 0, x: 102.33414459228516, y: 816.9588582515717, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3819, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 816.9588582515717, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 816.9588582515717, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3820, { alpha: 0, x: 102.33414459228516, y: 830.259362757206, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3820, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 830.259362757206, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 830.259362757206, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3821, { alpha: 0, x: 102.27947998046875, y: 843.0606933236122, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3821, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.27947998046875, y: 843.0606933236122, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.27947998046875, y: 843.0606933236122, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3822, { alpha: 0, x: 119.97251892089844, y: 856.861413538456, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3822, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 119.97251892089844, y: 856.861413538456, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 119.97251892089844, y: 856.861413538456, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3823, { alpha: 0, x: 102.33414459228516, y: 870.1623616218567, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3823, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 870.1623616218567, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 870.1623616218567, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3824, { alpha: 0, x: 102.33414459228516, y: 882.9628255367279, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3824, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 882.9628255367279, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 882.9628255367279, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3825, { alpha: 0, x: 102.33414459228516, y: 896.7623372077942, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3825, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 896.7623372077942, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 896.7623372077942, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3826, { alpha: 0, x: 102.33414459228516, y: 910.0633788704872, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3826, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 910.0633788704872, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 910.0633788704872, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3827, { alpha: 0, x: 102.26947784423828, y: 922.8640380501747, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3827, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.26947784423828, y: 922.8640380501747, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.26947784423828, y: 922.8640380501747, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3828, { alpha: 0, x: 119.97251892089844, y: 936.1645426750183, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3828, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 119.97251892089844, y: 936.1645426750183, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 119.97251892089844, y: 936.1645426750183, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3829, { alpha: 0, x: 102.33414459228516, y: 949.9655110836029, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3829, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 949.9655110836029, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 949.9655110836029, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3830, { alpha: 0, x: 102.33414459228516, y: 963.2660766243935, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3830, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 963.2660766243935, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 963.2660766243935, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3831, { alpha: 0, x: 102.33414459228516, y: 976.0673461556435, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3831, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 976.0673461556435, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 976.0673461556435, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3832, { alpha: 0, x: 102.33414459228516, y: 989.8682210445404, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3832, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.33414459228516, y: 989.8682210445404, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.33414459228516, y: 989.8682210445404, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3833, { alpha: 0, x: 262.316837310791, y: 1023.7972168028355, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3833, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 262.316837310791, y: 1023.7972168028355, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 262.316837310791, y: 1023.7972168028355, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3834, { alpha: 0, x: 246.42206954956055, y: 1037.098152667284, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3834, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 246.42206954956055, y: 1037.098152667284, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 246.42206954956055, y: 1037.098152667284, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3835, { alpha: 0, x: 102.26947784423828, y: 1003.1683430671692, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3835, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 102.26947784423828, y: 1003.1683430671692, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 102.26947784423828, y: 1003.1683430671692, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3836, { alpha: 0, x: 402.1886749267578, y: 929.0865325927734, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3836, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 402.1886749267578, y: 929.0865325927734, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 402.1886749267578, y: 929.0865325927734, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3837, { alpha: 0, x: 402.1886749267578, y: 879.174144744873, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3837, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 402.1886749267578, y: 879.174144744873, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 402.1886749267578, y: 879.174144744873, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3838, { alpha: 0, x: 402.1886749267578, y: 929.0865936279297, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3838, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 402.1886749267578, y: 929.0865936279297, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 402.1886749267578, y: 929.0865936279297, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3839, { alpha: 0, x: 402.1886749267578, y: 696.7261276245117, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3839, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 402.1886749267578, y: 696.7261276245117, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 402.1886749267578, y: 696.7261276245117, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3840, { alpha: 0, x: 568.1859359741211, y: 770.624828338623, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3840, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 568.1859359741211, y: 770.624828338623, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 568.1859359741211, y: 770.624828338623, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3885, { alpha: 0, x: 433.9957227706909, y: 779.009838104248, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3885, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 433.9957227706909, y: 779.009838104248, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 433.9957227706909, y: 779.009838104248, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3886, { alpha: 0, x: 441.3813228607178, y: 789.222110748291, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3886, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 441.3813228607178, y: 789.222110748291, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 441.3813228607178, y: 789.222110748291, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3887, { alpha: 0, x: 436.99674701690674, y: 785.9571591615677, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3887, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 436.99674701690674, y: 785.9571591615677, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 436.99674701690674, y: 785.9571591615677, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3888, { alpha: 0, x: 436.94533824920654, y: 788.9371779561043, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3888, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 436.94533824920654, y: 788.9371779561043, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 436.94533824920654, y: 788.9371779561043, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3889, { alpha: 0, x: 436.97900772094727, y: 790.9149377346039, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3889, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 436.97900772094727, y: 790.9149377346039, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 436.97900772094727, y: 790.9149377346039, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3890, { alpha: 0, x: 439.79532063007355, y: 794.8080688714981, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3890, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 439.79532063007355, y: 794.8080688714981, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 439.79532063007355, y: 794.8080688714981, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3891, { alpha: 0, x: 447.98743975162506, y: 787.1184984445572, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3891, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 447.98743975162506, y: 787.1184984445572, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 447.98743975162506, y: 787.1184984445572, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3892, { alpha: 0, x: 447.3426432609558, y: 788.2500894069672, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3892, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 447.3426432609558, y: 788.2500894069672, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 447.3426432609558, y: 788.2500894069672, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3893, { alpha: 0, x: 440.9940022826195, y: 780.860042317654, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3893, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 440.9940022826195, y: 780.860042317654, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 440.9940022826195, y: 780.860042317654, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3894, { alpha: 0, x: 489.8821324110031, y: 787.0747628211975, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3894, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 489.8821324110031, y: 787.0747628211975, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 489.8821324110031, y: 787.0747628211975, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3895, { alpha: 0, x: 486.58035802841187, y: 790.0612826347351, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3895, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 486.58035802841187, y: 790.0612826347351, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 486.58035802841187, y: 790.0612826347351, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3896, { alpha: 0, x: 476.77942752838135, y: 782.792384147644, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3896, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 476.77942752838135, y: 782.792384147644, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 476.77942752838135, y: 782.792384147644, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3897, { alpha: 0, x: 479.97568678855896, y: 792.0514554977417, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3897, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 479.97568678855896, y: 792.0514554977417, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 479.97568678855896, y: 792.0514554977417, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3898, { alpha: 0, x: 483.27707052230835, y: 793.0465896129608, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3898, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 483.27707052230835, y: 793.0465896129608, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 483.27707052230835, y: 793.0465896129608, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3899, { alpha: 0, x: 476.6746093034744, y: 793.8765599727631, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3899, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 476.6746093034744, y: 793.8765599727631, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 476.6746093034744, y: 793.8765599727631, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3900, { alpha: 0, x: 517.183235168457, y: 778.1160764694214, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3900, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 517.183235168457, y: 778.1160764694214, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 517.183235168457, y: 778.1160764694214, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3901, { alpha: 0, x: 430.9766194820404, y: 803.8180419206619, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3901, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 430.9766194820404, y: 803.8180419206619, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 430.9766194820404, y: 803.8180419206619, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3902, { alpha: 0, x: 433.7793456315994, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3902, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 433.7793456315994, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 433.7793456315994, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3903, { alpha: 0, x: 436.10525715351105, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3903, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 436.10525715351105, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 436.10525715351105, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3904, { alpha: 0, x: 437.023942053318, y: 804.6887776851654, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3904, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 437.023942053318, y: 804.6887776851654, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 437.023942053318, y: 804.6887776851654, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3905, { alpha: 0, x: 438.8753580749035, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3905, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 438.8753580749035, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 438.8753580749035, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3906, { alpha: 0, x: 439.79062497615814, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3906, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 439.79062497615814, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 439.79062497615814, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3907, { alpha: 0, x: 441.7086669206619, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3907, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 441.7086669206619, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 441.7086669206619, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3908, { alpha: 0, x: 445.1507160663605, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3908, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 445.1507160663605, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 445.1507160663605, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3909, { alpha: 0, x: 448.0506672859192, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3909, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 448.0506672859192, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 448.0506672859192, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3910, { alpha: 0, x: 450.1739501953125, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3910, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 450.1739501953125, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 450.1739501953125, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3911, { alpha: 0, x: 452.7712889909744, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3911, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 452.7712889909744, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 452.7712889909744, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3924, { alpha: 0, x: 440.1085443496704, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3924, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 440.1085443496704, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 440.1085443496704, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3925, { alpha: 0, x: 427.1085934638977, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3925, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 427.1085934638977, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 427.1085934638977, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3926, { alpha: 0, x: 438.8241696357727, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3926, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 438.8241696357727, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 438.8241696357727, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3927, { alpha: 0, x: 434.6526691913605, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3927, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 434.6526691913605, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 434.6526691913605, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3928, { alpha: 0, x: 472.71793615818024, y: 803.8180419206619, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3928, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 472.71793615818024, y: 803.8180419206619, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 472.71793615818024, y: 803.8180419206619, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3929, { alpha: 0, x: 475.02000319957733, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3929, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 475.02000319957733, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 475.02000319957733, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3930, { alpha: 0, x: 477.34593909978867, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3930, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 477.34593909978867, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 477.34593909978867, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3931, { alpha: 0, x: 478.2652750611305, y: 804.6887776851654, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3931, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 478.2652750611305, y: 804.6887776851654, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 478.2652750611305, y: 804.6887776851654, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3932, { alpha: 0, x: 480.1165852844715, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3932, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 480.1165852844715, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 480.1165852844715, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3933, { alpha: 0, x: 481.03128254413605, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3933, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 481.03128254413605, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 481.03128254413605, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3934, { alpha: 0, x: 482.9500162601471, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3934, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 482.9500162601471, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 482.9500162601471, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3935, { alpha: 0, x: 486.392578125, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3935, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 486.392578125, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 486.392578125, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3936, { alpha: 0, x: 488.7919840812683, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3936, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 488.7919840812683, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 488.7919840812683, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3937, { alpha: 0, x: 490.915283203125, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3937, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 490.915283203125, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 490.915283203125, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3938, { alpha: 0, x: 494.0126219987869, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3938, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 494.0126219987869, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 494.0126219987869, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3951, { alpha: 0, x: 480.8498773574829, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3951, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 480.8498773574829, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 480.8498773574829, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3952, { alpha: 0, x: 467.8500485420227, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3952, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 467.8500485420227, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 467.8500485420227, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3953, { alpha: 0, x: 480.065242767334, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3953, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 480.065242767334, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 480.065242767334, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3954, { alpha: 0, x: 475.8945231437683, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3954, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 475.8945231437683, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 475.8945231437683, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3955, { alpha: 0, x: 514.1220052242279, y: 803.8180419206619, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3955, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 514.1220052242279, y: 803.8180419206619, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 514.1220052242279, y: 803.8180419206619, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3956, { alpha: 0, x: 516.9239420890808, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3956, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 516.9239420890808, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 516.9239420890808, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3957, { alpha: 0, x: 518.7506591677666, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3957, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 518.7506591677666, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 518.7506591677666, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3958, { alpha: 0, x: 519.6693277955055, y: 804.6887776851654, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3958, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 519.6693277955055, y: 804.6887776851654, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 519.6693277955055, y: 804.6887776851654, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3959, { alpha: 0, x: 522.0206217467785, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3959, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 522.0206217467785, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 522.0206217467785, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3960, { alpha: 0, x: 522.9358886480331, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3960, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 522.9358886480331, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 522.9358886480331, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3961, { alpha: 0, x: 524.3539305925369, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3961, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 524.3539305925369, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 524.3539305925369, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3962, { alpha: 0, x: 527.7959635257721, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3962, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 527.7959635257721, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 527.7959635257721, y: 803.818115234375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3963, { alpha: 0, x: 530.1959147453308, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3963, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 530.1959147453308, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 530.1959147453308, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3964, { alpha: 0, x: 532.8193359375, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3964, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 532.8193359375, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 532.8193359375, y: 804.6667764782906, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3965, { alpha: 0, x: 535.9165689945221, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3965, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 535.9165689945221, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 535.9165689945221, y: 804.6887817382812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3978, { alpha: 0, x: 522.7539300918579, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3978, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 522.7539300918579, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 522.7539300918579, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3979, { alpha: 0, x: 509.2539792060852, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3979, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 509.2539792060852, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 509.2539792060852, y: 815.830106601119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3980, { alpha: 0, x: 521.9694333076477, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3980, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 521.9694333076477, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 521.9694333076477, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3981, { alpha: 0, x: 517.2986979484558, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3981, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 517.2986979484558, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 517.2986979484558, y: 818.9754475951195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3982, { alpha: 0, x: 570.6480598449707, y: 749.9106730222702, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3982, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 570.6480598449707, y: 749.9106730222702, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 570.6480598449707, y: 749.9106730222702, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3983, { alpha: 0, x: 570.8313941955566, y: 758.8781534731388, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3983, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 570.8313941955566, y: 758.8781534731388, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 570.8313941955566, y: 758.8781534731388, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3984, { alpha: 0, x: 767.5673294067383, y: 696.9200592041016, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3984, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 767.5673294067383, y: 696.9200592041016, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 767.5673294067383, y: 696.9200592041016, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_3999, { alpha: 0, x: 767.5673294067383, y: 847.9986763000488, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_3999, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 767.5673294067383, y: 847.9986763000488, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 767.5673294067383, y: 847.9986763000488, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_266, { alpha: 0, x: 833, y: 922, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_266, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 833, y: 922, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 833, y: 922, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31096, { alpha: 0, x: 873.1799207925797, y: 926.7519659996033, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31096, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 873.1799207925797, y: 926.7519659996033, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 873.1799207925797, y: 926.7519659996033, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31097, { alpha: 0, x: 874.1799500584602, y: 927.7520608901978, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31097, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 874.1799500584602, y: 927.7520608901978, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 874.1799500584602, y: 927.7520608901978, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31098, { alpha: 0, x: 872.8678934574127, y: 896.0788083076477, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31098, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 872.8678934574127, y: 896.0788083076477, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 872.8678934574127, y: 896.0788083076477, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31099, { alpha: 0, x: 872.9830248355865, y: 896.0263566970825, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31099, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 872.9830248355865, y: 896.0263566970825, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 872.9830248355865, y: 896.0263566970825, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31100, { alpha: 0, x: 874.9414148926735, y: 899.7781901359558, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31100, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 874.9414148926735, y: 899.7781901359558, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 874.9414148926735, y: 899.7781901359558, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31101, { alpha: 0, x: 872.1799902915955, y: 907.5546432733536, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31101, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 872.1799902915955, y: 907.5546432733536, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 872.1799902915955, y: 907.5546432733536, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31102, { alpha: 0, x: 872.120640039444, y: 916.6534876823425, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31102, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 872.120640039444, y: 916.6534876823425, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 872.120640039444, y: 916.6534876823425, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31145, { alpha: 0, x: 866.0679117739201, y: 893.9382476806641, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31145, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 866.0679117739201, y: 893.9382476806641, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 866.0679117739201, y: 893.9382476806641, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31146, { alpha: 0, x: 1787.8800048828125, y: 24.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31146, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1787.8800048828125, y: 24.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1787.8800048828125, y: 24.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31147, { alpha: 0, x: 1340.106674194336, y: 24.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31147, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1340.106674194336, y: 24.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1340.106674194336, y: 24.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31148, { alpha: 0, x: 1423.88671875, y: 540.4301223754883, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31148, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1423.88671875, y: 540.4301223754883, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1423.88671875, y: 540.4301223754883, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31149, { alpha: 0, x: 1427.886734008789, y: 28.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31149, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1427.886734008789, y: 28.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1427.886734008789, y: 28.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31200, { alpha: 0, x: 1426.1066589355469, y: 28.039398193359375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31200, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1426.1066589355469, y: 28.039398193359375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1426.1066589355469, y: 28.039398193359375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31201, { alpha: 0, x: 1426.1066731214523, y: 28.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31201, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1426.1066731214523, y: 28.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1426.1066731214523, y: 28.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31202, { alpha: 0, x: 1427.88671875, y: 544.1553874015808, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31202, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1427.88671875, y: 544.1553874015808, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1427.88671875, y: 544.1553874015808, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31203, { alpha: 0, x: 1427.88671875, y: 28.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31203, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1427.88671875, y: 28.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1427.88671875, y: 28.260711669921875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31204, { alpha: 0, x: 1613.932975769043, y: 380.05278116464615, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31204, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1613.932975769043, y: 380.05278116464615, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1613.932975769043, y: 380.05278116464615, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31205, { alpha: 0, x: 1513.0065078735352, y: 380.05278116464615, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31205, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1513.0065078735352, y: 380.05278116464615, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1513.0065078735352, y: 380.05278116464615, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31206, { alpha: 0, x: 1638.9132318496704, y: 392.1754007935524, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31206, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1638.9132318496704, y: 392.1754007935524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1638.9132318496704, y: 392.1754007935524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31207, { alpha: 0, x: 1547.9268035888672, y: 392.1754007935524, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31207, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1547.9268035888672, y: 392.1754007935524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1547.9268035888672, y: 392.1754007935524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31208, { alpha: 0, x: 1513.033332824707, y: 392.1754007935524, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31208, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1513.033332824707, y: 392.1754007935524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1513.033332824707, y: 392.1754007935524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31209, { alpha: 0, x: 1571.2797164916992, y: 403.79725539684296, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31209, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1571.2797164916992, y: 403.79725539684296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1571.2797164916992, y: 403.79725539684296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31210, { alpha: 0, x: 1512.906509399414, y: 403.79725539684296, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31210, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1512.906509399414, y: 403.79725539684296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1512.906509399414, y: 403.79725539684296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31211, { alpha: 0, x: 1613.932975769043, y: 434.2194681763649, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31211, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1613.932975769043, y: 434.2194681763649, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1613.932975769043, y: 434.2194681763649, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31212, { alpha: 0, x: 1513.0065078735352, y: 434.2194681763649, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31212, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1513.0065078735352, y: 434.2194681763649, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1513.0065078735352, y: 434.2194681763649, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31213, { alpha: 0, x: 1638.9132318496704, y: 446.84208780527115, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31213, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1638.9132318496704, y: 446.84208780527115, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1638.9132318496704, y: 446.84208780527115, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31214, { alpha: 0, x: 1547.9268035888672, y: 446.84208780527115, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31214, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1547.9268035888672, y: 446.84208780527115, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1547.9268035888672, y: 446.84208780527115, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31215, { alpha: 0, x: 1513.033332824707, y: 446.84208780527115, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31215, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1513.033332824707, y: 446.84208780527115, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1513.033332824707, y: 446.84208780527115, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31216, { alpha: 0, x: 1571.2797164916992, y: 458.9639424085617, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31216, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1571.2797164916992, y: 458.9639424085617, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1571.2797164916992, y: 458.9639424085617, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31217, { alpha: 0, x: 1512.906509399414, y: 458.9639424085617, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31217, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1512.906509399414, y: 458.9639424085617, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1512.906509399414, y: 458.9639424085617, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31218, { alpha: 0, x: 1613.932975769043, y: 495.0488138794899, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31218, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1613.932975769043, y: 495.0488138794899, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1613.932975769043, y: 495.0488138794899, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31219, { alpha: 0, x: 1513.0065078735352, y: 495.0488138794899, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31219, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1513.0065078735352, y: 495.0488138794899, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1513.0065078735352, y: 495.0488138794899, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31220, { alpha: 0, x: 1638.9132318496704, y: 507.1714945435524, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31220, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1638.9132318496704, y: 507.1714945435524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1638.9132318496704, y: 507.1714945435524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31221, { alpha: 0, x: 1547.9268035888672, y: 507.1714945435524, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31221, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1547.9268035888672, y: 507.1714945435524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1547.9268035888672, y: 507.1714945435524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31222, { alpha: 0, x: 1513.033332824707, y: 507.1714945435524, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31222, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1513.033332824707, y: 507.1714945435524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1513.033332824707, y: 507.1714945435524, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31223, { alpha: 0, x: 1571.2797164916992, y: 519.7938557863235, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31223, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1571.2797164916992, y: 519.7938557863235, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1571.2797164916992, y: 519.7938557863235, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31224, { alpha: 0, x: 1512.906509399414, y: 519.7938557863235, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31224, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1512.906509399414, y: 519.7938557863235, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1512.906509399414, y: 519.7938557863235, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31225, { alpha: 0, x: 1450.6198892593384, y: 432.72808837890625, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31225, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1450.6198892593384, y: 432.72808837890625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1450.6198892593384, y: 432.72808837890625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31226, { alpha: 0, x: 1462.679931640625, y: 451.9497904777527, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31226, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1462.679931640625, y: 451.9497904777527, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1462.679931640625, y: 451.9497904777527, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31227, { alpha: 0, x: 1455.1199216842651, y: 440.04625368118286, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31227, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1455.1199216842651, y: 440.04625368118286, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1455.1199216842651, y: 440.04625368118286, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31228, { alpha: 0, x: 1457.7028212547302, y: 442.0898325443268, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31228, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1457.7028212547302, y: 442.0898325443268, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1457.7028212547302, y: 442.0898325443268, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31229, { alpha: 0, x: 1457.4363210201263, y: 442.60011184215546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31229, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1457.4363210201263, y: 442.60011184215546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1457.4363210201263, y: 442.60011184215546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31230, { alpha: 0, x: 1459.6740790903568, y: 441.74339056015015, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31230, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1459.6740790903568, y: 441.74339056015015, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1459.6740790903568, y: 441.74339056015015, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31231, { alpha: 0, x: 1450.6198892593384, y: 493.6707763671875, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31231, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1450.6198892593384, y: 493.6707763671875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1450.6198892593384, y: 493.6707763671875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31232, { alpha: 0, x: 1454.1196460723877, y: 499.8507730960846, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31232, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1454.1196460723877, y: 499.8507730960846, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1454.1196460723877, y: 499.8507730960846, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31233, { alpha: 0, x: 1457.1175317764282, y: 503.80274868011475, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31233, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1457.1175317764282, y: 503.80274868011475, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1457.1175317764282, y: 503.80274868011475, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31234, { alpha: 0, x: 1460.1204166412354, y: 507.6847491264343, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31234, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1460.1204166412354, y: 507.6847491264343, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1460.1204166412354, y: 507.6847491264343, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31235, { alpha: 0, x: 1462.6199705600739, y: 511.6087646484375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31235, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1462.6199705600739, y: 511.6087646484375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1462.6199705600739, y: 511.6087646484375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31236, { alpha: 0, x: 1450.6198892593384, y: 378.1748046875, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31236, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1450.6198892593384, y: 378.1748046875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1450.6198892593384, y: 378.1748046875, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31237, { alpha: 0, x: 1454.61457157135, y: 384.1864070892334, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31237, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1454.61457157135, y: 384.1864070892334, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1454.61457157135, y: 384.1864070892334, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31238, { alpha: 0, x: 1464.1133787631989, y: 380.99144077301025, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31238, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1464.1133787631989, y: 380.99144077301025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1464.1133787631989, y: 380.99144077301025, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31239, { alpha: 0, x: 1532.7866859436035, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31239, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1532.7866859436035, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1532.7866859436035, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31240, { alpha: 0, x: 1592.799885749817, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31240, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1592.799885749817, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1592.799885749817, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31241, { alpha: 0, x: 1484.7998046875, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31241, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1484.7998046875, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1484.7998046875, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31242, { alpha: 0, x: 1611.2398433685303, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31242, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1611.2398433685303, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1611.2398433685303, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31243, { alpha: 0, x: 1453.973225593567, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31243, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1453.973225593567, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1453.973225593567, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31244, { alpha: 0, x: 1655.299934387207, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31244, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1655.299934387207, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1655.299934387207, y: 156.67673641443253, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31245, { alpha: 0, x: 1518.2598133087158, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31245, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1518.2598133087158, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1518.2598133087158, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31246, { alpha: 0, x: 1626.219970703125, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31246, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1626.219970703125, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1626.219970703125, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31247, { alpha: 0, x: 1476.0265293121338, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31247, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1476.0265293121338, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1476.0265293121338, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31248, { alpha: 0, x: 1453.7732257843018, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31248, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1453.7732257843018, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1453.7732257843018, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31249, { alpha: 0, x: 1507.1264972686768, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31249, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1507.1264972686768, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1507.1264972686768, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31250, { alpha: 0, x: 1556.0266761779785, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31250, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1556.0266761779785, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1556.0266761779785, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31251, { alpha: 0, x: 1576.8133125305176, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31251, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1576.8133125305176, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1576.8133125305176, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31252, { alpha: 0, x: 1613.9532387256622, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31252, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1613.9532387256622, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1613.9532387256622, y: 170.94679152965546, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31253, { alpha: 0, x: 1529.8866539001465, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31253, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1529.8866539001465, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1529.8866539001465, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31254, { alpha: 0, x: 1567.9198570251465, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31254, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1567.9198570251465, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1567.9198570251465, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31255, { alpha: 0, x: 1619.1598777770996, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31255, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1619.1598777770996, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1619.1598777770996, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31256, { alpha: 0, x: 1602.9533042907715, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31256, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1602.9533042907715, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1602.9533042907715, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31257, { alpha: 0, x: 1508.6866207122803, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31257, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1508.6866207122803, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1508.6866207122803, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31258, { alpha: 0, x: 1453.9932117462158, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31258, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1453.9932117462158, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1453.9932117462158, y: 185.21671444177628, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31259, { alpha: 0, x: 1551.7998046875, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31259, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1551.7998046875, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1551.7998046875, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31260, { alpha: 0, x: 1516.2666015625, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31260, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1516.2666015625, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1516.2666015625, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31261, { alpha: 0, x: 1453.946533203125, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31261, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1453.946533203125, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1453.946533203125, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31262, { alpha: 0, x: 1500.7333984375, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31262, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1500.7333984375, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1500.7333984375, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31263, { alpha: 0, x: 1589.106559753418, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31263, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1589.106559753418, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1589.106559753418, y: 142.26551711559296, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31264, { alpha: 0, x: 1500.0133304595947, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31264, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1500.0133304595947, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1500.0133304595947, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31265, { alpha: 0, x: 1454.1131992340088, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31265, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1454.1131992340088, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1454.1131992340088, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31266, { alpha: 0, x: 1634.9531898498535, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31266, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1634.9531898498535, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1634.9531898498535, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31267, { alpha: 0, x: 1600.913215637207, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31267, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1600.913215637207, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1600.913215637207, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31268, { alpha: 0, x: 1588.2398924827576, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31268, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1588.2398924827576, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1588.2398924827576, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31269, { alpha: 0, x: 1556.0665855407715, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31269, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1556.0665855407715, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1556.0665855407715, y: 198.9867980480194, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31270, { alpha: 0, x: 1485.8932619094849, y: 212.02884823083878, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31270, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1485.8932619094849, y: 212.02884823083878, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1485.8932619094849, y: 212.02884823083878, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31271, { alpha: 0, x: 1454.139892578125, y: 212.02884823083878, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31271, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1454.139892578125, y: 212.02884823083878, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1454.139892578125, y: 212.02884823083878, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31272, { alpha: 0, x: 1520.759765625, y: 212.02884823083878, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31272, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1520.759765625, y: 212.02884823083878, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1520.759765625, y: 212.02884823083878, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31273, { alpha: 0, x: 1456.4265460968018, y: 89.09675788879395, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31273, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1456.4265460968018, y: 89.09675788879395, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1456.4265460968018, y: 89.09675788879395, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31274, { alpha: 0, x: 1468.9266271591187, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31274, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1468.9266271591187, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1468.9266271591187, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31275, { alpha: 0, x: 1479.7799801826477, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31275, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1479.7799801826477, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1479.7799801826477, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31276, { alpha: 0, x: 1494.7734375, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31276, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1494.7734375, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1494.7734375, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31277, { alpha: 0, x: 1506.8931798934937, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31277, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1506.8931798934937, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1506.8931798934937, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31278, { alpha: 0, x: 1525.9133462905884, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31278, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1525.9133462905884, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1525.9133462905884, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31279, { alpha: 0, x: 1545.266666650772, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31279, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1545.266666650772, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1545.266666650772, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31280, { alpha: 0, x: 1550.9933919906616, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31280, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1550.9933919906616, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1550.9933919906616, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31281, { alpha: 0, x: 1564.7933430671692, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31281, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1564.7933430671692, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1564.7933430671692, y: 89.59685134887695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31282, { alpha: 0, x: 1584.8933429718018, y: 89.73204135894775, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31282, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1584.8933429718018, y: 89.73204135894775, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1584.8933429718018, y: 89.73204135894775, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31283, { alpha: 0, x: 1598.0266437530518, y: 89.09675788879395, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31283, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1598.0266437530518, y: 89.09675788879395, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1598.0266437530518, y: 89.09675788879395, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31284, { alpha: 0, x: 1501.8932453393936, y: 238.849440574646, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31284, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1501.8932453393936, y: 238.849440574646, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1501.8932453393936, y: 238.849440574646, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31285, { alpha: 0, x: 1509.0265461206436, y: 238.849440574646, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31285, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1509.0265461206436, y: 238.849440574646, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1509.0265461206436, y: 238.849440574646, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31286, { alpha: 0, x: 1516.1732746362686, y: 238.849440574646, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31286, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1516.1732746362686, y: 238.849440574646, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1516.1732746362686, y: 238.849440574646, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31287, { alpha: 0, x: 1525.199935913086, y: 239.85020139813423, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31287, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1525.199935913086, y: 239.85020139813423, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1525.199935913086, y: 239.85020139813423, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31411, { alpha: 0, x: 1517.6199055984616, y: 287.79144287109375, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31411, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1517.6199055984616, y: 287.79144287109375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1517.6199055984616, y: 287.79144287109375, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31428, { alpha: 0, x: 1359.1673889160156, y: 695.9874267578125, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31428, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1359.1673889160156, y: 695.9874267578125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1359.1673889160156, y: 695.9874267578125, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31429, { alpha: 0, x: 1835.159927368164, y: 760.0927581787109, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31429, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1835.159927368164, y: 760.0927581787109, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1835.159927368164, y: 760.0927581787109, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31430, { alpha: 0, x: 1359.2126770019531, y: 729.8901214599609, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31430, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1359.2126770019531, y: 729.8901214599609, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1359.2126770019531, y: 729.8901214599609, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31431, { alpha: 0, x: 1835.159927368164, y: 760.0927581787109, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31431, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1835.159927368164, y: 760.0927581787109, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1835.159927368164, y: 760.0927581787109, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31432, { alpha: 0, x: 1672.1065521240234, y: 760.0654678344727, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31432, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1672.1065521240234, y: 760.0654678344727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1672.1065521240234, y: 760.0654678344727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31435, { alpha: 0, x: 1478.7798156738281, y: 770.922737121582, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31435, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1478.7798156738281, y: 770.922737121582, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1478.7798156738281, y: 770.922737121582, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31436, { alpha: 0, x: 1501.8198547363281, y: 770.922737121582, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31436, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1501.8198547363281, y: 770.922737121582, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1501.8198547363281, y: 770.922737121582, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31437, { alpha: 0, x: 1578.913314819336, y: 799.5928077697754, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31437, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1578.913314819336, y: 799.5928077697754, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1578.913314819336, y: 799.5928077697754, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31438, { alpha: 0, x: 1481.933364868164, y: 770.890739440918, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31438, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1481.933364868164, y: 770.890739440918, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1481.933364868164, y: 770.890739440918, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31439, { alpha: 0, x: 1602.9465808868408, y: 862.8235511779785, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31439, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1602.9465808868408, y: 862.8235511779785, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1602.9465808868408, y: 862.8235511779785, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31440, { alpha: 0, x: 1612.5865716934204, y: 862.8234939575195, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31440, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1612.5865716934204, y: 862.8234939575195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1612.5865716934204, y: 862.8234939575195, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31441, { alpha: 0, x: 1362.0613269805908, y: 857.7427291870117, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31441, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1362.0613269805908, y: 857.7427291870117, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1362.0613269805908, y: 857.7427291870117, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31445, { alpha: 0, x: 1834.78662109375, y: 880.110066652298, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31445, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1834.78662109375, y: 880.110066652298, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1834.78662109375, y: 880.110066652298, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31446, { alpha: 0, x: 1612.6332397460938, y: 704.3201332092285, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31446, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1612.6332397460938, y: 704.3201332092285, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1612.6332397460938, y: 704.3201332092285, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31447, { alpha: 0, x: 1554.2266235351562, y: 738.0474691390991, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31447, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1554.2266235351562, y: 738.0474691390991, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1554.2266235351562, y: 738.0474691390991, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31448, { alpha: 0, x: 1578.7333011627197, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31448, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1578.7333011627197, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1578.7333011627197, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31449, { alpha: 0, x: 1489.199935913086, y: 859.0693845748901, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31449, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1489.199935913086, y: 859.0693845748901, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1489.199935913086, y: 859.0693845748901, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31450, { alpha: 0, x: 1460.053352355957, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31450, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1460.053352355957, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1460.053352355957, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31451, { alpha: 0, x: 1349.2306213378906, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31451, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1349.2306213378906, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1349.2306213378906, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31452, { alpha: 0, x: 2147.6533527374268, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31452, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2147.6533527374268, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2147.6533527374268, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31454, { alpha: 0, x: 1840.0264625549316, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31454, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1840.0264625549316, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1840.0264625549316, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31471, { alpha: 0, x: 1672.1065521240234, y: 760.0654678344727, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31471, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1672.1065521240234, y: 760.0654678344727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1672.1065521240234, y: 760.0654678344727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31475, { alpha: 0, x: 1829.8332030773163, y: 760.0934448242188, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31475, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1829.8332030773163, y: 760.0934448242188, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1829.8332030773163, y: 760.0934448242188, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31478, { alpha: 0, x: 1829.6532063782215, y: 760.0934448242188, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31478, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1829.6532063782215, y: 760.0934448242188, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1829.6532063782215, y: 760.0934448242188, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_61, { alpha: 0, x: 948, y: 283, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_61, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 948, y: 283, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 948, y: 283, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31433, { alpha: 0, x: 1338.2146530151367, y: 935.6781158447266, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31433, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1338.2146530151367, y: 935.6781158447266, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1338.2146530151367, y: 935.6781158447266, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31443, { alpha: 0, x: 2160.979784011841, y: 862.069465637207, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31443, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2160.979784011841, y: 862.069465637207, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2160.979784011841, y: 862.069465637207, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31442, { alpha: 0, x: 2160.979784011841, y: 888.0194492340088, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31442, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2160.979784011841, y: 888.0194492340088, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2160.979784011841, y: 888.0194492340088, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31434, { alpha: 0, x: 2130, y: 926, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31434, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2130, y: 926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2130, y: 926, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31453, { alpha: 0, x: 1987.2266578674316, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31453, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1987.2266578674316, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1987.2266578674316, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31455, { alpha: 0, x: 1837.5732727050781, y: 892.8040974140167, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31455, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1837.5732727050781, y: 892.8040974140167, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1837.5732727050781, y: 892.8040974140167, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31456, { alpha: 0, x: 1843.9398498535156, y: 766.2101278305054, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31456, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1843.9398498535156, y: 766.2101278305054, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1843.9398498535156, y: 766.2101278305054, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31457, { alpha: 0, x: 1927.2734069824219, y: 945.8126068115234, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31457, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1927.2734069824219, y: 945.8126068115234, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1927.2734069824219, y: 945.8126068115234, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31458, { alpha: 0, x: 1955.273323059082, y: 974.3139572143555, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31458, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1955.273323059082, y: 974.3139572143555, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1955.273323059082, y: 974.3139572143555, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31459, { alpha: 0, x: 1960.779800415039, y: 979.8133773803711, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31459, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1960.779800415039, y: 979.8133773803711, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1960.779800415039, y: 979.8133773803711, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31460, { alpha: 0, x: 1969.7732391357422, y: 988.8126373291016, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31460, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1969.7732391357422, y: 988.8126373291016, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1969.7732391357422, y: 988.8126373291016, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31461, { alpha: 0, x: 1986.273323059082, y: 1005.3140869140625, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31461, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1986.273323059082, y: 1005.3140869140625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1986.273323059082, y: 1005.3140869140625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31462, { alpha: 0, x: 1991.273274421692, y: 1010.3141145706177, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31462, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1991.273274421692, y: 1010.3141145706177, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1991.273274421692, y: 1010.3141145706177, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31463, { alpha: 0, x: 1435.886489868164, y: 945.8126068115234, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31463, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1435.886489868164, y: 945.8126068115234, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1435.886489868164, y: 945.8126068115234, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31464, { alpha: 0, x: 1464.893196105957, y: 974.3139572143555, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31464, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1464.893196105957, y: 974.3139572143555, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1464.893196105957, y: 974.3139572143555, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31465, { alpha: 0, x: 1469.886489868164, y: 979.8133773803711, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31465, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1469.886489868164, y: 979.8133773803711, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1469.886489868164, y: 979.8133773803711, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31466, { alpha: 0, x: 1478.8933563232422, y: 988.8126373291016, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31466, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1478.8933563232422, y: 988.8126373291016, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1478.8933563232422, y: 988.8126373291016, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31467, { alpha: 0, x: 1495.893196105957, y: 1005.3140869140625, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31467, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1495.893196105957, y: 1005.3140869140625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1495.893196105957, y: 1005.3140869140625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31468, { alpha: 0, x: 1500.393147468567, y: 1010.3141145706177, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31468, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1500.393147468567, y: 1010.3141145706177, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1500.393147468567, y: 1010.3141145706177, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31469, { alpha: 0, x: 1478.9597644805908, y: 824.8847370147705, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31469, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1478.9597644805908, y: 824.8847370147705, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1478.9597644805908, y: 824.8847370147705, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31470, { alpha: 0, x: 1508.2866044044495, y: 824.8847370147705, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31470, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1508.2866044044495, y: 824.8847370147705, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1508.2866044044495, y: 824.8847370147705, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31472, { alpha: 0, x: 1677.733169555664, y: 766.2101278305054, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31472, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1677.733169555664, y: 766.2101278305054, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1677.733169555664, y: 766.2101278305054, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31473, { alpha: 0, x: 1677.733169555664, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31473, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1677.733169555664, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1677.733169555664, y: 941.0960569381714, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31474, { alpha: 0, x: 1672.033187866211, y: 929.9173541069031, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31474, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1672.033187866211, y: 929.9173541069031, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1672.033187866211, y: 929.9173541069031, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31479, { alpha: 0, x: 1829.653076171875, y: 929.9173541069031, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31479, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1829.653076171875, y: 929.9173541069031, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1829.653076171875, y: 929.9173541069031, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31480, { alpha: 0, x: 1730.9734363555908, y: 781.321403503418, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31480, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1730.9734363555908, y: 781.321403503418, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1730.9734363555908, y: 781.321403503418, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31481, { alpha: 0, x: 1686.1597633361816, y: 817.0814094543457, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31481, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1686.1597633361816, y: 817.0814094543457, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1686.1597633361816, y: 817.0814094543457, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31482, { alpha: 0, x: 1779.453239440918, y: 807.0707244873047, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31482, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1779.453239440918, y: 807.0707244873047, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1779.453239440918, y: 807.0707244873047, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31483, { alpha: 0, x: 1755.946662902832, y: 806.096773147583, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31483, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1755.946662902832, y: 806.096773147583, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1755.946662902832, y: 806.096773147583, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_173, { alpha: 0, x: 155, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_173, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 155, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 155, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1087, { alpha: 0, x: 1900, y: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1087, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1900, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1900, y: 0, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31484, { alpha: 0, x: 1781.6198568344116, y: 836.5674524307251, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31484, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1781.6198568344116, y: 836.5674524307251, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1781.6198568344116, y: 836.5674524307251, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31485, { alpha: 0, x: 1749.1933250427246, y: 819.7320823669434, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31485, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1749.1933250427246, y: 819.7320823669434, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1749.1933250427246, y: 819.7320823669434, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31486, { alpha: 0, x: 1707.6866369247437, y: 892.9107582569122, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31486, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1707.6866369247437, y: 892.9107582569122, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1707.6866369247437, y: 892.9107582569122, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31487, { alpha: 0, x: 1719.2398924827576, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31487, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1719.2398924827576, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1719.2398924827576, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31488, { alpha: 0, x: 1726.966617822647, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31488, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1726.966617822647, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1726.966617822647, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31489, { alpha: 0, x: 1736.0597982406616, y: 890.7774291038513, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31489, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1736.0597982406616, y: 890.7774291038513, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1736.0597982406616, y: 890.7774291038513, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31490, { alpha: 0, x: 1742.1932940483093, y: 893.0707516670227, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31490, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1742.1932940483093, y: 893.0707516670227, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1742.1932940483093, y: 893.0707516670227, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31491, { alpha: 0, x: 1749.9597980976105, y: 893.1214189529419, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31491, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1749.9597980976105, y: 893.1214189529419, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1749.9597980976105, y: 893.1214189529419, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31492, { alpha: 0, x: 1761.0132322311401, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31492, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1761.0132322311401, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1761.0132322311401, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31493, { alpha: 0, x: 1766.6398763656616, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31493, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1766.6398763656616, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1766.6398763656616, y: 892.9940915107727, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31494, { alpha: 0, x: 1774.3533527851105, y: 890.7774291038513, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31494, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1774.3533527851105, y: 890.7774291038513, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1774.3533527851105, y: 890.7774291038513, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31495, { alpha: 0, x: 1706.8266274929047, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31495, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1706.8266274929047, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1706.8266274929047, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31496, { alpha: 0, x: 1709.940006494522, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31496, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1709.940006494522, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1709.940006494522, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31497, { alpha: 0, x: 1713.0797525644302, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31497, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1713.0797525644302, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1713.0797525644302, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31498, { alpha: 0, x: 1715.353238940239, y: 903.7114298343658, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31498, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1715.353238940239, y: 903.7114298343658, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1715.353238940239, y: 903.7114298343658, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31499, { alpha: 0, x: 1716.313297510147, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31499, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1716.313297510147, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1716.313297510147, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31500, { alpha: 0, x: 1719.0666177272797, y: 902.9227497577667, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31500, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1719.0666177272797, y: 902.9227497577667, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1719.0666177272797, y: 902.9227497577667, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31501, { alpha: 0, x: 1721.959977209568, y: 903.7114298343658, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31501, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1721.959977209568, y: 903.7114298343658, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1721.959977209568, y: 903.7114298343658, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31502, { alpha: 0, x: 1722.913151025772, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31502, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1722.913151025772, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1722.913151025772, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31503, { alpha: 0, x: 1725.0331867933273, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31503, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1725.0331867933273, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1725.0331867933273, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31504, { alpha: 0, x: 1727.2198892831802, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31504, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1727.2198892831802, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1727.2198892831802, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31505, { alpha: 0, x: 1728.0931315124035, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31505, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1728.0931315124035, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1728.0931315124035, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31506, { alpha: 0, x: 1728.8133137822151, y: 903.7314046025276, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31506, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1728.8133137822151, y: 903.7314046025276, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1728.8133137822151, y: 903.7314046025276, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31507, { alpha: 0, x: 1730.7667317390442, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31507, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1730.7667317390442, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1730.7667317390442, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31508, { alpha: 0, x: 1733.9666503667831, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31508, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1733.9666503667831, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1733.9666503667831, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31509, { alpha: 0, x: 1736.179996728897, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31509, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1736.179996728897, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1736.179996728897, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31510, { alpha: 0, x: 1738.3399413824081, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31510, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1738.3399413824081, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1738.3399413824081, y: 903.732751429081, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31511, { alpha: 0, x: 1739.8065104186535, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31511, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1739.8065104186535, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1739.8065104186535, y: 902.9207437038422, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31512, { alpha: 0, x: 1740.179996728897, y: 904.0574259757996, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31512, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1740.179996728897, y: 904.0574259757996, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1740.179996728897, y: 904.0574259757996, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31513, { alpha: 0, x: 1742.7931965589523, y: 903.7114298343658, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31513, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1742.7931965589523, y: 903.7114298343658, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1742.7931965589523, y: 903.7114298343658, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31514, { alpha: 0, x: 1742.2798664569855, y: 793.9173786640167, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31514, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1742.2798664569855, y: 793.9173786640167, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1742.2798664569855, y: 793.9173786640167, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31515, { alpha: 0, x: 1744.666520178318, y: 794.7067952156067, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31515, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1744.666520178318, y: 794.7067952156067, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1744.666520178318, y: 794.7067952156067, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31516, { alpha: 0, x: 1745.619938135147, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31516, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1745.619938135147, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1745.619938135147, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31517, { alpha: 0, x: 1747.7399739027023, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31517, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1747.7399739027023, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1747.7399739027023, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31518, { alpha: 0, x: 1749.933398425579, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31518, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1749.933398425579, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1749.933398425579, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31519, { alpha: 0, x: 1751.2999837175012, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31519, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1751.2999837175012, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1751.2999837175012, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31520, { alpha: 0, x: 1752.0198567509651, y: 794.7260945439339, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31520, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1752.0198567509651, y: 794.7260945439339, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1752.0198567509651, y: 794.7260945439339, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31521, { alpha: 0, x: 1753.973209619522, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31521, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1753.973209619522, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1753.973209619522, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31522, { alpha: 0, x: 1756.9266601204872, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31522, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1756.9266601204872, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1756.9266601204872, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31523, { alpha: 0, x: 1758.2665201425552, y: 794.747416138649, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31523, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1758.2665201425552, y: 794.747416138649, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1758.2665201425552, y: 794.747416138649, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31524, { alpha: 0, x: 1760.359830737114, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31524, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1760.359830737114, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1760.359830737114, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31525, { alpha: 0, x: 1761.8331868425012, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31525, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1761.8331868425012, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1761.8331868425012, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31526, { alpha: 0, x: 1762.139925122261, y: 794.7067952156067, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31526, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1762.139925122261, y: 794.7067952156067, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1762.139925122261, y: 794.7067952156067, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31527, { alpha: 0, x: 1764.179996728897, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31527, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1764.179996728897, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1764.179996728897, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31528, { alpha: 0, x: 1766.3399413824081, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31528, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1766.3399413824081, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1766.3399413824081, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31529, { alpha: 0, x: 1767.600065112114, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31529, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1767.600065112114, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1767.600065112114, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31530, { alpha: 0, x: 1769.8333659172058, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31530, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1769.8333659172058, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1769.8333659172058, y: 793.9154784679413, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31531, { alpha: 0, x: 1772.086490869522, y: 795.0527913570404, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31531, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1772.086490869522, y: 795.0527913570404, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1772.086490869522, y: 795.0527913570404, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31532, { alpha: 0, x: 1774.273258447647, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31532, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1774.273258447647, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1774.273258447647, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31533, { alpha: 0, x: 1776.8066242933273, y: 794.7067952156067, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31533, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1776.8066242933273, y: 794.7067952156067, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1776.8066242933273, y: 794.7067952156067, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31534, { alpha: 0, x: 1778.346451818943, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31534, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1778.346451818943, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1778.346451818943, y: 794.7280557751656, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31535, { alpha: 0, x: 1780.2532551884651, y: 795.0368163585663, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31535, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1780.2532551884651, y: 795.0368163585663, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1780.2532551884651, y: 795.0368163585663, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31536, { alpha: 0, x: 1707.080013036728, y: 906.8327351808548, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31536, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1707.080013036728, y: 906.8327351808548, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1707.080013036728, y: 906.8327351808548, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31537, { alpha: 0, x: 1708.4332031011581, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31537, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1708.4332031011581, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1708.4332031011581, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31538, { alpha: 0, x: 1709.9664713144302, y: 907.1627116203308, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31538, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1709.9664713144302, y: 907.1627116203308, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1709.9664713144302, y: 907.1627116203308, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31539, { alpha: 0, x: 1712.0198730230331, y: 906.8527098894119, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31539, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1712.0198730230331, y: 906.8527098894119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1712.0198730230331, y: 906.8527098894119, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31540, { alpha: 0, x: 1713.9932779967785, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31540, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1713.9932779967785, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1713.9932779967785, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31541, { alpha: 0, x: 1714.373225927353, y: 907.143395960331, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31541, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1714.373225927353, y: 907.143395960331, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1714.373225927353, y: 907.143395960331, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31542, { alpha: 0, x: 1717.3866860866547, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31542, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1717.3866860866547, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1717.3866860866547, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31543, { alpha: 0, x: 1720.9998860359192, y: 907.143395960331, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31543, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1720.9998860359192, y: 907.143395960331, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1720.9998860359192, y: 907.143395960331, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31544, { alpha: 0, x: 1723.133268237114, y: 907.1213908195496, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31544, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1723.133268237114, y: 907.1213908195496, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1723.133268237114, y: 907.1213908195496, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31545, { alpha: 0, x: 1723.9397460222244, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31545, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1723.9397460222244, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1723.9397460222244, y: 906.8307046890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31546, { alpha: 0, x: 1729.6530923843384, y: 863.0814781188965, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31546, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1729.6530923843384, y: 863.0814781188965, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1729.6530923843384, y: 863.0814781188965, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31547, { alpha: 0, x: 1736.16002035141, y: 868.5747842788696, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31547, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1736.16002035141, y: 868.5747842788696, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1736.16002035141, y: 868.5747842788696, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31548, { alpha: 0, x: 1780.3065266609192, y: 834.0680947303772, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31548, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1780.3065266609192, y: 834.0680947303772, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1780.3065266609192, y: 834.0680947303772, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31549, { alpha: 0, x: 1777.8931798934937, y: 836.025426864624, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31549, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1777.8931798934937, y: 836.025426864624, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1777.8931798934937, y: 836.025426864624, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31550, { alpha: 0, x: 1782.2270183563232, y: 837.1353921890259, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31550, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1782.2270183563232, y: 837.1353921890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1782.2270183563232, y: 837.1353921890259, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31551, { alpha: 0, x: 1781.7264654636383, y: 838.1134114265442, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31551, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1781.7264654636383, y: 838.1134114265442, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1781.7264654636383, y: 838.1134114265442, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31552, { alpha: 0, x: 1756.9982290267944, y: 801.8380653858185, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31552, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1756.9982290267944, y: 801.8380653858185, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1756.9982290267944, y: 801.8380653858185, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31553, { alpha: 0, x: 1759.9995484352112, y: 804.284717798233, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31553, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1759.9995484352112, y: 804.284717798233, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1759.9995484352112, y: 804.284717798233, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31568, { alpha: 0, x: 1886.9332031011581, y: 863.3667439520359, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31568, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1886.9332031011581, y: 863.3667439520359, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1886.9332031011581, y: 863.3667439520359, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31646, { alpha: 0, x: 2018.919954419136, y: 873.1054321229458, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31646, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2018.919954419136, y: 873.1054321229458, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2018.919954419136, y: 873.1054321229458, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31653, { alpha: 0, x: 2135.386621057987, y: 860.7207559943199, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31653, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2135.386621057987, y: 860.7207559943199, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2135.386621057987, y: 860.7207559943199, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31676, { alpha: 0, x: 2037.846451818943, y: 863.9801025390625, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31676, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2037.846451818943, y: 863.9801025390625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2037.846451818943, y: 863.9801025390625, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31693, { alpha: 0, x: 2138.886555969715, y: 868.1907796263695, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31693, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2138.886555969715, y: 868.1907796263695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2138.886555969715, y: 868.1907796263695, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31699, { alpha: 0, x: 2021.8998372331262, y: 871.738777667284, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31699, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2021.8998372331262, y: 871.738777667284, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2021.8998372331262, y: 871.738777667284, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31705, { alpha: 0, x: 2084.8665852844715, y: 896.674812823534, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31705, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2084.8665852844715, y: 896.674812823534, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2084.8665852844715, y: 896.674812823534, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_31706, { alpha: 0, x: 2084.8665852844715, y: 896.0354492142797, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_31706, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2084.8665852844715, y: 896.0354492142797, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 2084.8665852844715, y: 896.0354492142797, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1914, { alpha: 0, x: 1896, y: 260, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1914, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1896, y: 260, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1896, y: 260, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1915, { alpha: 0, x: 1430, y: 29, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1915, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1430, y: 29, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1430, y: 29, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_51, { alpha: 0, x: 1821, y: 623, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_51, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1821, y: 623, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1821, y: 623, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_90, { alpha: 0, x: 997, y: 302, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_90, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 997, y: 302, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 997, y: 302, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_120, { alpha: 0, x: 969, y: 280, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_120, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 969, y: 280, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 969, y: 280, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_177, { alpha: 0, x: 759, y: 224, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_177, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 759, y: 224, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 759, y: 224, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_180, { alpha: 0, x: 1198, y: 91, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_180, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1198, y: 91, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1198, y: 91, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_181, { alpha: 0, x: 827, y: 116, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_181, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 827, y: 116, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 827, y: 116, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_281, { alpha: 0, x: 571, y: 685, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_281, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 571, y: 685, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 571, y: 685, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_187, { alpha: 0, x: 833, y: 409, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_187, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 833, y: 409, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 833, y: 409, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_264, { alpha: 0, x: 838, y: 873, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_264, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 838, y: 873, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 838, y: 873, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_200, { alpha: 0, x: 567, y: 544, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_200, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 567, y: 544, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 567, y: 544, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_291, { alpha: 0, x: 497, y: 1012, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_291, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 497, y: 1012, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 497, y: 1012, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_2611, { alpha: 0, x: 560, y: 193, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_2611, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 560, y: 193, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 560, y: 193, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_263, { alpha: 0, x: 817, y: 746, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_263, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 817, y: 746, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 817, y: 746, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_311, { alpha: 0, x: 1027, y: 729, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_311, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1027, y: 729, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 1027, y: 729, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_262, { alpha: 0, x: 820, y: 1010, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_262, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 820, y: 1010, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 820, y: 1010, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_265, { alpha: 0, x: 829, y: 895, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_265, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 829, y: 895, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 829, y: 895, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_267, { alpha: 0, x: 881, y: 917, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_267, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 881, y: 917, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 881, y: 917, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_269, { alpha: 0, x: 882, y: 907, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_269, {
				duration: 0.1,
				delay: 4.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 882, y: 907, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, x: 882, y: 907, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_268, { alpha: 0, x: 882, y: 927, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_268, {
				duration: 0.2,
				delay: 4.8,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 882, y: 927, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.2, alpha: 1, x: 882, y: 927, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_2610, { alpha: 0, x: 882, y: 897, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_2610, {
				duration: 0.5,
				delay: 4.5,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 882, y: 897, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 882, y: 897, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_280, { alpha: 0, x: 778, y: 547, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_280, {
				duration: 0.5,
				delay: 4.2,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 778, y: 547, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 778, y: 547, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_280, { alpha: 1, x: 778, y: 547, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_280, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, scaleX: 1, scaleY: 1, ease: 'Elastic.easeOut.config(3, 0.3)', x: 778, y: 547, rotation: 0,},{ duration: 0.3, scaleX: 1.25, scaleY: 0.75, ease: 'Elastic.easeOut.config(3, 0.3)', x: 778, y: 547, rotation: 0,},{ duration: 0.1, scaleX: 0.75, scaleY: 1.25, ease: 'Elastic.easeOut.config(3, 0.3)', x: 778, y: 547, rotation: 0,},{ duration: 0.1, scaleX: 1.15, scaleY: 0.85, ease: 'Elastic.easeOut.config(3, 0.3)', x: 778, y: 547, rotation: 0,},{ duration: 0.15, scaleX: 0.95, scaleY: 1.05, ease: 'Elastic.easeOut.config(3, 0.3)', x: 778, y: 547, rotation: 0,},{ duration: 0.1, scaleX: 1.05, scaleY: 0.95, ease: 'Elastic.easeOut.config(3, 0.3)', x: 778, y: 547, rotation: 0,},{ duration: 0.25, alpha: 1, scaleX: 1, scaleY: 1, ease: 'Elastic.easeOut.config(3, 0.3)', x: 778, y: 547, rotation: 0,}]
			});
			gsap.to(img_282, { alpha: 0, x: 427, y: 810, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_282, {
				duration: 0.5,
				delay: 3.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 427, y: 810, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 427, y: 810, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_282, { alpha: 1, x: 427, y: 810, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_282, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, scaleX: 1, scaleY: 1, x: 427, y: 810, rotation: 0, ease: 'power1',},{ duration: 0.05, scaleX: 0.9, scaleY: 0.9, x: 427, y: 810, rotation: 0, ease: 'power1',},{ duration: 0.1, alpha: 1, scaleX: 1, scaleY: 1, x: 427, y: 810, rotation: 0, ease: 'power1',},{ duration: 0.1, scaleX: 0.95, scaleY: 0.95, x: 427, y: 810, rotation: 0, ease: 'power1',},{ duration: 0.13, alpha: 1, scaleX: 1, scaleY: 1, x: 427, y: 810, rotation: 0, ease: 'power1',},{ duration: 0.14, scaleX: 1.5, scaleY: 1.5, x: 427, y: 810, rotation: 0, ease: 'power1',},{ duration: 0.18, alpha: 1, scaleX: 1, scaleY: 1, x: 427, y: 810, rotation: 0, ease: 'power1',},{ duration: 0.3, alpha: 0, scaleX: 5, scaleY: 5, x: 427, y: 810, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_283, { alpha: 0, x: 472, y: 810, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_283, {
				duration: 0.5,
				delay: 3.6,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 472, y: 810, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 472, y: 810, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_283, { alpha: 1, x: 472, y: 810, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_283, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, y: 810, x: 472, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1, alpha: 0, y: 860, x: 472, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_290, { alpha: 0, x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_290, {
				duration: 0.5,
				delay: 3.3,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_290, { alpha: 1, x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_290, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.3298, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.00020000000000003126, alpha: 0, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.01, alpha: 0, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.00020000000000003126, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.009599999999999937, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.00020000000000003126, alpha: 0, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.008999999999999985, alpha: 0, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.00020000000000003126, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.03059999999999995, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.00020000000000003126, alpha: 0, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.007999999999999972, alpha: 0, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.00020000000000003126, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.44160000000000005, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.00019999999999996022, alpha: 0, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.009000000000000057, alpha: 0, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.00019999999999996022, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,},{ duration: 0.1508, alpha: 1, ease: 'linear', x: 509, y: 810, scaleX: 1, scaleY: 1, rotation: 0,}]
			});
			gsap.to(img_300, { alpha: 0, x: 70, y: 676, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_300, {
				duration: 0.5,
				delay: 3,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 70, y: 676, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 70, y: 676, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_300, { alpha: 1, x: 70, y: 676, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_300, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, rotation: 0, x: 70, y: 676, scaleX: 1, scaleY: 1, ease: 'power1',},{ duration: 1, rotation: 360, x: 70, y: 676, scaleX: 1, scaleY: 1, ease: 'power1',}]
			});
			gsap.to(img_310, { alpha: 0, x: 192, y: 74, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_310, {
				duration: 0.5,
				delay: 2.7,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 192, y: 74, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 192, y: 74, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_310, { alpha: 1, x: 192, y: 74, scaleX: 0.5, scaleY: 0.5, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_310, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, scaleX: 0.5, scaleY: 0.5, x: 192, y: 74, rotation: 0, ease: 'power1',},{ duration: 1, scaleX: 1, scaleY: 1, x: 192, y: 74, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1025, { alpha: 0, x: 1492, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1025, {
				duration: 0.5,
				delay: 2.4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1492, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 1492, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1025, { alpha: 1, x: 1540, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_1025, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, x: 1540, alpha: 1, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.25, x: 1492, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.15, x: 1518, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.15, x: 1492, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, x: 1505, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.1, x: 1492, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.07, x: 1498.5, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.05, x: 1492, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.06, x: 1496, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.07, x: 1492, y: 1109.1786499023438, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1050, { alpha: 0, x: 81, y: 1133.8772583007812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1050, {
				duration: 0.5,
				delay: 2.1,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 81, y: 1133.8772583007812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 81, y: 1133.8772583007812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1050, { alpha: 1, x: 81, y: 1133.8772583007812, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_1050, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, x: 81, y: 1133.8772583007812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1, alpha: 0, x: 81, y: 1133.8772583007812, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1081, { alpha: 0, x: 113, y: 1174, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1081, {
				duration: 0.5,
				delay: 1.8,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 113, y: 1174, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 113, y: 1174, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1081, { alpha: 1, x: 113, y: 1174, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_1081, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, y: 1174, x: 113, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1, alpha: 0, y: 1224, x: 113, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1082, { alpha: 0, x: 779, y: 1969, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1082, {
				duration: 0.5,
				delay: 1.5,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 779, y: 1969, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 779, y: 1969, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1082, { alpha: 1, x: 779, y: 1969, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_1082, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, x: 779, y: 1969, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1, alpha: 0, x: 729, y: 1969, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1088, { alpha: 0, x: 2047.586181640625, y: 1255.9753723144531, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1088, {
				duration: 0.5,
				delay: 1.2,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2047.586181640625, y: 1255.9753723144531, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 2047.586181640625, y: 1255.9753723144531, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1088, { alpha: 1, x: 2047.586181640625, y: 1255.9753723144531, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_1088, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, x: 2047.586181640625, y: 1255.9753723144531, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1, alpha: 0, x: 2097.586181640625, y: 1255.9753723144531, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_10813, { alpha: 0, x: 2254, y: 2018, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_10813, {
				duration: 0.5,
				delay: 0.9,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 2254, y: 2018, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 2254, y: 2018, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_10813, { alpha: 1, x: 2254, y: 2018, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_10813, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, x: 2254, y: 2018, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1, alpha: 0, x: 2254, y: 1968, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_210, { alpha: 0, x: 713, y: 347, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_210, {
				duration: 0.5,
				delay: 0.6,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 713, y: 347, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 713, y: 347, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_210, { alpha: 1, x: 713, y: 347, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_210, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, x: 713, y: 347, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1, alpha: 0, x: 713, y: 297, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1110, { alpha: 0, x: 1450, y: 920, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 0 });
			gsap.to(img_1110, {
				duration: 0.5,
				delay: 1.3,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 0, x: 1450, y: 920, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 0.5, alpha: 1, x: 1450, y: 920, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
			gsap.to(img_1110, { alpha: 1, x: 1450, y: 920, scaleX: 1, scaleY: 1, rotation: 0, duration: 0, delay: 4 });
			gsap.to(img_1110, {
				duration: 1,
				delay: 4,
				repeat: 0,
				keyframes: [{ duration: 0, alpha: 1, x: 1450, y: 920, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',},{ duration: 1, alpha: 0, x: 1450, y: 920, scaleX: 1, scaleY: 1, rotation: 0, ease: 'power1',}]
			});
		}})();