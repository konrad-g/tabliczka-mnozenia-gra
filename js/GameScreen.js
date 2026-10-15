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

  progressCounter
  totalQuestionsCount = 0
  currentQuestionNumber = 0

  confettiCanvas = null
  confetti

  generateMultiplicationTable = () => {
    const table = [];
    
    for (let i = 2; i <= 9; i++) {
      for (let j = 2; j <= 9; j++) {
        table.push({
          left: i,
          right: j,
          result: i * j,
          operator: 'x'
        });
      }
    }

    return table.sort(MathUtils.sortRandom);
  }

  generateDivisionTable = () => {
    const table = [];

    for (let i = 2; i <= 9; i++) {
      for (let j = 2; j <= 9; j++) {
        table.push({
          left: i * j,
          right: j,
          result: i,
          operator: ':'
        });
      }
    }

    return table.sort(MathUtils.sortRandom);
  }

  init = (range, operation, onFinish) => {
    this.onFinish = onFinish;
    this.timeStart = Date.now();

    this.progressCounter = document.querySelector("#progressCounter")

    this.allMultiplicationsInit = operation === 'division' ? this.generateDivisionTable() : this.generateMultiplicationTable();
    this.currentQuestionNumber = 1

    // The largest number in the equation must fit in the range
    const multiplications = this.allMultiplicationsInit.filter(m => Math.max(m.left, m.result) <= range);
    this.allMultiplications = multiplications;
    this.totalQuestionsCount = this.allMultiplications.length

    this.gameBtns = new GameBtns();
    const allAnswersInit = this.allMultiplicationsInit.map(m => m.result);
    this.gameBtns.init(allAnswersInit, this.onAnswer, this.onCorrectAnswer);

    this.initConfetti()

    this.nextRound();
  }

  initConfetti = () => {
    this.confettiCanvas = document.createElement('canvas');
    document.body.appendChild(this.confettiCanvas);
    Object.assign(this.confettiCanvas.style, {
      position: "absolute",
      bottom: "0",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      height: "100vh",
      pointerEvents: "none",
    });

    this.confetti = confetti.create(this.confettiCanvas, {
      resize: true,
      useWorker: true
    });
  }

  updateProgressCounter = () => {
    this.progressCounter.innerHTML = this.currentQuestionNumber + "/" + this.totalQuestionsCount
  }

  onAnswer = (isCorrect) => {

    $("#equation").text(`${this.currentMultiplication.left} ${this.currentMultiplication.operator} ${this.currentMultiplication.right} = ${this.currentMultiplication.result}`);

    this.currentQuestionNumber++;

    if (isCorrect) {
      this.scoreGood++;

      const potentialCorectIndicators = ["🎉","🥳","💪","😀","🙌"]
      const correctIndicator = potentialCorectIndicators[Math.floor(Math.random() * potentialCorectIndicators.length)];
      const potentialCorectTexts = ["Brawo!","Super!","Tak!","Ekstra!", "Dobrze!"]
      const correctText = potentialCorectTexts[Math.floor(Math.random() * potentialCorectTexts.length)];
      $('#answerResult').text(correctText + " " + correctIndicator)
      
      this.confetti({
        particleCount: 400,
        spread: 160,
        gravity: 3, 
        ticks: 250, 
      });
      
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
      this.updateProgressCounter()

      const multiplication = this.allMultiplications.pop();

      this.currentMultiplication = multiplication;
      $("#equation").text(`${multiplication.left} ${multiplication.operator} ${multiplication.right} =`);
      this.gameBtns.initRound(multiplication);
    }
  }
}