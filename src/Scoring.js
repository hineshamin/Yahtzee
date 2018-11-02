import React, { Component } from 'react';
import Rule from './Rule';
import './Scoring.css';
import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance
} from './Rules';

class Scoring extends Component {
  render() {
    const { scores, doScore } = this.props;

    let upperScore =
      (scores.ones || 0) +
      (scores.twos || 0) +
      (scores.threes || 0) +
      (scores.fours || 0) +
      (scores.fives || 0) +
      (scores.sixes || 0);

    let lowerScore =
      (scores.threeOfKind || 0) +
      (scores.fourOfKind || 0) +
      (scores.fullHouse || 0) +
      (scores.smallStraight || 0) +
      (scores.largeStraight || 0) +
      (scores.yahtzee || 0) +
      (scores.chance || 0);

    let totalScore = lowerScore + upperScore;
    return (
      <div className="Scoring">
        <section className="Scoring-section">
          <h2>Upper</h2>
          <table cellSpacing="0">
            <tbody>
              <Rule
                name="Ones"
                score={scores.ones}
                doScore={evt => doScore('ones', ones.evalRoll)}
              />
              <Rule
                name="Twos"
                score={scores.twos}
                doScore={evt => doScore('twos', twos.evalRoll)}
              />
              <Rule
                name="Threes"
                score={scores.threes}
                doScore={evt => doScore('threes', threes.evalRoll)}
              />
              <Rule
                name="Fours"
                score={scores.fours}
                doScore={evt => doScore('fours', fours.evalRoll)}
              />
              <Rule
                name="Fives"
                score={scores.fives}
                doScore={evt => doScore('fives', fives.evalRoll)}
              />
              <Rule
                name="Sixes"
                score={scores.sixes}
                doScore={evt => doScore('sixes', sixes.evalRoll)}
              />
            </tbody>
          </table>
          <br />
          <div>Upper Score: {upperScore}</div>
        </section>
        <section className="Scoring-section Scoring-section-lower">
          <h2>Lower</h2>
          <table cellSpacing="0">
            <tbody>
              <Rule
                name="Three of Kind"
                score={scores.threeOfKind}
                doScore={evt => doScore('threeOfKind', threeOfKind.evalRoll)}
              />
              <Rule
                name="Four of Kind"
                score={scores.fourOfKind}
                doScore={evt => doScore('fourOfKind', fourOfKind.evalRoll)}
              />
              <Rule
                name="Full House"
                score={scores.fullHouse}
                doScore={evt => doScore('fullHouse', fullHouse.evalRoll)}
              />
              <Rule
                name="Small Straight"
                score={scores.smallStraight}
                doScore={evt =>
                  doScore('smallStraight', smallStraight.evalRoll)
                }
              />
              <Rule
                name="Large Straight"
                score={scores.largeStraight}
                doScore={evt =>
                  doScore('largeStraight', largeStraight.evalRoll)
                }
              />
              <Rule
                name="Yahtzee"
                score={scores.yahtzee}
                doScore={evt => doScore('yahtzee', yahtzee.evalRoll)}
              />
              <Rule
                name="Chance"
                score={scores.chance}
                doScore={evt => doScore('chance', chance.evalRoll)}
              />
            </tbody>
          </table>
          <br />
          <div> Lower Score: {lowerScore}</div>
        </section>
        <h3>Overall Score: {totalScore}</h3>
      </div>
    );
  }
}

export default Scoring;
