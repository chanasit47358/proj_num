import react, { useEffect, useState } from "react"
import { StaticMathField } from "react-mathquill";
import { Card } from "antd"
const AlgebraLatex = require('algebra-latex')
const math = require('mathjs')
function Nr({ fx, xL }) {
    const [cal, setCal] = useState([]);
    useEffect(() => {
        setCal(() => {
            var temp = [];
            var Er = Infinity;
            var i = 0;
            var xLtemp = Number(xL);
            var fxL = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()), { x: xLtemp });
            var fxLdiff = math.derivative((new AlgebraLatex().parseLatex(fx).toMath()),"x").evaluate({ x: xLtemp });
            temp.push({ x: xLtemp, fx: fxL,fxdiff:fxLdiff });
            while (i < 10) {
                fxL = math.evaluate((new AlgebraLatex().parseLatex(fx).toMath()), { x: xLtemp });
                fxLdiff = math.derivative((new AlgebraLatex().parseLatex(fx).toMath()),"x").evaluate({ x: xLtemp });
                xLtemp = xLtemp - (fxL/fxLdiff);
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
                return i === 0 ?
                    (<Card title="Initial" bordered={true} key={i}>
                        <p><StaticMathField>{"x_0=" + v.x}</StaticMathField></p>
                    </Card>
                    )
                    : (<Card title={"Iteration" + i} bordered={true} key={i}>
                        <p><StaticMathField>{"x_{i+1}=x_i-\\frac{f\\left(x_i\\right)}{f'\\left(x_i\\right)}"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.x}</StaticMathField></p>
                        <p><StaticMathField>{"\\varepsilon="}</StaticMathField><StaticMathField>{"\\left|\\frac{x_{\\left(new\\right)}-x_{\\left(old\\right)}}{x_{\\left(new\\right)}}\\right|"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{"\\left|\\frac{"+v.x+"-"+a[i-1].x+"}{"+v.x+"}\\right|"}</StaticMathField>&nbsp;=&gt;&nbsp;<StaticMathField>{v.err}</StaticMathField></p>
                    </Card>)
            })}
        </react.Fragment>
    )
}
export default Nr;