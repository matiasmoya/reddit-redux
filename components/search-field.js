import React, { Component, PropTypes } from 'react';

export default class SearchField extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <input onChange={e => this.onSearchChange(e.target.value)} ref='search' defaultValue={value} />
    );
  }

  onSearchChange(query) {
    if (this.promise) {
      clearInterval(this.promise)
    }

    this.promise = setTimeout(() => this.props.onChange(query), 400);
  }
}

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
