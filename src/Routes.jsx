import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import CalendarMonth from "./container/CalendarMonth";
import CalendarWeek from "./container/CalendarWeek";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CalendarMonth} />
        <Route exact path="/week" component={CalendarWeek} />
      </Switch>
    </Router>
  );
};

export default Routes;
