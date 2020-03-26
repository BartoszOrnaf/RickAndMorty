import React from 'react';
import './whoIsWho.scss';
import Game from './Game';
import Score from './Score';
import FinalScore from './FinalScore';
class WhoIsWho extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            randomIds: [],
            charactersArr: [],
            searchedCharacter: {},
            currentTry: 1,
            score: 0,
            scoreMessage: '',
            scoreDisplay: false,
            scoreStyle: 'font--small--red'
        }
        this.checkAnswer = this.checkAnswer.bind(this);
        this.nextOne = this.nextOne.bind(this);
    }

    componentDidMount() {
        this.getCharacterCount(() => {
            this.getRandomIds(8,() => {
                this.getCharacters(() => {
                    this.getSearchedCharacter();
                });
            });
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

    getSearchedCharacter(callback) {
        let randomIndex = Math.floor(Math.random() * 7);

        this.setState({
            searchedCharacter: this.state.charactersArr[randomIndex],
            searchedCharacterImg: this.state.charactersArr[randomIndex].image
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

        if (answer === this.state.searchedCharacter.id.toString()) {
            this.setState({
                currentTry: this.state.currentTry + 1,
                score: this.state.score + 1,
                scoreMessage: `You guessed it! This is ${this.state.searchedCharacter.name}:`,
                scoreStyle: 'font--small--green'
            }, () => { setTimeout(() => this.toggleScoreDisplay(), 300) })
        } else {
            this.setState({
                currentTry: this.state.currentTry + 1,
                scoreMessage: `Ups! You got it wrong! This is ${this.state.searchedCharacter.name}:`,
                scoreStyle: 'font--small--red'
            }, () => { setTimeout(() => this.toggleScoreDisplay(), 300) })
        }
    }

    nextOne() {
        this.setState({
            charactersArr: [],
        }, () => {
            this.getRandomIds(8,() => {
                this.getCharacters(() => {
                    this.getSearchedCharacter(
                        () => { this.toggleScoreDisplay() }
                    );
                });
            })
        })
    }

    toggleScoreDisplay() {
        this.setState({
            scoreDisplay: !this.state.scoreDisplay
        })
    }

    render() {
        return (<div>
            {
                (this.state.scoreDisplay === false && this.state.currentTry < 11) ? (
                    <Game
                        currentTry={this.state.currentTry}
                        charactersArr={this.state.charactersArr}
                        checkAnswer={this.checkAnswer}
                        searchedCharacterName={this.state.searchedCharacter.name}
                    />
                ) : false
            }

            {
                (this.state.scoreDisplay && this.state.currentTry < 11) && (
                    <Score
                        scoreStyle={this.state.scoreStyle}
                        scoreMessage={this.state.scoreMessage}
                        searchedCharacterImg={this.state.searchedCharacter.image}
                        score={this.state.score}
                        nextOne={this.nextOne}
                    />
                )
            }

            {
                (this.state.currentTry === 11) && (
                    <FinalScore
                        scoreStyle={this.state.scoreStyle}
                        scoreMessage={this.state.scoreMessage}
                        searchedCharacterImg={this.state.searchedCharacter.image}
                        score={this.state.score}
                        playAgain={() => {
                            this.setState({
                                currentTry: 1,
                                scoreDisplay: false,
                                score: 0
                            }, this.setState({
                                charactersArr: [],
                            }, () => {
                                this.getRandomIds(8,() => {
                                    this.getCharacters(() => {
                                        this.getSearchedCharacter();
                                    });
                                })
                            }))
                        }}
                    />
                )
            }
        </div>)
    }
};

export default WhoIsWho;