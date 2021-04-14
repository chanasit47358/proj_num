import react, { useEffect, useState } from "react";
import { InputNumber, Button, Table } from "antd";
const math = require("mathjs");
function Gausssei() {
  const [row, setRow] = useState(1);
  const [column, setColumn] = useState(1);
  const [array, setArray] = useState([]);
  const [input, setinput] = useState([]);
  const [change, setChange] = useState(false);
  const [arrayB, setArrayB] = useState([]);
  const [inputB, setinputB] = useState([]);
  const [changeB, setChangeB] = useState(false);
  const [arrayX, setArrayX] = useState([]);
  const [inputX, setinputX] = useState([]);
  const [changeX, setChangeX] = useState(false);
  const [columndata, setColumndata] = useState([]);
  const [dataSource, setdataSource] = useState([]);

  console.log("arrayA:" + array);
  console.log("arrayB:" + arrayB);
  console.log("arrayX:" + arrayX);
  useEffect(() => {
    setinput(() => {
      let k = array.map((value, i) => {
        let temp = value.map((value1, j) => {
          return (
            <InputNumber
              key={"b" + i + " " + j}
              value={value1}
              onChange={(valuetemp) => {
                setArray((temparray) => {
                  temparray[i][j] = valuetemp;
                  return temparray;
                });
                setChange(!change);
              }}
            />
          );
        });
        return <div key={"a" + i}>{temp}</div>;
      });
      return k;
    });
    return () => {
      setinput([]);
    };
  }, [array, change]);
  useEffect(() => {
    setinputB(() => {
      let k = arrayB.map((value, i) => {
        let temp = value.map((value1, j) => {
          return (
            <InputNumber
              key={"bb" + i + " " + j}
              value={value1}
              onChange={(valuetemp) => {
                setArrayB((temparray) => {
                  temparray[i][j] = valuetemp;
                  return temparray;
                });
                setChangeB(!changeB);
              }}
            />
          );
        });
        return <div key={"aa" + i}>{temp}</div>;
      });
      return k;
    });
    return () => {
      setinputB([]);
    };
  }, [arrayB, changeB]);
  useEffect(() => {
    setinputX(() => {
      let k = arrayX.map((value, i) => {
        let temp = value.map((value1, j) => {
          return (
            <InputNumber
              key={"bb" + i + " " + j}
              value={value1}
              onChange={(valuetemp) => {
                setArrayX((temparray) => {
                  temparray[i][j] = valuetemp;
                  return temparray;
                });
                setChangeX(!changeX);
              }}
            />
          );
        });
        return <div key={"aa" + i}>{temp}</div>;
      });
      return k;
    });
    return () => {
      setinputX([]);
    };
  }, [arrayX, changeX]);
  function cal() {
    var err = false;
    var temp;
    var x = [{ x: arrayX }];
    let count = 0;
    console.log(x);
    console.log(arrayB);
    while (!err) {
      temp = [[]];
      for(let j = 0; j < array.length-1;j++){
          temp.push([]);
      }
    //   console.log(temp);
      for (let i = 0; i < array.length; i++) {
        var sum = 0;
        
        for (let j = 0; j < array[i].length; j++) {
          if (i !== j) {
              console.log(temp[j][0]!==undefined);
              if(temp[j][0]!==undefined){
                sum += (array[i][j] * temp[j][0]);
                console.log("pass else:");
              }else{
                sum += (array[i][j] * x[count].x[j][0]);
                console.log("pass else:");
              }
          }
        }
        temp[i][0] = (arrayB[i][0] - sum) / array[i][i];
        console.log("i"+i+": "+temp[i][0]);
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
    for(let j=0;j<x[0].x.length;j++){
      columntemp[(j+1)] = {
        title: `x${j+1}`,
        dataIndex:`x${j+1}`,
        key:`x${j+1}`,
      };
    }
    let datatemp =[{}];
    for (let i = 0; i < x.length; i++) {
      datatemp[i]={
        key:`${i+1}`,
        Iteration:`${i}`
      }
      for (let j = 0; j < x[i].x.length; j++) {
        datatemp[i]={...datatemp[i],["x"+(j+1)]:x[i].x[j][0]}
      }
    }
    // console.log(datatemp);
    // console.log(columntemp);
    setColumndata(columntemp);
    setdataSource(datatemp);
  }
  function create() {
    setArray(() => {
      var temp = [];
      for (let i = 0; i < column; i++) {
        temp.push([]);
        for (let j = 0; j < row; j++) {
          temp[i].push(0);
        }
      }
      return temp;
    });
    setinput(() => {
      let k = array.map((value, i) => {
        let temp = value.map((value1, j) => {
          return (
            <InputNumber
              key={"b" + i + " " + j}
              value={value1}
              onChange={(valuetemp) => {
                setArray((temparray) => {
                  temparray[i][j] = valuetemp;
                  return temparray;
                });
              }}
            />
          );
        });
        return <div key={"a" + i}>{temp}</div>;
      });
      return k;
    });
    setArrayB(() => {
      var temp = [];
      for (let i = 0; i < column; i++) {
        temp.push([]);
        temp[i].push(0);
      }
      return temp;
    });
    setinputB(() => {
      let k = arrayB.map((value, i) => {
        let temp = value.map((value1, j) => {
          return (
            <InputNumber
              key={"bb" + i + " " + j}
              value={value1}
              onChange={(valuetemp) => {
                setArrayB((temparray) => {
                  temparray[i][j] = valuetemp;
                  return temparray;
                });
                setChangeB(!changeB);
              }}
            />
          );
        });
        return <div key={"aa" + i}>{temp}</div>;
      });
      return k;
    });
    setArrayX(() => {
      var temp = [];
      for (let i = 0; i < column; i++) {
        temp.push([]);
        temp[i].push(0);
      }
      return temp;
    });
    setinputX(() => {
      let k = arrayX.map((value, i) => {
        let temp = value.map((value1, j) => {
          return (
            <InputNumber
              key={"bb" + i + " " + j}
              value={value1}
              onChange={(valuetemp) => {
                setArrayX((temparray) => {
                  temparray[i][j] = valuetemp;
                  return temparray;
                });
              }}
            />
          );
        });
        return <div key={"aa" + i}>{temp}</div>;
      });
      return k;
    });
  }
  function clear() {
    setArray([]);
    setinput([]);
    setArrayB([]);
    setinputB([]);
    setColumndata([]);
    setdataSource([]);
  }
  return (
    <react.Fragment>
      <InputNumber
        min={1}
        value={column}
        onChange={(e) => {
          setColumn(e);
        }}
      />
      <InputNumber
        min={1}
        value={row}
        onChange={(e) => {
          setRow(e);
        }}
      />
      {array.length === 0 && (
        <Button type="primary" onClick={create}>
          SET METRIX
        </Button>
      )}
      {array.length !== 0 && (
        <div key="setMetrix">
          <h1>INPUT A</h1>
          {input}
          <h1>INPUT B</h1>
          {inputB}
          <h1>INPUT X</h1>
          {inputX}
          <br />
          <div>
            <Button type="primary" onClick={cal}>
              CALCULATOR
            </Button>
            <Button type="primary" onClick={clear}>
              CLEAR METRIX
            </Button>
          </div>
        </div>
      )}
      {dataSource.length !== 0 && columndata.length !==0 && <Table dataSource={dataSource} columns={columndata} ></Table>}
    </react.Fragment>
  );
}
export default Gausssei;
