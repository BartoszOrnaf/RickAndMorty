import React from 'react';
import './whoIsWho.scss'

function Board(props) {

    const drop = e => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');

        const card = document.getElementById(card_id);

        if (e.target.id === "board-compare") {
            e.target.appendChild(card);
        }

    }

    const dragOver = e => {
        e.preventDefault();
    }

    return (
        <div
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
        >
            {props.children}
        </div>
    )

};

export default Board;