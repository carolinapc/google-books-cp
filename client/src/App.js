import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import io from "socket.io-client";
import M from "materialize-css";

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
    
    const socket = io();

    socket.on("book_saved", msg => {
      this.setState({ broadcastMsg: msg });
      M.toast({ html: this.state.broadcastMsg });
    });
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Jumbotron />
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
