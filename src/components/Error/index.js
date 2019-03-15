import React from "react";

import error404 from "../../assets/images/404.png";

export default props => {
  return (<div className="error-block">
	<img src={error404} alt="404"/>
	<h2 className="error-block__header">Page not found</h2>
  </div>)
}