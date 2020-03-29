import React from 'react';

const withScore = (WrappedComponent, charactersQuantity) => {
    class WithScore extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                score: 0,
                currentTry: 1,
                scoreDisplay: false,
                scoreMessage: '',
                scoreStyle: 'font--small--red',
            }
        }

        toggleScoreDisplay = () => {
            this.setState({
                scoreDisplay: !this.state.scoreDisplay
            });
        }

        increment = (stateValue) => {
            this.setState((prevState, ) => {
                return { [stateValue]: prevState[stateValue] + 1 }
            });
        }

        resetGame = () => {
            this.setState({
                score: 0,
                currentTry: 1,
            });
        }

        setScoreMessage = (scoreMessage, scoreStyle) => {
            this.setState({
                scoreStyle: scoreStyle,
                scoreMessage: scoreMessage,
            });
        }

        render() {
            return (
                <WrappedComponent
                    toggleScoreDisplay={this.toggleScoreDisplay}
                    scoreDisplay={this.state.scoreDisplay}
                    score={this.state.score}
                    increment={this.increment}
                    currentTry={this.state.currentTry}
                    resetGame={this.resetGame}
                    scoreMessage = {this.state.scoreMessage}
                    scoreStyle = {this.state.scoreStyle}
                    setScoreMessage = {this.setScoreMessage}
                    {... this.props}
                />
            )
        }

    }
    return WithScore;
}

export default withScore;