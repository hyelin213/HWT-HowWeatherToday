import React from 'react';

export default function ColorChange({temp}) {

  let backgroundColor = "#3C3C3C"; // 초기 배경 색상

  if (temp >= 30) {
    backgroundColor = "red";
  } else if (temp >= 10) {
    backgroundColor = "orange";
  } else {
    backgroundColor = "skyblue";
  }

  return (
      <div className="bg-color" style={{ backgroundColor }}></div>
  )
}