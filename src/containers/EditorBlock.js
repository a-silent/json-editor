import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as actions from '../actions/setData';

import Editor from "../components/Editor";
import Output from "../components/Output";
import ErrorBlock from "../components/Error";

class EditorBlock extends Component {
  
  componentDidMount() {
	const {params} = this.props.match;
	if ( params.hash ) {
	  const { getValueByHash } = this.props;
	  getValueByHash(params.hash)
	}
  }
  
  componentDidUpdate() {
	const json = localStorage.getItem("json");
	if (json) {
	  const { setValue } = this.props;
	  setValue(json)
	}
  }
  
  render() {
    
    const { error } = this.props;
    
	return (
	  error ? <ErrorBlock/> :
	  <div className='main-block'>
		<Output/>
		<Editor/>
	  </div>
	)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions},dispatch)

const mapStateToProps = state => ({
  json: state.jsonValue.json,
  error: state.jsonValue.error,
  hash: state.jsonValue.hash
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorBlock)