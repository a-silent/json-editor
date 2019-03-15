import React, {Component} from 'react';
import {connect} from "react-redux";

import { createDOM } from '../../utils/createDOM';
import * as setActions from '../../actions/setData';

import checkJSON from '../../utils/checkJSON';
import {bindActionCreators} from "redux";

class Output extends Component {
  
  result = [];

  searchIndex = () => {
    let index = 0;
	return function incIndex (li) {
	  if (li.previousElementSibling) {
		index++
		return incIndex(li.previousElementSibling)
	  } else {
		return index;
	  }
	}
  };
  
  checkElemInChildren = (children, param, valueParam) => {
	return Array.from(children).some(item => item[param] === valueParam)
  };

  createArrayOfKeys = elem => {

    if (elem.tagName === 'DIV') return;
    
    if ( this.checkElemInChildren(elem.children, "className", "label-name") ) {
	  for (let item of elem.children) {
		item.className === "label-name" && this.result.unshift(item.innerText.split(":")[0])
	  }
	}
    
    if (elem.tagName === "INPUT" && !this.checkElemInChildren(elem.parentElement.children, "className", "label-name") ) {
	  this.result.unshift(
		this.searchIndex()(elem.parentElement.parentElement)
	  )
	}
    
    if (elem.tagName === "LI" &&
	  elem.parentElement.className === "result-block__list__array" &&
	  this.checkElemInChildren(elem.children, "tagName", "UL")
	) {
	  this.result.unshift(
		this.searchIndex()(elem)
	  )
	}
 
	this.createArrayOfKeys(elem.parentElement)
  };
  
  changeValueOfObject = (arrayOfKeys, newValue, newKey) => {
    const { setValue } = this.props;
	
    if ( arrayOfKeys[arrayOfKeys.length - 1] === newKey ) return;
    
    let newObject = JSON.parse(this.props.json);
	arrayOfKeys.reduce((prev, prop, ind, arr) => {
	  if (ind === arr.length - 1) {
	    if (newKey) {
	      prev[newKey] = prev[prop]
		  delete prev[prop]
		} else {
		  prev[prop] = newValue;
		}
	  }
	  return prev[prop]
	}, newObject);
	
    localStorage.setItem("json", JSON.stringify(newObject, null, 4))
	setValue(JSON.stringify(newObject, null, 4))
  };
  
  changeInput = event => {
	this.result = []

	this.createArrayOfKeys(event.target);
    if (event.target.type === "text" || "color" ) {
	  this.changeValueOfObject(this.result, event.target.value);
	}
    
    if (event.target.type === "number") {
	  this.changeValueOfObject(this.result, Number(event.target.value));
	}
    
    if (event.target.type === "checkbox") {
	  this.changeValueOfObject(this.result, event.target.checked);
	}
 
	if (event.target.type === "datetime-local") {
	  this.changeValueOfObject(this.result, event.target.value && `${event.target.value}:00.000Z`);
	}
  };
  
  changeLabel = event => {
    if (event.target.className === "label-name" ) {
	  this.result = [];
	  this.createArrayOfKeys(event.target);
	  event.preventDefault();
	  event.target.spellcheck=false;
	  event.target.contentEditable = true;
	  event.target.focus();
  
	  event.target.onblur = event => {
		this.changeValueOfObject(this.result, null, event.target.innerText.split(":")[0])
	  };
  
	  event.target.onkeydown = event => {
		if (event.which === 13) {
		  event.preventDefault();
		  event.target.blur()
		}
	  };
	}
  };
  
  visibilityListButton = event => {
	let li = event.target.parentElement;
	li.getElementsByTagName("ul")[0].hidden = !li.getElementsByTagName("ul")[0].hidden;
	li.getElementsByTagName("ul")[0].hidden ?
	  event.target.innerText = "+" :
	  event.target.innerText = "-"
  };
  
  render() {
    return (
	  <div className='result-block' onClick={this.changeLabel}>
		{checkJSON(this.props.json) ?
		  createDOM(JSON.parse(
		    this.props.json),
			null,
			{
			  changeInput: this.changeInput,
			  visibilityListButton: this.visibilityListButton
			}) :
		  this.props.json === "" ?
			<p className="result-block__start-work">The editor is ready for work. Please enter your JSON file for start working.</p> :
			<p className="result-block__error">JSON parse error...</p>}
	  </div>
	)
  }
}

let mapStateToProps = state => ({
  json: state.jsonValue.json
});

let mapDispatchToProps = dispatch => bindActionCreators({...setActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Output)