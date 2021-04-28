import "./App.css";
import { useState, useEffect } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { Layout, Menu, Card } from "antd";
import { HomeFilled, FacebookFilled, GithubFilled } from "@ant-design/icons";
import Test from "./test";
import { addStyles } from "react-mathquill";
import Bisection from "./method/Root_of_equation/bisection";
import Falseposition from "./method/Root_of_equation/Falseposition";
import Onepoint from "./method/Root_of_equation/onepoint";
import Nr from "./method/Root_of_equation/Nr";
import Secant from "./method/Root_of_equation/Secant";
import Cramer from "./method/Linear_algebra/Cramer";
import Gausselim from "./method/Linear_algebra/Gauss_elim";
import Gaussjordan from "./method/Linear_algebra/Gauss_jordan";
import Lu from "./method/Linear_algebra/Lu";
import Jacob from "./method/Linear_algebra/Jacobi";
import Gausssei from "./method/Linear_algebra/Gauss_seidel";
import Conju from "./method/Linear_algebra/conjugate";
import Nd from "./method/Interpolation/Nd";
import Lg from "./method/Interpolation/Lg";
import Sp from "./method/Interpolation/sp";
import Ln from "./method/regression/linear";
import Pm from "./method/regression/poly";
import Ml from "./method/regression/multi";
// import axios from 'axios'

// axios({
//   method: 'get',
//   url: 'http://localhost:8080/'
// })
//   .then(response => {
//     console.log("response: ", response)
//     console.log("refresh");
//   })
//   .catch(err => {
//     console.error(err)
//   })
addStyles();
const { Header, Footer, Content } = Layout;
const { SubMenu } = Menu;

