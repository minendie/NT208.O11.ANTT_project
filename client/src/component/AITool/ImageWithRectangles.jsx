import React, { useEffect, useRef } from "react";


// thank you anh Tony so much for supporting those lines of code 

const ImageWithRectangles = ({ imgSrc, bboxes }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load your image
    const img = new Image();
    img.src = imgSrc; // Replace with your image URL
    img.onload = () => {
      // set canvas size
      canvas.style.width = "100%";
      canvas.style.height = "50vh";
      canvas.height = canvas.offsetHeight;
      canvas.width = canvas.offsetWidth;

      // ratio between image and current canvas
      const imgRatio = canvas.height / img.height;

      // set display image size
      var imgHeight = img.height * imgRatio;
      var imgWidth = img.width * imgRatio;

      canvas.width = imgWidth;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

      // Loop through rectangles and draw them with labels
      bboxes.forEach((bbox) => {

        ctx.beginPath();
        ctx.rect(
                bbox.x * imgRatio, 
                bbox.y * imgRatio, 
                bbox.width * imgRatio, 
                bbox.height * imgRatio,
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.stroke();

        // Draw text label
        ctx.font = "11px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(bbox.label, bbox.x, bbox.y+10);

      }); // end drawing rectangles

    }; // end drawing on image
  }, []);

  return (
      <canvas ref={canvasRef}></canvas>
  );
};

export default ImageWithRectangles;
