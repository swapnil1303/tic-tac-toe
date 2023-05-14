import './App.css';
import React,{useState} from 'react';
import { Board } from './components/Board';
import { Scoreboard } from './components/Scoreboard';
function App() {
  const win_cond=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  const [board,setBoard]=useState(Array(9).fill(null));
  const [xPlaying,setXplaying]=useState(true);
  const [scores,setScores]=useState({xScore:0,oScore:0});
  // const [gameOver,setgameOver]=useState(false);
  const handleBoxClick=(boxIdx)=>{
    const updateBoard=board.map((value,idx)=>{
      if(idx===boxIdx){
        return xPlaying===true?"X":"O";
      }
      else {
        return value;
      }
    })
    setBoard(updateBoard);
    setXplaying(!xPlaying);
    const winner=checkWinner(updateBoard);
    if(winner){
      if(winner==="O"){
        let {oScore}=scores;
        oScore+=1;
        setScores({...scores,oScore});
      }
      else{
        let {xScore}=scores;
        xScore+=1;
        setScores({...scores,xScore});
      }
    }
    // console.log(scores);
  }
  const checkWinner=(board)=>{
    for(let i=0;i<8;i++){
      const [x,y,z]=win_cond[i];
      if(board[x]!==null&&board[x]===board[y]&&board[y]===board[z]) {
        console.log(board[x]);
        setBoard(Array(9).fill(null));
        // setXplaying(true);
        return board[x];
      }
    }
    return false;
  }
  const resetBoard=()=>{
    // setgameOver(false);
    setBoard(Array(9).fill(null));
    let {xScore,oScore}=scores;
    xScore=0;
    oScore=0;
    setScores({xScore,oScore});
    setXplaying(true);
  }
  return (
    <div className="App">
      <Scoreboard scores={scores} xPlaying={xPlaying}/>
      <Board board={board} onClick={handleBoxClick}/>
      <button type="button" className="btn btn-primary tbtn" onClick={resetBoard}>Reset Game</button>
    </div>
  );
}

export default App;
