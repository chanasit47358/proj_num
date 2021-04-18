import react, { useState, useEffect } from "react";
import { InputNumber, Button, Card } from "antd";
import { StaticMathField } from "react-mathquill";
import axios from "axios";
const { regression } = require("multiregress");
function Ml() {
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(1);
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
      var arr = ArrayX;
      var xi = [];
      for (let i = 0; i < row; i++) {
        xi.push(Number(document.getElementById("inputdoubt" + i).value));
      }
      for (let i = 0; i < column; i++) {
        arr[i].push(ArrayY[i]);
      }

      console.log(arr);
      console.log(regression(arr));
      arr = regression(arr);
      let sum = arr[0];
      for (let i = 1; i < arr.length; i++) {
        sum += xi[i - 1] * arr[i];
      }
      console.log(sum);
      setShow([
        <Card key={"cardI"} title="ANSWER" style={{ width: 300 }}>
          <StaticMathField
            key={"StaticI"}
          >{`f\\left(${xi}\\right)=${sum}`}</StaticMathField>
        </Card>,
      ]);
    }
  }, [ArrayX, ArrayY, column, row]);
  async function cal() {
    await setArrayX([]);
    await setArrayY([]);
    let temp = [];
    for (let i = 0; i < column; i++) {
      temp.push([]);
      for (let j = 0; j < row; j++) {
        temp[i].push(
          Number(document.getElementById("inputX" + i + " " + j).value)
        );
      }
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
      url: "http://localhost:8080/mlr",
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
        for (let j = 0; j < x.row; j++) {
          tempcol.push(
            <InputNumber
              key={"inputX" + i + " " + j}
              id={"inputX" + i + " " + j}
            />
          );
        }

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
      tempdiv = [];
      var tempcol = [];
      for (let i = 0; i < x.row; i++) {
        tempcol.push(
          <InputNumber key={"inputdoubt" + i} id={"inputdoubt" + i} />
        );
      }
      tempdiv.push(<div>{tempcol}</div>);
      setinputDoubt(tempdiv);
      for (let i = 0; i < x.col; i++) {
        for (let j = 0; j < x.row; j++) {
          document.getElementById("inputX" + i + " " + j).value = x.X[i][
            j
          ].toString();
        }
        document.getElementById("inputY" + i).value = x.Y[i].toString();
      }
      for (let i = 0; i < x.row; i++) {
        document.getElementById("inputdoubt" + i).value = x.Xi[i].toString();
      }
      setColumn(x.col);
      setRow(x.row);
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
      for (let j = 0; j < row; j++) {
        tempcol.push(
          <InputNumber
            key={"inputX" + i + " " + j}
            id={"inputX" + i + " " + j}
          />
        );
      }
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
    tempdiv = [];
    var tempcol = [];
    for (let i = 0; i < row; i++) {
      tempcol.push(
        <InputNumber key={"inputdoubt" + i} id={"inputdoubt" + i} />
      );
    }
    tempdiv.push(<div>{tempcol}</div>);
    setinputDoubt(tempdiv);
  }
  return (
    <react.Fragment>
      <h1>Polynomial Regression</h1>
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
          <InputNumber
            min={1}
            value={row}
            onChange={(e) => {
              setRow(e);
              setArrayX([]);
              setArrayY([]);
            }}
          ></InputNumber>
          <Button onClick={create}>SET</Button>
          <Button onClick={example}>EXAMPLE</Button>

          {inputX.length !== 0 &&
            inputY.length !== 0 &&
            inputDoubt.length !== 0 && (
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
                {inputDoubt}
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
export default Ml;
