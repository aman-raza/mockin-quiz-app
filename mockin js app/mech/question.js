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
    new Question("The friction experienced by a body, when in motion, is known as", ["rolling friction", "dynamic friction", "limiting friction", "static friction"], "dynamic friction"),
    new Question("The efficiency and work ratio of a simple gas turbine cycle are", ["low", "very low", "high", "very high"], "very low"),
    new Question("The thermal efficiency of a standard Otto cycle for a compression ratio of 5.5 will be", ["25%", "50%", "70%", "100%"], "50%"),
    new Question("In a Kaplan turbine runner, the number of blades are generally between", ["2 to 8", "4 to 8", "8 to 16", "16 to 24"], "4 to 8"),
    new Question("The type of file used for a wood work is", ["single-cut file", "double cut file", "rasp-cut file", "any one of these"], "rasp-cut file")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();