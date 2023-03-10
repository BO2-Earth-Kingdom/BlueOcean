import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './Profile.scss';
import axios from 'axios';
import moment from 'moment';
import { useUserStore } from "../Store/store.js";
// Don't change this <main> wrapper, this tag is used in App.scss
export default function Profile () {
  const {id} = useParams();
  const [userData, setUserData] = useState();
  const [posts, setPosts] = useState();
  const curId = useUserStore((state) => state.curId);
  // if (!curId) return (
  //   <div>Loading</div>
  // )



  useEffect(() => {
    if (curId) {
      axios.get(`http://localhost:3000/api/profile/bio/${curId}`)
        .then(res => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err)
        });

      axios.get(`http://localhost:3000/api/profile/posts/${curId}`)
        .then(res => {
          setPosts(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [curId]);


  let allBooks = userData ? userData.userBooks : [{cover_image: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'}, {cover_image: 'https://plus.unsplash.com/premium_photo-1668790939920-f5f0a5c34b21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=711&q=80'}, {cover_image: 'https://images.unsplash.com/photo-1601027847350-0285867c31f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'}];

  let allGenres = userData ? userData.userGenres : [{genre: '?'}, {genre: '?'}, {genre: '?'}];

  const [shuffledBooks, setShuffledBooks] = useState(allBooks);
  const [shuffledGenres, setShuffledGenres] = useState(allGenres);

  const shuffleArray = function (array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const showBooks = () => {
    const shuffled = shuffleArray(allBooks);
    setShuffledBooks(shuffled.slice(0, 3));
  };

  const showGenres = () => {
    const shuffled = shuffleArray(allGenres);
    setShuffledGenres(shuffled.slice(0, 3));
  }



  if (userData && posts) {
    return (
      <main className="profile-page-container">


        <div className="profile-post-container">
          {posts ? posts.map((post, index) => (
            <div className="profile-post" key={index}>
              <div>{post.user}</div>
              <p>{post.body}</p>
              <p>Created {moment(post.last_created).fromNow()}</p>
              <p>Last updated {moment(post.last_updated).fromNow()}</p>
            </div>
          )) : null}
        </div>


        <div className="profile-bio-container">
          <div className="profile-page-name">{userData.user.bio.name}</div>
          <div className="profile-page-username">@{userData.user.username}</div>
          <img src={userData.user.avator} alt="Profile" className="profile-page-avatar" />
          <div className="age">Age: {userData.user.bio.age}</div>
          <div className="gender">Gender: {userData.user.bio.gender}</div>
          <div>
            <div className="profile-title">Saved Books</div>
            <div className="profile-page-books-container">
              {shuffledBooks.slice(0,3).map((book, index) => (
                <img src={book.cover_image} alt="Book" key={index} className="profile-page-books"/>
              ))}
            </div>
            <button className="profile-seemore" onClick={showBooks}>See Some Books</button>
          </div>

          <div>
            <div className="profile-title">Liked Genres</div>
            <div className="profile-page-genres-container">
              {shuffledGenres.slice(0,3).map((genre, index) => (
                    <p className="profile-liked-genres" key={index}>{genre.genre}</p>
              ))}
            </div>
            <button className="profile-seemore" onClick={showGenres}>See Some Genres</button>
          </div>

          <div className="profile-page-interests-container">
            <div>Interests: </div>
            <div className="profile-page-interests">
              <div className="profile-page-interest">{userData.user.bio.interest ? userData.user.bio.interest.map((interest, index) => (
                  <p key={index}>{interest}</p>
                )) :null}</div>
            </div>

              {/* {interests ? interests.map((interest, index) => (
                <p key={index}>{interest}</p>
              )) : null} */}
          </div>
        </div>


      </main>
    );
  } else {
    return (
      <div>
        Please come back later!
      </div>
    )
  }

}