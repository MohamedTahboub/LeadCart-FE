
import React from 'react';
import Collapsible from 'react-collapsible';
import './style.css';
class App extends React.Component {
  onOpening = () => {
    if (this.props.toggle)
      this.props.toggle(this.props.title || true);
  }

  onClosing = () => {
    if (this.props.toggle)
      this.props.toggle(false);
  }

  render () {
    return (

      <Collapsible
        open={this.props.defaultOpen}
        onOpening={this.onOpening}
        onClosing={this.onClosing}
        trigger={this.props.title}
        easing='ease-in-out'
        {...this.props}
      >
        {this.props.children}
      </Collapsible>

    );
  }
}

App.defaultProps = { defaultOpen: true };

export default App;
