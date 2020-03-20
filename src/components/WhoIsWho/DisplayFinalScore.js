import React from 'react';
import './whoIsWho.scss';

function DisplayFinalScore(props) {

    return (<div>
        <h1 className={props.scoreStyle} >{props.scoreMessage}</h1>
        <img src={props.searchedCharacterImg} className="character__img" alt="character"></img>
        <h2 className="font--small--green">Your final score is: {props.score} / 10</h2>
        <button className="button--medium" onClick={props.playAgain}>Play again!</button>
    </div>)

};

export default DisplayFinalScore;