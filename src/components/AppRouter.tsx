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
import EditPost from '../routes/EditPost';
import AddPost from '../routes/AddPost';

type AppRouterProps = {
  username: string,
  isVerified: boolean,
  role: string
}

type AppRouterState = {
  isLoggedIn: boolean,
}

class AppRouter extends React.Component<AppRouterProps, AppRouterState> {
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
              {console.log('logged in')}
              <Route exact path='/' component={Home} />
              <Route exact path='/boards/:boardTitle' render={(routerProps) => <Board
                boardId={routerProps.match.params.boardTitle}
                username={this.props.username}
                isVerified={this.props.isVerified}
                role={this.props.role}
              />} />
              <Route exact path='/boards/:boardTitle/:postId' render={(routerProps) => <Post
                boardId={routerProps.match.params.boardTitle}
                postId={routerProps.match.params.postId}
                username={this.props.username}
                isVerified={this.props.isVerified}
                role={this.props.role}
              />} />
              <Route exact path='/boards/:boardTitle/:postId/edit' render={(routerProps) => <EditPost
                boardId={routerProps.match.params.boardTitle}
                postId={routerProps.match.params.postId}
                username={this.props.username}
                isVerified={this.props.isVerified}
                role={this.props.role}
              />} />
              <Route exact path='/boards/:boardTitle/:postId/new' render={(routerProps) => <AddPost
                boardId={routerProps.match.params.boardTitle}
                postId={routerProps.match.params.postId}
                username={this.props.username}
                isVerified={this.props.isVerified}
                role={this.props.role}
              />} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/verification' component={Verification} />
            </>
          )
            :
            (
              <>
                {console.log('not logged in')}
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