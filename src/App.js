import React, { useReducer, createContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import Logout from "./components/Logout";
import { Switch, Route } from "react-router-dom";
import { initialState, reducer } from "./reducer/UseReducer";
export const UserContext = createContext();
const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar></Navbar>
        <Routing></Routing>
      </UserContext.Provider>
    </>
  );
};
export default App;
