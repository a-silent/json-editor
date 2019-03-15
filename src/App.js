import React, {Component} from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


import Header from "./containers/Header";
import EditorBlock from "./containers/EditorBlock";
import ErrorBlock from "./components/Error";

import * as actions from "./actions/setData";

class App extends Component {
  
  componentDidMount() {
	const json = localStorage.getItem("json");
	if (json) {
	  const { setValue } = this.props;
	  setValue(json)
	}
  }
  
  render() {
    const { setError, resetError } = this.props;
    
    return (
      <div className="wrapper">
		<Header resetState={resetError}/>
		<Switch>
		  <Route exact path="/" component={EditorBlock}/>
		  <Route exact path="/:hash" component={EditorBlock}/>
		  
		  <Route render={() =>{
			setError("page not found");
		    return (<ErrorBlock/>)
		  }}
		  />
		</Switch>
	  </div>
	)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions},dispatch)

export default withRouter(connect(null, mapDispatchToProps)(App));