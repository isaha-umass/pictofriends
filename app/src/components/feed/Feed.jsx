import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import "./Feed.css"

function Feed() {
    const [imageUrls, setImageUrls] = useState([]);
    const dateNow = new Date().toISOString().slice(0, 10);
    const imagesListRef = ref(storage, "images/"+dateNow);
    const navigate = useNavigate();

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                    });
                });
        });
    }, []);
    
    return (
        <div id = "feed">
            <div id = "logo">
             <img src = "logo.jpg" height="100px"></img>
            </div>
            <div>
                <button id = "drawBtn" onClick = {()=>navigate("/canvas")}> Draw 
                <img src='pencil.png' height = "20px"/>
             </button></div>
            {imageUrls.map((url) => {
                return <div><img class = "image" src={url} />
                </div>;
            })}
            
        </div>

    )
}

export default Feed