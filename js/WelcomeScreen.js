class WelcomeScreen {
  init = (onGameStart) => {
    $('#btnStartGame30').on('click', () => {
      onGameStart(30, 'multiplication');
    });
    $('#btnStartGame100').on('click', () => {
      onGameStart(100, 'multiplication');
    });
    $('#btnStartGameDivision100').on('click', () => {
      onGameStart(100, 'division');
    });
  }
}