import React from 'react';
import './deadOrAlive.scss'
import loading from './assets/loading.png'
import DisplayScore from './DisplayScore'
import DisplayFinalScore from './DisplayFinalScore'
import DisplayGame from './DisplayGame'


class DeadOrAlive extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            characterId: 1,
            characterImg: loading,
            characterName: '',
            character: '',
            currentTry: 1,
            score: 0,
            scoreDisplay: false,
            scoreMessage: '',
            scoreStyle: 'font--small--red'
        }

        this.nextOne = this.nextOne.bind(this);
        this.toggleScoreDisplay = this.toggleScoreDisplay.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    componentDidMount() {
        this.getRandomCharacter()
    }

    getRandomCharacter() {
        fetch(
            " https://rickandmortyapi.com/api/character/"
        ).then(res => res.json()).then(res => this.setState({
            characterId: Math.floor(Math.random() * (res.info.count - 1)) + 1
        }, this.getCharacter))
    }

    getCharacter() {

        fetch(
            `https://rickandmortyapi.com/api/character/${this.state.characterId}`,
            { method: 'GET' }
        )
            .then(res => res.json())
            .then(res => this.setState({
                character: res,
                characterImg: res.image,
                characterName: res.name
            }))
            .catch(error => console.error('error:', error))
    }

    checkAnswer(answer) {

        console.log(this.state)
        this.setState({
            currentTry: this.state.currentTry + 1,
        })

        if (answer === this.state.character.status && answer === 'Alive') {
            this.setState({
                score: this.state.score + 1,
                scoreMessage: `Yep! ${this.state.characterName} is alive! `,
                scoreStyle: 'font--small--green'
            })
        } else if (answer === this.state.character.status && answer === 'Dead') {
            this.setState({
                score: this.state.score + 1,
                scoreMessage: `That's right! ${this.state.characterName} is dead! `,
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
                scoreMessage: `Ups! ${this.state.characterName} status: ${this.state.character.status}`,
                scoreStyle: 'font--small--red'
            })
        }
        this.toggleScoreDisplay();
    }

    nextOne() {
        this.setState({
            characterImg: loading,
            characterName: 'loading...'
        }, () => {
            this.getRandomCharacter();
            this.toggleScoreDisplay();
        })
    }

    toggleScoreDisplay() {
        this.setState({
            scoreDisplay: !this.state.scoreDisplay
        })
    }


    render() {

        return (
            <div>

                {
                    (this.state.scoreDisplay === false && this.state.currentTry < 11) ? (
                        <DisplayGame
                            currentTry={this.state.currentTry}
                            characterImg={this.state.characterImg}
                            characterName={this.state.characterName}
                            checkAnswer={this.checkAnswer}
                        />
                    ) : false
                }

                {
                    (this.state.scoreDisplay && this.state.currentTry < 11) ? (
                        <DisplayScore
                            scoreStyle={this.state.scoreStyle}
                            scoreMessage={this.state.scoreMessage}
                            characterImg={this.state.characterImg}
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
                            characterImg={this.state.characterImg}
                            score={this.state.score}
                            playAgain={() => {
                                this.setState({
                                    currentTry: 1,
                                    scoreDisplay: false,
                                    characterImg: loading,
                                    characterName: 'loading...',
                                    score: 0
                                }, this.getRandomCharacter())
                            }}
                        />
                    ) : false
                }

            </div>
        )

    }
};

export default DeadOrAlive;