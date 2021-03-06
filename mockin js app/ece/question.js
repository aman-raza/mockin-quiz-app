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
    new Question("For a base current of 10 μA, what is the value of collector current in common emitter if βdc = 100", ["10 μA", "100 μA", "1 mA", "10 mA"], "1"),
    new Question("The noise generated by a resistor depends upon", ["its resistance value", "its operating temperature", "both its resistance value and operating temperature", "none of the above"], "its operating temperature"),
    new Question("MICR stands for", ["Magnetic Ink Chart Receipt", "Magnetic Ink Character Recognition", "Magnetic Ink Chart Recognition", "Magnetic Ink Character Receipt"], "Magnetic Ink Character Recognition"),
    new Question("A cycloconverter can be", ["step down", "step up", "step down or step up", "none of the above"], "step down or step up"),
    new Question("An energy signal has G(f) = 10. Its energy density spectrum is", ["10", "100", "50", "20"], "100 ")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();