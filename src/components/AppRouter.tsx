import { authService, dbService } from '../utils/firebaseFunctions';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
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
}

type AppRouterState = {
  isLoggedIn: boolean,
  username: string,
  isVerified: boolean,
  role: string
}

class AppRouter extends React.Component<AppRouterProps, AppRouterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      isVerified: false,
      role: 'User'
    }
  }

  componentDidMount = () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoggedIn: true
        })
        this.fetchUserData();
      }
    })
  }


  fetchUserData = () => {
    const user = authService.currentUser
    if (user) {
      dbService
        .collection('users').doc(user.uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.exists) {
            const data = querySnapshot.data();
            if (data) {
              this.setState({
                username: data.username,
                isVerified: data.isVerified,
                role: data.role, // User, Undergraduate, Graduate, Admin
              })
            }
          }
        })
    }
  }

  render = () => {
    return (
      <Router>
        <Switch>
          {this.state.isLoggedIn ? (
            <>
              {console.log('logged in')}
              <Route exact path='/' render={() => <Home role={this.state.role} />} />
              <Route exact path='/boards/:boardTitle' render={(routerProps) => <Board
                boardId={routerProps.match.params.boardTitle}
                username={this.state.username}
                isVerified={this.state.isVerified}
                role={this.state.role}
              />} />
              <Route exact path='/boards/:boardTitle/:postId' render={(routerProps) => <Post
                boardId={routerProps.match.params.boardTitle}
                postId={routerProps.match.params.postId}
                username={this.state.username}
                isVerified={this.state.isVerified}
                role={this.state.role}
              />} />
              <Route exact path='/boards/:boardTitle/:postId/edit' render={(routerProps) => <EditPost
                boardId={routerProps.match.params.boardTitle}
                postId={routerProps.match.params.postId}
                username={this.state.username}
                isVerified={this.state.isVerified}
                role={this.state.role}
              />} />
              <Route exact path='/boards/:boardTitle/new' render={(routerProps) => <AddPost
                boardId={routerProps.match.params.boardTitle}
                username={this.state.username}
                isVerified={this.state.isVerified}
                role={this.state.role}
              />} />
              <Route exact path='/profile' render={() => <Profile />} />
              <Route exact path='/verification' render={() => <Verification role={this.state.role} />} />
              <Route exact path='/signin' render={() => <Redirect to='/' />} />
              <Route exact path='/signup' render={() => <Redirect to='/' />} />
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