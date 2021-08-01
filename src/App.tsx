import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './routes/Home';
import AppRouter from './components/AppRouter';
import { authService } from './utils/firebaseFunctions';

class App extends React.Component {
  render() {
    return (
      <AppRouter />
    )
  }
}

export default App;
