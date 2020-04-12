import React from 'react';
import '../../index.scss';
import PropTypes from 'prop-types';

function Game(props) {
  const { character, currentTry, checkAnswer } = props;
  return (
    <div>
      <h1 className="font--small">
        {currentTry}
        of 10
      </h1>
      <img src={character.image} className="character__img" alt="character" />
      <h2 className="font--small">{character.name}</h2>
      <h1 className="font--medium">
        <button
          type="button"
          className="button--medium"
          onClick={() => {
            checkAnswer('Dead');
          }}
        >
          {' '}
          Dead{' '}
        </button>
        ,{' '}
        <button
          type="button"
          className="button--medium"
          onClick={() => {
            props.checkAnswer('Alive');
          }}
        >
          {' '}
          alive{' '}
        </button>{' '}
        or{' '}
        <button
          type="button"
          className="button--medium"
          onClick={() => {
            props.checkAnswer('unknown');
          }}
        >
          {' '}
          unknown
        </button>
        ?
      </h1>
    </div>
  );
}

Game.propTypes = {
  character: PropTypes.shape({
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
  }).isRequired,
  currentTry: PropTypes.number.isRequired,
  checkAnswer: PropTypes.func.isRequired,
};
export default Game;
