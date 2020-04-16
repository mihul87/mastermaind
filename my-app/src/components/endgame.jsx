import React, { Component } from 'react';
import classNames from 'classnames/bind';

export default class EndGame extends Component{
render() {
    const endGameInfoClass = classNames({
        endgame: true,
        hidden: !this.props.endGame,
    });
    const endGameStatusClass = classNames({
      "endgame-relative": true,
      success: this.props.success,
      failure: !this.props.success,
    });
    const infoText = this.props.success ? "Congratulations!" : "GAME OVER!";

    return (
      <div className={endGameInfoClass}>
        <div className={endGameStatusClass}>
          <h2 className="endgame-header">{infoText}</h2>
          <button className="endgame-btn" onClick={this.props.reloadGame}>
            PLAY AGAIN
          </button>
        </div>
        <div className="endgame-relative endgame-overlay"></div>
      </div>
    );
  }
}    
