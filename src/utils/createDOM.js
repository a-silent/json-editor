import React from 'react';

import checkTypeOfObject from './checkTypeOfObject';
import checkDate from "./checkDate";
import formatDate from "./formatDate";
import checkColor from "./checkColor";

export const createDOM = (object, label, config, index = 0) => {
  
  let {changeInput, visibilityListButton} = config;

  switch (checkTypeOfObject(object)) {
    
    case ("[object Object]"): {
      return (
        label ?
          <li className="result-block__list__item" key={index}>
            {typeof label !== "boolean" ? <span className="label-name">{label}:&nbsp;</span> : ""}
            {<>&#123;<button className="result-block__list__item__visibility-button" onClick={visibilityListButton}>-</button></>}
            <ul className="result-block__list__object">
              {Object.keys(object).map((item, index) => createDOM(object[item], item, config, index))}
            </ul>
            {"}"}
          </li> :
          <>
            {<><span>&#123;</span><button className="result-block__list__item__visibility-button" onClick={visibilityListButton}>-</button></>}
            <ul className="result-block__list__object">
              {Object.keys(object).map((item, index) => createDOM(object[item], item, config, index))}
            </ul>
            {"}"}
          </>
      )
    }
    
    case ("[object Array]"): {
      return (
        label ?
          <li className="result-block__list__item" key={index}>
            {typeof label !== "boolean" ? <span className="label-name">{label}:&nbsp;[</span> : "["}
            <button className="result-block__list__item__visibility-button" onClick={visibilityListButton}>-</button>
            <ul className="result-block__list__array">
              {object.map((item, index, arr) => createDOM(item, !!arr, config, index))}
            </ul>
            ]
          </li> :
          <>
            [<button className="result-block__list__item__visibility-button" onClick={visibilityListButton}>-</button>
            <ul className="result-block__list__array">
              {object.map((item, index, arr) => createDOM(item, !!arr, config, index))}
            </ul>
            ]
          </>
          
      )
    }
  
    case ("[object String]"): {
      
      return (
        <li className="result-block__list__item" key={index}>
          <label >
            {typeof label !== "boolean" ? <span className="label-name">{label}:&nbsp;</span> : ""}
            {
              checkDate(object) ?
                <input type="datetime-local" value={formatDate(object)} onChange={changeInput}/> :
                checkColor(object) ?
                  <><input type="color" value={object} onChange={changeInput}/><span>&nbsp;{object}</span></>:
                  <input type="text" value={object} onChange={changeInput}/>
            }
          </label>
        </li>
      )
    }
  
    case ("[object Number]"): {
      return (
        <li className="result-block__list__item" key={index}>
          <label>
            {typeof label !== "boolean" ? <span className="label-name">{label}:&nbsp;</span> : ""}
            <input type="number" value={object} onChange={changeInput}/>
          </label>
        </li>
      )
    }
  
    case ("[object Boolean]"): {
      return (
        <li className="result-block__list__item" key={index}>
          <label>
            {typeof label !== "boolean" ? <span className="label-name">{label}:&nbsp;</span> : ""}
            <input type="checkbox" checked={object} onChange={changeInput}/><span>{object.toString()}</span>
          </label>
        </li>
      )
    }
    
    default: {
      return null
    }
  }
};