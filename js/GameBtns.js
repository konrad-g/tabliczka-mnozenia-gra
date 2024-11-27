class GameBtns {

  btnAnswer1
  btnAnswer2
  btnAnswer3
  btnAnswer4

  correctAnswer
  allAnswersInit 
  onAnswer 
  onCorrectAnswer
  alreadyAnswered = false
  alreadyCorrectlyAnswered = false

  init = (allAnswersInit, onAnswer, onCorrectAnswer) => {
    // Remove duplicates from allAnswersInit
    this.allAnswersInit = [...new Set(allAnswersInit)];
    this.onAnswer = onAnswer;
    this.onCorrectAnswer = onCorrectAnswer;

    this.btnAnswer1 = $('#btnAnswer1')
    this.btnAnswer2 = $('#btnAnswer2')
    this.btnAnswer3 = $('#btnAnswer3')
    this.btnAnswer4 = $('#btnAnswer4')

    this.btnAnswer1.on('click', this.onBtnClick);
    this.btnAnswer2.on('click', this.onBtnClick);
    this.btnAnswer3.on('click', this.onBtnClick);
    this.btnAnswer4.on('click', this.onBtnClick);
  }

  initRound = (correctAnswerMultiplication) => {
    document.activeElement.blur();
    
    const correctAnswer = correctAnswerMultiplication.result;

    this.removeButtonMarks();
    this.alreadyAnswered = false;
    this.alreadyCorrectlyAnswered = false;
    this.correctAnswer = correctAnswer;

    let roundAnswers = []

    if (correctAnswerMultiplication.left == 1 || correctAnswerMultiplication.right == 1) {
      roundAnswers = MathUtils.generateRoundValue(correctAnswer, [1])
    } else {
      roundAnswers = MathUtils.generateRoundValue(correctAnswer, [])
    }
    
    this.btnAnswer1.text(roundAnswers[0]);
    this.btnAnswer2.text(roundAnswers[1]);
    this.btnAnswer3.text(roundAnswers[2]);
    this.btnAnswer4.text(roundAnswers[3]);
  }

  onBtnClick = (event) => {
    if (this.alreadyCorrectlyAnswered) {
      return;
    }
    const btnValue = $(event.target).text();
    const isCorrect = btnValue == this.correctAnswer;
    if (this.alreadyAnswered) {
      if (isCorrect) {
        this.alreadyCorrectlyAnswered = true;
        this.onCorrectAnswer();
      }
    } else {
      this.onAnswer(isCorrect);
      this.markButtons(isCorrect)
      this.alreadyAnswered = true;
    }
  }

  markButtons = (isCorrect) => {
    const allButtons = [this.btnAnswer1, this.btnAnswer2, this.btnAnswer3, this.btnAnswer4]
    const correctBtnIndex = allButtons.findIndex(btn => btn.text() == this.correctAnswer);
    const correctBtn = allButtons[correctBtnIndex];
    const incorrectBtns = allButtons.filter((btn, index) => index !== correctBtnIndex);

    correctBtn.addClass('btn-outline-success');
    incorrectBtns.forEach(btn => {
      if (!isCorrect) {
        btn.addClass('btn-outline-danger');
      } else {
        btn.addClass('btn-outline-secondary');
      }
    });
  }

  removeButtonMarks = () => {
    [this.btnAnswer1, this.btnAnswer2, this.btnAnswer3, this.btnAnswer4].forEach(btn => {
      btn.removeClass('btn-outline-success');
      btn.removeClass('btn-outline-danger');
      btn.removeClass('btn-outline-secondary');
    })
  }
}