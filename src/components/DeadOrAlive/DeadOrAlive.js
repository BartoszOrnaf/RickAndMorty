import React from 'react';
import '../../index.scss';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Loading from './Loading';
import Score from '../Score/Score';
import Game from './Game';
import withApi from '../HOC/withApi';
import withScore from '../HOC/withScore';

class DeadOrAlive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: {},
      loading: true,
    };

    this.nextOne = this.nextOne.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  componentDidMount() {
    const { getCharactersArr } = this.props;
    getCharactersArr(() => {
      this.setCharacter(() => {
        this.toggleLoadingDisplay();
      });
    });
  }

  setCharacter(callback) {
    const { charactersArr, currentTry } = this.props;
    this.setState(
      {
        character: charactersArr[currentTry - 1],
      },
      callback
    );
  }

  checkAnswer(answer) {
    const {
      incrementCurrentTry,
      incrementScore,
      setScoreMessage,
      toggleScoreDisplay,
    } = this.props;
    const { character } = this.state;

    incrementCurrentTry();

    if (answer === character.status && answer === 'Alive') {
      incrementScore();
      setScoreMessage(
        `Yep! ${character.name} is alive! `,
        'font--small--green'
      );
    } else if (answer === character.status && answer === 'Dead') {
      incrementScore();
      setScoreMessage(
        `That's right! ${character.name} is dead! `,
        'font--small--green'
      );
    } else if (answer === character.status && answer === 'unknown') {
      incrementScore();
      setScoreMessage(`You guessed it! It is unknown!`, 'font--small--green');
    } else {
      setScoreMessage(
        `Ups! ${character.name} status: ${character.status}`,
        'font--small--red'
      );
    }
    toggleScoreDisplay();
  }

  nextOne() {
    const { toggleScoreDisplay } = this.props;
    this.setState(
      {
        loading: true,
      },
      () => {
        this.setCharacter(() => {
          toggleScoreDisplay();
          this.toggleLoadingDisplay();
        });
      }
    );
  }

  playAgain() {
    const { toggleScoreDisplay, resetGame, getCharactersArr } = this.props;
    toggleScoreDisplay();
    resetGame();
    this.setState(
      {
        loading: true,
      },
      () => {
        getCharactersArr(() => {
          this.setCharacter(() => {
            this.toggleLoadingDisplay();
          });
        });
      }
    );
  }

  toggleLoadingDisplay() {
    const { loading } = this.state;
    this.setState({
      loading: !loading,
    });
  }

  render() {
    const {
      scoreDisplay,
      score,
      currentTry,
      scoreMessage,
      scoreStyle,
    } = this.props;
    const { loading, character } = this.state;
    return (
      <div>
        {scoreDisplay === false && loading === false && (
          <Game
            currentTry={currentTry}
            character={character}
            checkAnswer={this.checkAnswer}
          />
        )}

        {scoreDisplay && loading === false && (
          <Score
            scoreStyle={scoreStyle}
            scoreMessage={scoreMessage}
            characterImg={character.image}
            score={score}
            currentTry={currentTry}
            nextOne={this.nextOne}
            playAgain={this.playAgain}
          />
        )}

        {loading === true && <Loading />}
      </div>
    );
  }
}

DeadOrAlive.propTypes = {
  scoreDisplay: PropTypes.bool.isRequired,
  currentTry: PropTypes.number.isRequired,
  getCharactersArr: PropTypes.func.isRequired,
  incrementCurrentTry: PropTypes.func.isRequired,
  incrementScore: PropTypes.func.isRequired,
  setScoreMessage: PropTypes.func.isRequired,
  toggleScoreDisplay: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  scoreMessage: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  scoreStyle: PropTypes.string.isRequired,
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
};

export default compose(withScore, withApi)(DeadOrAlive, 10);
