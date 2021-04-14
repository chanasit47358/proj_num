import react, { useEffect, useState } from "react"
import { StaticMathField } from "react-mathquill";
import { Card } from "antd"
const AlgebraLatex = require('algebra-latex')
const math = require('mathjs')
function Secant({ fx, xL ,xR}) {
    const [cal, setCal] = useState([]);
    useEffect(() => {
        setCal(() => {
            var temp = [];
            var Er = Infinity;
            var i = 0;
            var xLtemp = Number(xL);
            var xRtemp = Number(xR);
            var fxL = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()), { x: xLtemp });
            var fxR = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()), { x: xRtemp });
            temp.push({ x0: xLtemp,x1:xRtemp, fx0: fxL ,fx1:fxR});
            while (i < 10) {
                var xNew=temp[i].x1-((temp[i].fx1*(temp[i].x1-temp[i].x0))/(temp[i].fx1-temp[i].fx0));
                Er = Math.abs((xNew - temp[i].x1) / xNew);
                if(Er===0){
                    break;
                }
                xLtemp = xRtemp;
                xRtemp = xNew;
                fxL = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()), { x: xLtemp });
                fxR = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()), { x: xRtemp });
                temp.push({ x0: xLtemp,x1:xRtemp, fx0: fxL ,fx1:fxR,err:Er});
                i++;
            }console.log(temp);
            return temp;
        })
        
        return (() => {
            setCal([]);
        })
    },[fx,xL,xR])
    return (
        <react.Fragment>
            {cal.map((v, i, a) => {
                return i === 0 ?
                    (<Card title="Initial" bordered={true} key={i}>
                        <p><StaticMathField>{`x_0=${v.x0} x_1=${v.x1}`}</StaticMathField></p>
                    </Card>
                    )
                    : (<Card title={"Iteration" + i} bordered={true} key={i}>
                        <p><StaticMathField>{"x_{i+1}=x_i-\\left(\\frac{f\\left(x_i\\right)\\left(x_i-x_{i-1}\\right)}{f\\left(x_i\\right)-f\\left(x_{i-1}\\right)}\\right)"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.x1}</StaticMathField></p>
                         <p><StaticMathField>{"\\varepsilon="}</StaticMathField><StaticMathField>{"\\left|\\frac{x_{\\left(new\\right)}-x_{\\left(old\\right)}}{x_{\\left(new\\right)}}\\right|"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{"\\left|\\frac{"+v.x1+"-"+v.x0+"}{"+v.x1+"}\\right|"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.err}</StaticMathField></p>
                    </Card>)
            })}
        </react.Fragment>
    )
}
export default Secant;