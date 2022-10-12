import { authService, dbService } from '../utils/firebaseFunctions';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import BoardPage from '../routes/Board';
import Home from '../routes/Home';
import Post from '../routes/Post';
import SignIn from '../routes/SignIn';
import SignUp from '../routes/SignUp';
import SignUpSelect from '../routes/SignUp/SignUpSelect';
import SignUpFreshmen from '../routes/SignUp/SignUpFreshmen'
import SignUpEnrolled from '../routes/SignUp/SignUpEnrolled'
import SignUpGraduated from '../routes/SignUp/SignUpGraduated'
import SignUpOther from '../routes/SignUp/SignUpOther'
import Terms from '../routes/SignUp/Terms'
import Profile from '../routes/Profile';
import Verification from '../routes/Verification';
import SelectAnnouncementType from '../routes/Admin/SelectAnnouncementType'
import AddAnnouncement from '../routes/Admin/AddAnnouncement'
import AddEvent from '../routes/Admin/AddEvent'
import EditPost from '../routes/EditPost.js';
import AddPost from '../routes/AddPost.js';
import BoardHome from '../routes/BoardHome';
import AboutUs from '../routes/AboutUs';
import { User } from '../types/User';
import EditProfile from '../routes/EditProfile';
import PasswordResetRequest from '../routes/PasswordResetRequest';
import Admin from '../routes/Admin/Admin'
import AdminVerification from '../routes/Admin/Verification'
import SearchProfile from '../routes/Admin/SearchProfile'
import SelectEvent from '../routes/Admin/SelectEvent'
import ViewEvent from "../routes/Admin/ViewEvent";

type AppRouterProps = {

}

type AppRouterState = {
  isLoggedIn: boolean,
  userData: User,
  toggle: boolean,
  userId: string,
}

class AppRouter extends React.Component<AppRouterProps, AppRouterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: {
        name: "",
        email: "",
        role: "User", // User, Undergraduate, Graduate, Admin
        enrolledYear: "",
        major: "",
        faculty: "",
        profileImageUrl: "",
        yearOfBirth: "",
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

  componentDidMount = async () => {
    const url = process.env.REACT_APP_HOST + "api/profile/getProfile";
    const response = await fetch(url, {
      method: "GET",
    })
    if (response.status == 200) {
      const userObject = await response.json()
      this.setUserData(userObject);
    }
  }

