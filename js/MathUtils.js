class MathUtils {
  static sortRandom = () => Math.random() > 0.5 ? 1 : -1;

  static getRndInt = (center, plusMinus) => {
    const rndSign = Math.random() > 0.5 ? 1 : -1;
    const value = center + rndSign * Math.floor(Math.random() * plusMinus)
    if (value <= 0 || value > 100) {
      return MathUtils.getRndInt(center, plusMinus);
    }
    return value;
  }

  static generateRoundValue = (correctAnswer, predefinedValues) => {
    const RANGE = 5
    const RESULTS_COUNT = 4;

    let results = [...new Set([correctAnswer, ...predefinedValues])];

    while (results.length < RESULTS_COUNT) {
      const value = MathUtils.getRndInt(correctAnswer, RANGE);
      if (!results.includes(value)) {
        results.push(value);
      }
    }

    results = results.sort(MathUtils.sortRandom);
    return results;
  }
}