import react, { useState, useEffect } from "react";
import { InputNumber, Button, Card } from "antd";
import { StaticMathField } from "react-mathquill";
import regression from "regression";
import axios from "axios";
function Ln() {
  const [column, setColumn] = useState(0);
  const [inputX, setinputX] = useState([]);
  const [inputY, setinputY] = useState([]);
  const [inputDoubt, setinputDoubt] = useState(0);
  const [ArrayX, setArrayX] = useState([]);
  const [ArrayY, setArrayY] = useState([]);
  const [show, setShow] = useState([]);
  console.log("ArrayX:" + ArrayX);
  console.log("ArrayY:" + ArrayY);

  useEffect(() => {
    if (ArrayX.length !== 0 && ArrayY.length !== 0) {
      var arr = [];
      var xi = inputDoubt;
      for (let i = 0; i < column; i++) {
        arr.push([ArrayX[i], ArrayY[i]]);
      }
      console.log(arr);
      console.log(
        regression.linear(arr, {
          precision: 6,
        })
      );
      setShow([
        <Card title="ANSWER" style={{ width: 300 }}>
          <StaticMathField>{`f\\left(${inputDoubt}\\right)=${
            regression
              .linear(arr, {
                precision: 6,
              })
              .predict(xi)[1]
          }`}</StaticMathField>
        </Card>,
      ]);
    }
  }, [ArrayX, ArrayY, inputDoubt, column]);
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
  async function example() {
    let x = await axios({
      method: "get",
      url: "http://localhost:8080/lr",
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return undefined;
      });
    console.log(x);
    if (x !== undefined) {
      await setinputX([]);
      await setinputY([]);
      await setArrayX([]);
      await setArrayY([]);
      await setinputDoubt(0);
      await setShow([]);
      let tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempcol = [];
        tempcol.push(<InputNumber key={"inputX" + i} id={"inputX" + i} />);
        tempdiv.push(<div key={"I" + i}>{tempcol}</div>);
      }
      setinputX(tempdiv);
      tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempcol = [];
        tempcol.push(<InputNumber key={"inputY" + i} id={"inputY" + i} />);
        tempdiv.push(<div key={"II" + i}>{tempcol}</div>);
      }
      setinputY(tempdiv);
      for (let i = 0; i < x.col; i++) {
        document.getElementById("inputX" + i).value = x.X[i].toString();
        document.getElementById("inputY" + i).value = x.Y[i].toString();
      }
      setinputDoubt(x.Xi);
      setColumn(x.col);
    }
  }
  async function create() {
    await setinputX([]);
    await setinputY([]);
    await setArrayX([]);
    await setArrayY([]);
    await setinputDoubt(0);
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
      <h1>Linear Regression</h1>
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
          <Button onClick={example}>EXAMPLE</Button>

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
                }}
              />
              <br />
              <br />
              <Button onClick={cal}>CALCULATOR</Button>
            </div>
          )}
        </div>
        <div>{show.length !== 0 && show}</div>
      </div>
    </react.Fragment>
  );
}
export default Ln;
