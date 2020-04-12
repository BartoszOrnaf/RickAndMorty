import React from 'react';

const withApi = (WrappedComponent, charactersQuantity) => {
  class WithApi extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        charactersCount: 0,
        charactersArr: [],
        randomIds: [],
      };
      this.getCharactersArr = this.getCharactersArr.bind(this);
      this.getCharactersCount = this.getCharactersCount.bind(this);
    }

    getCharactersArr(callback) {
      this.getCharactersCount(() => {
        this.getRandomIds(charactersQuantity, () => {
          this.getCharacters(callback);
        });
      });
    }

    getCharactersCount(callback) {
      fetch(`https://rickandmortyapi.com/api/character`)
        .then((res) => res.json())
        .then((res) => {
          this.setState(
            {
              charactersCount: res.info.count,
            },
            callback
          );
        })
        .catch((error) => console.error('error:', error));
    }

    getRandomIds(randomIdsCount, callback) {
      const randomIds = [];
      const { charactersCount } = this.state;
      while (randomIds.length < randomIdsCount) {
        const currentId = Math.floor(Math.random() * (charactersCount - 1)) + 1;
        if (randomIds.indexOf(currentId) === -1) {
          randomIds.push(currentId);
        }
      }

      this.setState(
        {
          randomIds,
        },
        callback
      );
    }

    getCharacters(callback) {
      const { randomIds } = this.state;
      fetch(`https://rickandmortyapi.com/api/character/${randomIds}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((res) => {
          this.setState(
            {
              charactersArr: res,
            },
            callback
          );
        })
        .catch((error) => console.error('error:', error));
    }

    render() {
      const { charactersArr } = this.state;
      return (
        <WrappedComponent
          getCharactersArr={this.getCharactersArr}
          charactersArr={charactersArr}
          {...this.props}
        />
      );
    }
  }
  return WithApi;
};

export default withApi;
