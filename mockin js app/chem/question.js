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
    new Question("Which one of the following is incombustible ?", ["H2", "CCL4", "C2H2", "S"], "CCL4"),
    new Question("Which of the following may be used to measure the rate of nuclear disintegration?", ["Geiger-Muller Counter", "Cyclotron", "Cold chamber", "Mass spectrograph"], "Geiger-Muller Counter"),
    new Question("Caprolactum, a raw material for the manufacture of nylon-6, is produced from", ["phenol", "naphthalene", "benzene", "pyridine"], "benzene"),
    new Question("Which of the following is not the triple point of water ?", ["32°R", "273°K", "492°R", "32°F"], "32°R"),
    new Question("Persons working in cement plants and limestone quarries are more prone to disease like", ["cancer", "asthma", "silicosis", "flourosis"], "silicosis")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();