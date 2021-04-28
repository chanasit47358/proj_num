import react, { useEffect, useState } from "react";
import { StaticMathField } from "react-mathquill";
import { InputNumber, Button, Card } from "antd";
import axios from "axios";
const math = require("mathjs");

function Lu() {
  const [inputA, setInputA] = useState([]);
  const [inputB, setInputB] = useState([]);
  const [column, setColumn] = useState(1);
  const [arrayA, setArrayA] = useState([]);
  const [arrayB, setArrayB] = useState([]);
  const [calcu, setCalcu] = useState([]);
  useEffect(() => {
    if (arrayA.length !== 0 && arrayB.length !== 0) {
      let A = math.sparse(arrayA);
      let t = math.usolve(
        math.slu(A, 1, 0.000001).U,
        math.lsolve(math.slu(A, 1, 0.000001).L, arrayB)
      );
      let x = t._data.map((v) => {
        return math.round(parseFloat(v), 6);
      });
      setCalcu(x);
    }
  }, [arrayA, arrayB]);

  async function cal() {
    let tempcol = [];
    for (let i = 0; i < column; i++) {
      let temprow = [];
      for (let j = 0; j < column; j++) {
        temprow.push(
          Number(document.getElementById("InputA" + i + " " + j).value)
        );
      }
      tempcol.push(temprow);
    }
    console.log(tempcol);
    await setArrayA(tempcol);
    tempcol = [];
    for (let i = 0; i < column; i++) {
      let temprow = [];
      temprow.push(Number(document.getElementById("InputB" + i).value));
      tempcol.push(temprow);
    }
    console.log(tempcol);
    await setArrayB(tempcol);
  }
  async function example() {
    let x = await axios({
      method: "get",
      url: `http://localhost:8080/lu?api_key=gwargurainaokayuaquaqulia`,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return undefined;
      });
    if (x !== undefined) {
      // await setColumn(x.col);
      console.log(column);
      await setInputA([]);
      await setInputB([]);
      await setArrayA([]);
      await setArrayB([]);
      await setCalcu([]);
      let tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempinput = [];
        for (let j = 0; j < x.col; j++) {
          tempinput.push(
            <InputNumber
              key={"InputA" + i + " " + j}
              id={"InputA" + i + " " + j}
              defaultValue={0}
            />
          );
        }
        tempdiv.push(<div key={"I:" + i}>{tempinput}</div>);
      }
      console.log(tempdiv);
      setInputA(tempdiv);
      tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempinput = [];
        tempinput.push(
          <InputNumber key={"InputB" + i} id={"InputB" + i} defaultValue={0} />
        );
        tempdiv.push(<div key={"II:" + i}>{tempinput}</div>);
      }
      setInputB(tempdiv);
      console.log(document.getElementById("InputA" + 0 + " " + 1).value);
      for (let i = 0; i < x.A.length; i++) {
        for (let j = 0; j < x.A[i].length; j++) {
          document.getElementById("InputA" + i + " " + j).value = x.A[i][
            j
          ].toString();
        }
        document.getElementById("InputB" + i).value = x.B[i][0].toString();
      }
      setColumn(x.col);
    }
  }
  async function create() {
    await setInputA([]);
    await setInputB([]);
    await setArrayA([]);
    await setArrayB([]);
    await setCalcu([]);
    let tempdiv = [];
    for (let i = 0; i < column; i++) {
      let tempinput = [];
      for (let j = 0; j < column; j++) {
        tempinput.push(
          <InputNumber
            key={"InputA" + i + " " + j}
            id={"InputA" + i + " " + j}
            defaultValue={0}
          />
        );
      }
      tempdiv.push(<div key={"I:" + i}>{tempinput}</div>);
    }
    console.log(tempdiv);
    setInputA(tempdiv);
    tempdiv = [];
    for (let i = 0; i < column; i++) {
      let tempinput = [];
      tempinput.push(
        <InputNumber key={"InputB" + i} id={"InputB" + i} defaultValue={0} />
      );
      tempdiv.push(<div key={"II:" + i}>{tempinput}</div>);
    }
    setInputB(tempdiv);
  }
  return (
    <react.Fragment>
      <h1>LU Decomposition</h1>
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
          />
          <Button type="primary" onClick={create}>
            SET METRIX
          </Button>
          <Button type="primary" onClick={example}>
            EXAMPLE
          </Button>
          {inputA.length !== 0 && inputB.length && (
            <div key="setMetrix">
              <h1>INPUT A</h1>
              {inputA}
              <h1>INPUT B</h1>
              {inputB}
              <br />
              <div>
                <Button type="primary" onClick={cal}>
                  CALCULATOR
                </Button>
              </div>
            </div>
          )}
        </div>
        <div>
          {calcu.length !== 0 && (
            <Card title="ANSWER" style={{ width: 300 }}>
              {calcu.map((v, i) => {
                return (
                  <p key={"TEXT:" + i}>
                    <StaticMathField>{`x_${i + 1}=${v}`}</StaticMathField>
                  </p>
                );
              })}
            </Card>
          )}
        </div>
      </div>
    </react.Fragment>
  );
}
export default Lu;
