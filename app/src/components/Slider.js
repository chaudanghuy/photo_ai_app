import React from "react";

const Slider = ({ min, max, value, handleChange }) => {
  return (
    <>
      <input className="brightnessRange" type="range" min={min} max={max} value={value} onChange={handleChange} orient="vertical" />
    </>
  );
};

export default Slider;