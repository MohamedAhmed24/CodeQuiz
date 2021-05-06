const questions = [
    {
        "questionTitle": "This is my first question?",
        "choiceOne": "This is a possible answer",
        "ChoiceTwo": "This is a possible answer",
        "ChoiceThree": "This is a possible answer",
        "ChoiceFour": "This is a possible answer",
        "CorrectChoice": "This is the correct answer"
    },
    {
        "questionTitle": "This is my first question?",
        "choiceOne": "This is a possible answer",
        "ChoiceTwo": "This is a possible answer",
        "ChoiceThree": "This is a possible answer",
        "ChoiceFour": "This is a possible answer",
        "CorrectChoice": "This is the correct answer"
    },
]













const startButton = document.querySelector("#startBtn")


startButton.addEventListener("click", function(event){
    event.preventDefault();
    console.log("button was clicked")
})