
/////**************JAVA CANDY CRUSH NEXTU******************/////

var column = ["","","","","","",""], row = ["","","","","","",""], xMatch = 0, yMatch = 0,
fetchCandy = 0, max = 0, matrix = 0, interval = 0, byeCandy = 0, downCandy = 0, time = 0, i = 0,
counter = 0, fetchTime = 0, min = 2, sec = 0, score = 0, mvmnt = 0;

var candyCrushNextU = {
  colorMatchGame: function(){
    setInterval(function(){
      $(".main-titulo").animate({color: " #33FA07"}, 750),
      $(".main-titulo").animate({color: "#FFFFFF"}, 750)
    }, 100);
  },
}

$(".btn-reinicio").click(function(){
	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();
	$("#score-text").html("0");
	$("#movimientos-text").html("0");
	$(this).html('<a href="" class="reinicio">Reiniciar</a>');
	interval=setInterval(function(){
		dragCandy()
	},400);
	time=setInterval(function(){
		timer()
	},1000);
});

function timer(){
	var origin = '';
	if(sec < 10){
		origin = '0';
	} else {
		origin = '';
	}
	$("#timer").html("0"+min+" : "+origin+sec);
	if(sec!=0){
		sec=sec-1;}
	if(sec==0){
		if(min===sec){
			clearInterval(byeCandy);
			clearInterval(downCandy);
			clearInterval(interval);
			clearInterval(time);
			$(".panel-tablero").hide("drop","slow",gameOver);
			$(".time").hide();
		}
		sec=59;
		min=min-1;
	}
};

function dragCandy(){
	i=i+1
	var numero=0;
	var imagen=0;
	$(".elemento").draggable({disabled:true});
	if(i<8){
		for(var j=1;j<8;j++){
			if($(".col-"+j).children("img:nth-child("+i+")").html()==null){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
			}}}
	if(i==8){
		clearInterval(interval);
		byeCandy=setInterval(function(){
			eraseY()
		},150);
	}
};

function eraseY(){
	matrix=0;
	xMatch=x();
	yMatch=y();
	for(var j=1;j<8;j++){
		matrix=matrix+$(".col-"+j).children().length;
	}
	if(xMatch==0 && yMatch==0 && matrix!=49){
		clearInterval(byeCandy);
		fetchCandy=0;
		downCandy=setInterval(function(){
			newCandy()
		},400);
	}
	if(xMatch==1||yMatch==1){
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$(".activo").hide("pulsate",1000,function(){
			var scoretmp=$(".activo").length;
			$(".activo").remove("img");
			score=score+scoretmp*50;
			$("#score-text").html(score);
		});
	}
	if(xMatch==0 && yMatch==0 && matrix==49){
		$(".elemento").draggable({
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				mvmnt=mvmnt+1;
				$("#movimientos-text").html(mvmnt);}
		});
	}

	$(".elemento").droppable({
		drop:function (event,ui){
			var dropped=ui.draggable;
			var droppedOn=this;
			fetchTime=0;
			do{
				fetchTime=dropped.swap($(droppedOn));}
			while(fetchTime==0);
			xMatch=x();
			yMatch=y();
			if(xMatch==0 && yMatch==0){
				dropped.swap($(droppedOn));}
			if(xMatch==1 || yMatch==1){
				clearInterval(downCandy);
				clearInterval(byeCandy);
				byeCandy=setInterval(function(){
					eraseY()
				},150);}},
	});
};

jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};

function newCandy(){
	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
	for(var j=1;j<8;j++){
		column
	[j-1]=$(".col-"+j).children().length;
	}
	if(fetchCandy==0){
		for(var j=0;j<7;j++){
			row[j]=(7-column
			[j]);}
		max=Math.max.apply(null,row);
		counter=max;
	}
	if(max!=0){
		if(fetchCandy==1){
			for(var j=1;j<8;j++){
				if(counter>(max-row[j-1])){
					$(".col-"+j).children("img:nth-child("+(row[j-1])+")").remove("img");}}
		}
		if(fetchCandy==0){
			fetchCandy=1;
			for(var k=1;k<8;k++){
				for(var j=0;j<(row[k-1]-1);j++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");
				}
			}
		}
		for(var j=1;j<8;j++){
			if(counter>(max-row[j-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");
			}
		}
	}
	if(counter==1){
		clearInterval(downCandy);
		byeCandy=setInterval(function(){
			eraseY()
		},150);
	}
	counter=counter-1;
};

function x(){
	var fetchX=0;
	for(var j=1;j<8;j++){
		for(var k=1;k<6;k++){
			var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
			var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
			var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				fetchX=1;
			}
		}
	}
	return fetchX;
};

function y(){
	var fetchY=0;
	for(var l=1;l<6;l++){
		for(var k=1;k<8;k++){
			var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
			var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
			var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
				fetchY=1;
			}
		}
	}
	return fetchY;
};

function gameOver(){
	$(".panel-score").animate({width:'100%'},1500);
	$(".termino").css({"display":"block","text-align":"center"});
};

$(function(){
  candyCrushNextU.colorMatchGame();
});