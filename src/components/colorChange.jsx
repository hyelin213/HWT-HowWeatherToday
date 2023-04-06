import React from 'react';

export default function ColorChange({temp}) {

  let backgroundColor = "#3C3C3C"; // 초기 배경 색상

  if (temp >= 28) {
    backgroundColor = "#F08266";
  } else if (temp >= 24 && temp <= 27) {
    backgroundColor = "#F18751";
  } else if (temp >= 20 && temp <= 23) {
    backgroundColor = "#F49A40";
  } else if (temp >= 11 && temp <= 19) {
    backgroundColor = "#FBBA42";
  } else if (temp >= 6 && temp <= 10) {
    backgroundColor = "#A6D5C2";
  } else if (temp >= 0 && temp <= 5) {
    backgroundColor = "#88D0ED";
  } else {
    backgroundColor = "#5DA1D8";
  }

  return (
      <div className="bg-color" style={{ backgroundColor }}></div>
  )
}