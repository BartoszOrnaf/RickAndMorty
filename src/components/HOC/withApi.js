import React from 'react';

const withApi = (WrappedComponent, charactersQuantity) => {
    class WithApi extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                charactersCount: 0,
                charactersArr: [],
                randomIds: [],
                test: "test works"
            }
        }
        
        getCharactersArr = (callback) =>{
            this.getCharactersCount(() => {
                this.getRandomIds(charactersQuantity, () => {
                    this.getCharacters(callback);
                })
            }) 
        }

        getCharactersCount = (callback) => {
            fetch(
                `https://rickandmortyapi.com/api/character`
            )
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        charactersCount: res.info.count
                    }, callback);
                })
                .catch(error => console.error('error:', error));
        }

        getRandomIds(a, callback) {
            const randomIds = [];
            while (randomIds.length < a) {
                let currentId = Math.floor(Math.random() * (this.state.charactersCount - 1)) + 1
                if (randomIds.indexOf(currentId) === -1) {
                    randomIds.push(currentId);
                }
            }
    
            this.setState({
                randomIds: randomIds
            }, callback);
        }

        getCharacters(callback) {
            fetch(
                `https://rickandmortyapi.com/api/character/${this.state.randomIds}`,
                { method: 'GET' }
            )
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        charactersArr: res
                    }, callback);
                })
                .catch(error => console.error('error:', error));
        }

        render(){
            return(
                <WrappedComponent
                    getCharactersArr= {this.getCharactersArr}
                    charactersArr = {this.state.charactersArr}
                    test = {this.state.test}
                    {... this.props}
                />
            )
        }
        
    }
    return WithApi;
}

export default withApi;