  setUserData = (userdata: any) => {
    const actualData = {
      name: userdata.name,
      email: userdata.email,
      profileImageUrl: userdata.profileImageUrl,
      enrolledYear: userdata.enrolledYear,
      major: userdata.major,
      yearOfBirth: userdata.yearOfBirth,
      role: userdata.role,
      gender: userdata.gender
    }
    this.setState({
      userData: actualData,
      isLoggedIn: true,
    },() => {
      console.log(this.state)
    })
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
          <>
            {this.state.isLoggedIn ? (
              <Switch>
                <Route exact path='/' render={() => <Home
                  userData={this.state.userData}
                />} />
                <Route exact path='/admin' render={() => {
                  if (this.state.userData.role == "Admin") {
                    return <Admin
                      userData={this.state.userData}
                    />
                  }
                  else {
                    return <Home
                      userData={this.state.userData}
                    />
                  }
                }} />
                <Route exact path='/admin/verification' render={() => {
                  if (this.state.userData.role == "Admin") {
                    return <AdminVerification
                      userData={this.state.userData}
                    />
                  }
                }} />
                <Route exact path='/admin/search' render={() => {
                  if (this.state.userData.role == 'Admin') {
                    return <SearchProfile
                      userData={this.state.userData}
                    />
                  }
                  else {
                    return <Home
                      userData={this.state.userData}
                    />
                  }
                }} />
                <Route exact path='/admin/draft/select' render={() => {
                  if (this.state.userData.role == 'Admin') {
                    return <SelectAnnouncementType
                      userData={this.state.userData}
                    />
                  }
                  else {
                    return <Home
                      userData={this.state.userData}
                    />
                  }
                }} />
                <Route exact path='/admin/draft/announcement' render={() => {
                  if (this.state.userData.role == 'Admin') {
                    return <AddAnnouncement
                      userData={this.state.userData}
                      boardId={"announcement"}
                    />
                  }
                  else {
                    return <Home
                      userData={this.state.userData}
                    />
                  }
                }} />
                <Route exact path='/admin/draft/event' render={() => {
                  if (this.state.userData.role == 'Admin') {
                    return <AddEvent
                      userData={this.state.userData}
                    />
                  }
                  else {
                    return <Home
                      userData={this.state.userData}
                    />
                  }
                }} />
                <Route exact path='/admin/event' render={() => {
                  if (this.state.userData.role == 'Admin') {
                    return <SelectEvent
                      userData={this.state.userData}
                    />
                  }
                  else {
                    return <Home
                      userData={this.state.userData}
                    />
                  }
                }} />
                <Route exact path='/admin/event/:eventId' render={(routerProps) => {
                  if (this.state.userData.role == 'Admin') {
                    return <ViewEvent
                      userData={this.state.userData}
                      eventId={routerProps.match.params.eventId}
                    />
                  }
                  else {
                    return <Home
                      userData={this.state.userData}
                    />
                  }
                }} />
                <Route exact path='/home' render={() => <Home
                  userData={this.state.userData}
                />} />
                <Route exact path='/profile' render={() => <Profile
                  userData={this.state.userData}
                />} />
                <Route exact path='/verification' render={() => <Verification userData={this.state.userData} />} />
                <Route exact path='/signin' render={(routerProps) => <SignIn
                  match={routerProps.match}
                  history={routerProps.history}
                  location={routerProps.location}
                  onSignIn={this.setUserData}
                />} />
                <Route exact path='/reset' render={() => <PasswordResetRequest />}
                />
                <Route exact path='/signup/select' render={(routerProps) => <SignUpSelect
                  history={routerProps.history}
                  location={routerProps.location}
                />} />
                <Route exact path='/signup/terms' render={(routerProps) => <Terms
                  history={routerProps.history}
                  location={routerProps.location}
                />} />
                <Route exact path='/signup' render={(routerProps) => <SignUp
                  history={routerProps.history}
                  location={routerProps.location}
                />} />
                <Route exact path='/about-us' render={() => <AboutUs userData={this.state.userData} />} />
                <Route exact path='/editProfile' render={() => <EditProfile
                  userData={this.state.userData}
                  userId={this.state.userId}
                />} />
                <Route exact path='/boards' render={() => <BoardHome
                  userData={this.state.userData}
                />} />
                <Route exact path='/boards/:boardId' sensitive render={(routerProps) => <BoardPage
                  boardId={routerProps.match.params.boardId}
                  userData={this.state.userData}
                />} />
                <Route exact path='/boards/:boardId/:postId/edit' sensitive render={(routerProps) => <EditPost
                  boardId={routerProps.match.params.boardId}
                  postId={routerProps.match.params.postId}
                  userData={this.state.userData}
                />} />
                <Switch>
                  <Route exact path='/boards/:boardId/new' sensitive render={(routerProps) => <AddPost
                    boardId={routerProps.match.params.boardId}
                    userData={this.state.userData}
                  />} />
                  <Route exact path='/boards/:boardId/:postId' sensitive render={(routerProps) => <Post
                    history={routerProps.history}
                    location={routerProps.location}
                    match={routerProps.match}
                    userData={this.state.userData}
                    reloadFunction={this.reloadFunction}
                  />} />
                </Switch>
                <Route component={this.notFoundComponent} />
              </Switch>
            )
              :
              (
                <Switch>
                  <Route exact path='/' render={() => <Home
                    userData={this.state.userData}
                  />} />
                  <Route exact path='/home' render={() => <Home
                    userData={this.state.userData}
                  />} />
                  <Route exact path='/signin' render={(routerProps) => <SignIn
                    match={routerProps.match}
                    history={routerProps.history}
                    location={routerProps.location}
                    onSignIn={this.setUserData}
                  />} />
                  <Route exact path='/signup/select' render={(routerProps) => <SignUpSelect
                    history={routerProps.history}
                    location={routerProps.location}
                  />} />
                  <Route exact path='/signup/terms' render={(routerProps) => <Terms
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
                  <Route exact path='/about-us' render={() => <AboutUs userData={this.state.userData} />} />
                  <Route component={this.notFoundComponent} />
                  <Route exact path='/editProfile' render={() => <EditProfile
                    userData={this.state.userData}
                    userId={this.state.userId}
                  />} />

                  <Route exact path='/boards' render={() => <BoardHome
                    userData={this.state.userData}
                  />} />
                  <Route exact path='/boards/:boardId' sensitive render={(routerProps) => <BoardPage
                    boardId={routerProps.match.params.boardId}
                    userData={this.state.userData}
                  />} />
                  <Switch>
                    <Route exact path='/boards/:boardId/new' sensitive render={(routerProps) => <AddPost
                      boardId={routerProps.match.params.boardId}
                      userData={this.state.userData}
                    />} />
                    <Route exact path='/boards/:boardId/:postId' sensitive render={(routerProps) => <Post
                      history={routerProps.history}
                      location={routerProps.location}
                      match={routerProps.match}
                      userData={this.state.userData}
                      reloadFunction={this.reloadFunction}
                    />} />
                  </Switch>
                </Switch>
              )
            }
          </>
        </Switch>
      </Router>
    )
  };
};

export default AppRouter;