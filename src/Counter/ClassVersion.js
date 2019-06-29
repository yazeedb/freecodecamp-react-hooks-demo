import React from 'react';

class ClassVersion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState({
      count: this.state.count + 1
    });
  }

  decrement() {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    return (
      <div
        style={{
          margin: '50px'
        }}
      >
        <h3>Your count is {this.state.count}</h3>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>

        <h4 style={{ marginTop: '30px' }}>Class Version</h4>
      </div>
    );
  }
}

export default ClassVersion;
