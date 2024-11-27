class WelcomeScreen {
  init = (onGameStart) => {
    $('#btnStartGame30').on('click', () => {
      onGameStart(30);
    });
    $('#btnStartGame100').on('click', () => {
      onGameStart(100);
    });
  }
}