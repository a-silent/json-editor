import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions/setData";

import Button from "../components/ButtonAnt";

import logo from "../assets/images/json-logo.png";

class Header extends Component {
  saveBtnClick = () => {
    const { setValueByHash } = this.props;
    const json = localStorage.getItem("json");
    if (json) {
      return setValueByHash(JSON.parse(json));
    }
  };

  resetBtnClick = () => {
    this.props.resetState();
    localStorage.removeItem("json");
  };

  render() {
    const { isFetching, error, resetError } = this.props;

    return (
      <header className="header">
        <Link to="/" onClick={resetError}>
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <div className="header__control-panel">
          {/*<Button click={this.saveBtnClick} text="Save" disabled={(isFetching || error) && "disabled"}/>*/}
          {/*<Button click={this.resetBtnClick} text="Reset" disabled={(isFetching || error) && "disabled"}/>*/}
          <Button
            htmlType="button"
            type="primary"
            disabled={error}
            loading={isFetching}
            click={this.saveBtnClick}
            text="Save"
          />
          <Button
            htmlType="button"
            type="primary"
            disabled={isFetching || error}
            click={this.resetBtnClick}
            text="Reset"
          />
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions }, dispatch);

const mapStateToProps = state => ({
  isFetching: state.jsonValue.isFetching,
  error: state.jsonValue.error
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
