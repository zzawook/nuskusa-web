import { authService } from '../utils/firebaseFunctions';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Board from '../routes/Board';
import Home from '../routes/Home';
import Post from '../routes/Post';
import SignIn from '../routes/SignIn';
import SignUp from '../routes/SignUp';
import Profile from '../routes/Profile';
import Verification from '../routes/Verification';

type AppRouterState = {
  isLoggedIn: boolean,
}

class AppRouter extends React.Component<{}, AppRouterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  componentDidMount = () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoggedIn: true
        })
      }
    })
  }

  render = () => {
    return (
      <Router>
        <Switch>
          {this.state.isLoggedIn ? (
            <>
              <Route exact path='/' component={Home} />
              <Route exact path='/boards/:boardTitle' component={Board} />
              <Route exact path='/boards/:boardTitle/:postId' component={Post} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/verification' component={Verification} />
            </>
          )
            :
            (
              <>
                <Route exact path='/' component={Home} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/signup' component={SignUp} />
              </>
            )
          }
        </Switch>
      </Router>
    )
  };
};

export default AppRouter;