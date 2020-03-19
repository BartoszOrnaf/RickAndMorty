import React from 'react';
import './whoIsWho.scss'

function Board(props) {

    const drop = e => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);

        let all = document.getElementsByClassName('board');
        for (let i = 0; i < all.length; i++) {
            all[i].style.backgroundImage = 'none';
        }

        if (e.target.id === "board-compare") {
            e.target.appendChild(card);
        }

        props.checkAnswer(card_id.slice(5))
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