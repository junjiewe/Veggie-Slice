var isPlaying = false;
var score;
var trialsLeft;
var veggies = ['broccoli.png', 'cabbage.png', 'carrot.png', 'cucumber.png', 'tomato.png'];
var step;
var action; //use for the setIntervel function

$(function(){
    $("#start").click(function(){
        if(isPlaying == true){ //check if the game is playing
           location.reload();   //reload the game
        }else {
            isPlaying = true;
            $("#gameover").hide();
            $("#start").html("Reset");
            score = 0;
            $("#scoreValue").html(score);
            
            $("#trialleft").show();
            trialsLeft = 3;
            addLife();
            
            startAction();
        }
    });

    //slice fruit
    $("#veg1").mouseover(function(){
       score++;
       $("#scoreValue").html(score);
       $("#sound")[0].play();
        //stop veg go down and hide
        clearInterval(action);
        $("#veg1").hide("explode", 400);
        
        //send a new fruit
        setTimeout(startAction, 500);
    });
    
    function addLife(){
        $("#trialleft").empty();
        for(var i = 0; i<trialsLeft;i++){
            $("#trialleft").append(" <img src='photo/heart.png' class='life'>");
        }
    }

    function startAction(){
        $("#veg1").show();
        chooseVeg();
        $("#veg1").css({'left' : Math.round(Math.random()* 670), 'top' : -40});
        //generate a random step
        step = 1+ Math.round(Math.random()* 5);

        //move fruit doen by one step every 10ms
        action = setInterval(function(){
            $("#veg1").css('top', $("#veg1").position().top + step)

            //check to see if fruit if too low
            if($("#veg1").position().top > $("#gameframe").height()){
                if(trialsLeft > 1){
                   $("#veg1").show();
                   chooseVeg();
                   $("#veg1").css({'left' : Math.round(Math.random()* 670), 'top' : -40});
                   //generate a random step
                   step = 1+ Math.round(Math.random()* 5);
                   trialsLeft --;    
                   addLife();       
                }else { //game over
                    isPlaying = false;
                    $("#trialleft").hide();
                    $("#start").html("start");
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over!</p> <p>Your Score is " + score+ "</p>");
                    stopAction();
                }   
            }
        }, 10);
    }

    function stopAction(){
        clearInterval(action);
        $("#veg1").hide();
    }

    function chooseVeg() {
        var randomVeg = generateRandomVeg(veggies) ;
        $("#veg1").attr('src' , 'photo/' + veggies[randomVeg]);

    }

    function generateRandomVeg(veggies) {
        return Math.round(Math.random()* 4)    
    }                      

});