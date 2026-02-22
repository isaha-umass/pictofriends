//import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Canvas.css"
import { ReactSketchCanvas } from 'react-sketch-canvas';
// import ColorPicker, { useColor } from "react-color-palette";
import { useRef } from "react";
import { storage } from '../../../firebase';
import { v4 } from 'uuid';
import { ref, uploadBytes } from 'firebase/storage';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};

function Canvas() {
   
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
                const imageRef = ref(storage, "images/" + Date.now()+"/" + v4()+".png")
                await uploadBytes(imageRef, blob);
                console.log("uploaded")
            }
        } catch (error) {
            console.log(error)
        }
        
    };
    
    return (
        <div className = "Canvas">
        <h1>Ready, set, draw!</h1>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={exportDrawing}>Save</button>
        <ReactSketchCanvas
            ref={canvasRef} 
            style={styles}
            width="100%"
            height="4500"
            strokeWidth={4}
            strokeColor="black"
        />
        </div>
    );
}

export default Canvas