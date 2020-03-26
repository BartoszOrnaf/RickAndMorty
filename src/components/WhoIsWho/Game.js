import React from 'react';
import './whoIsWho.scss';
import Board from './Board';
import Card from './Card';

function Game(props) {
    return (
        <div>
            <h1 className="font--small">{props.currentTry} of 10</h1>
            <div className="character-grid">
                {
                    props.charactersArr.map((character) =>
                        <Board
                            id={`board-${character.id}`}
                            key={character.id}
                            className="board">
                            <Card
                                className="card"
                                draggable="true">
                                <img
                                    id={`card-${character.id}`}
                                    src={character.image}
                                    className="character__img--small"
                                    alt="character"
                                />
                            </Card>
                        </Board>)
                }
                <Board
                    id="board-compare"
                    className="board__compare"
                    checkAnswer={props.checkAnswer}
                >
                    <Card
                        id="card-compare"
                        draggable="false">
                    </Card>
                </Board>
            </div>

            <div className="font--small answer">
                <p>Drag {props.searchedCharacterName} into the empty slot</p>
            </div>
        </div>
    )
}

export default Game;