import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter';

type UserState = {
}

class App extends React.Component<{}, UserState> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <AppRouter />
      </>
    )
  }
}

export default App;
