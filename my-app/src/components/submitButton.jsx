import React, { PureComponent } from "react";
import classNames from "classnames/bind";
export default class SubmitButton extends PureComponent {
  render() {
    const className = classNames({
      submit: true,
      hidden: !(
        this.props.state.currentGuess.size >= this.props.state.pegsInRow &&
        this.props.state.currentRow === this.props.rowId
      ),
    });

    return (
      <button className={className} onClick={this.props.submitPegs}></button>
    );
  }
}
