//import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactSketchCanvas } from 'react-sketch-canvas';
// import ColorPicker, { useColor } from "react-color-palette";
import { useRef, useState } from "react";
import { storage } from '../../../firebase';
import { v4 } from 'uuid';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import "./Canvas.css"

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};

function Canvas() {
    const [strokeColor, setStrokeColor] = useState("black")
    const [strokeWidth, setStrokeWidth] = useState(4)
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    const clearCanvas = () => {
        canvasRef.current.clearCanvas();
    };

    const exportDrawing = async (e) => {
        try {
            if (canvasRef.current) {
                const dataUrl = await canvasRef.current.exportImage("png");
                const response = await fetch(dataUrl);
                const blob = await response.blob();
                const dateNow = new Date().toISOString().slice(0, 10);
                const imageRef = ref(storage, "images/" + dateNow+"/" + v4()+".png")
                await uploadBytes(imageRef, blob);
                alert("uploaded")
                navigate("/feed")
            }
        } catch (error) {
            console.log(error)
        }
        
    };
    
    return (
        <div className = "Canvas">
            <h1>Ready, set, draw!</h1>
            <ReactSketchCanvas
                ref={canvasRef} 
                style={styles}
                width="100%"
                height="400"
                strokeWidth={strokeWidth}
                strokeColor={strokeColor}
            />
            <div>
                <button class = "canvasBtn" onClick={clearCanvas}>Clear</button>
                <button class = "canvasBtn" onClick={exportDrawing}>Save</button>
                <button class = "canvasBtn" onClick={()=>setStrokeColor("white")}>
                    <img src="eraser.png" alt="eraser" height="40px"/>
                </button>
                <button class = "canvasBtn" onClick={()=>setStrokeColor("black")}>
                    <img src="pencil.png" alt="pencil" height="40px"/>
                </button>
            </div>
            <div>
                <button class = "canvasBtn" onClick={()=>setStrokeWidth(2)}>Small</button>
                <button class = "canvasBtn" onClick={()=>setStrokeWidth(5)}>Medium</button>
                <button class = "canvasBtn" onClick={()=>setStrokeWidth(10)}>Big</button>
            </div>

        </div>
    );
}

export default Canvas