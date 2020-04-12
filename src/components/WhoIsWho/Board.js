import React from 'react';
import './whoIsWho.scss';
import PropTypes from 'prop-types';

function Board(props) {
  const { id, className, children, checkAnswer } = props;

  const drop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('card_id');
    const card = document.getElementById(cardId);

    const all = document.getElementsByClassName('board');
    for (let i = 0; i < all.length; i += 1) {
      all[i].style.backgroundImage = 'none';
    }

    if (e.target.id === 'board-compare') {
      e.target.appendChild(card);
    }

    checkAnswer(cardId.slice(5));
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div id={id} className={className} onDrop={drop} onDragOver={dragOver}>
      {children}
    </div>
  );
}

Board.defaultProps = {
  checkAnswer: undefined,
};

Board.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  checkAnswer: PropTypes.func,
};

export default Board;
