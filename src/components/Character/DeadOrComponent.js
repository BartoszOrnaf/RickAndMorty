import React from 'react';
import './DeadOr.scss'
import loading from './loading.png'

class CharacterComponent extends React.Component {


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
            scoreStyle: 'wrong'
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


        this.setState({
            currentTry: this.state.currentTry + 1,

        })

        if (answer === this.state.character.status && answer === 'Alive') {
            this.setState({
                score: this.state.score + 1,
                scoreMessage: `Yep! ${this.state.characterName} is alive! `,
                scoreStyle: 'right'
            })
        } else if (answer === this.state.character.status && answer === 'Dead') {
            this.setState({
                score: this.state.score + 1,
                scoreMessage: `That's right! ${this.state.characterName} is dead! `,
                scoreStyle: 'right'
            })
        } else if (answer === this.state.character.status && answer === 'unknown') {
            this.setState({
                score: this.state.score + 1,
                scoreMessage: `You guessed it! It is unknown!`,
                scoreStyle: 'right'
            })
        } else {
            this.setState({
                scoreMessage: `Ups! ${this.state.characterName} status: ${this.state.character.status}`,
                scoreStyle: 'wrong'
            })
        }

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


        let displayGame = (params) => {

            if (this.state.scoreDisplay === false && this.state.currentTry < 11) {
                return (<div>
                    <h1 className="font-small">{this.state.currentTry} of 10</h1>
                    <img src={this.state.characterImg} alt="character"></img>
                    <h2 className="font-small">{this.state.characterName}</h2>
                    <h1 className="font-medium">
                        <button className="dead-button" onClick={() => { this.checkAnswer("Dead"); this.toggleScoreDisplay() }}>Dead</button>, <button className="dead-button" onClick={() => { this.checkAnswer("Alive"); this.toggleScoreDisplay() }}>alive</button> or <button className="dead-button" onClick={() => { this.checkAnswer("unknown"); this.toggleScoreDisplay() }}>unknown</button>?
                    </h1>
                </div>)
            }

        };

        let displayScore = (params) => {

            if (this.state.scoreDisplay && this.state.currentTry < 11) {
                return (<div>
                    <h1 id="answer" className={this.state.scoreStyle} >{this.state.scoreMessage}</h1>
                    <img src={this.state.characterImg} alt="character"></img>
                    <h2 className="font-small">Your score is: {this.state.score}</h2>
                    <button className="dead-button" onClick={this.nextOne}>Next</button>
                </div>)
            }

        };

        let displayFinalScore = (params) => {

            if (this.state.currentTry === 11) {
                return (<div>
                    <h1 id="answer" className={this.state.scoreStyle} >{this.state.scoreMessage}</h1>
                    <img src={this.state.characterImg} alt="character"></img>
                    <h2 className="right">Your final score is: {this.state.score} / 10</h2>
                    <button className="dead-button" onClick={() => {
                        this.setState({
                            currentTry: 1,
                            scoreDisplay: false,
                            characterImg: loading,
                            characterName: 'loading...',
                            score: 0
                        }, this.getRandomCharacter())

                    }}>Play again!</button>
                </div>)
            }

        };


        return (
            <div>
                {
                    displayGame()
                }
                {
                    displayScore()
                }
                {
                    displayFinalScore()
                }

            </div>
        )

    }

};

export default CharacterComponent;