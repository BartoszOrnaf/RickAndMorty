import React from 'react';
import "../../index.scss";
import Loading from './Loading'
import Score from '../Score/Score';
import FinalScore from '../FinalScore/FinalScore';
import Game from './Game';
import withApi from '../HOC/withApi';
import withScore from '../HOC/withScore';
//refactor do zrobienia: import { compose } from 'redux'
class DeadOrAlive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            character: {},
            loading: true
        }

        this.nextOne = this.nextOne.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    componentDidMount() {
        this.props.getCharactersArr(
            () => {
                this.setCharacter(() => {
                    this.toggleLoadingDisplay();
                })
            });
    }

    setCharacter(callback) {
        this.setState({
            character: this.props.charactersArr[this.props.currentTry - 1]
        }, callback);
    }

    checkAnswer(answer) {
        this.props.increment('currentTry');
        if (answer === this.state.character.status && answer === 'Alive') {
            this.props.increment('score');
            this.props.setScoreMessage(`Yep! ${this.state.character.name} is alive! `, 'font--small--green');
        } else if (answer === this.state.character.status && answer === 'Dead') {
            this.props.increment('score');
            this.props.setScoreMessage(`That's right! ${this.state.character.name} is dead! `, 'font--small--green');
        } else if (answer === this.state.character.status && answer === 'unknown') {
            this.props.increment('score');
            this.props.setScoreMessage(`You guessed it! It is unknown!`, 'font--small--green');
        } else {
            this.props.setScoreMessage( `Ups! ${this.state.character.name} status: ${this.state.character.status}`,'font--small--red');
        }
        this.props.toggleScoreDisplay();
    }

    nextOne() {
        this.setState({
            loading: true,
        }, () => {
            this.setCharacter(() => {
                this.props.toggleScoreDisplay();
                this.toggleLoadingDisplay();
            });
        })
    }

    toggleLoadingDisplay() {
        this.setState({
            loading: !this.state.loading
        });
    }

    render() {
        return (
            <div>
                {
                    (this.props.scoreDisplay === false && this.props.currentTry < 11 && this.state.loading === false) && (
                        <Game
                            currentTry={this.props.currentTry}
                            character={this.state.character}
                            checkAnswer={this.checkAnswer}
                        />
                    )
                }

                {
                    (this.props.scoreDisplay && this.props.currentTry < 11 && this.state.loading === false) && (
                        <Score
                            scoreStyle={this.props.scoreStyle}
                            scoreMessage={this.props.scoreMessage}
                            characterImg={this.state.character.image}
                            score={this.props.score}
                            nextOne={this.nextOne}
                        />
                    )
                }

                {
                    (this.props.currentTry === 11 && this.state.loading === false) && (
                        <FinalScore
                            scoreStyle={this.props.scoreStyle}
                            scoreMessage={this.props.scoreMessage}
                            characterImg={this.state.character.image}
                            score={this.props.score}
                            playAgain={() => {
                                this.props.toggleScoreDisplay();
                                this.props.resetGame();
                                this.setState({
                                    loading: true,
                                }, () => {
                                    this.props.getCharactersArr(
                                        () => {
                                            this.setCharacter(() => {
                                                this.toggleLoadingDisplay();
                                            })
                                        })
                                })
                            }}
                        />
                    )
                }

                {
                    (this.state.loading === true) && (
                        <Loading />
                    )
                }
            </div>
        )
    }
};

export default withApi(withScore(DeadOrAlive), 10);