import react, { useEffect, useState } from "react";
import { InputNumber, Button, Table } from "antd";
const math = require("mathjs");
function Conju() {
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
    var err = Infinity;
    var a =math.matrix(array);
    var b = math.matrix(arrayB);
    var x =math.matrix(arrayX);
    var r = math.subtract(math.multiply(a,x),b);
    var d = math.multiply(r,-1);
    // let p ={};
    var Arraytemp=[{x:arrayX}];
    var count=0;
    while(err > 0.00001){
        var lamb = math.multiply(math.divide(math.multiply(math.transpose(d),r),math.multiply(math.multiply(math.transpose(d),a),d)),-1);
        x = math.add(x,math.multiply(d,lamb));
        r=math.subtract(math.multiply(a,x),b);
        err = math.subset(math.sqrt(math.multiply(math.transpose(r),r)),math.index(0,0));
        if(err===0){
            break;
        }
        Arraytemp.push({x:x._data});
        var alpha = math.divide(math.multiply(math.multiply(math.transpose(r),a),d),math.multiply(math.multiply(math.transpose(d),a),d));
        d=math.add(math.multiply(r,-1),math.multiply(d,alpha));
        if(count>4){
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
    for(let j=0;j < Arraytemp[0].x.length;j++){
      columntemp[(j+1)] = {
        title: `x${j+1}`,
        dataIndex:`x${j+1}`,
        key:`x${j+1}`,
      };
    }
    console.log(columntemp);
    let datatemp =[{}];
    for (let i = 0; i < Arraytemp.length; i++) {
      datatemp[i]={
        key:`${i+1}`,
        Iteration:`${i}`
      }
      for (let j = 0; j < Arraytemp[i].x.length; j++) {
        datatemp[i]={...datatemp[i],["x"+(j+1)]:Arraytemp[i].x[j][0]}
      }
    }
    console.log(datatemp);
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
export default Conju;
