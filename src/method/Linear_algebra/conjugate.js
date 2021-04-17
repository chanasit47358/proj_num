import react, { useEffect, useState } from "react";
import { InputNumber, Button, Table } from "antd";
import axios from "axios";
const math = require("mathjs");

function Conju() {
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
      var err = Infinity;
      var a = math.matrix(arrayA);
      var b = math.matrix(arrayB);
      var x = math.matrix(arrayX);
      var r = math.subtract(math.multiply(a, x), b);
      var d = math.multiply(r, -1);
      // let p ={};
      var Arraytemp = [{ x: arrayX }];
      var count = 0;
      while (err > 0.00001) {
        var lamb = math.multiply(
          math.divide(
            math.multiply(math.transpose(d), r),
            math.multiply(math.multiply(math.transpose(d), a), d)
          ),
          -1
        );
        x = math.add(x, math.multiply(d, lamb));
        r = math.subtract(math.multiply(a, x), b);
        err = math.subset(
          math.sqrt(math.multiply(math.transpose(r), r)),
          math.index(0, 0)
        );
        if (err === 0) {
          break;
        }
        Arraytemp.push({ x: x._data });
        var alpha = math.divide(
          math.multiply(math.multiply(math.transpose(r), a), d),
          math.multiply(math.multiply(math.transpose(d), a), d)
        );
        d = math.add(math.multiply(r, -1), math.multiply(d, alpha));
        if (count > 4) {
          break;
        }
        count++;
      }
      console.log(x);
      console.log(Arraytemp);
      // p["x1"]=5;
      // console.log(p);
      // console.log(ArrrayX);
      let columntemp = [{}];
      columntemp[0] = {
        title: "Iteration",
        dataIndex: "Iteration",
        key: "Iteration",
      };
      for (let j = 0; j < Arraytemp[0].x.length; j++) {
        columntemp[j + 1] = {
          title: `x${j + 1}`,
          dataIndex: `x${j + 1}`,
          key: `x${j + 1}`,
        };
      }
      console.log(columntemp);
      let datatemp = [{}];
      for (let i = 0; i < Arraytemp.length; i++) {
        datatemp[i] = {
          key: `${i + 1}`,
          Iteration: `${i}`,
        };
        for (let j = 0; j < Arraytemp[i].x.length; j++) {
          datatemp[i] = {
            ...datatemp[i],
            ["x" + (j + 1)]: Arraytemp[i].x[j][0],
          };
        }
      }
      console.log(datatemp);
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
      url: `http://localhost:8080/conjugate`,
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
      <h1>Conjugate Gradient </h1>
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
export default Conju;
