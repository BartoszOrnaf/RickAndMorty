import React from 'react';
import './whoIsWho.scss';
import Game from './Game';
import Score from '../Score/Score';
import FinalScore from '../FinalScore/FinalScore';
import withApi from '../HOC/withApi';
import withScore from '../HOC/withScore';
class WhoIsWho extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedCharacter: {},
        }
        
        this.checkAnswer = this.checkAnswer.bind(this);
        this.nextOne = this.nextOne.bind(this);
    }

    componentDidMount() {
        this.props.getCharactersArr(
            () => {
                this.getSearchedCharacter();
            })
    }

    getSearchedCharacter(callback) {
        let randomIndex = Math.floor(Math.random() * 7);
        this.setState({
            searchedCharacter: this.props.charactersArr[randomIndex],
        }, callback);
    }

    checkAnswer(answer) {
        if (answer === this.state.searchedCharacter.id.toString()) {
            setTimeout(() => {
                this.props.setScoreMessage(`You guessed it! This is ${this.state.searchedCharacter.name}:`, 'font--small--green');
                this.props.increment('score');
                this.props.increment('currentTry');
                this.props.toggleScoreDisplay()
            }, 300);
        } else {
            setTimeout(() => {
                this.props.setScoreMessage(`Ups! You got it wrong! This is ${this.state.searchedCharacter.name}:`, 'font--small--red');
                this.props.increment('currentTry');
                this.props.toggleScoreDisplay()
            }, 300);
        }
    }

    nextOne() {
        this.props.getCharactersArr(
            () => {
                this.getSearchedCharacter(
                    () => { this.props.toggleScoreDisplay() }
                );
            });
    }

    render() {
        return (<div>
            {
                (this.props.scoreDisplay === false && this.props.currentTry < 11) ? (
                    <Game
                        currentTry={this.props.currentTry}
                        charactersArr={this.props.charactersArr}
                        checkAnswer={this.checkAnswer}
                        searchedCharacterName={this.state.searchedCharacter.name}
                    />
                ) : false
            }

            {
                (this.props.scoreDisplay && this.props.currentTry < 11) && (
                    <Score
                        score={this.props.score}
                        scoreStyle={this.props.scoreStyle}
                        scoreMessage={this.props.scoreMessage}
                        characterImg={this.state.searchedCharacter.image}
                        nextOne={this.nextOne}
                    />
                )
            }

            {
                (this.props.currentTry === 11) && (
                    <FinalScore
                        score={this.props.score}
                        scoreStyle={this.props.scoreStyle}
                        scoreMessage={this.props.scoreMessage}
                        characterImg={this.state.searchedCharacter.image}
                        playAgain={() => {
                            this.props.toggleScoreDisplay();
                            this.props.resetGame();
                            this.props.getCharactersArr(
                                () => {
                                    this.getSearchedCharacter();
                                })

                        }}
                    />
                )
            }
        </div>)
    }
};

export default withApi(withScore(WhoIsWho), 8);