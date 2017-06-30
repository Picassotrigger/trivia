//---------------------   VARIABLES   ---------------------//

var problems = [
    ["Which best selling toy of 1983 caused hysteria, resulting in riots breaking out in stores?", "Cabbage Patch Kids", "Transformers", "Care Bears", "Rubik's Cube"],
    ["In past times, what would a gentleman keep in his fob pocket?", "Watch", "Money", "Keys", "Notebook"],
    ["Area 51 is located in which US state?", "Nevada", "Arizona", "New Mexico", "Utah"],
    ["HTML is what type of language?", "Markup Language", "Macro Language", "Programming Language", "Scripting Language"],
    ["Which American president appears on a one dollar bill?", "George Washington", "Thomas Jefferson", "Abraham Lincoln", "Benjamin Franklin"],
    ["How many colors are there in a rainbow?", "7", "8", "9", "10"],
    ["What was the nickname given to the Hughes H-4 Hercules, a heavy transport flying boat which achieved flight in 1947?", "Spruce Goose", "Noah's Ark", "Fat Man", "Trojan Horse"],
    ["What is the name of Poland in Polish?", "Polska", "Pupcia", "Polszka", "Pland"],
    ["The New York Times slogan is, \'All the News That\'s Fit to...'", "Print", "Digest", "Look", "Read"],
    ["What type of animal was Harambe, who was shot after a child fell into it's enclosure at the Cincinnati Zoo?", "Gorilla", "Tiger", "Panda", "Crocodile"]
];


var questionsPerGame = 10;

var activeProblem = 0;
console.log("activeProblem = " + activeProblem);

//var answersPreShuffle = ["correct", "false1", "false2", "false3"];
var answersPreShuffle = [1, 2, 3, 4];
console.log("answersPreShuffle = " + answersPreShuffle);

var answersPostShuffle = shuffle(answersPreShuffle);
console.log("answersPostShuffle = " + answersPostShuffle);

var correctAnswer = answersPostShuffle.indexOf(1);
console.log("correctAnswer = " + correctAnswer);

var answer1 = answersPostShuffle[1];
console.log("answer1 = " + answer1);

var answeredCorrectly = 0;
console.log("answeredCorrectly = " + answeredCorrectly);

var answeredWrong = 0;
console.log("answeredWrong = " + answeredWrong);

var time = 0;




//---------------------   CLOCK OBJECT   ---------------------//

var intervalId;

var clockRunning = false;

var stopwatch = {

//  time: 30,
  lap: 1,

  reset: function() {

    time = 0;

    $("#game-clock").html("00:00");

  },
    
  start: function() {

    if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
    }
  },
  
  stop: function() {

    clearInterval(intervalId);
    clockRunning = false;
  },

  count: function() {

    if(time > 0) {
       time--;
    } 
    else {
        $("h2#question").text("Outta Time!").css({
            "font-size": "3em",
            "font-family": "\'Cherry Cream Soda\', cursive",
            "color": "#fc606c",
            "margin-top": "50px"
        });
        answeredWrong++;
        $("#wrong-answers").text(answeredWrong);

        if(answeredCorrectly + answeredWrong === questionsPerGame) {
            setTimeout(gameOver, 1000);
        }else {
            setTimeout(presentProblem, 1000);
        }
        time = 10;
    }
      
    var converted = stopwatch.timeConverter(time);
//    console.log(converted);

    $("#game-clock").html(converted);
  },
    
  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};







//---------------------   FUNCTIONS   ---------------------//

function shuffle(array) {
    var m = array.length, t, i;
    
    while(m) {
        i = Math.floor(Math.random() * m--);
        
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function presentProblem() {
    $("#answersList").show();
    
    $("h2#question").css({
        "font-size": "2.2em",
        "font-family": "\'Quicksand\', sans-serif",
        "color": "antiquewhite",
        "margin-top": "0px"
    });
    
    $("h2#question").text(problems[activeProblem][0]);

    $("li#answer1").text("1. " + problems[activeProblem][answersPostShuffle[0]]);
    $("li#answer2").text("2. " + problems[activeProblem][answersPostShuffle[1]]);
    $("li#answer3").text("3. " + problems[activeProblem][answersPostShuffle[2]]);
    $("li#answer4").text("4. " + problems[activeProblem][answersPostShuffle[3]]);
    
    activeProblem++;
    
    time = 10;
    
    stopwatch.start();
}

function checkAnswer() {
    console.log("this is the checkAnswer func");
    console.log($(this).attr("value"));
    
    var answer = $(this).attr("value");
    console.log("answer = " + answer);
    
    if(Number(answer) === correctAnswer) {
        $("h2#question").text("You're Correct!").css({
            "font-size": "3em",
            "font-family": "\'Cherry Cream Soda\', cursive",
            "color": "#fc606c",
            "margin-top": "60px"
        });

        answeredCorrectly++;
        $("#correct-answers").text(answeredCorrectly);

        if(answeredCorrectly + answeredWrong === questionsPerGame) {
            setTimeout(gameOver, 1000);
            stopwatch.stop();
        }else {
            setTimeout(presentProblem, 1000);
        }


    }else {
        $("h2#question").text("You're Wrong!").css({
            "font-size": "3em",
            "font-family": "\'Cherry Cream Soda\', cursive",
            "color": "#fc606c",
            "margin-top": "50px"
        });
        answeredWrong++;
        $("#wrong-answers").text(answeredWrong);

        if(answeredCorrectly + answeredWrong === questionsPerGame) {
            setTimeout(gameOver, 1000);
            stopwatch.stop();
        }else {
            setTimeout(presentProblem, 1000);
        }
    }
}

function gameOver() {
    $("h2#question").text("Game Over!").css({
            "font-size": "3em",
            "font-family": "\'Cherry Cream Soda\', cursive",
            "color": "#fc606c",
            "margin-top": "20px"
        });
    
    $("ul#answersList").hide();
    
    $("#play-again").show();
}

function gameReset() {
    activeProblem = 0;
    
    answeredCorrectly = 0;
    $("#correct-answers").text(answeredCorrectly);
    
    answeredWrong = 0;
    $("#wrong-answers").text(answeredWrong);
    
    $("h2#question").empty();
    $("#play-again").hide();
    
    $("h2#question").css({
        "font-size": "2.2em",
        "font-family": "\'Quicksand\', sans-serif",
        "color": "antiquewhite",
        "margin-top": "0px"
    });
    
    $("#answersList").show();
    
    presentProblem();
}








//---------------------   MAIN   ---------------------//
    presentProblem();
    
    $("li.answer").on("click", checkAnswer);

    $("button#play-again").on("click", gameReset)

