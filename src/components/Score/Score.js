import React from 'react';
import "../../index.scss";

function Score(props) {
 
    return (
        <div>
            <h1 className={props.scoreStyle} >{props.scoreMessage}</h1>
            <img src={props.characterImg} className="character__img" alt="character"></img>
            <h2 className="font--small">Your score is: {props.score}</h2>
            <button className="button--medium" onClick={props.nextOne}>Next</button>
        </div>
    )
    
};

export default Score;