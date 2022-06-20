import { authService, dbService } from '../utils/firebaseFunctions';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import Board from '../routes/Board';
import Home from '../routes/Home';
import Post from '../routes/Post';
import SignIn from '../routes/SignIn';
import SignUp from '../routes/SignUp';
import SignUpSelect from '../routes/SignUp/SignUpSelect';
import SignUpFreshmen from '../routes/SignUp/SignUpFreshmen'
import SignUpEnrolled from '../routes/SignUp/SignUpEnrolled'
import SignUpGraduated from '../routes/SignUp/SignUpGraduated'
import SignUpOther from '../routes/SignUp/SignUpOther'
import Profile from '../routes/Profile';
import Verification from '../routes/Verification';
import EditPost from '../routes/EditPost.js';
import AddPost from '../routes/AddPost.js';
import BoardHome from '../routes/BoardHome';
import AboutUs from '../routes/AboutUs';
import { FirebaseUser } from '../types/FirebaseUser';
import EditProfile from '../routes/EditProfile';
import { Thumbs } from 'react-responsive-carousel';
import PasswordResetRequest from '../routes/PasswordResetRequest';

import Admin from '../routes/Admin/Admin'
import AdminVerification from '../routes/Admin/Verification'

type AppRouterProps = {

}

type AppRouterState = {
  isLoggedIn: boolean,
  loading: Boolean,
  firebaseUserData: FirebaseUser,
  toggle: boolean,
  userId: string,
}

class AppRouter extends React.Component<AppRouterProps, AppRouterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loading: true,
      firebaseUserData: {
        username: "",
        userId: "",
        verificationFile: undefined,
        email: "",
        isVerified: false,
        role: "User", // User, Undergraduate, Graduate, Admin
        enrolledYear: "",
        major: "",
        faculty: "",
        profilePictureURL: "",
        yob: "",
      },
      toggle: false,
      userId: "",
    }
  }

  reloadFunction = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  componentDidMount = () => {
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
                  userId: user.uid,
                  email: data.email,
                  verificationFile: data.verificationFile,
                  isVerified: data.isVerified,
                  role: data.role,
                  enrolledYear: data.enrolledYear,
                  major: data.major,
                  faculty: data.faculty,
                  profilePictureURL: data.profilePictureURL,
                  yob: data.yob,
                  gender: data.gender,
                },
                userId: user.uid,
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
                  <Route exact path='/' render={() => <Home
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/home' render={() => <Home
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/profile' render={() => <Profile
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/verification' render={() => <Verification firebaseUserData={this.state.firebaseUserData} />} />
                  <Route exact path='/signin' render={(routerProps) => <SignIn
                    match={routerProps.match}
                    history={routerProps.history}
                    location={routerProps.location}
                  />} />
                  <Route exact path='/reset' render={() => <PasswordResetRequest />}

                  />
                  <Route exact path='/signup/select' render={(routerProps) => <SignUpSelect
                    history={routerProps.history}
                    location={routerProps.location}
                  />} />
                  <Route exact path='/signup' render={(routerProps) => <SignUp
                    history={routerProps.history}
                    location={routerProps.location}
                  />} />
                  <Route exact path='/about-us' render={() => <AboutUs firebaseUserData={this.state.firebaseUserData} />} />
                  <Route exact path='/editProfile' render={() => <EditProfile
                    firebaseUserData={this.state.firebaseUserData}
                    userId={this.state.userId}
                  />} />
                  <Route exact path='/boards' render={() => <BoardHome
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/boards/:boardId' sensitive render={(routerProps) => <Board
                    boardId={routerProps.match.params.boardId}
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Route exact path='/boards/:boardId/:postId/edit' sensitive render={(routerProps) => <EditPost
                    boardId={routerProps.match.params.boardId}
                    postId={routerProps.match.params.postId}
                    firebaseUserData={this.state.firebaseUserData}
                  />} />
                  <Switch>
                    <Route exact path='/boards/:boardId/new' sensitive render={(routerProps) => <AddPost
                      boardId={routerProps.match.params.boardId}
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/boards/:boardId/:postId' sensitive render={(routerProps) => <Post
                      history={routerProps.history}
                      location={routerProps.location}
                      match={routerProps.match}
                      firebaseUserData={this.state.firebaseUserData}
                      reloadFunction={this.reloadFunction}
                    />} />
                    <Route exact path='/admin' render={() => <Admin
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/admin/verification' render={() => <AdminVerification
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                  </Switch>
                  <Route component={this.notFoundComponent} />
                </Switch>
              )
                :
                (
                  <Switch>
                    <Route exact path='/' render={() => <Home
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/home' render={() => <Home
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/signin' render={(routerProps) => <SignIn
                      match={routerProps.match}
                      history={routerProps.history}
                      location={routerProps.location}
                    />} />
                    <Route exact path='/signup/select' render={(routerProps) => <SignUpSelect
                      history={routerProps.history}
                      location={routerProps.location}
                    />} />
                    <Route exact path='/signup/freshmen' render={(routerProps) => <SignUpFreshmen
                      history={routerProps.history}
                      location={routerProps.location}
                    />} />
                    <Route exact path='/signup/enrolled' render={(routerProps) => <SignUpEnrolled
                      history={routerProps.history}
                      location={routerProps.location}
                    />} />
                    <Route exact path='/signup/graduated' render={(routerProps) => <SignUpGraduated
                      history={routerProps.history}
                      location={routerProps.location}
                    />} />
                    <Route exact path='/signup/other' render={(routerProps) => <SignUpOther
                      history={routerProps.history}
                      location={routerProps.location}
                    />} />
                    <Route exact path='/reset' render={() => <PasswordResetRequest />}

                    />
                    <Route exact path='/profile' render={() => <Redirect to='/signin' />} />
                    <Route exact path='/about-us' render={() => <AboutUs firebaseUserData={this.state.firebaseUserData} />} />
                    <Route component={this.notFoundComponent} />
                    <Route exact path='/editProfile' render={() => <EditProfile
                      firebaseUserData={this.state.firebaseUserData}
                      userId={this.state.userId}
                    />} />

                    <Route exact path='/boards' render={() => <BoardHome
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Route exact path='/boards/:boardId' sensitive render={(routerProps) => <Board
                      boardId={routerProps.match.params.boardId}
                      firebaseUserData={this.state.firebaseUserData}
                    />} />
                    <Switch>
                      <Route exact path='/boards/:boardId/new' sensitive render={(routerProps) => <AddPost
                        boardId={routerProps.match.params.boardId}
                        firebaseUserData={this.state.firebaseUserData}
                      />} />
                      <Route exact path='/boards/:boardId/:postId' sensitive render={(routerProps) => <Post
                        history={routerProps.history}
                        location={routerProps.location}
                        match={routerProps.match}
                        firebaseUserData={this.state.firebaseUserData}
                        reloadFunction={this.reloadFunction}
                      />} />
                    </Switch>
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