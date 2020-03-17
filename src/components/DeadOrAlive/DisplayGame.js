import React from 'react';
import './deadOrAlive.scss';

function DisplayGame(props) {

    return (<div>
        <h1 className="font--small">{props.currentTry} of 10</h1>
        <img src={props.characterImg} className="character__img" alt="character"/>
        <h2 className="font--small">{props.characterName}</h2>
        <h1 className="font--medium">
            <button className="button--medium"
                onClick={() => {
                    props.checkAnswer("Dead");
                }}> Dead </button>, <button className="button--medium"
                    onClick={() => {
                        props.checkAnswer("Alive");
                    }}> alive </button> or <button className="button--medium"
                        onClick={() => {
                            props.checkAnswer("unknown");
                        }}> unknown</button>?
        </h1>
    </div>)

};

export default DisplayGame;