class ResultsScreen {
  
    init(scoreGood, scoreBad, timeStart) {
      $('#scoreGood').text(scoreGood);
      $('#scoreBad').text(scoreBad);
      const gameTimeMs = Date.now() - timeStart;
      const gameTimeSec = Math.floor(gameTimeMs / 10) / 100; // Round to 100ms

      $('#scoreTime').text(gameTimeSec + 's');

      if (scoreBad == 0) {
        $('#congrats2').removeClass("d-none");
      }

      const maxMsPerAnswer = 2000
      const avgAnswerTime = gameTimeMs / (scoreGood + scoreBad);
      if (avgAnswerTime > maxMsPerAnswer) {
        $('#congrats1').removeClass("d-none");
      }

      $('#btnPlayAgain').addEventListener('click', () => {
        location.reload();
      })
    }
}