import React from 'react';
import '../../index.scss';
import PropTypes from 'prop-types';

function Score(props) {
  const {
    scoreStyle,
    scoreMessage,
    characterImg,
    score,
    nextOne,
    playAgain,
    currentTry,
  } = props;

  return (
    <div>
      {currentTry < 11 && (
        <div>
          <h1 className={scoreStyle}>{scoreMessage}</h1>
          <img src={characterImg} className="character__img" alt="character" />
          <h2 className="font--small">Your score is: {score}</h2>
          <button type="button" className="button--medium" onClick={nextOne}>
            Next
          </button>
        </div>
      )}
      {currentTry === 11 && (
        <div>
          <h1 className={scoreStyle}>{scoreMessage}</h1>
          <img src={characterImg} className="character__img" alt="character" />
          <h2 className="font--small--green">
            Your final score is: {score} / 10
          </h2>
          <button type="button" className="button--medium" onClick={playAgain}>
            Play again!
          </button>
        </div>
      )}
    </div>
  );
}

Score.propTypes = {
  nextOne: PropTypes.func.isRequired,
  playAgain: PropTypes.func.isRequired,
  scoreMessage: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  currentTry: PropTypes.number.isRequired,
  scoreStyle: PropTypes.string.isRequired,
  characterImg: PropTypes.string.isRequired,
};

export default Score;
