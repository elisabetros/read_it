import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch  } from 'react-router-dom';
import './App.css';

import Signup from './pages/Signup'
import Login from './pages/Login'
// 


// import apiCred from './config/api' 
import Profile from './pages/Profile';
import Search from './pages/Search';

import axios from 'axios'
import ReviewBook from './pages/ReviewBook';
import Reviews from './pages/Reviews';

axios.defaults.withCredentials = true;


const App = () => {
 
  return (
    <div className="App">
      <Router>
        <nav>
          <li className="logo">READ IT</li>
          <li><NavLink exact to= "/">Home</NavLink></li>
          <li><NavLink to= "/signup">Signup</NavLink></li>
          <li><NavLink to= "/login">Login</NavLink></li>
          <li><NavLink to= "/profile">Profile</NavLink></li>
          <li><NavLink to= "/reviews">Reviews</NavLink></li>
        </nav>
      
     
      <Switch>
        <Route exact path="/"
        component={() => <Search />}/>

        <Route path="/signup"  
        component={(props) => <Signup {...props}/>}/>

        <Route path="/login"  
        component={(props) => <Login {...props} />}/>

        <Route path="/profile"  
        component={() => <Profile />}/>

        <Route path="/reviews"  
        component={(props) => <Reviews {...props} />}/>

        <Route path="/reviewbook/:id"
        component={(props) => <ReviewBook {...props}  />} />
        
        
      </Switch>
    </Router>
    </div>
  );
}

export default App;
