import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import io from "socket.io-client";

//Stateless Components
import NavBar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";

//Pages
import Search from "./pages/Search";
import Saved from "./pages/Saved";

//CSS
import "normalize.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  state = {
    broadcastMsg: ""
  }
  
  componentDidMount = () => {
    let socket = io("https://google-books-cp.herokuapp.com/");
    
    socket.on("book_saved", msg => {
      this.setState({ broadcastMsg: msg });
    });
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Jumbotron />
        {this.state.broadcastMsg}
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