function App() {
  const location = useLocation();
  const [current, setCurrent] = useState("/");
  console.log(location);
  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);
  return (
    <Layout
      className="layout"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #141e30, #182539, #1c2c42, #20334b, #243b55)",
      }}
    >
      <Header>
        {/* <div className="logo" /> */}
        <Menu
          mode="horizontal"
          triggerSubMenuAction="click"
          onClick={(e) => {
            setCurrent(e.key);
          }}
          selectedKeys={current}
        >
          <Menu.Item key="/" icon={<HomeFilled />}>
            <Link to="/" className="customclass">
              HOME
            </Link>
          </Menu.Item>
          <SubMenu key="Menu1" title="Root of Equation">
            <Menu.Item key="/Bisection">
              <Link to="/Bisection">Bisection</Link>
            </Menu.Item>
            <Menu.Item key="/False_Position">
              <Link to="/False_Position">False Position</Link>
            </Menu.Item>
            <Menu.Item key="/One_Point">
              <Link to="/One_Point">One Point</Link>
            </Menu.Item>
            <Menu.Item key="/Newton_Rhapson">
              <Link to="/Newton_Rhapson">Newton Rhapson</Link>
            </Menu.Item>
            <Menu.Item key="/Secant">
              <Link to="/Secant">Secant</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Menu2" title="Linear Algebra">
            <Menu.Item key="/Cramer">
              <Link to="/Cramer">Cramer</Link>
            </Menu.Item>
            <Menu.Item key="/Gauss_Elimination">
              <Link to="/Gauss_Elimination">Gauss Elimination</Link>
            </Menu.Item>
            <Menu.Item key="/Gauss_Jordan">
              <Link to="/Gauss_Jordan">Gauss Jordan</Link>
            </Menu.Item>
            <Menu.Item key="/LU_Decomposition">
              <Link to="/LU_Decomposition">LU Decomposition</Link>
            </Menu.Item>
            <Menu.Item key="/Jacobi">
              <Link to="/Jacobi">Jacobi</Link>
            </Menu.Item>
            <Menu.Item key="/Gauss_seidel">
              <Link to="/Gauss_seidel">Gauss seidel</Link>
            </Menu.Item>
            <Menu.Item key="/conjugate_gradient">
              <Link to="/conjugate_gradient">Conjugate Gradient</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Menu3" title="Interpolation">
            <Menu.Item key="/newton_divided_difference">
              <Link to="/newton_divided_difference">
                Newton Divided Difference
              </Link>
            </Menu.Item>
            <Menu.Item key="/lagrange">
              <Link to="/lagrange">Lagrange</Link>
            </Menu.Item>
            <Menu.Item key="/spline">
              <Link to="/spline">Spline</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Menu4" title="Least Square Regression ">
            <Menu.Item key="/lnr">
              <Link to="/lnr">Linear Regression</Link>
            </Menu.Item>
            <Menu.Item key="/pmr">
              <Link to="/pmr">Polynomial Regression</Link>
            </Menu.Item>
            <Menu.Item key="/mlr">
              <Link to="/mlr">Multiple Linear Regression</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Switch>
          <Route exact path="/">
            <div className="site-layout-content">
              <img
                src={
                  "https://media.tenor.com/images/c7b327dbad04316b8974779b1019b798/tenor.gif"
                }
                alt={"gura"}
                className={"bonk"}
              />
              <p className={"text"}>NUMERICAL METHOD</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card
                  style={{ width: 300, background: "none" }}
                  bordered={false}
                >
                  <a
                    href={"https://www.facebook.com/t.kukkuk"}
                    target={"_blank"}
                    rel={"noreferrer"}
                    style={{ display: "block", color: "black" }}
                    id={"myface"}
                    onMouseOver={() => {
                      document.getElementById("myface").style.color = "grey";
                    }}
                    onMouseOut={() => {
                      document.getElementById("myface").style.color = "black";
                    }}
                  >
                    <FacebookFilled /> : Sirawit Suwannakin
                  </a>
                  <a
                    href={"https://github.com/samuiii"}
                    target={"_blank"}
                    rel={"noreferrer"}
                    style={{ display: "block", color: "black" }}
                    id={"mygit"}
                    onMouseOver={() => {
                      document.getElementById("mygit").style.color = "grey";
                    }}
                    onMouseOut={() => {
                      document.getElementById("mygit").style.color = "black";
                    }}
                  >
                    <GithubFilled /> : Samuiii
                  </a>
                </Card>
              </div>
            </div>
          </Route>
          <Route path="/Bisection">
            <div className="site-layout-content">
              <h2>Bisection</h2>
              <Test input={2} nm={"Bisection"}>
                <Bisection />
              </Test>
            </div>
          </Route>
          <Route path="/False_Position">
            <div className="site-layout-content">
              <h2>False Position</h2>
              <Test input={2} nm={"Falseposition"}>
                <Falseposition />
              </Test>
            </div>
          </Route>
          <Route path="/One_Point">
            <div className="site-layout-content">
              <h2>One Point</h2>
              <Test input={1} nm={"Onepoint"}>
                <Onepoint />
              </Test>
            </div>
          </Route>
          <Route path="/Newton_Rhapson">
            <div className="site-layout-content">
              <h2>Newton Rhapson</h2>
              <Test input={1} nm={"Nr"}>
                <Nr />
              </Test>
            </div>
          </Route>
          <Route path="/Secant">
            <div className="site-layout-content">
              <h2>Secant</h2>
              <Test input={2} nm={"Secant"}>
                <Secant />
              </Test>
            </div>
          </Route>
          <Route path="/Cramer">
            <div className="site-layout-content">
              <Cramer />
            </div>
          </Route>
          <Route path="/Gauss_Elimination">
            <div className="site-layout-content">
              <Gausselim />
            </div>
          </Route>
          <Route path="/Gauss_Jordan">
            <div className="site-layout-content">
              <Gaussjordan />
            </div>
          </Route>
          <Route path="/LU_Decomposition">
            <div className="site-layout-content">
              <Lu />
            </div>
          </Route>
          <Route path="/Jacobi">
            <div className="site-layout-content">
              <Jacob />
            </div>
          </Route>
          <Route path="/Gauss_seidel">
            <div className="site-layout-content">
              <Gausssei />
            </div>
          </Route>
          <Route path="/conjugate_gradient">
            <div className="site-layout-content">
              <Conju />
            </div>
          </Route>
          <Route path="/newton_divided_difference">
            <div className="site-layout-content">
              <Nd />
            </div>
          </Route>
          <Route path="/lagrange">
            <div className="site-layout-content">
              <Lg />
            </div>
          </Route>
          <Route path="/spline">
            <div className="site-layout-content">
              <Sp />
            </div>
          </Route>
          <Route path="/lnr">
            <div className="site-layout-content">
              <Ln />
            </div>
          </Route>
          <Route path="/pmr">
            <div className="site-layout-content">
              <Pm />
            </div>
          </Route>
          <Route path="/mlr">
            <div className="site-layout-content">
              <Ml />
            </div>
          </Route>
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        NUMERICAL METHOD ©2021 Created by samui
      </Footer>
    </Layout>
  );
}
export default App;
