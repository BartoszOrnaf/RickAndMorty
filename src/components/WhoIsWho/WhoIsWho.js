import React from 'react';
import './whoIsWho.scss';
import DisplayGame from './DisplayGame'
import DisplayScore from './DisplayScore'
import DisplayFinalScore from './DisplayFinalScore'
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
            this.getRandomIds(() => {
                this.addCharacter();
                this.getSearchedCharacter();
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
                }, callback)
            })
            .catch(error => console.error('error:', error))
    }

    getRandomIds(callback) {
        const randomIds = [];
        while (randomIds.length < 8) {
            let currentId = Math.floor(Math.random() * (this.state.characterCount - 1)) + 1
            if (randomIds.indexOf(currentId) === -1) {
                randomIds.push(currentId)
            }
        }

        this.setState({
            randomIds: randomIds
        }, callback)
    }

    getSearchedCharacter(callback) {
        let randomIndex = Math.floor(Math.random() * 7)
        let searchedId = this.state.randomIds[randomIndex]

        fetch(
            `https://rickandmortyapi.com/api/character/${searchedId}`,
            { method: 'GET' }
        )
            .then(res => res.json())
            .then(res => {
                this.setState({
                    searchedCharacter: res,
                    searchedCharacterImg: res.image
                }, callback)
            })
            .catch(error => console.error('error:', error))
    }

    addCharacter() {
        this.state.randomIds.forEach(element => {
            fetch(
                `https://rickandmortyapi.com/api/character/${element}`,
                { method: 'GET' }
            )
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        charactersArr: [...this.state.charactersArr, {
                            characterId: res.id,
                            characterImg: res.image,
                            characterName: res.name
                        }]
                    })
                })
                .catch(error => console.error('error:', error))
        });
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
            this.getRandomIds(() => {
                this.getSearchedCharacter(
                    () => { this.toggleScoreDisplay() }
                );
                this.addCharacter();
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
                    <DisplayGame
                        currentTry={this.state.currentTry}
                        charactersArr={this.state.charactersArr}
                        checkAnswer={this.checkAnswer}
                        searchedCharacterName={this.state.searchedCharacter.name}
                    />
                ) : false
            }

            {
                (this.state.scoreDisplay && this.state.currentTry < 11) ? (
                    <DisplayScore
                        scoreStyle={this.state.scoreStyle}
                        scoreMessage={this.state.scoreMessage}
                        searchedCharacterImg={this.state.searchedCharacter.image}
                        score={this.state.score}
                        nextOne={this.nextOne}
                    />
                ) : false
            }

            {
                (this.state.currentTry === 11) ? (
                    <DisplayFinalScore
                        scoreStyle={this.state.scoreStyle}
                        scoreMessage={this.state.scoreMessage}
                        searchedCharacterImg={this.state.searchedCharacter.image}
                        score={this.state.score}
                        playAgain={() => {
                            this.setState({
                                currentTry: 1,
                                scoreDisplay: false,
                                score: 0
                            },   this.setState({
                                charactersArr: [],
                            }, () => {
                                this.getRandomIds(() => {
                                    this.getSearchedCharacter();
                                    this.addCharacter();
                                })
                            }))
                        }}
                    />
                ) : false
            }
        </div>)
    }
};

export default WhoIsWho;