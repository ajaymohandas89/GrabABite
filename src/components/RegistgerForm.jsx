import React, {Component} from "react";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }
  registerNewUser = e => {
    return console.log("user registerNewUser logged in");
  };
  render() {
    const inputMarginBottom = {
      marginBottom: "0px",
      backgroundColor: "#222"
    };
    const iconsColor = {
      color: "white",
      fontSize: "20px"
    };
    return (
      <div className="main">
        <form className="register-form" id="register-form">
          <div className="form-group" style={inputMarginBottom}>
            <label htmlFor="firstName">
              <span className="material-icons" style={iconsColor}>
                person
              </span>
            </label>
            <input type="text" name="firstName" id="firstName" placeholder="Your First Name" />
          </div>
          <div className="form-group" style={inputMarginBottom}>
            <label htmlFor="lastName">
              <span className="material-icons" style={iconsColor}>
                person
              </span>
            </label>
            <input type="text" name="lastName" id="lastName" placeholder="Your Last Name" />
          </div>
          <div className="form-group" style={inputMarginBottom}>
            <label htmlFor="email">
              <span className="material-icons" style={iconsColor}>
                mail
              </span>
            </label>
            <input type="email" name="email" id="email" placeholder="Your Email" />
          </div>
          <div className="form-group" style={inputMarginBottom}>
            <label htmlFor="contact">
              <span className="material-icons" style={iconsColor}>
                contact_phone
              </span>
            </label>
            <input type="tel" name="contact" id="contact" placeholder="Your Contact Number" />
          </div>
          <div className="form-group" style={inputMarginBottom}>
            <label htmlFor="pass">
              <span className="material-icons" style={iconsColor}>
                enhanced_encryption
              </span>
            </label>
            <input type="password" name="pass" id="pass" placeholder="Password" />
          </div>
          <div className="form-group" style={inputMarginBottom}>
            <label htmlFor="re-pass">
              <span className="material-icons" style={iconsColor}>
                enhanced_encryption
              </span>
            </label>
            <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
          </div>
          <div className="form-group" style={inputMarginBottom}>
            <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
            <label htmlFor="agree-term" className="label-agree-term" style={{color: "#999"}}>
              <span>
                <span></span>
              </span>
              I agree all statements in{" "}
              <a href="#" className="term-service" style={{color: "#999"}}>
                *Terms of service
              </a>
            </label>
          </div>
          <div className="form-group" style={inputMarginBottom}>
            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn" style={{width: "20%"}}>
                <div className="login100-form-bgbtn"></div>
                <button type="submit" className="login100-form-btn" onClick={this.registerNewUser}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
