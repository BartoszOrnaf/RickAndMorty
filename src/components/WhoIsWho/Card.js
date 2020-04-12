import React from 'react';
import './whoIsWho.scss';
import PropTypes from 'prop-types';

function Card(props) {
  const dragStart = (e) => {
    const { target } = e;
    e.dataTransfer.setData('card_id', target.id);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  const { id, className, draggable, children } = props;
  return (
    <div
      id={id}
      className={className}
      draggable={draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  id: undefined,
  className: undefined,
  children: undefined,
};

Card.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
  draggable: PropTypes.string.isRequired,
};
export default Card;
