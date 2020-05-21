import rickTalksReducer from '../components/RickTalks/Store/rickTalksReducer';

const appReducer = (state = {}, action) => {
  return {
    rickTalks: rickTalksReducer(state.rickTalks, action),
  };
};

export default appReducer;
