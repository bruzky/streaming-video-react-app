import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import StreamList from './streams/StreamList';
import StreamShow from "./streams/StreamShow";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history} >
        <div>
          <Header />
            <Route path='/' exact component={StreamList} />
            <Route path='/streams/show/:id' component={StreamShow} />
            <Route path='/streams/new' component={StreamCreate} />
            <Route path='/streams/edit/:id' component={StreamEdit} />
            <Route path='/streams/delete/:id' component={StreamDelete} />
        </div>
      </Router>
    </div>
  );
}

export default App;