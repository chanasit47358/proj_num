// import desmos from "desmos";
import react, { useState, useEffect } from "react";
import { InputNumber, Button, Card } from "antd";
import { StaticMathField } from "react-mathquill";

function Nd() {
  const [column, setColumn] = useState(0);
  const [columnInter, setColumnInter] = useState(2);
  const [inputX, setinputX] = useState([]);
  const [inputY, setinputY] = useState([]);
  const [inputDoubt, setinputDoubt] = useState(0);
  const [inputCount, setinputCount] = useState([]);
  const [ArrayX, setArrayX] = useState([]);
  const [ArrayY, setArrayY] = useState([]);
  const [show, setShow] = useState([]);
  console.log("ArrayX:" + ArrayX);
  console.log("ArrayY:" + ArrayY);

  useEffect(() => {
    if (ArrayX.length !== 0 && ArrayY.length !== 0) {
      var f = (i, j) => {
        if (arr[i][j] === undefined) {
          if (Math.abs(i - j) === 0) {
            arr[i][j] = y[0];
            return y[0];
          } else if (Math.abs(i - j) === 1) {
            arr[i][j] = (y[j] - y[i]) / (x[j] - x[i]);
            return arr[i][j];
          } else {
            arr[i][j] = (f(i + 1, j) - f(i, j - 1)) / (x[j] - x[i]);
            return arr[i][j];
          }
        } else {
          return arr[i][j];
        }
      };
      var arr = [];
      var x = [];
      var y = [];
      var xi = inputDoubt;
      for (let i = 0; i < columnInter; i++) {
        arr.push([]);
        x.push(
          ArrayX[Number(document.getElementById("inputCount" + i).value) - 1]
        );
        y.push(
          ArrayY[Number(document.getElementById("inputCount" + i).value) - 1]
        );
      }
      var sum = 0;
      for (let i = 0; i < columnInter; i++) {
        var temp = f(0, i);
        for (let j = 0; j < i; j++) {
          temp *= xi - x[j];
        }
        sum += temp;
      }
      console.log(arr);
      console.log(x);
      console.log(y);
      console.log(sum);
      setShow([
        <Card title="ANSWER" style={{ width: 300 }}>
          <StaticMathField>{`f\\left(${inputDoubt}\\right)=${sum}`}</StaticMathField>
        </Card>,
      ]);
    }
  }, [ArrayX, ArrayY, inputDoubt, columnInter]);
  async function cal() {
    await setArrayX([]);
    await setArrayY([]);
    let temp = [];
    for (let i = 0; i < column; i++) {
      temp.push(Number(document.getElementById("inputX" + i).value));
    }
    setArrayX(temp);
    temp = [];
    for (let i = 0; i < column; i++) {
      temp.push(Number(document.getElementById("inputY" + i).value));
    }
    setArrayY(temp);
  }
  async function createInterpo() {
    await setinputCount([]);
    let tempdiv = [];
    for (let i = 0; i < columnInter; i++) {
      let tempcol = [];
      tempcol.push(
        <InputNumber
          min={1}
          max={column}
          defaultValue={i + 1}
          key={"inputCount" + i}
          id={"inputCount" + i}
        />
      );
      tempdiv.push(<div key={"III" + i}>{tempcol}</div>);
    }
    setinputCount(tempdiv);
  }
  async function create() {
    await setinputX([]);
    await setinputY([]);
    await setArrayX([]);
    await setArrayY([]);
    await setColumnInter(2);
    await setinputDoubt(0);
    await setinputCount([]);
    await setShow([]);
    let tempdiv = [];
    for (let i = 0; i < column; i++) {
      let tempcol = [];
      tempcol.push(<InputNumber key={"inputX" + i} id={"inputX" + i} />);
      tempdiv.push(<div key={"I" + i}>{tempcol}</div>);
    }
    setinputX(tempdiv);
    tempdiv = [];
    for (let i = 0; i < column; i++) {
      let tempcol = [];
      tempcol.push(<InputNumber key={"inputY" + i} id={"inputY" + i} />);
      tempdiv.push(<div key={"II" + i}>{tempcol}</div>);
    }
    setinputY(tempdiv);
  }
  return (
    <react.Fragment>
      <h1>Newton Divided Difference</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div>
          <InputNumber
            min={0}
            value={column}
            onChange={(e) => {
              setColumn(e);
            }}
          ></InputNumber>
          <Button onClick={create}>SET</Button>
          {inputX.length !== 0 && inputY.length !== 0 && (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <h1>Input X</h1>
                  {inputX}
                </div>
                <div>
                  <h2>Input Y</h2>
                  {inputY}
                </div>
              </div>
              <h1>Input X want</h1>
              <InputNumber
                value={inputDoubt}
                onChange={(e) => {
                  setinputDoubt(e);
                  setArrayX([]);
                  setArrayY([]);
                  setShow([]);
                }}
              />
              <br />
              <br />
              <h1>INTERPOLATE</h1>
              <InputNumber
                min={2}
                max={column}
                value={columnInter}
                onChange={(e) => {
                  setColumnInter(e);
                  setArrayX([]);
                  setArrayY([]);
                  setShow([]);
                }}
              />
              <Button onClick={createInterpo}>SET</Button>
            </div>
          )}
          {inputCount.length !== 0 && (
            <div>
              <h1>POINT</h1>
              {inputCount}
              <Button onClick={cal}>CALCULATOR</Button>
            </div>
          )}
        </div>
        <div>{show.length !== 0 && show}</div>
      </div>
    </react.Fragment>
  );
}
export default Nd;
