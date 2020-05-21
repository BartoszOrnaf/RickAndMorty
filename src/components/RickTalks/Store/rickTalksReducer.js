import _ from 'lodash';

const initialState = {
  scoreArr: [],
  averageScore: 0,
  gamesPlayed: 0,
};

const rickTalksReducer = (currentScoreState = initialState, scoreAction) => {
  switch (scoreAction.type) {
    case 'ADD_SCORE':
      return {
        ...currentScoreState,
        scoreArr: [...currentScoreState.scoreArr, scoreAction.payload.newScore],
        averageScore: _.round(
          _.mean([...currentScoreState.scoreArr, scoreAction.payload.newScore]),
          1
        ),
        gamesPlayed: currentScoreState.gamesPlayed + 1,
      };
    default:
      return currentScoreState;
  }
};

export default rickTalksReducer;
