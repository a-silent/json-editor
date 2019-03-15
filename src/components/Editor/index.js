import React, {Component} from 'react';
import {connect} from "react-redux";
import AceEditor from 'react-ace';
import {bindActionCreators} from "redux";

import * as actions from '../../actions/setData';

import 'brace/mode/json';
import 'brace/theme/monokai';

class Editor extends Component {

  onChange = (newValue) => {
	const { setValue } = this.props;
    localStorage.setItem("json", newValue);
	setValue(newValue)
  };
  
  render() {
    return (
      <div className='editor-block'>
		<AceEditor
		  mode="json"
		  theme="monokai"
		  width="100%"
		  onChange={this.onChange}
		  onLoad={this.onLoad}
		  value={this.props.json}
		  editorProps={{$blockScrolling: Infinity}}
		/>
	  </div>
	)
  }
}

let mapStateToProps = state => ({
  json: state.jsonValue.json
});

let mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);