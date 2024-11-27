class ResultsScreen {
  
    init(scoreGood, scoreBad, timeStart) {
      $('#scoreGood').text(scoreGood);
      $('#scoreBad').text(scoreBad);
      const gameTimeMs = Date.now() - timeStart;
      const gameTimeSec = Math.floor(gameTimeMs / 10) / 100; // Round to 100ms

      $('#scoreTime').text(gameTimeSec + 's');
      const isPerfectScore = scoreBad === 0;
      if (isPerfectScore) {
        $('#congrats2').removeClass("d-none");
        
        const maxMsPerAnswer = 3000
        const avgAnswerTime = gameTimeMs / (scoreGood + scoreBad);
        if (avgAnswerTime > maxMsPerAnswer) {
          $('#congrats1').removeClass("d-none");
        }
      }

      $('#btnPlayAgain').on('click', () => {
        location.reload();
      })
    }
}