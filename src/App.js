import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, withRouter, Route, NavLink, Switch  } from 'react-router-dom';
import './App.css';

import Signup from './pages/Signup'
import Login from './pages/Login'
import Logout from './components/Logout'
import { ThemeProvider } from '@material-ui/core/styles' 
import theme from './components/theme'

// import apiCred from './config/api' 
import Profile from './pages/Profile';
import Search from './pages/Search';

import axios from 'axios'
import ReviewBook from './pages/ReviewBook';
import Reviews from './pages/Reviews';
import isAuthorized from './auth/isAuthorized';
import ForgotPassword from './pages/ForgotPassword';

axios.defaults.withCredentials = true;


const App = (props) => {
  const [ error, setError ] = useState()
  const [ notification, setNotification ] = useState()
  const [ isLoggedIn, setLoggedInStatus ] = useState(false)

  useEffect(() => {
    if(props.isAuthorized){
     setLoggedInStatus(true)
    }
  }, [props.isAuthorized])

  const clearError = () => {
    setTimeout(() => {
        setError()
    }, 3000)
}
  const handleAction = (newStatus) => {
    console.log(newStatus)
    setLoggedInStatus(newStatus)
}
 
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Router>
        <nav>
          <li className="logo">READ IT</li>
          <NavLink activeClassName="active" exact to= "/">Home</NavLink>
          <NavLink activeClassName="active" to= "/reviews">Reviews</NavLink>
          <NavLink activeClassName="active" to= "/signup">Sign up</NavLink>
          {!isLoggedIn? <NavLink activeClassName="active" to= "/login">Log in</NavLink>:null}
          {isLoggedIn? <NavLink activeClassName="active" to= "/profile">Profile</NavLink> :null}
          {isLoggedIn? <Logout onLogout={handleAction}/>: null}
        </nav>
      
     <main>
       {notification? notification: null}
       {error? error : null}
      <Switch>
        <Route exact path="/"
        component={() => <Search />}/>

        <Route path="/signup"  
        component={(props) => <Signup {...props}/>}/>

        <Route path="/login"  
        component={(props) => <Login {...props} onLogin={handleAction} />}/>

        <Route path="/profile"  
        component={() => <Profile />}/>

        <Route path="/reviews"  
        component={(props) => <Reviews {...props} />}/>

        <Route path="/reviewbook/:id"
        component={(props) => <ReviewBook {...props}  />} />
        
        <Route path="/forgotpassword"
        component={(props) => <ForgotPassword {...props}  />} />
        
        
      </Switch>
      </main>
    </Router>
    </ThemeProvider>
    </div>
  );
}

export default isAuthorized(App);
