import React, { PureComponent } from 'react';
import ApiExample from '../ApiExample/ApiExample';

export default class Home extends PureComponent {
  render() {
    return (
      <main>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginTop: '5px',
            marginBottom: '20px',
          }}
        >
          React boilerplate
        </h1>

        <ApiExample />
      </main>
    );
  }
}
