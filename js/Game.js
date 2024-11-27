class Game {

  range = 100;
  
  constructor() {
  }

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

  start() {
    this.showWelcomeScreen();
    const welcomeScreen = new WelcomeScreen();
    welcomeScreen.init((range) => {
      this.range = range;
      this.showGameScreen();
    });
  }
}