import React from "react"
import NavBar from "./components/navBar"
import { Switch, Route } from "react-router-dom"
import Main from "./components/main"
import Login from "./components/login"
import Users from "./components/users"

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
      </Switch>
    </>
  )
}

export default App
