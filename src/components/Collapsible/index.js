
import React from 'react';
import Collapsible from 'react-collapsible';
import './style.css';
class App extends React.Component {
  onOpening = (e) => {
    console.log(e);
  }

  render () {
    return (

      <Collapsible
        open onOpening={this.onOpening} trigger={this.props.title} easing='ease-in-out'
        {...this.props}
      >
        {this.props.children}
      </Collapsible>

    );
  }
}

export default App;
