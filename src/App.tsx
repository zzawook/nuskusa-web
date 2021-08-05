import React from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { authService, dbService } from './utils/firebaseFunctions';

type UserState = {
  username: string,
  isVerified: boolean,
  role: string
}

class App extends React.Component<{}, UserState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      isVerified: false,
      role: 'User', // User, Undergraduate, Graduate, Admin
    }
  }
  render() {
    const user = authService.currentUser
    if (user) {
      dbService
        .collection('users').doc(user.email as string)
        .onSnapshot((querySnapshot) => {
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
    return (
      <>
        <AppRouter username={this.state.username} isVerified={this.state.isVerified} role={this.state.role} />
      </>
    )
  }
}

export default App;
