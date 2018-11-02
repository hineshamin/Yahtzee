import React, { Component } from 'react';
import './Die.css';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';

class Die extends Component {
  render() {
    return (
      <div>
        <button
          className="Die"
          style={{ backgroundColor: this.props.locked ? 'darkred' : 'red' }}
          onClick={() => this.props.handleClick(this.props.idx)}
        >
          {this.props.val}
        </button>
      </div>
    );
  }
}

export default Die;
