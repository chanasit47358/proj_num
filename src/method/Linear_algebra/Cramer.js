import react, { useEffect, useState } from "react";
import {StaticMathField} from "react-mathquill";
import { InputNumber, Button,Card } from "antd";
const math = require("mathjs");
function Cramer() {
  const [row, setRow] = useState(1);
  const [column, setColumn] = useState(1);
  const [array, setArray] = useState([]);
  const [input, setinput] = useState([]);
  const [change, setChange] = useState(false);
  const [arrayB, setArrayB] = useState([]);
  const [inputB, setinputB] = useState([]);
  const [changeB, setChangeB] = useState(false);
  const [calcu, setCalcu] = useState([]);
  console.log("arrayA:" + array);
  console.log("arrayB:" + arrayB);
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
  function cal() {
    setCalcu(() => {
      var a = math.matrix(array);
      var b = math.matrix(arrayB);
      var x = [];
      for (let i = 0; i < a.size()[0]; i++) {
        x.push(
          math.round(
            math.det(
              math.subset(
                a,
                math.index(math.range(0, a.size()[0]), i),
                math.subset(b, math.index(math.range(0, a.size()[0]), 0))
              )
            )
          ) / math.round(math.det(a))
        );
      }
      return x;
    });
    
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
    setCalcu([]);
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
          <br />
          <div>
            <Button type="primary" onClick={cal}>CALCULATOR</Button>
            <Button type="primary" onClick={clear}>
              CLEAR METRIX
            </Button>
          </div>
        </div>
      )}
      {calcu.length !==0 && 
      <Card title="ANSWER" style={{ width: 300 }}>
      {calcu.map((v,i)=>{
          return (<p><StaticMathField>{`x_${i+1}=${v}`}</StaticMathField></p>);
      })}
      </Card>
      }
    </react.Fragment>
  );
}
export default Cramer;
