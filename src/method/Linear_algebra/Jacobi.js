import react, { useEffect, useState } from "react";
import { InputNumber, Button, Table } from "antd";
import axios from "axios";

const math = require("mathjs");

function Jacob() {
  const [column, setColumn] = useState(1);
  const [inputA, setInputA] = useState([]);
  const [inputB, setInputB] = useState([]);
  const [inputX, setInputX] = useState(1);
  const [arrayA, setArrayA] = useState([]);
  const [arrayB, setArrayB] = useState([]);
  const [arrayX, setArrayX] = useState([]);
  const [columndata, setColumndata] = useState([]);
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    if (arrayA.length !== 0 && arrayB.length !== 0 && arrayX.length !== 0) {
      var err = false;
      var temp;
      var x = [{ x: arrayX }];
      let count = 0;
      console.log(x);
      console.log(arrayB);
      while (!err) {
        temp = [[]];
        for (let i = 0; i < arrayA.length; i++) {
          var sum = 0;
          if (i !== 0) {
            temp.push([[]]);
          }
          for (let j = 0; j < arrayA[i].length; j++) {
            if (i !== j) {
              sum += arrayA[i][j] * x[count].x[j][0];
            }
          }
          temp[i][0] = (arrayB[i][0] - sum) / arrayA[i][i];
        }
        x.push({ x: temp });
        for (let i = 0; i < temp.length; i++) {
          err =
            math.abs((temp[i][0] - x[count].x[i][0]) / temp[i][0]) < 0.0000001;
          if (err === false) {
            break;
          }
        }
        count++;
        if (count === 4) {
          break;
        }
      }
      // let p ={};
      // p["x1"]=5;
      // console.log(p);
      console.log(x);
      let columntemp = [{}];
      columntemp[0] = {
        title: "Iteration",
        dataIndex: "Iteration",
        key: "Iteration",
      };
      for (let j = 0; j < x[0].x.length; j++) {
        columntemp[j + 1] = {
          title: `x${j + 1}`,
          dataIndex: `x${j + 1}`,
          key: `x${j + 1}`,
        };
      }
      let datatemp = [{}];
      for (let i = 0; i < x.length; i++) {
        datatemp[i] = {
          key: `${i + 1}`,
          Iteration: `${i}`,
        };
        for (let j = 0; j < x[i].x.length; j++) {
          datatemp[i] = { ...datatemp[i], ["x" + (j + 1)]: x[i].x[j][0] };
        }
      }
      // console.log(datatemp);
      // console.log(columntemp);
      setColumndata(columntemp);
      setdataSource(datatemp);
    }
  }, [arrayA, arrayB, arrayX]);

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
    await setArrayA(tempcol);
    tempcol = [];
    for (let i = 0; i < column; i++) {
      let temprow = [];
      temprow.push(Number(document.getElementById("InputB" + i).value));
      tempcol.push(temprow);
    }
    console.log(tempcol);
    await setArrayB(tempcol);
    tempcol = [];
    for (let i = 0; i < column; i++) {
      let temprow = [];
      temprow.push(Number(document.getElementById("InputX" + i).value));
      tempcol.push(temprow);
    }
    console.log(tempcol);
    await setArrayX(tempcol);
  }
  async function example() {
    let x = await axios({
      method: "get",
      url: `http://localhost:8080/jacobi?api_key=gwargurainaokayuaquaqulia`,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return undefined;
      });
    if (x !== undefined) {
      // await setColumn(x.col);
      await setInputA([]);
      await setInputB([]);
      await setInputX([]);
      await setArrayA([]);
      await setArrayB([]);
      await setArrayX([]);
      await setColumndata([]);
      await setdataSource([]);
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
      tempdiv = [];
      for (let i = 0; i < x.col; i++) {
        let tempinput = [];
        tempinput.push(
          <InputNumber key={"InputX" + i} id={"InputX" + i} defaultValue={0} />
        );
        tempdiv.push(<div key={"III:" + i}>{tempinput}</div>);
      }
      setInputX(tempdiv);
      for (let i = 0; i < x.A.length; i++) {
        for (let j = 0; j < x.A[i].length; j++) {
          document.getElementById("InputA" + i + " " + j).value = x.A[i][
            j
          ].toString();
        }
        document.getElementById("InputB" + i).value = x.B[i][0].toString();
        document.getElementById("InputX" + i).value = x.X[i][0].toString();
      }

      setColumn(x.col);
    }
  }
  async function create() {
    await setInputA([]);
    await setInputB([]);
    await setInputX([]);
    await setArrayA([]);
    await setArrayB([]);
    await setArrayX([]);
    await setColumndata([]);
    await setdataSource([]);
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
    tempdiv = [];
    for (let i = 0; i < column; i++) {
      let tempinput = [];
      tempinput.push(
        <InputNumber key={"InputX" + i} id={"InputX" + i} defaultValue={0} />
      );
      tempdiv.push(<div key={"III:" + i}>{tempinput}</div>);
    }
    setInputX(tempdiv);
  }
  return (
    <react.Fragment>
      <h1>Jacobi</h1>
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
              <h1>INPUT X</h1>
              {inputX}
              <div>
                <Button type="primary" onClick={cal}>
                  CALCULATOR
                </Button>
              </div>
            </div>
          )}
        </div>
        <div>
          {dataSource.length !== 0 && columndata.length !== 0 && (
            <Table
              dataSource={dataSource}
              columns={columndata}
              pagination={false}
            ></Table>
          )}
        </div>
      </div>
    </react.Fragment>
  );
}
export default Jacob;
