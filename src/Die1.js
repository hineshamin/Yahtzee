// Taken from https://github.com/tryton-vanmeer/React-Dice-Roller and modified

import React from 'react';
import './Die.css';

class Die extends React.Component {
  constructor(props) {
    super(props);
    this.sides = [
      'translateZ(-25px) rotateY(0deg)',
      'translateZ(-25px) rotateX(-180deg)',
      'translateZ(-25px) rotateY(-90deg)',
      'translateZ(-25px) rotateY(90deg)',
      'translateZ(-25px) rotateX(-90deg)',
      'translateZ(-25px) rotateX(90deg)'
    ];
    this.render = this.render.bind(this);
  }

  spinDice(e) {
    var die = document.getElementById(this.props.idx);
    var sides = this.sides;

    die.classList.add('rolling');

    setTimeout(() => {
      var roll = this.props.val - 1;
      die.classList.remove('rolling');
      die.style.transform = sides[roll];
    }, 750);
  }

  render() {
    let divs = this.sides.map((side, index) => {
      return <div className="side">{index + 1}</div>;
    });
    setTimeout(() => {
      if ((!this.props.locked || this.props.allLocked) && this.props.doSpin)
        this.spinDice();
    }, 0);
    return (
      <div
        className={`die-container `}
        onClick={() => this.props.handleClick(this.props.idx)}
      >
        <div
          id={this.props.idx}
          className={`die ${'d' + this.sides.length} ${
            this.props.locked ? 'locked' : ''
          }`}
        >
          {divs}
        </div>
      </div>
    );
  }
}

export default Die;
