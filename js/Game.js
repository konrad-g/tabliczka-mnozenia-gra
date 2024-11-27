class Game {

  range = 100;
  
  hideAllScreens() {
    $('#screenWelcome').addClass("d-none");
    $('#screenGame').addClass("d-none");
    $('#screenResults').addClass("d-none");
  }

  showWelcomeScreen() {
    this.hideAllScreens();
    $('#screenWelcome').removeClass("d-none");
  }

  showGameScreen() {
    this.hideAllScreens();
    $('#screenGame').removeClass("d-none");
  }

  showResultsScreen() {
    this.hideAllScreens();
    $('#screenResults').removeClass("d-none");
  }

  showResults = (scoreGood, scoreBad, timeStart) => {
    this.showResultsScreen();
    const resultsScreen = new ResultsScreen();
    resultsScreen.init(scoreGood, scoreBad, timeStart);
  }

  start() {
    this.showWelcomeScreen();
    const welcomeScreen = new WelcomeScreen();
    welcomeScreen.init((range) => {
      this.range = range;
      this.showGameScreen();
      const game = new GameScreen();
      game.init(range, this.showResults);
    });
  }
}