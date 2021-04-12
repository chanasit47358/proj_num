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
            temp.push({ x: xLtemp, fx: fxL });
            while (i < 10) {
                xLtemp = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()), { x: temp[i].x });
                Er = Math.abs((xLtemp - temp[i].x) / xLtemp);
                temp.push({ x: xLtemp, err: Er });
                i++;
            }
            return temp;
        })

        return (() => {
            setCal([]);
        })
    },[fx,xL])
    return (
        <react.Fragment>
            {cal.map((v, i, a) => {
                let temp = fx.replace(/x/g, "x_i");
                if(i!=0){
                    var temp1 = fx.replace(/x/g, a[i-1].x);
                }

                return i == 0 ?
                    (<Card title="Initial" bordered={true} key={i}>
                        <p><StaticMathField>{"x_0=" + v.x}</StaticMathField></p>
                    </Card>
                    )
                    : (<Card title={"Iteration" + i} bordered={true} key={i}>
                        <p><StaticMathField>{"x_{i+1}="+temp}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{temp1}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.x}</StaticMathField></p>
                        <p><StaticMathField>{"\\varepsilon="}</StaticMathField><StaticMathField>{"\\left|\\frac{x_{\\left(new\\right)}-x_{\\left(old\\right)}}{x_{\\left(new\\right)}}\\right|"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{"\\left|\\frac{"+v.x+"-"+a[i-1].x+"}{"+v.x+"}\\right|"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.err}</StaticMathField></p>
                    </Card>)
            })}
        </react.Fragment>
    )
}
export default Secant;