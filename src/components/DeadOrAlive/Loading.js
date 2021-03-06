import React from 'react';
import '../../index.scss';
import loading from './assets/loading.png';

function Loading() {
  return (
    <div>
      <h1 className="font--small--green">loading</h1>
      <img src={loading} className="character__img" alt="character" />
    </div>
  );
}

export default Loading;
