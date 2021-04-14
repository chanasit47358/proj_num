import "./App.css";
import { useState, useEffect } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
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
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Switch>
          <Route exact path="/">
            <div className="site-layout-content"></div>
          </Route>
          <Route path="/Bisection">
            <div className="site-layout-content">
              <h2>Bisection</h2>
              <Test input={2}>
                <Bisection />
              </Test>
            </div>
          </Route>
          <Route path="/False_Position">
            <div className="site-layout-content">
              <h2>False Position</h2>
              <Test input={2}>
                <Falseposition />
              </Test>
            </div>
          </Route>
          <Route path="/One_Point">
            <div className="site-layout-content">
              <h2>One Point</h2>
              <Test input={1}>
                <Onepoint />
              </Test>
            </div>
          </Route>
          <Route path="/Newton_Rhapson">
            <div className="site-layout-content">
              <h2>Newton Rhapson</h2>
              <Test input={1}>
                <Nr />
              </Test>
            </div>
          </Route>
          <Route path="/Secant">
            <div className="site-layout-content">
              <h2>Secant</h2>
              <Test input={2}>
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
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}
export default App;
