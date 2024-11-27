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
    const seen = new Set();
    
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        // Create a unique key for each multiplication (smaller number first)
        const key = [Math.min(i, j), Math.max(i, j)].join('x');
        
        if (!seen.has(key)) {
          table.push({
            left: Math.min(i, j),
            right: Math.max(i, j),
            result: i * j
          });
          seen.add(key);
        }
      }
    }
    
    return table;
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

    $("#equation").text(`${multiplication.left} x ${multiplication.right} = ${multiplication.result}`);

    if (isCorrect) {
      this.scoreGood++;
      setTimeout(() => {
        this.nextRound();
      }, this.NEXT_ROUND_DELAY_MS);
    } else {
      this.scoreBad++;
      this.isWaitingForCorrectAnswer = true;
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
    if (this.allMultiplications.length === 0) {
      this.onFinish();
    } else {
      const multiplication = this.allMultiplications.pop();
      this.currentMultiplication = multiplication;
      $("#equation").text(`${multiplication.left} x ${multiplication.right} =`);
      this.gameBtns.initRound(multiplication.result);
    }
  }
}