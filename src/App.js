import React, { useState, useEffect } from "react";
import produce from "immer";
import "./App.css";

const random = (counter, setboard) => {
  setboard(
    Array.from({ length: counter }, () =>
      Array.from({ length: counter }, () => Math.floor(Math.random() * 1.5))
    )
  );
};
const createboard = (counter, board, setboard, setgrid) => {
  setgrid(produce(board, (draft) => {}));
  setTimeout(() => {
    setboard(
      Array.from({ length: counter }, () =>
        Array.from({ length: counter }, () => 0)
      )
    );
  }, 1000);
};
function App() {
  const [counter, setcounter] = useState(0);
  const [copy, setcopy] = useState(false);
  const [start, setstart] = useState(false);
  const [running, setrunning] = useState(false);
  const [stop, setstop] = useState(false);
  const [error, setError] = useState("Sorry! You clicked the wrong cell");
  const [board, setboard] = useState(
    Array.from({ length: counter }, () =>
      Array.from({ length: counter }, () => 0)
    )
  );
  const [tempgrid, setgrid] = useState(
    Array.from({ length: counter }, () =>
      Array.from({ length: counter }, () => 0)
    )
  );

  useEffect(() => {
    // console.log(running);
    random(counter, setboard);
    setcopy(true);
  }, [counter]);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty("--counter", counter);
  }, [counter]);

  useEffect(() => {
    if (copy) {
      setgrid(produce(board, (draft) => {}));
      setstart(true);
    }
  }, [copy]);

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        setboard(
          Array.from({ length: counter }, () =>
            Array.from({ length: counter }, () => 0)
          )
        );
        setcopy(false);
        setstart(false);
        setrunning(false);
      }, 3000);
    }
  }, [start]);

  return (
    <div className="App">
      <h1>Let's check your Memory</h1>
      <button
        onClick={() => {
          setcounter(3);
          setrunning(true);
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          setcounter(counter + 1);
          setrunning(true);
        }}
      >
        Next
      </button>

      <div className="playboard">
        {board.map((x, i) =>
          x.map((_, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell ${!!board[i][j]}`}
              onClick={() => {
                if (!running) {
                  console.log(running);
                  setboard(
                    produce(board, (draft) => {
                      draft[i][j] = draft[i][j] ^ 1;
                    })
                  );
                  if (tempgrid[i][j] === board[i][j]) {
                    setstop(true);
                  }
                }
              }}
            ></div>
          ))
        )}
      </div>
      <br />
      <div className="playboard">
        {tempgrid.map((x, i) =>
          x.map((_, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell ${!!tempgrid[i][j]}`}
              onClick={() => {
                setboard(
                  produce(tempgrid, (draft) => {
                    draft[i][j] = draft[i][j] ^ 1;
                  })
                );
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

/*Yet to be done

1. Creating a restart button which will appear when wrong cell is pressed and along with that it displays an error and tempgrid

2. functionality to make sure the present board is equall to tempgrid and user can move to the next level

3. As size of board increase the time laps betwenn reseting of grid must increase.

4. minimising the use of UseEffect look into useReducer
*/
