import React from 'react';
import './rickTalks.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export function RickTalks(props) {
  const { gamesPlayed, averageScore } = props;
  return (
    <div className="rickTalksContainer">
      <div className="rickTalks">
        Your life purpose is to improve this score!
      </div>

      <div className="font--small--green alignStart">
        <p>You have </p>
        <p>played {gamesPlayed} games</p>
        <p>Your average </p>
        <p>score is {averageScore}/10</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    averageScore: state.rickTalks.averageScore,
    gamesPlayed: state.rickTalks.gamesPlayed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addScore: () => dispatch({ type: 'ADD_SCORE', payload: { newScore: 9 } }),
  };
};

RickTalks.propTypes = {
  gamesPlayed: PropTypes.number.isRequired,
  averageScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RickTalks);
