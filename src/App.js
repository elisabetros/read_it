import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch  } from 'react-router-dom';
import './App.css';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './components/Logout';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

// import apiCred from './config/api' 
import theme from './components/theme';
import Profile from './pages/Profile';
import Search from './pages/Search';

import ReviewBook from './pages/ReviewBook';
import Reviews from './pages/Reviews';
import isAuthorized from './auth/isAuthorized';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import BookDetail from './pages/BookDetail';
import Error from './components/Error';
import Notification from './components/Notification';

axios.defaults.withCredentials = true;


const App = (props) => {
  const [ error, setError ] = useState()
  const [ notification, setNotification ] = useState()
  const [ isLoggedIn, setLoggedInStatus ] = useState(false)

  useEffect(() => {
    if(props.isAuthorized){
     setLoggedInStatus(true)
    }
  }, [props])

  const clearError = () => {
    setTimeout(() => {
        setError()
    }, 2500)
}
  const clearNotification = () => {
    setTimeout(() => {
      setNotification()
    },2500)
  }
  const handleAction = (newStatus) => {
    console.log(newStatus)
    setLoggedInStatus(newStatus)
}
  const handleError = (errorMsg) => {
    setError(errorMsg)
    clearError()
  }
  const handleNotification = (notificationMsg) =>{
    setNotification(notificationMsg)
    clearNotification()
  }
 
  return (
    <div className="App">
      <ThemeProvider theme={theme} >
      <Router>
        <nav>
          <li className="logo">READ IT</li>
          <NavLink activeClassName="active" exact to= "/">Home</NavLink>
          <NavLink activeClassName="active" to= "/reviews">Reviews</NavLink>
          <NavLink activeClassName="active" to= "/signup">Sign up</NavLink>
          {!isLoggedIn? <NavLink activeClassName="active" to= "/login">Log in</NavLink>:null}
          {isLoggedIn? <NavLink activeClassName="active" to= "/profile">Profile</NavLink> :null}
          {isLoggedIn? <Logout  onLogout={handleAction} onNotification={handleNotification} onError={handleError}/>: null}
        </nav>
      
     <main>
     <div className={error? 'show errorWrapper': 'errorWrapper'}>
            <Error error={error} />
        </div>
        <div className={notification? 'show notificationWrapper': 'notificationWrapper'}>
            <Notification notification={notification} />
        </div>
      <Switch>
        <Route exact path="/"
        component={() => <Search onError={handleError} onNotification={handleNotification} />}/>
       
        <Route exact path="/bookdetail/:id"
        component={() => <BookDetail {...props} onError={handleError} onNotification={handleNotification}/>}/>

        <Route path="/signup"  
        component={(props) => <Signup {...props} onError={handleError} onNotification={handleNotification}/>}/>

        <Route path="/login"  
        component={(props) => <Login {...props} onError={handleError} onLogin={handleAction}  onNotification={handleNotification} />}/>

        <Route path="/profile"  
        component={(props) => <Profile  {...props} onError={handleError} onNotification={handleNotification}/>}/>

        <Route path="/reviews"  
        component={(props) => <Reviews {...props} onError={handleError} onNotification={handleNotification} />}/>

        <Route path="/reviewbook/:id"
        component={(props) => <ReviewBook {...props} onError={handleError} onNotification={handleNotification} />} />
        
        <Route path="/forgotpassword"
        component={(props) => <ForgotPassword {...props} onError={handleError} onNotification={handleNotification} />} />

        <Route path="/resetpassword/:token"
        component={(props) => <ResetPassword {...props} onError={handleError} onNotification={handleNotification}  />} />
        
        
      </Switch>
      </main>
    </Router>
    </ThemeProvider>
    </div>
  );
}

export default isAuthorized(App);
