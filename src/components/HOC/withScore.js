import React from 'react';
import appStore from '../../appStore/appStore';

const withScore = (WrappedComponent) => {
  class WithScore extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        score: 0,
        currentTry: 1,
        scoreDisplay: false,
        scoreMessage: '',
        scoreStyle: 'font--small--red',
      };
      this.toggleScoreDisplay = this.toggleScoreDisplay.bind(this);
      this.increment = this.increment.bind(this);
      this.incrementScore = this.incrementScore.bind(this);
      this.incrementCurrentTry = this.incrementCurrentTry.bind(this);
      this.resetGame = this.resetGame.bind(this);
      this.setScoreMessage = this.setScoreMessage.bind(this);
    }

    setScoreMessage(scoreMessage, scoreStyle) {
      this.setState({
        scoreStyle,
        scoreMessage,
      });
    }

    sendFinalScore() {
      const { currentTry, score } = this.state;
      if (currentTry === 11) {
        appStore.dispatch({
          type: 'ADD_SCORE',
          payload: { newScore: score },
        });
      }
    }

    increment(stateValue, callback) {
      this.setState((prevState) => {
        return { [stateValue]: prevState[stateValue] + 1 };
      }, callback);
    }

    incrementScore() {
      this.increment('score');
    }

    incrementCurrentTry() {
      this.increment('currentTry', this.sendFinalScore);
    }

    toggleScoreDisplay() {
      const { scoreDisplay } = this.state;
      this.setState({
        scoreDisplay: !scoreDisplay,
      });
    }

    resetGame() {
      this.setState({
        score: 0,
        currentTry: 1,
      });
    }

    render() {
      const {
        scoreDisplay,
        score,
        currentTry,
        scoreMessage,
        scoreStyle,
      } = this.state;
      return (
        <WrappedComponent
          incrementCurrentTry={this.incrementCurrentTry}
          toggleScoreDisplay={this.toggleScoreDisplay}
          incrementScore={this.incrementScore}
          resetGame={this.resetGame}
          setScoreMessage={this.setScoreMessage}
          scoreDisplay={scoreDisplay}
          score={score}
          currentTry={currentTry}
          scoreMessage={scoreMessage}
          scoreStyle={scoreStyle}
          {...this.props}
        />
      );
    }
  }
  return WithScore;
};

export default withScore;
