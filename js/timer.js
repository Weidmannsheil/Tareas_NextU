
/////*****JAVA TIMER CANDY CRUSH NEXTU*****/////

$(function(){
   
   var min, sec    
   var idInterval =""

	$('button').on('click',function(){
       clearInterval(idInterval)
       min = 2, sec = 0 
       idInterval=setInterval(function(){ timer() }, 1000)
  	})
   
	function timer(){
       sec--
       if (sec == -1){
            min--
            sec = 59
        }
         
       if (sec <= 9)
          $('#timer').text( "0"+ min + ":" + "0"+sec)
       else
          $('#timer').text( "0"+ min + ":" + sec)
         
       if (min == 0 && sec == 0){  
         clearInterval(idInterval)
           
         $('.panel-score').animate( 
             {width: "95%"}, 
             {step: function(now){
                 $('.panel-tablero').css('width', parseInt(70-70*now/10)+"%")
             },queue: true
        },1000)
           
        $('.panel-tablero').hide()
        $('.time').hide()
        $('<h4 class="titulo-over">Juego Terminado</h4>').prependTo($('.panel-score'))   
       }
	}

});