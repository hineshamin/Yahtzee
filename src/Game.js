import React, { Component } from 'react';
import Dice from './Dice';
import Scoring from './Scoring';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;
const NUM_ROUNDS = 13;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }, v => Math.ceil(Math.random() * 6)),
      locked: Array(NUM_DICE).fill(false),
      doSpin: true,
      rollsLeft: NUM_ROLLS - 1,
      roundsLeft: NUM_ROUNDS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map(
        (d, i) => (st.locked[i] ? d : Math.ceil(Math.random() * 6))
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      doSpin: true
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    this.setState(st => ({
      locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ],
      doSpin: false
    }));
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
      roundsLeft: st.roundsLeft - 1,
      doSpin: false
    }));
    this.roll();
  }

  restartGame() {
    this.setState({
      dice: Array.from({ length: NUM_DICE }, v => Math.ceil(Math.random() * 6)),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS - 1,
      roundsLeft: NUM_ROUNDS,
      doSpin: true,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    });
  }

  render() {
    let style = {
      display: this.state.roundsLeft === 0 ? 'none' : 'block'
    };
    return (
      <div>
        <section
          style={{ display: this.state.roundsLeft === 0 ? 'none' : 'block' }}
        >
          <h2>Rounds Left: {this.state.roundsLeft}</h2>
          <Dice
            dice={this.state.dice}
            locked={this.state.locked}
            handleClick={this.toggleLocked}
            doSpin={this.state.doSpin}
          />
          <button
            className="Game-reroll"
            disabled={this.state.locked.every(x => x)}
            onClick={this.roll}
          >
            {this.state.rollsLeft} Rerolls Left
          </button>
          <Scoring doScore={this.doScore} scores={this.state.scores} />
        </section>
        <section
          style={{ display: this.state.roundsLeft === 0 ? 'block' : 'none' }}
        >
          <h1>Game Over!</h1>
          <h3>
            Overall Score:{' '}
            {Object.values(this.state.scores).reduce(
              (acc, val) => acc + (val || 0),
              0
            )}
          </h3>
          <button onClick={this.restartGame}>Play Again?</button>
        </section>
      </div>
    );
  }
}

export default Game;
