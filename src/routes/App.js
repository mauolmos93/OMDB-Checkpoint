import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../containers/Register";
import Home from "../containers/Home";
import Login from "../containers/Login";
import NotFound from "../components/NotFound";
import Layout from "../components/Layout";
import SearchResults from "../components/SearchResults";
import CarouselItemDetail from "../components/CarouselItemDetail";
import Users from "../components/Users";
import UserDetails from "../containers/UserDetails";
import UserCard from "../components/UserCard";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/movies/:imdbID" component={CarouselItemDetail} />
          <Route exact path="/movies" component={SearchResults} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:userId" component={UserDetails} />
          <Route exact path="/users/:userId/info" component={UserCard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
};

export default App;
