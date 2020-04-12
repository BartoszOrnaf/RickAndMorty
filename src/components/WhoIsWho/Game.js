import React from 'react';
import './whoIsWho.scss';
import PropTypes from 'prop-types';
import Board from './Board';
import Card from './Card';

function Game(props) {
  const {
    currentTry,
    charactersArr,
    checkAnswer,
    searchedCharacterName,
  } = props;
  return (
    <div>
      <h1 className="font--small">{currentTry} of 10</h1>
      <div className="character-grid">
        {charactersArr.map((character) => (
          <Board
            id={`board-${character.id}`}
            key={character.id}
            className="board"
          >
            <Card className="card" draggable="true">
              <img
                id={`card-${character.id}`}
                src={character.image}
                className="character__img--small"
                alt="character"
              />
            </Card>
          </Board>
        ))}
        <Board
          id="board-compare"
          className="board__compare"
          checkAnswer={checkAnswer}
        >
          <Card id="card-compare" draggable="false" />
        </Board>
      </div>

      <div className="font--small answer">
        <p>Drag {searchedCharacterName} into the empty slot</p>
      </div>
    </div>
  );
}

Game.defaultProps = {
  searchedCharacterName: undefined,
};
Game.propTypes = {
  currentTry: PropTypes.number.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  searchedCharacterName: PropTypes.string,
  charactersArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.string,
      species: PropTypes.string,
      type: PropTypes.string,
      gender: PropTypes.string,
      origin: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
      location: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      }),
      image: PropTypes.string,
      episode: PropTypes.arrayOf(PropTypes.string),
      url: PropTypes.string,
      created: PropTypes.string,
    })
  ).isRequired,
};

export default Game;
