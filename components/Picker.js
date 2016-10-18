import React, { Component, PropTypes } from 'react';

export default class Picker extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        <input onChange={e => onChange(e.target.value)} />
      </span>
    );
  }
}

Picker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
