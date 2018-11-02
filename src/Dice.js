import React, { Component } from 'react';
import Die from './Die1';
import './Dice.css';
import './Die1.css';

class Dice extends Component {
  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((d, idx) => (
          <Die
            handleClick={this.props.handleClick}
            val={d}
            locked={this.props.locked[idx]}
            idx={idx}
            key={idx}
            doSpin={this.props.doSpin}
            allLocked={this.props.locked.every(x => x === true)}
          />
        ))}
      </div>
    );
  }
}

export default Dice;
