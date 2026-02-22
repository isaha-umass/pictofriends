//import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Canvas.css"
import { ReactSketchCanvas } from 'react-sketch-canvas';
// import ColorPicker, { useColor } from "react-color-palette";
import { useRef } from "react";

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};

function Canvas() {
   
    const canvasRef = useRef(null);

    const clearCanvas = () => {
        canvasRef.current.clearCanvas();
    };

    const exportDrawing = async () => {
        const dataURL = await canvasRef.current.exportImage('png');
        console.log(dataURL);
    };
    
    return (
        <div className = "Canvas">
        <h1>Draw here!</h1>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={exportDrawing}>Export as PNG</button>
        <ReactSketchCanvas
            style={styles}
            width="100%"
            height="400"
            strokeWidth={4}
            strokeColor="red"
        />
        </div>
    );
}

export default Canvas