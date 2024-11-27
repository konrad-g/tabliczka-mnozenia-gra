class GameScreen {

  allMultiplications = []
  onFinish
  scoreGood = 0
  scoreBad = 0
  timeStart

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

    const multiplications = this.generateMultiplicationTable().filter(m => m.result <= range);
    this.allMultiplications = multiplications;

    this.nextRound();
  }

  nextRound = () => {
    if (this.allMultiplications.length === 0) {
      this.onFinish();
    } else {
      const multiplication = this.allMultiplications.pop();
      $("#equation").text(`${multiplication.left} x ${multiplication.right} =`);
      
    }
  }
}