//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/registration/Registration';
import Canvas from './components/canvas/Canvas';
import Feed from './components/feed/Feed';
import Join from './components/join/Join';
import './App.css'
import { db } from '../firebase.js'
import { doc, collection, getDoc, getDocs, updateDoc } from 'firebase/firestore'

function makePairs (userList) {
  const museList = [...userList];
  const places = userList.length;
  let shiftCount = Math.floor(Math.random() * (places - 1)) + 1;
  while (shiftCount-- > 0) {
    for (let i = 0; i < places; i++) {
      museList.unshift(museList.pop());
    } // taken from stack overflow
  }
  const pairs = new Map();
  for (let i = 0; i < places; i++) {
    pairs.set(userList[i], museList[i]);
  }
  
 return pairs;
}

const dateRef = doc(db, "group", "1H76ouLO8hM3HjBbUM4l");
const dateNow = new Date().toISOString().slice(0, 10);

function App() {
  useEffect(()=>{
    getDoc(dateRef).then(async (date) => {
      if (date.date !== dateNow) {
        const usersRef = collection(db, "members");
        const users = await getDocs(usersRef);
        users.forEach(async (user) => {
          const userRef = doc(db, "members", user)
          const nextUser = await getDoc(userRef);
          let updateData = {submitted: false, submissions: []};
          if (!nextUser.submitted || nextUser.submissions.length > 0) {
            updateData.streak = 0;
          }
          await updateDoc(userRef, updateData);
        })

        // make matchings
          const groupsRef = collection(db, "group")
          const groups = await getDocs(groupsRef);
          groups.forEach((group) => {
            let match = makePairs(group.matchings);
            updateDoc(group, {matchings: match});
          })
      }
    }).catch((error) => {
      console.log(error);
    })
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Registration />} />
        <Route path="/canvas" element={<Canvas/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/join" element={<Join/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

