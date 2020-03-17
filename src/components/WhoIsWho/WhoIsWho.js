import React from 'react';
import './whoIsWho.scss';
import Board from './Board';
import Card from './Card';

class WhoIsWho extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            charactersArr: [],
        }
    }

    componentDidMount() {

        let i = 0;
        while (i < 8) {
           

                i++
            
            this.addRandomCharacter()


        }
    }

    addRandomCharacter() {
        fetch(
            " https://rickandmortyapi.com/api/character/"
        ).then(res => res.json()).then(res => this.setState({
            randomId: Math.floor(Math.random() * (15) )+1
            // randomId: Math.floor(Math.random() * (res.info.count - 1)) + 1
        }, this.addCharacter))

        
    }

    addCharacter() {

        fetch(
            `https://rickandmortyapi.com/api/character/${this.state.randomId}`,
            { method: 'GET' }
        )
            .then(res => res.json())
            .then(res => {
                const idCheck = this.state.charactersArr.filter((element)=>{return element.characterId === res.id});
                console.log(idCheck)
                console.log(this.state)
            
                if(idCheck.length === 0){
                this.setState({
                    charactersArr: [...this.state.charactersArr, {
                        characterId: res.id,
                        characterImg: res.image,
                        characterName: res.name
                    }]
                })}else{
                    this.addRandomCharacter()
                }

            })
            .catch(error => console.error('error:', error))
    }


    render() {
        return (
            <div className="who-is-who">

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

                        </Board>
                    )
                }

                <Board
                    id="board-compare"
                    className="board__compare">
                    <Card
                        id="card-compare"
                        draggable="false">
                    </Card>
                </Board>
            </div>
        )
    }

};

export default WhoIsWho;