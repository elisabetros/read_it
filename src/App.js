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
axios.defaults.withCredentials = true;


const App = () => {
 
  return (
    <div className="App">
      <Router>
        <nav>
          <li className="logo">READ IT</li>
          <li><NavLink exact to= "/" >Home</NavLink></li>
          <li><NavLink to= "/signup" >Signup</NavLink></li>
          <li><NavLink exact to= "/login" >Login</NavLink></li>
          <li><NavLink exact to= "/profile" >Profile</NavLink></li>
        </nav>
      
     
      <Switch>
        <Route exact path="/"
        component={() => <Search />}/>
        <Route path="/signup"  
        component={() => <Signup/>}/>
        <Route path="/login"  
        component={(props) => <Login {...props} />}/>
        <Route path="/profile"  
        component={() => <Profile />}/>
        
        
      </Switch>
    </Router>
    </div>
  );
}

export default App;
