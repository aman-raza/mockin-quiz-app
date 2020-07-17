function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("How many degrees are there in /3 rad?", ["6°", "60°", "180°", "27°"], "60°"),
    new Question("In a series resonant band-pass filter, a lower value of Q results in", ["a higher resonant frequency", "a smaller bandwidth", "a higher impedance", "a larger bandwidth"], "a larger bandwidth"),
    new Question("The turns ratio required to match an 80 ohm  source to a 320 ohm  load is", ["80", "20", "4", "2"], "2"),
    new Question("The maximum output voltage of a certain low-pass filter is 15 V. The output voltage at the critical frequency is", ["0 V", "15 V", "10.60 V", "21.21 V"], "10.60 V"),
    new Question("When the pointer of an analog ohmmeter reads close to zero, the resistor being measured is", ["overheated", "shorted", "open", "reverse"], "shorted")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();