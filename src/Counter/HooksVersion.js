import React from 'react';

const HooksVersion = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div
      style={{
        margin: '50px'
      }}
    >
      <h3>Your count is {count}</h3>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <h4 style={{ marginTop: '30px' }}>Hooks Version</h4>
    </div>
  );
};

export default HooksVersion;
