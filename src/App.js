import React from "react";
import "./App.css";

let optionEles = document.getElementsByClassName("optionlist");
let qcount = 0;
let win = 0;
let submitClicked=false;
let list = [
  {
    question: "Who is the deputy cm of andhra pradhesh?",
    options: ["Mahesh babu", "Pawan Kalyan", "Ram Charan", "Allu Arjun"],
    correct: 1,
    clicked: -1,
  },
  {
    question: "Who won the chess world champianship this year?",
    options: [
      "Magnus Carlsen",
      "Vidit Gujarati",
      "Viswanadh anandh",
      "Gukesh Domaraju",
    ],
    correct: 3,
    clicked: -1,
  },
  {
    question: "Who is the 'Missle man of India'?",
    options: ["Abdul Kalam", "Narendra Modi", "Rahul Gandhi", "Amit Shah"],
    correct: 0,
    clicked: -1,
  },
  {
    question: "Who is the PM of India?",
    options: ["Pawan Kalyan", "Narendra Modi", "Revanth Reddy", "K.A Paul"],
    correct: 1,
    clicked: -1,
  },
  {
    question: "Highest Civilian award in India?",
    options: ["Padma Shri", "Padma Vibhushan", "Padma Bhushan", "Bharat Ratna"],
    correct: 3,
    clicked: -1,
  },
  {
    question: "How many tigers are there in India?",
    options: ["3,167", "10000", "10", "100"],
    correct: 0,
    clicked: -1,
  },
  {
    question: "Who was the first Asian to win the Nobel Prize?",
    options: [
      "Rabindranath Tagore",
      "Narendra Modi",
      "Rahul Gandhi",
      "MS Dhoni",
    ],
    correct: 0,
    clicked: -1,
  },
  {
    question: "Who is known as 'Master Blaster' in cricket?",
    options: ["Virat Kohli", "MS Dhoni", "Sachin Tendulkar", "Rahul Dravid"],
    correct: 2,
    clicked: -1,
  },
  {
    question: "Capital of Andhra Pradhesh?",
    options: ["Guntur", "Vizag", "Amaravati", "Vijayawada"],
    correct: 2,
    clicked: -1,
  },
  {
    question: "Which of the following is not border country of India?",
    options: ["Singapore", "Nepal", "Myanmar", "Bangladesh"],
    correct: 0,
    clicked: -1,
  },
];

function App() {
  //states
  const [ques, setQues] = React.useState(list[0].question);
  const [op, setOp] = React.useState(list[0].options);
  function Result() {
    if(submitClicked)return;
    submitClicked=true;
    let rdiv=document.createElement("div");
    rdiv.className="resultdiv";
    let h1=document.createElement("h1");
    h1.innerText=win+"/10";
    let can=document.createElement("canvas");
    can.className="can";
    can.height=400;
    can.width=500;
    rdiv.appendChild(h1);
    rdiv.appendChild(can);
    let context=can.getContext("2d");
    context.beginPath();
    context.arc(250,200,150,0,Math.PI*2,false);
    context.stroke();
    context.beginPath();
    context.arc(250,200,100,0,Math.PI*2,false);
    context.stroke();
    context.beginPath();
    context.arc(250,200,125,0,(win*36)*(Math.PI/180),false);
    context.lineWidth=40;
    if(win<4)context.strokeStyle="red";
    else if(win<7)context.strokeStyle="yellow";
    else context.strokeStyle="green";
    context.stroke();
    
    document.getElementById("main").appendChild(rdiv);
  }

  function check(index) {
    let b = optionEles[index];
    if (list[qcount].clicked > -1) return;
    list[qcount].clicked = index;
    if (list[qcount].correct === index) win++;
    changingColor(b);
  }
  function changingColor(b) {
    if (list[qcount].correct === list[qcount].clicked)
      b.style.backgroundColor = "green";
    else b.style.backgroundColor = "red";
  }
  function Increase() {
    if (qcount < list.length - 1) {
      qcount++;
      setQues(list[qcount].question);
      setOp(list[qcount].options);
      for (let oe of optionEles)
        oe.style.backgroundColor = "rgba(245, 249, 251, 0.84)";
      if (list[qcount].clicked > -1)
        changingColor(optionEles[list[qcount].clicked]);
    }
  }
  function Decrease() {
    if (qcount > 0) {
      qcount--;
      setQues(list[qcount].question);
      setOp(list[qcount].options);
      for (let oe of optionEles)
        oe.style.backgroundColor = "rgba(245, 249, 251, 0.84)";
      if (list[qcount].clicked > -1)
        changingColor(optionEles[list[qcount].clicked]);
    }
  }
  return (
    <div id="main">
      <div id="frame">
        <div id="questionframe">
          <h2>{ques}</h2>
        </div>
        {op.map((x, index) => (
          <button
            className="optionlist"
            key={index}
            onClick={() => check(parseInt(index))}
          >
            {x}
          </button>
        ))}
        <div id="buttonsframe">
          <button onClick={Decrease}> previous</button>
          <button onClick={Increase}>next</button>
          <button onClick={Result}>submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
