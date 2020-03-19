import React from 'react';
import './whoIsWho.scss';
import Board from './Board';
import Card from './Card';

class WhoIsWho extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            randomIds: [],
            charactersArr: [],
            searchedCharacter: {},
            currentTry: 1
        }
        this.checkAnswer=this.checkAnswer.bind(this)
    }

    componentDidMount() {
        this.getCharacterCount(() => {
            this.getRandomIds(() => {
                this.addCharacter();
                this.getSearchedCharacter();
            })
        })
    }

    // componentDidUpdate() {
    //     console.log(this.state)
    // }

    getCharacterCount(callback) {
        this.setState({
            characterCount: 400
        }, callback)
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

    getSearchedCharacter(){
        let randomIndex = Math.floor(Math.random() * 7)
        let searchedId = this.state.randomIds[randomIndex]
 

        fetch(
            `https://rickandmortyapi.com/api/character/${searchedId}`,
            { method: 'GET' }
        )
            .then(res => res.json())
            .then(res => {
                this.setState({
                    searchedCharacter: res
                })

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

    checkAnswer(answer){
        console.log("searchedCharacterId")
        console.log(this.state.searchedCharacter.id)
        console.log(answer)
        
        if(answer==this.state.searchedCharacter.id){
            
            console.log("You are right!")
        }else{
            console.log("You are wrong!")

        }
    }


    render() {
        return (
            <div>
                <h1 className="font--small">{this.state.currentTry} of 10</h1>
                <div className="character-grid">
                    {
                        this.state.charactersArr.map((character) =>
                            <Board
                                id={`board-${character.characterId}`}
                                key={character.characterId}
                                className="board">
                                <Card
                                    className="card"
                                    draggable="true">
                                    <img
                                        id={`card-${character.characterId}`}
                                        src={character.characterImg}
                                        className="character__img--small"
                                        alt="character"
                                    />
                                </Card>
                            </Board>)
                    }
                    <Board
                        id="board-compare"
                        className="board__compare"
                        checkAnswer={this.checkAnswer}
                        >
                        <Card
                            id="card-compare"
                            draggable="false">
                        </Card>
                    </Board>
                </div>

                <div className="font--small answer">
                    <p>Drag {this.state.searchedCharacter.name} into the empty slot</p>
                </div>

            </div>
        )
    }
};

export default WhoIsWho;