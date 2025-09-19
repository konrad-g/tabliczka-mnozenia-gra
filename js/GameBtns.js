class GameBtns {

  TIMEOUT_NEXT_MS = 1500

  inputAnswer
  btnNext

  correctAnswer
  allAnswersInit 
  onAnswer 
  onCorrectAnswer
  alreadyAnswered = false
  alreadyCorrectlyAnswered = false
  nextTimeout

  init = (allAnswersInit, onAnswer, onCorrectAnswer) => {
    // Remove duplicates from allAnswersInit
    this.allAnswersInit = [...new Set(allAnswersInit)];
    this.onAnswer = onAnswer;
    this.onCorrectAnswer = onCorrectAnswer;

    this.inputAnswer = $('#inputAnswer')
    this.btnNext = $('#btnNext')

    this.inputAnswer.on('input', this.onInputChange);
    this.btnNext.on('click', this.onBtnClick);
    clearTimeout(this.nextTimeout);
  }

  initRound = (correctAnswerMultiplication) => {
    document.activeElement.blur();
    document.body.focus();

    const correctAnswer = correctAnswerMultiplication.result;

    this.removeButtonMarks();
    this.alreadyAnswered = false;
    this.alreadyCorrectlyAnswered = false;
    this.correctAnswer = correctAnswer;
    this.inputAnswer.val('');
    this.inputAnswer.focus();

    clearTimeout(this.nextTimeout);
  }

  onInputChange = (event) => {
    if (this.alreadyAnswered) {
      this.inputAnswer.val(this.correctAnswer);
      return;
    }

    const inputValue = event.target.value;
    const isPartiallyIncorrect = inputValue?.toString().trim().length > 0 && !this.correctAnswer.toString().startsWith(inputValue);
    const isCorrect = inputValue == this.correctAnswer;

    if (isCorrect || isPartiallyIncorrect) {
      this.onBtnClick(event);
    }
  }

  onBtnClick = (event) => {
    if (this.alreadyCorrectlyAnswered) {
      return;
    }

    const answer = this.inputAnswer.val();
    const isCorrect = answer == this.correctAnswer;

    if (this.alreadyAnswered) {
      this.alreadyCorrectlyAnswered = true;
      this.onCorrectAnswer();
    } else {
      this.onAnswer(isCorrect);
      this.markButtons(isCorrect)
      this.alreadyAnswered = true;
      clearTimeout(this.nextTimeout);
      this.nextTimeout = setTimeout(() => {
        this.onBtnClick(event);
      }, this.TIMEOUT_NEXT_MS);
    }
  }

  markButtons = (isCorrect) => {

    this.inputAnswer.val(this.correctAnswer);

    if (isCorrect) {
      this.inputAnswer.addClass('is-valid');
      this.btnNext.addClass('btn-success');
    } else{
      this.inputAnswer.addClass('is-invalid');
      this.btnNext.addClass('btn-outline-danger');
    }
  }

  removeButtonMarks = () => {
    this.btnNext.removeClass('btn-success');
    this.btnNext.removeClass('btn-outline-danger');
    this.btnNext.removeClass('btn-outline-secondary');
    this.btnNext.addClass('btn-primary');

    this.inputAnswer.removeClass('is-valid');
    this.inputAnswer.removeClass('is-invalid');
  }
}