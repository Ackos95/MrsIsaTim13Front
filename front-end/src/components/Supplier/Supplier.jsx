import React, { Component } from 'react';

class Supplier extends Component {
  constructor(props) {
    super(props);

    // this.fun = this.fun.bind(this);
  }

  render() {
    const {f} = this.props;

    return (
      <div> supplier </div>
    );
  }
}

export default Supplier;