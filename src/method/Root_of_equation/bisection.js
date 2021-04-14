import react,{ useEffect,useState} from "react"
import {StaticMathField} from "react-mathquill";
import {Card} from "antd"
const AlgebraLatex = require('algebra-latex')
const math = require('mathjs')
function Bisection({xL,xR,fx}){
    const [cal,setCal]=useState([]);
    useEffect(()=>{
        // console.log(props);
        // setX((prev)=>({...prev,props.x.xL:}))
        setCal(()=>{
            var temp=[];
            var Er = Infinity;
            var i = 0;
            var xLtemp = Number(xL);
            var xRtemp = Number(xR);
            var fxL = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()),{x:xLtemp});
            var fxR = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()),{x:xRtemp});
            var xMold = (xLtemp + xRtemp) / 2;
            var fxM = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()),{x:xMold});
            if (fxM * fxR > 0) {
              xRtemp = xMold;
            } else{
              xLtemp = xMold;
            }
            temp.push({xL:xLtemp,xR:xRtemp,fxL:fxL,fxR:fxR,xM:xMold,fxM:fxM,xL0:xL,xR0:xR});
            while (i < 10) {
              fxL = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()),{x:xLtemp});
              fxR = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()),{x:xRtemp});
              var xMnew = (xLtemp + xRtemp) / 2;
              fxM = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()),{x:xMnew});
              if (fxM * fxR > 0) {
                  xRtemp = xMnew;
                  Er=Math.abs((xMnew-xMold)/xMnew);
                  xMold=xMnew;
              } else{
                  xLtemp = xMnew;
                  Er=Math.abs((xMnew-xMold)/xMnew);
                  xMold=xMnew;
              }
              temp.push({xL:xLtemp,xR:xRtemp,fxL:fxL,fxR:fxR,xM:xMnew,fxM:fxM,err:Er});
              i++;
          }
          return temp;
        })
        return (()=>{setCal([])});
    },[xL,xR,fx])
    console.log(cal);
    return(<react.Fragment>
      {
      cal.map((v,i,a)=>
      {
        let temp0=fx.replace(/x/g,"x_l");
        let temp1=fx.replace(/x/g,"x_r");
        let temp2=fx.replace(/x/g,v.xL0);
        let temp3=fx.replace(/x/g,v.xR0);
        let temp4=fx.replace(/x/g,"x_m");
        let temp5=fx.replace(/x/g,v.xM);
        if(i>0){
          var temp6=fx.replace(/x/g,a[i-1].xL);
          var temp7=fx.replace(/x/g,a[i-1].xR);  
        }
        return i===0?
        (
          <Card title="Initial" bordered={true} key={i}>
          <p><StaticMathField>{"x_l ="+v.xL0}</StaticMathField>&nbsp;<StaticMathField>{"x_r="+v.xR0}</StaticMathField></p>
          <p><StaticMathField>{"f\\left(x\\right)="+fx}</StaticMathField></p>
          <p><StaticMathField>{"f\\left(x_l\\right)="+temp0}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{temp2}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.fxL}</StaticMathField></p>
          <p><StaticMathField>{"f\\left(x_r\\right)="+temp1}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{temp3}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.fxR}</StaticMathField></p>
          <p><StaticMathField>{"x_m=\\frac{\\left(x_l+x_r\\right)}{2}"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{"\\frac{\\left("+v.xL0+"+"+v.xR0+"\\right)}{2}"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.xM}</StaticMathField></p>
          <p><StaticMathField>{"f\\left(x_m\\right)="+temp4}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{temp5}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.fxM}</StaticMathField></p>
          <p><StaticMathField>{`f\\left(x_m\\right)\\cdot f\\left(x_r\\right)=\\left(${v.fxM}\\right)\\cdot\\left(${v.fxR}\\right)`}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.fxM*v.fxR}</StaticMathField></p>
          {v.fxM*v.fxR>0?<p><StaticMathField>{"f\\left(x_m\\right)\\cdot f\\left(x_r\\right) > 0"}</StaticMathField></p>:<p><StaticMathField>{"f\\left(x_m\\right)\\cdot f\\left(x_r\\right) \\leq 0"}</StaticMathField></p>}
          {v.fxM*v.fxR>0?<p><StaticMathField>{"x_r=x_m="+v.xM}</StaticMathField></p>:<p><StaticMathField>{"x_l=x_m="+v.xM}</StaticMathField></p>}
          </Card>
        ):
        (<Card title={"Iteration"+i} bordered={true} key={i}>
          <p><StaticMathField>{"x_l="+a[i-1].xL}</StaticMathField>&nbsp;<StaticMathField>{"x_r="+a[i-1].xR}</StaticMathField></p>
          <p><StaticMathField>{"f\\left(x\\right)="+fx}</StaticMathField></p>
          <p><StaticMathField>{"f\\left(x_l\\right)="+temp0}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{temp6}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.fxL}</StaticMathField></p>
          <p><StaticMathField>{"f\\left(x_r\\right)="+temp1}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{temp7}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.fxR}</StaticMathField></p>
          <p><StaticMathField>{"x_m=\\frac{\\left(x_l+x_r\\right)}{2}"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{"\\frac{\\left("+a[i-1].xL+"+"+a[i-1].xR+"\\right)}{2}"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.xM}</StaticMathField></p>
          <p><StaticMathField>{"f\\left(x_m\\right)="+temp4}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{temp5}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.fxM}</StaticMathField></p>
          <p><StaticMathField>{`f\\left(x_m\\right)\\cdot f\\left(x_r\\right)=\\left(${v.fxM}\\right)\\cdot \\left(${v.fxR}\\right)`}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.fxM*v.fxR}</StaticMathField></p>
          {v.fxM*v.fxR>0?<p><StaticMathField>{"f\\left(x_m\\right)\\cdot f\\left(x_r\\right) > 0"}</StaticMathField></p>:<p><StaticMathField>{"f\\left(x_m\\right)\\cdot f\\left(x_r\\right) \\leq 0"}</StaticMathField></p>}
          {v.fxM*v.fxR>0?<p><StaticMathField>{"x_r=x_m="+v.xM}</StaticMathField></p>:<p><StaticMathField>{"x_l=x_m="+v.xM}</StaticMathField></p>}
          <p><StaticMathField>{"\\varepsilon="}</StaticMathField><StaticMathField>{"\\left|\\frac{x_{m\\left(new\\right)}-x_{m\\left(old\\right)}}{x_{m\\left(new\\right)}}\\right|"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{`\\left|\\frac{${v.xM}-${a[i-1].xM}}{${v.xM}}\\right|`}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.err}</StaticMathField></p>
        </Card>)
      })}
    </react.Fragment>)
}
export default Bisection;