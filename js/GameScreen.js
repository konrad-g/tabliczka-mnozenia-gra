class GameScreen {

  NEXT_ROUND_DELAY_MS = 600;

  allMultiplications = []
  allMultiplicationsInit = []
  currentMultiplication
  onFinish
  scoreGood = 0
  scoreBad = 0
  timeStart
  gameBtns
  isWaitingForCorrectAnswer = false

  generateMultiplicationTable = () => {
    const table = [];
    
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        table.push({
          left: Math.min(i, j),
          right: Math.max(i, j),
          result: i * j
        });
      }
    }
    
    return table.sort(MathUtils.sortRandom);
  }
  
  init = (range, onFinish) => {
    this.onFinish = onFinish;
    this.timeStart = Date.now();

    this.allMultiplicationsInit = this.generateMultiplicationTable();
    const multiplications = this.allMultiplicationsInit.filter(m => m.result <= range);
    this.allMultiplications = multiplications;
    this.gameBtns = new GameBtns();
    const allAnswersInit = this.allMultiplicationsInit.map(m => m.result);
    this.gameBtns.init(allAnswersInit, this.onAnswer, this.onCorrectAnswer);

    this.nextRound();
  }

  onAnswer = (isCorrect) => {

    $("#equation").text(`${this.currentMultiplication.left} x ${this.currentMultiplication.right} = ${this.currentMultiplication.result}`);

    if (isCorrect) {
      this.scoreGood++;

      const potentialCorectIndicators = ["🎉","🥳","💪","😀","🙌"]
      const correctIndicator = potentialCorectIndicators[Math.floor(Math.random() * potentialCorectIndicators.length)];
      const potentialCorectTexts = ["Brawo!","Super!","Tak!","Ekstra!", "Dobrze!"]
      const correctText = potentialCorectTexts[Math.floor(Math.random() * potentialCorectTexts.length)];
      $('#answerResult').text(correctText + " " + correctIndicator)
      setTimeout(() => {
        this.nextRound();
      }, this.NEXT_ROUND_DELAY_MS);
    } else {
      this.scoreBad++;
      this.isWaitingForCorrectAnswer = true;

      const potentialWrongIndicators = ["😿","😔","🥺","☹️","😟"]
      const wrongIndicator = potentialWrongIndicators[Math.floor(Math.random() * potentialWrongIndicators.length)];
      $('#answerResult').text(wrongIndicator)
    }
  }

  onCorrectAnswer = () => {
    if (!this.isWaitingForCorrectAnswer) {
      return;
    }

    this.isWaitingForCorrectAnswer = false;
    this.nextRound();
  }

  nextRound = () => {
    $('#answerResult').text("");

    if (this.allMultiplications.length === 0) {
      this.onFinish(this.scoreGood, this.scoreBad, this.timeStart);
    } else {
      const multiplication = this.allMultiplications.pop();

      this.currentMultiplication = multiplication;
      $("#equation").text(`${multiplication.left} x ${multiplication.right} =`);
      this.gameBtns.initRound(multiplication.result);
    }
  }
}