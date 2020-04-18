import {Component} from "react";
import React from "react";
import Login from "./Login";
import {Redirect} from "react-router-dom";
import {BrowserRouter, Route} from "react-router-dom";
import {Home} from "./Home";

const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const formValid = ({formErrorsNewPswd, ...rest}) => {
  let valid = true;
  Object.values(formErrorsNewPswd).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
};

class ForgotPswdCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitNewPswd: false,
      usernameNewPswd: "",
      passwordNewPswd: "",
      formErrorsNewPswd: {
        usernameNewPswd: "",
        passwordNewPswd: ""
      }
    };
  }
  handleNewPswdInputChange = e => {
    e.preventDefault();
    const {name, value} = e.target;
    let formErrorsNewPswd = this.state.formErrorsNewPswd;
    switch (name) {
      case "usernameNewPswd":
        formErrorsNewPswd.usernameNewPswd = emailRegex.test(value) && value.length > 0 ? "" : "Invalid email id";
        break;
      case "passwordNewPswd":
        formErrorsNewPswd.passwordNewPswd = value.length > 0 ? "" : "Password has to be more than 0";
        break;
    }
    this.setState({formErrorsNewPswd, [name]: value});
  };
  setNewUserPassword = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      this.setState({isSubmitNewPswd: true});
    } else {
      this.setState({isSubmitNewPswd: false});
      console.log("Invalid form");
      window.alert("Incomplete form");
    }
  };

  render() {
    const {formErrorsNewPswd} = this.state;
    const inputMarginBottom = {
      marginBottom: "0px",
      backgroundColor: "#222"
    };
    const iconsColor = {
      color: "white",
      fontSize: "20px"
    };
    const errorMsg = {
      fontSize: "14px",
      color: "red"
    };
    if (this.state.isSubmitNewPswd == true) {
      return <Home usernameNewPswd={this.state.usernameNewPswd} isSubmitNewPswd={this.state.isSubmitNewPswd} />;
      //   return (
      //     <BrowserRouter>
      //       {/* //<Route path="./#" component={Login} /> */}
      //       <Route path="./" render={props => <Home {...this.state} />} />
      //     </BrowserRouter>
      //   );
    }
    return (
      <form className="register-form" id="register-form">
        <div className="form-group" style={inputMarginBottom}>
          <label htmlFor="email">
            <span className="material-icons" style={iconsColor}>
              mail
            </span>
          </label>
          <input type="email" name="usernameNewPswd" id="email" placeholder="Your Email" onChange={this.handleInputChange} />
          {formErrorsNewPswd.usernameNewPswd.length > 0 && <span style={errorMsg}>{formErrorsNewPswd.usernameNewPswd}</span>}
        </div>

        <div className="form-group" style={inputMarginBottom}>
          <label htmlFor="pass">
            <span className="material-icons" style={iconsColor}>
              enhanced_encryption
            </span>
          </label>
          <input type="password" name="passwordNewPswd" id="pass" placeholder="New Password" onChange={this.handleInputChange} />
          {formErrorsNewPswd.passwordNewPswd.length > 0 && <span style={errorMsg}>{formErrorsNewPswd.passwordNewPswd}</span>}
        </div>
        <div className="form-group" style={inputMarginBottom}>
          <label htmlFor="re-pass">
            <span className="material-icons" style={iconsColor}>
              enhanced_encryption
            </span>
          </label>
          <input type="password" name="re_pass" id="re_pass" placeholder="Retype-password" onChange={this.handleInputChange} />
        </div>
        <br />
        <div className="container-login100-form-btn">
          <div className="wrap-login100-form-btn" style={{width: "20%"}}>
            <div className="login100-form-bgbtn"></div>
            <button type="submit" className="login100-form-btn" onClick={this.setNewUserPassword}>
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default ForgotPswdCom;
