import React, { PureComponent } from 'react';

export default class Peg extends PureComponent{
    render() {
        return (
            <span className={this.props.pegClass}>
              <input
                type="radio"
                name={this.props.name}
                value={this.props.value}
                id={this.props.idVal}
                onClick={this.props.isCurrentRow ? this.props.activatePeg : null}
              />
              <label htmlFor={this.props.idVal}></label>
            </span>
          );   
    }
}