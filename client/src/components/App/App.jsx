import React, { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import Books from '../Books/Books.jsx';
import Friends from '../Friends/Friends.jsx';
import Profile from '../Profile/Profile.jsx';
import Posts from '../Posts/Posts.jsx';
import Messages from '../Messages/Messages.jsx';
import Tinder from '../Tinder/Tinder.jsx';
import Home from '../Home/Home.jsx';
import ErrorPage from '../ErrorPage/ErrorPage.jsx';
import LogSwitch from '../Login/LogSwitch.jsx';
import Calls from '../ExamplePost/Calls.jsx';
import Root from '../Root/Root.jsx'
import './App.scss';

const view = 'home-page';

export default function App() {
  // the router determines which view to rendeer, if the user is logged in it displays the relevant pages, otherwise it displays a splash screen to log in
  const router = useCallback(() => {
    if (view === 'home-page') {
      return (
        <div className="main-container">
          <Navbar />
          <Trending />
        </div>
      );
    } else if (view === 'sign-up') {
      return <SignUp />
    }
  }, [view]);

  return (
    <>
      <Routes>
        <Route path='/' element={ null } />
        <Route path='*' element={ <Navbar /> } />
      </Routes>
      <Routes>
        <Route path='/'>
          <Route index element={ <Root /> } />
          <Route path='books' element={ <Books /> } />
          <Route path='home' element={ <Home /> } />
          <Route path='friends' element={ <Friends /> } />
          <Route path='posts' element={ <Posts />} />
          <Route path='messages' element={ <Messages /> } />
          <Route path='profile/:id' element={ <Profile /> } />
          <Route path='explore' element={ <Tinder /> } />
          <Route path='*' element={ <ErrorPage /> } />
        </Route>
      </Routes>
    </>
    </>
  );
}
