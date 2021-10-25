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
import EditPost from '../routes/EditPost.js';
import AddPost from '../routes/AddPost.js';
import BoardHome from '../routes/BoardHome';
import AboutUs from '../routes/AboutUs';
import { FirebaseUser } from '../types/FirebaseUser';


type AppRouterProps = {

}

type AppRouterState = {
  isLoggedIn: boolean,
  loading: Boolean,
  firebaseUserData: FirebaseUser,
}

class AppRouter extends React.Component<AppRouterProps, AppRouterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: true,
      firebaseUserData: {
        username: "",
        verificationFile: undefined,
        isVerified: false,
        role: "User", // User, Undergraduate, Graduate, Admin
        enrolledYear: "",
        major: "",
        faculty: ""
      },
    }
  }

  componentDidMount = () => {
    console.log("what")
    if (localStorage.getItem("seeVerify") === null) {
      localStorage.setItem("seeVerify", "yes")
    }
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        this.setState({
          isLoggedIn: true,
          loading: false
        })
        await this.fetchUserData()
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  fetchUserData = async () => {
    const user = authService.currentUser
    if (user) {
      dbService
        .collection('users').doc(user.uid)
        .onSnapshot((querySnapshot) => {
          if (querySnapshot.exists) {
            const data = querySnapshot.data() as FirebaseUser;
            if (data) {
              this.setState({
                firebaseUserData: {
                  username: data.username,
                  verificationFile: data.verificationFile,
                  isVerified: data.isVerified,
                  role: data.role,
                  enrolledYear: data.enrolledYear,
                  major: data.major,
                  faculty: data.faculty
                }
              })
            }
          }
        })
    }
  }

  notFoundComponent = () => {
    return (
      <div>
        404 not found!
        <Redirect to='/' />
      </div>
    )
  }

  render = () => {
    return (
      <Router>
        <Switch>
          {this.state.loading ?
            <Route exact path='/'>
              <>
                Loading
              </>
            </Route>
            :
            <>
              {this.state.isLoggedIn ? (
                <Switch>
                  {console.log('logged in')}
                  <Route exact path='/' render={() => <Home
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/boards' render={() => <BoardHome
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/boards/:boardTitle' render={(routerProps) => <Board
                    boardId={routerProps.match.params.boardTitle}
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/boards/:boardTitle/:postId' render={(routerProps) => <Post
                    boardId={routerProps.match.params.boardTitle}
                    postId={routerProps.match.params.postId}
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/boards/:boardTitle/:postId/edit' render={(routerProps) => <EditPost
                    boardId={routerProps.match.params.boardTitle}
                    postId={routerProps.match.params.postId}
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/boards/:boardTitle/new' render={(routerProps) => <AddPost
                    boardId={routerProps.match.params.boardTitle}
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/profile' render={() => <Profile
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/verification' render={() => <Verification firebaseUserData={this.state.firebaseUserData} />} />
                  <Route exact path='/signin' render={() => <Redirect to='/' />} />
                  <Route exact path='/signup' render={() => <Redirect to='/' />} />
                  <Route exact path='/about-us' render={() => <AboutUs />} />
                  <Route component={this.notFoundComponent} />
                </Switch>
              )
                :
                (
                  <Switch>
                    <Route exact path='/' render={() => <Home
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/boards' render={() => <BoardHome
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/boards/:boardTitle' render={(routerProps) => <Board
                      boardId={routerProps.match.params.boardTitle}
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/boards/:boardTitle/new' render={(routerProps) => <AddPost
                      boardId={routerProps.match.params.boardTitle}
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/boards/:boardTitle/:postId' render={(routerProps) => <Post
                      boardId={routerProps.match.params.boardTitle}
                      postId={routerProps.match.params.postId}
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/profile' render={() => <Redirect to='/signin' />} />
                    <Route exact path='/about-us' render={() => <AboutUs />} />
                    <Route component={this.notFoundComponent} />
                  </Switch>
                )
              }
            </>
          }
        </Switch>
      </Router>
    )
  };
};

export default AppRouter;