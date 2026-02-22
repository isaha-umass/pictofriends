import { Link } from 'react-router-dom'
import "./Join.css"
import { doc, updateDoc, arrayUnion, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

function Join() {
    const [group, setGroup] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const joinLogic = async (groupId, userName) => {
        await addDoc(collection(db, "members"), {
            user: userName,
            groupid: groupId,
            userid: "testid"
        });

        const docRef = doc(db, "groups", groupId);
        await updateDoc(docRef, {
        users: arrayUnion("testid")
        });

        navigate("/feed");
    };

    const createUser = async (e) => {
        e.preventDefault(); 
        try {
        await joinLogic(group, user);
        } catch (error) {
        console.error("Join Error:", error);
        }
    };

    const createGroup = async (e) => {
        e.preventDefault();
        try {
        const groupDoc = await addDoc(collection(db, "groups"), {
            users: [],
            matchings: []
        });
        
        await joinLogic(groupDoc.id, user);
        } catch (error) {
        console.error("Create Group Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label for="displayname">Enter Display Name:</label>
                <input type = "text" id = "displayname" value = {user}
                onChange = {(e)=>setUser(e.target.value)} placeholder='johnnyapplesmith'></input>

                <label for="group">Enter Group Id:</label>
                <input type = "text" id = "group" value = {group}
                onChange = {(e)=>setGroup(e.target.value)} placeholder="Long string..."></input>

                <button id = "create-group" onClick = {createGroup}> Create New Group </button>
            
                <button type = "submit" onClick = {createUser}> Join </button>
            </form>
        </div>
    )

}

export default Join