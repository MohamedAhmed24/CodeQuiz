var questions = [
    {
        question: "What does HTML stand for?",
        choices: ["High Tech Market Language", "Hey Tim More Lasagna", "Hello Take My Love", "Hyper Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
  
    {
        question: "Which character is used to indicate an end tag?",
        choices: ["/", ".", ";", "#"],
        answer: "/"
    },
  
    {
        question: "Which HTML element is used to specify a header for a document?",
        choices: ["<section>", "<script>", "<header>", "<h1>"],
        answer: "<header>"
    },
  
    {
        question: "Choose the correct HTML element to define important text",
        choices: ["<li>","<i>","<imp>","<strong>"],
        answer: "<strong>"
    },
    {
        question:  "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>","<scripter>","<javascript>","<js>"],
        answer: "<script>"
    },
  
    {
        question: "Which is the correct bracket notations for array?",
        choices: ["( )", "{ }", "[ ]", "< >"],
        answer: "[ ]"
    },
  
    {
        question: "Choose the correct HTML element for the largest heading:",
        choices: ["<hello>","<head>","<h1>","<button>"],
        answer: "<h1>"
    },
  
  ];
  
  $(document).ready(function () {
    var welcomeBox = $("#welcome");
    var questionBox = $("#question");
    var endingScoreBox = $("#endingScoreBox");
    var highScoresBox = $("#highScores");
    var scores = JSON.parse(localStorage.getItem("scores") || "[]");
  
    var questionTxtEl = $("#questionTxt");
    var answerBtn1 = $("#choice1");
    var answerBtn2 = $("#choice2");
    var answerBtn3 = $("#choice3");
    var answerBtn4 = $("#choice4");
    var feedbackEl = $("#feedback");
    var getStartedBtn = $("#startQuiz");
    var highScoresBtn = $("#highScoreBtn");
    var currentQuestion = 0;
    
    var timer = 200;
    var timerCountdownEl = $("#timerCountdown");
    var timerReference = undefined;
  
    welcomeBox.show();
    questionBox.hide();
    endingScoreBox.hide();
    highScoresBox.hide();
  
    function showScore() {
        questionBox.hide();
        endingScoreBox.show();
        $("#endingScore").text("Ending Score: " + timer);
        window.clearInterval(timerReference);
    }
  
    function showHighScores() {
        welcomeBox.hide();
        questionBox.hide();
        endingScoreBox.hide();
        highScoresBox.show();
        $("#highScoresList").empty();
        $.each(scores, function (index, value) {
            var initials = value[0];
            var score = value[1];
            var eachScore = $("<li>");
            eachScore.text(initials + "      " + score);
            $("#highScoresList").append(eachScore);
        });
    }
  
    getStartedBtn.click(function () {
  
      welcomeBox.hide();
        questionBox.show();
  
        var question1 = questions[0];
  
        questionTxtEl.text(question1.question);
  
        var question1choices = question1.choices;
  
        answerBtn1.text(question1choices[0]);
        answerBtn2.text(question1choices[1]);
        answerBtn3.text(question1choices[2]);
        answerBtn4.text(question1choices[3]);
  
        timerReference = window.setInterval(function () {
            timer--;
            if (timer == 0) {
  
              showScore();
            } else {
                timerCountdownEl.text(timer);
            };
        }, 1000);
  
    });
  
    $(".answer").on("click", function (event) {
        event.preventDefault();
        var correctAnswer = questions[currentQuestion].answer;
        var theirAnswer = event.target.innerText;
        if (theirAnswer == correctAnswer) {
            feedbackEl.text("Correct!").show();
        } else {
  
          feedbackEl.text("Wrong Answer").show();
            timer -= 10;
        }
  
        window.setTimeout(function () {
  
          showNextQuestionOrScore();
        }, 500);
    });
  
    function showNextQuestionOrScore() {
        currentQuestion++;
  
        if (currentQuestion == questions.length) {
            showScore();
        } else {
            feedbackEl.hide();
            var question1 = questions[currentQuestion];
  
            questionTxtEl.text(question1.question);
  
            var question1choices = question1.choices;
  
            answerBtn1.text(question1choices[0]);
            answerBtn2.text(question1choices[1]);
            answerBtn3.text(question1choices[2]);
            answerBtn4.text(question1choices[3]);
        }
    }
  
    var saveInitials = $("#saveName");
    
  
    saveInitials.on("click", function (event) {
        var multipleInitial = $("#name").val();
  
        scores.push([multipleInitial, timer]);
        
        scores.sort(function (first, second) {
            if (first[1] > second[1]) {
                return -1;
            } else if (first[1] < second[1]) {
                return 1;
            }
            return 0;
        });
        
        localStorage.setItem("scores", JSON.stringify(scores));
        showHighScores();
    });
  
    highScoresBtn.on("click", function () {
        window.clearInterval(timerReference);
        showHighScores();
    });
  
    $("#clearScores").on("click", function () {
        scores = [];
        localStorage.setItem("scores", JSON.stringify(scores));
  
        $("#highScoresList").empty();
    });
  
  
    $("#startOver").on("click", function () {
        location.reload();
    });
  
  });
