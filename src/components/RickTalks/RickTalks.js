import React from 'react';
import './rickTalks.scss';

export default function RickTalks() {
  return (
    <div className="rickTalksContainer">
      <div className="rickTalks">
        Your life purpose is to improve this score!
      </div>

      <div className="font--small--green alignStart">
        <p>You have </p>
        <p>played 0 games</p>
        <p>Your average </p>
        <p>score is 5/10</p>
      </div>
    </div>
  );
}
