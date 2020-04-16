import React, { PureComponent } from "react";
import DecodRow from "./decodRow";
import SubmitButton from "./submitButton";
import HintsRow from "./hintsRow";
import classNames from 'classnames/bind';

export default class Row extends PureComponent {
  render() {
    const isCurrentRow = this.props.state.currentRow === this.props.rowId;
    const rowClassName = classNames({
      row: true,
      clearfix: true,
      current: isCurrentRow,
    });
    const hintsRowName = "hintsRow-" + this.props.rowId;
    const rowName = "decodeRow-" + this.props.rowId;

    return (
      <div className={rowClassName}>
        <div className="left">
          <DecodRow
            name={rowName}
            key={this.props.rowId}
            rowId={this.props.rowId}
            state={this.props.state}
            isCurrentRow={isCurrentRow}
            activatePeg={this.props.activatePeg}
          />
        </div>
        <div className="left">
          <HintsRow
            name={hintsRowName}
            key={this.props.rowId}
            rowId={this.props.rowId}
            state={this.props.state}
          />
        </div>
        <div className="right">
          <SubmitButton
            rowId={this.props.rowId}
            state={this.props.state}
            submitPegs={this.props.submitPegs}
          />
        </div>
      </div>
    );
  }
}
