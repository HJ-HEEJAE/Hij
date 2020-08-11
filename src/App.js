import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StockDetail from './pages/StockDetail'
import NotFound from './pages/NotFound'
import apiURL from '../src/config.js'

class App extends Component {
  // props = {
  //   API_URL : "http://131.181.190.87:3000"
  // }

  // getSearchWord = (text) => {
  //   search = text;
  // }
// function App() {
  render() {
    console.log(apiURL);
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/stocks/symbols"/>
            </Route>
            <Route exact path="/stocks/symbols" component={Home} />
            <Route exact path="/stocks/:symbol" component={StockDetail} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route component={NotFound} />
            
            {/* <Route exact path="/" component={() => <Home path={apiURL}/>} />
            <Route exact path="/stocks/:symbol" component={() => <StockDetail path={apiURL}/>} />
            <Route exact path="/login" component={() => <Login path={apiURL}/>} />
            <Route exact path="/register" component={() => <Register path={apiURL}/>} /> */}
            {/* // 라우터 렌더링과 함께 prop 전달하기 */}

            {/* <Route exact path="/"><Home apiURL={apiURL}/></Route> */}
            {/* <Route exact path="/stocks/:symbol"><StockDetail apiURL={apiURL}/></Route>
            <Route exact path="/login"><Login apiURL={apiURL}/></Route>
            <Route exact path="/register"><Register apiURL={apiURL}/></Route> */}
            {/* //이렇게 하면 router의 prop인 match,location,history가 안 먹는다 */}
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  };
}
// App.defaultProps = {
//   API_URL: "http://131.181.190.87:3000"
// }
export default App;