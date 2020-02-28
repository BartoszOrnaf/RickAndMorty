import React from 'react';
import './DeadOr.scss'

class CharacterComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            current: 1,
            character: ''
        }
    }
    componentDidMount() {
        this.getCharacter()
    }

    getCharacter() {
        let randomId = Math.floor(Math.random()*300)
        fetch(`https://rickandmortyapi.com/api/character/${randomId}`).then(
            res => res.json()
        ).then(res => {console.log(res)
        return res}).then(
            res => this.setState({ character: res })
        ).catch(err => console.log(err))
    }
  
    render() {

        return (
            <div>
                <h1 className="font-medium">{this.state.current} of 5</h1>
                <img src={this.state.character.image} alt="character"></img>
                <h2 className="font-small">{this.state.character.name}</h2>
                <h1 className="font-medium"><span className="dead-button">Dead</span> or <span className="dead-button">alive</span>?</h1>
            </div>
        )

    }

};

export default CharacterComponent;