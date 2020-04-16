import React, { Component } from "react";
import "./App.css";
import Rules from "./components/rule";
import DecodingBoard from "./components/decondingboard";
import CodePegs from "./components/codepegs";
import EndGame from "./components/endgame";

let times = (n) => {
  return (f) => {
    Array(n)
      .fill()
      .map((_, i) => f(i));
  };
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeLength: 4,
      colors: new Map([
        [0, "zero"],
        [1, "one"],
        [2, "two"],
        [3, "three"],
        [4, "four"],
        [5, "five"],
      ]),
      currentRow: 0,
      currentGuess: new Map(),
      exactMatches: 0,
      valueMatches: 0,
      pegsInRow: 4,
      attempts: 10,
      showRules: false,
      success: false,
      endGame: false,
    };
  }

  componentDidMount() {
    this.setState({
      code: this.getCode(), //the main code to be decoded
      selectedPeg: this.state.colors.get(0),
    });
  }

  reloadGame = () => {
    this.setState({
      success: false,
      endGame: false,
      code: this.getCode(),
      selectedPeg: this.state.colors.get(0),
      currentRow: 0,
      currentGuess: new Map(),
      exactMatches: 0,
      valueMatches: 0,
    });
  };

  toggleRules = () => this.setState({ showRules: !this.state.showRules });

  getRandomArbitrary(min = 0, max = 5) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getCode() {
    const code = new Map();

    let generateCode = (i) => {
      code.set(i, this.state.colors.get(this.getRandomArbitrary()));
    };

    times(this.state.codeLength)(generateCode);

    return code;
  }

  activatePeg = (event) => {
    //if one of the peg on the right was selected
    if (event.target.name.startsWith("peg")) {
      this.setState({ selectedPeg: event.target.value });
    } else {
      //else if one of the pegs on the decoding board was selected
      console.log(this.state.selectedPeg);
      if (this.state.selectedPeg) {
        //if peg on the right was selected
        this.setState({
          currentGuess: this.state.currentGuess.set(
            event.target.value - 1,
            this.state.selectedPeg
          ),
        });
      }
    }
  };

  keyOf(map, valueToFind) {
    for (let [key, value] of map) {
      if (valueToFind === value) {
        return key;
      }
    }

    return -1;
  }

  submitPegs = () => {
    let code = new Map(this.state.code);
    let pegs = this.state.currentGuess;
    let foundKey;
    let exactMatches = 0;
    let valueMatches = 0;

    // First pass: Look for value & position matches
    // Safely remove items if they match
    for (let [key, value] of pegs) {
      if (value === code.get(key)) {
        exactMatches++;
        pegs.delete(key);
        code.delete(key);
      }
    }

    // Second pass: Look for value matches anywhere in the code
    for (let [key, value] of pegs) {
      // attempt to find the peg in the remaining code
      foundKey = this.keyOf(code, value);
      if (foundKey !== -1) {
        valueMatches++;
        // remove the matched code peg, since it's been matched
        code.delete(foundKey);
      }
    }

    if (exactMatches === this.state.pegsInRow) {
      this.setState({ endGame: true, success: true });
    } else if (this.state.attempts === this.state.currentRow + 1) {
      this.setState({ endGame: true });
    }

    this.setState({
      exactMatches: exactMatches,
      valueMatches: valueMatches,
      currentRow: this.state.currentRow + 1,
      currentGuess: new Map(),
    });
  };

  render() {
    return (
      <div className="container">
        <header>
          <h1>
            <span className="M">M</span>
            <span className="A">A</span>
            <span className="S">S</span>
            <span className="T">T</span>
            <span className="E">E</span>
            <span className="R">R</span>
            <span className="mind">MIND</span>
          </h1>
          <Rules
            showRules={this.state.showRules}
            toggleRules={this.toggleRules}
          />
        </header>
        <main className="clearfix">
          <DecodingBoard
            state={this.state}
            activatePeg={this.activatePeg} // Culoarea selectata
            submitPegs={this.submitPegs}
          />
          <CodePegs
            selectedPeg={this.state.selectedPeg}
            colors={this.state.colors}
            activatePeg={this.activatePeg}
          />
          <EndGame
            endGame={this.state.endGame}
            success={this.state.success}
            reloadGame={this.reloadGame}
          />
          <div className="cheat">{this.state.code}</div>
        </main>
        <footer>
          <p>This game is a copy. Below is a link to original source </p>
          <p>
            <a href="http://zofiakorcz.pl/mastermind-react-es6-webpack">
              Mastermind game in React and ECMAScript 6.
            </a>
          </p>
        </footer>
      </div>
    );
  }
}
