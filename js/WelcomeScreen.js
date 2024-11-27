class WelcomeScreen {
  init = (onGameStart) => {
    document.getElementById('btnStartGame30').addEventListener('click', () => {
      onGameStart(30);
    });
    document.getElementById('btnStartGame100').addEventListener('click', () => {
      onGameStart(100);
    });
  }
}