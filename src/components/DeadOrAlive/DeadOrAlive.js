import React from 'react';
import "../../index.scss";
import Loading from './Loading'
import Score from '../Score/Score';
import FinalScore from '../FinalScore/FinalScore';
import Game from './Game';
class DeadOrAlive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            randomIds: [],
            charactersArr: [],
            character: {},
            currentTry: 1,
            score: 0,
            scoreDisplay: false,
            scoreMessage: '',
            scoreStyle: 'font--small--red',
            loading: true
        }

        this.nextOne = this.nextOne.bind(this);
        this.toggleScoreDisplay = this.toggleScoreDisplay.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    componentDidMount() {
        this.getCharacterCount(() => {
            this.getRandomIds(10, () => {
                this.getCharacters(() => {
                    this.setCharacter(() => {
                        this.toggleLoadingDisplay();
                    })
                })
            })
        })

    }


    getCharacterCount(callback) {
        fetch(
            `https://rickandmortyapi.com/api/character`
        )
            .then(res => res.json())
            .then(res => {
                this.setState({
                    characterCount: res.info.count
                }, callback);
            })
            .catch(error => console.error('error:', error));
    }

    setCharacter(callback) {
        this.setState({
            character: this.state.charactersArr[this.state.currentTry - 1]
        }, callback)
    }

    getRandomIds(a, callback) {
        const randomIds = [];
        while (randomIds.length < a) {
            let currentId = Math.floor(Math.random() * (this.state.characterCount - 1)) + 1
            if (randomIds.indexOf(currentId) === -1) {
                randomIds.push(currentId);
            }
        }

        this.setState({
            randomIds: randomIds
        }, callback);
    }

    getCharacters(callback) {
        fetch(
            `https://rickandmortyapi.com/api/character/${this.state.randomIds}`,
            { method: 'GET' }
        )
            .then(res => res.json())
            .then(res => {
                this.setState({
                    charactersArr: res
                }, callback);
            })
            .catch(error => console.error('error:', error));
    }

    checkAnswer(answer) {

        this.setState({
            currentTry: this.state.currentTry + 1,
        })

        if (answer === this.state.character.status && answer === 'Alive') {
            this.setState({
                score: this.state.score + 1,
                scoreMessage: `Yep! ${this.state.character.name} is alive! `,
                scoreStyle: 'font--small--green'
            })
        } else if (answer === this.state.character.status && answer === 'Dead') {
            this.setState({
                score: this.state.score + 1,
                scoreMessage: `That's right! ${this.state.character.name} is dead! `,
                scoreStyle: 'font--small--green'
            })
        } else if (answer === this.state.character.status && answer === 'unknown') {
            this.setState({
                score: this.state.score + 1,
                scoreMessage: `You guessed it! It is unknown!`,
                scoreStyle: 'font--small--green'
            })
        } else {
            this.setState({
                scoreMessage: `Ups! ${this.state.character.name} status: ${this.state.character.status}`,
                scoreStyle: 'font--small--red'
            })
        }
        this.toggleScoreDisplay();
    }

    nextOne() {
        this.setState({
            loading: true,
        }, () => {
            this.setCharacter(() => {
                this.toggleScoreDisplay();
                this.toggleLoadingDisplay();
            });
        })
    }

    toggleScoreDisplay() {
        this.setState({
            scoreDisplay: !this.state.scoreDisplay
        })
    }

    toggleLoadingDisplay() {
        this.setState({
            loading: !this.state.loading
        })
    }

    render() {

        return (
            <div>
                {
                    (this.state.scoreDisplay === false && this.state.currentTry < 11 && this.state.loading === false) && (
                        <Game
                            currentTry={this.state.currentTry}
                            character={this.state.character}
                            checkAnswer={this.checkAnswer}
                        />
                    )
                }

                {
                    (this.state.scoreDisplay && this.state.currentTry < 11 && this.state.loading === false) && (
                        <Score
                            scoreStyle={this.state.scoreStyle}
                            scoreMessage={this.state.scoreMessage}
                            characterImg={this.state.character.image}
                            score={this.state.score}
                            nextOne={this.nextOne}
                        />
                    )
                }

                {
                    (this.state.currentTry === 11 && this.state.loading === false) && (
                        <FinalScore
                            scoreStyle={this.state.scoreStyle}
                            scoreMessage={this.state.scoreMessage}
                            characterImg={this.state.character.image}
                            score={this.state.score}
                            playAgain={() => {
                                this.setState({
                                    currentTry: 1,
                                    scoreDisplay: false,
                                    loading: true,
                                    score: 0
                                }, () => {
                                    this.getRandomIds(10, () => {
                                        this.getCharacters(() => {
                                            this.setCharacter(() => {
                                                this.toggleLoadingDisplay()
                                            })

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

export default DeadOrAlive;