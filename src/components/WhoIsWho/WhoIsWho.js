import React from 'react';
import { compose } from 'redux';
import './whoIsWho.scss';
import PropTypes from 'prop-types';
import Game from './Game';
import Score from '../Score/Score';
import withApi from '../HOC/withApi';
import withScore from '../HOC/withScore';

class WhoIsWho extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedCharacter: {},
    };

    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextOne = this.nextOne.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  componentDidMount() {
    const { getCharactersArr } = this.props;
    getCharactersArr(() => {
      this.getSearchedCharacter();
    });
  }

  getSearchedCharacter(callback) {
    const { charactersArr } = this.props;
    const randomIndex = Math.floor(Math.random() * 7);
    this.setState(
      {
        searchedCharacter: charactersArr[randomIndex],
      },
      callback
    );
  }

  checkAnswer(answer) {
    const { searchedCharacter } = this.state;
    const {
      incrementScore,
      incrementCurrentTry,
      toggleScoreDisplay,
      setScoreMessage,
    } = this.props;
    if (answer === searchedCharacter.id.toString()) {
      setTimeout(() => {
        setScoreMessage(
          `You guessed it! This is ${searchedCharacter.name}:`,
          'font--small--green'
        );
        incrementScore();
        incrementCurrentTry();
        toggleScoreDisplay();
      }, 300);
    } else {
      setTimeout(() => {
        setScoreMessage(
          `Ups! You got it wrong! This is ${searchedCharacter.name}:`,
          'font--small--red'
        );
        incrementCurrentTry();
        toggleScoreDisplay();
      }, 300);
    }
  }

  nextOne() {
    const { getCharactersArr, toggleScoreDisplay } = this.props;
    getCharactersArr(() => {
      this.getSearchedCharacter(() => {
        toggleScoreDisplay();
      });
    });
  }

  playAgain() {
    const { toggleScoreDisplay, resetGame, getCharactersArr } = this.props;
    toggleScoreDisplay();
    resetGame();
    getCharactersArr(() => {
      this.getSearchedCharacter();
    });
  }

  render() {
    const {
      scoreDisplay,
      currentTry,
      charactersArr,
      score,
      scoreStyle,
      scoreMessage,
    } = this.props;
    const { searchedCharacter } = this.state;
    return (
      <div>
        {scoreDisplay === false ? (
          <Game
            currentTry={currentTry}
            charactersArr={charactersArr}
            checkAnswer={this.checkAnswer}
            searchedCharacterName={searchedCharacter.name}
          />
        ) : (
          <Score
            scoreStyle={scoreStyle}
            scoreMessage={scoreMessage}
            characterImg={searchedCharacter.image}
            score={score}
            currentTry={currentTry}
            nextOne={this.nextOne}
            playAgain={this.playAgain}
          />
        )}
      </div>
    );
  }
}
WhoIsWho.defaultProps = {
  searchedCharacter: undefined,
};
WhoIsWho.propTypes = {
  charactersArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.string,
      species: PropTypes.string,
      type: PropTypes.string,
      gender: PropTypes.string,
      origin: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
      location: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
      image: PropTypes.string,
      episode: PropTypes.arrayOf(PropTypes.string),
      url: PropTypes.string,
      created: PropTypes.string,
    })
  ).isRequired,
  searchedCharacter: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.string,
    species: PropTypes.string,
    type: PropTypes.string,
    gender: PropTypes.string,
    origin: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    location: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    image: PropTypes.string,
    episode: PropTypes.arrayOf(PropTypes.string),
    url: PropTypes.string,
    created: PropTypes.string,
  }),
  getCharactersArr: PropTypes.func.isRequired,
  incrementScore: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  incrementCurrentTry: PropTypes.func.isRequired,
  toggleScoreDisplay: PropTypes.func.isRequired,
  setScoreMessage: PropTypes.func.isRequired,
  currentTry: PropTypes.number.isRequired,
  scoreDisplay: PropTypes.bool.isRequired,
  scoreMessage: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  scoreStyle: PropTypes.string.isRequired,
};

export default compose(withScore, withApi)(WhoIsWho, 8);
