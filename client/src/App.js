import React, { useState, useEffect, useContext } from 'react';
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

import Notification from './components/Notification1';
// import Error from './components/Error';

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
          <NavLink activeClassName="active" exact to= "/read_it">Home</NavLink>
          <NavLink activeClassName="active" to= "/read_it/reviews">Reviews</NavLink>
          <NavLink activeClassName="active" to= "/read_it/signup">Sign up</NavLink>
          {!isLoggedIn? <NavLink activeClassName="active" to= "/read_it/login">Log in</NavLink>:null}
          {isLoggedIn? <NavLink activeClassName="active" to= "/read_it/profile">Profile</NavLink> :null}
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
        <Route exact path="/read_it/"
        component={() => <Search onError={handleError} onNotification={handleNotification} />}/>
       
        <Route exact path="/read_it/bookdetail/:id"
        component={() => <BookDetail {...props} onError={handleError} onNotification={handleNotification}/>}/>

        <Route path="/read_it/signup"  
        component={(props) => <Signup {...props} onError={handleError} onNotification={handleNotification}/>}/>

        <Route path="/read_it/login"  
        component={(props) => <Login {...props} onError={handleError} onLogin={handleAction}  onNotification={handleNotification} />}/>

        <Route path="/read_it/profile"  
        component={(props) => <Profile  {...props} onError={handleError} onNotification={handleNotification}/>}/>

        <Route path="/read_it/reviews"  
        component={(props) => <Reviews {...props} onError={handleError} onNotification={handleNotification} />}/>

        <Route path="/read_it/reviewbook/:id"
        component={(props) => <ReviewBook {...props} onError={handleError} onNotification={handleNotification} />} />
        
        <Route path="/read_it/forgotpassword"
        component={(props) => <ForgotPassword {...props} onError={handleError} onNotification={handleNotification} />} />

        <Route path="/read_it/resetpassword/:token"
        component={(props) => <ResetPassword {...props} onError={handleError} onNotification={handleNotification}  />} />
        
        
      </Switch>
      </main>
    </Router>
    </ThemeProvider>
    </div>
  );
}

export default isAuthorized(App);
