import React from "react";

export default props => {
  const {click, text, disabled} = props
  return (
  	<button onClick={click} disabled={disabled}>{text}</button>
  )
}