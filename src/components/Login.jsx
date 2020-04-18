import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from "react";
import glyph from "glyphicons";
import ToggleTheme from "./ToggleTheme";
import {Button, Modal, ModalBody, ModalFooter, ModalTitle, Alert} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterForm from "./RegistgerForm";
import ForgotPswdComp from "./ForgotPswdComp";
import Home from "./Home";
import AboutUs from "./AboutUs";
import axios from "axios";
import Logo from "../Images/LOGO.png";
import "./Login.css";
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SearchResturant from "./SearchResturant";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import Drawer from "@material-ui/core/Drawer";
import ContactsIcon from "@material-ui/icons/Contacts";
import UserProfile from "./UserProfile";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {ngUrl} from "./ngrokvar";
import Recaptcha from "react-recaptcha";

const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const formValid = ({formErrorsLogin, ...rest}) => {
  let valid = true;
  Object.values(formErrorsLogin).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });
  return valid;
};

const formRegisterValid = ({formErrorsRegister, ...rest}) => {
  let valid = true;
  Object.values(formErrorsRegister).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });
  return valid;
};

const formNewPswdValid = ({formErrorsNewPswd, ...rest}) => {
  let valid = true;
  Object.values(formErrorsNewPswd).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });
  return valid;
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.handleRegisterUser = this.handleRegisterUser.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      alertShow: false,
      isSubmitLogin: false,
      usernameLogin: "",
      passwordLogin: "",
      isOpenModal: false,
      setNewPswdModal: false,
      formErrorsLogin: {
        usernameLogin: "",
        passwordLogin: "",
      },
      isSubmitNewPswd: false,
      usernameNewPswd: "",
      passwordNewPswd: "",
      formErrorsNewPswd: {
        usernameNewPswd: "",
        passwordNewPswd: "",
      },
      isSubmitRegister: false,
      firstName: "",
      lastName: "",
      contact: "",
      usernameRegister: "",
      passwordRegister: "",
      formErrorsRegister: {
        usernameRegister: "",
        passwordRegister: "",
      },
      showDrawer: false,
      restaurantList: [],
      submitResturantBtn: false,
      city: "",
      alertProfile: false,
      isVerified: false,
    };
  }

  //recaptcha code -- callback function
  recaptchaLoaded() {
    console.log("captcha successfully loaded");
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true,
      });
    }
  }

  // testing profile routing without and with login
  handleUserProfile(e) {
    let isLoggedin = localStorage.getItem("islogin");
    console.log("isLoggedin:" + isLoggedin);
    if (isLoggedin == null) {
      e.preventDefault();
      window.alert("Kindly login to access this feature");
    }
  }
  //testing profile routing without and with login

  openNav() {
    document.getElementById("loginSideNav").style.width = "280px";
    document.getElementById("loginSideNav").style.top = "50px";
    this.setState({
      showDrawer: false,
    });
  }
  closeNav() {
    document.getElementById("loginSideNav").style.width = "0";
  }
  handleInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    let formErrorsLogin = this.state.formErrorsLogin;
    switch (name) {
      case "usernameLogin":
        formErrorsLogin.usernameLogin = emailRegex.test(value) && value.length > 0 ? "" : "Invalid email id";
        break;
      case "passwordLogin":
        formErrorsLogin.passwordLogin = value.length > 0 ? "" : "Password has to be more than 0";
        break;
    }
    this.setState({formErrorsLogin, [name]: value});
  };
  handleLoginUser = async (e) => {
    console.log("In Login user");
    e.preventDefault();
    const dbUrl = `${ngUrl}/user/login`; //ngrok
    const user = {
      email: this.state.usernameLogin,
      password: this.state.passwordLogin,
    };
    console.log("$$$$$email" + this.state.usernameLogin + "%%%%%%password" + this.state.passwordLogin);

    if (formValid(this.state)) {
      axios
        .post(dbUrl, user)
        .then((resp) => {
          console.log("resp", resp);
          if (resp && resp.status === 200 && resp.data) {
            const {_id, firstName, lastName, phone, email} = resp.data;
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("_id", _id);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("phone", phone);
            localStorage.setItem("email", email);
            localStorage.setItem("islogin", true);
            this.setState({isSubmitLogin: true});
          }
        })
        .catch((e) => {
          console.log(e);
          this.setState({alertShow: true});
          window.alert("Login Failed! Please try again");
        });
    } else {
      this.setState({isSubmitLogin: false});
    }
  };
  handleSetNewPswdUser = async (e) => {
    e.preventDefault();
    if (formNewPswdValid(this.state)) {
      this.setState({isSubmitNewPswd: true});
    } else {
      this.setState({isSubmitNewPswd: false});
    }
  };

  handleRegisterUser = async (e) => {
    console.log("registration called");
    e.preventDefault();
    if (this.state.isVerified) {
      alert("Captcha verified");
      //actual registration code:
      const dbUrl = `${ngUrl}/user/register`; //ngrok
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.usernameRegister,
        password: this.state.passwordRegister,
        phone: this.state.contact,
      };

      if (formRegisterValid(this.state)) {
        axios
          .post(dbUrl, user)
          .then((resp) => {
            console.log("resp", resp);
            if (resp && resp.status === 200 && resp.data) {
              const {_id, firstName, lastName, phone, email} = resp.data;
              localStorage.setItem("firstName", firstName);
              localStorage.setItem("_id", _id);
              localStorage.setItem("lastName", lastName);
              localStorage.setItem("phone", phone);
              localStorage.setItem("email", email);
              localStorage.setItem("islogin", true);
              this.setState({isSubmitRegister: true});
            }
          })
          .catch((e) => {
            console.log(e);
            this.setState({alertShow: true});
          });
      } else {
        this.setState({isSubmitRegister: false});
      }
    } else {
      alert("Please verify that you are a human");
    }
  };

  showModal = () => {
    document.getElementById("loginSideNav").style.width = "0";
    this.setState({isOpenModal: true});
  };

  hideModal = () => {
    this.setState({isOpenModal: false});
    document.getElementById("loginSideNav").style.width = "280px";
    document.getElementById("loginSideNav").style.top = "50px";
  };

  showNewPswdModal = () => {
    document.getElementById("loginSideNav").style.width = "0";
    this.setState({setNewPswdModal: true});
  };

  hideNewPswdModal = () => {
    this.setState({setNewPswdModal: false});
    document.getElementById("loginSideNav").style.width = "280px";
    document.getElementById("loginSideNav").style.top = "50px";
  };

  handleRegisterInputChange = (e) => {
    e.preventDefault();
    console.log("handleRegisterInputChange");
    const {name, value} = e.target;
    let formErrorsRegister = this.state.formErrorsRegister;
    switch (name) {
      case "usernameRegister":
        formErrorsRegister.usernameRegister = emailRegex.test(value) && value.length > 0 ? "" : "Invalid email id";
        break;
      case "passwordRegister":
        formErrorsRegister.passwordRegister = value.length > 0 ? "" : "Password has to be more than 0";
        break;
    }
    this.setState({formErrorsRegister, [name]: value});
  };
  selectOptionCity = (e) => {
    this.setState(
      {
        city: e.target.value,
      },
      () => {
        console.log("city changed to", this.state.city);
        this.props.history.push(`/searchResturant/${this.state.city}`);
      }
    );
  };
  handleNewPswdInputChange = (e) => {
    e.preventDefault();
    console.log("handleNewPswdInputChange");
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
  //  Sanjana's code here
  toggleDrawer = (e, showDrawer) => {
    e.preventDefault();
    this.setState({showDrawer: showDrawer});
    this.closeNav();
  };
  //  Sanjana's code here

  render() {
    //const SearchResturant = this.state.restaurantList !== undefined ? <SearchResturant restaurantList={this.state.restaurantList} /> : null;
    if (this.state.submitResturantBtn == true) {
      console.log("Search resturant button clicked", this.state.submitResturantBtn);
      return <SearchResturant restaurantList={this.state.restaurantList} />;
    }

    //Sanjana's code here//
    const drawerStyle = {
      padding: "15px 50px 20px 50px",
      fontSize: "1em",
      color: "#ffbd59",
    };
    //Sanjana's code here//
    const modalBgColor = {
      backgroundColor: "#222",
    };
    const inputMarginBottom = {
      marginBottom: "1px",
      backgroundColor: "#222",
    };
    const iconsColor = {
      color: "white",
      fontSize: "20px",
    };
    const registerCloseBtn = {
      textDecoration: "none",
      fontSize: "30px",
      color: "#ffa834",
      //marginLeft: "300px",
      position: "absolute",
      top: "0",
      right: "10px",
    };
    const errorMsg = {
      fontSize: "16px",
      color: "red",
    };
    //sending username data as props to Home
    if (this.state.isSubmitLogin == true || this.state.isSubmitRegister == true || this.state.isSubmitNewPswd == true) {
      localStorage.setItem("userLocalSt", this.state.usernameLogin);
      localStorage.setItem("userNewPswdLocalSt", this.state.usernameNewPswd);
      localStorage.setItem("userRegisterLocalSt", this.state.usernameRegister);
      return <Home />;
    }

    const {formErrorsLogin, formErrorsNewPswd, formErrorsRegister} = this.state;
    return (
      <div className="Homepage">
        <nav id="nav" className="navbar fixed-top navbar-expand-sm" data-spy="affix" style={{backgroundColor: "#ffa834"}}>
          <div className="container" style={{backgroundColor: "#ffbd59"}}>
            <img src={Logo} width="65" alt="Logo" className="d-inline-block align-middle mr-2" />
            <h1>GrabABite</h1>{" "}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item" style={{marginTop: "6px"}}>
                  <u>
                    <a className="nav-link" href="/#" onClick={this.openNav} style={{color: "#222", fontSize: "20px"}}>
                      {" "}
                      Login{" "}
                    </a>{" "}
                  </u>
                </li>
                {/* /*Sanjana's code here */}
                <li className="nav-item">
                  <a className="nav-link" href="/#" onClick={(e) => this.toggleDrawer(e, true)}>
                    {" "}
                    <Tooltip title="Click on this to view menu options">
                      <IconButton aria-label="Theme Change">
                        <MenuIcon />{" "}
                      </IconButton>
                    </Tooltip>
                  </a>
                </li>
                {/* /*Sanjana's code here */}
              </ul>
            </div>
            {/* side bar */}
          </div>
        </nav>
        {/* /*Sanjana's code here */}
        <Drawer className="MuiDrawer-paper" anchor={"right"} open={this.state.showDrawer} onClose={(e) => this.toggleDrawer(e, false)}>
          <Link style={drawerStyle} to="/home">
            <HomeIcon /> Home
          </Link>
          <Link style={drawerStyle} to="/aboutus">
            <InfoIcon /> About Us
          </Link>
          <Link style={drawerStyle} to="/contactus">
            <ContactsIcon /> Contact Us
          </Link>
          <Link style={drawerStyle} onClick={this.handleUserProfile} to={"/userprofile"}>
            <PersonIcon /> Profile
          </Link>
        </Drawer>
        {/* /*Sanjana's code here */}
        <div id="loginSideNav" className="sidenav">
          <a href="# " className="closebtn" onClick={this.closeNav} style={{textDecoration: "none"}}>
            &times;
          </a>
          <div className="limiter">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-20" style={{color: "#ffa834", fontSize: "30px"}}>
                Login
              </span>
              {/* login page starts here*/}
              <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                <span className="label-input100" style={{color: "#ffa834", fontSize: "15px", float: "left"}}>
                  Username:
                </span>
                <input
                  className="input100"
                  type="text"
                  name="usernameLogin"
                  onChange={this.handleInputChange}
                  placeholder="Type your username"
                  style={{color: "white", fontSize: "14px", textAlign: "center", height: "35px", padding: "0 0px 0 0px"}}
                />
                {formErrorsLogin.usernameLogin.length > 0 && <span style={errorMsg}>{formErrorsLogin.usernameLogin}</span>}
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <span className="label-input100" style={{color: "#ffa834", fontSize: "15px", float: "left"}}>
                  Password:
                </span>
                <input
                  className="input100"
                  type="password"
                  name="passwordLogin"
                  onChange={this.handleInputChange}
                  placeholder="Type your password"
                  style={{color: "white", fontSize: "14px", textAlign: "center", height: "35px", padding: "0 0px 0 0px"}}
                />
                {formErrorsLogin.passwordLogin.length > 0 && <span style={errorMsg}>{formErrorsLogin.passwordLogin}</span>}
              </div>

              <div className="text-right p-t-8 p-b-16">
                <a href="./#" style={{fontSize: "12px", textAlign: "center", color: "#999", marginRight: "30px"}} onClick={this.showNewPswdModal}>
                  Forgot password?
                </a>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn" style={{width: "30%"}}>
                  <div className="login100-form-bgbtn"></div>
                  <button type="submit" className="login100-form-btn" onClick={this.handleLoginUser}>
                    Login
                  </button>
                </div>
              </div>

              <Modal show={this.state.isOpenModal} onHide={this.hideModal}>
                <Modal.Header style={modalBgColor}>
                  <ModalTitle style={{fontSize: "24px", color: "#ffa834"}}>
                    Registration Form
                    <Alert variant="danger" show={this.state.alertShow} onClose={() => this.setState({alertShow: false})} style={{color: "red"}} dismissible>
                      <Alert.Heading style={{fontSize: "14px"}}>Oh snap! You got an error!</Alert.Heading>
                    </Alert>
                    <a href="# " style={registerCloseBtn} onClick={this.hideModal}>
                      &times;
                    </a>
                  </ModalTitle>
                </Modal.Header>
                <ModalBody style={modalBgColor}>
                  {/* <RegisterForm /> */}
                  <div className="main registerForm">
                    <form className="register-form" id="register-form">
                      <div className="form-group" style={inputMarginBottom}>
                        <label htmlFor="firstName">
                          <span className="material-icons" style={iconsColor}>
                            person
                          </span>
                        </label>
                        <input type="text" name="firstName" id="firstName" placeholder="Your First Name" onChange={this.handleRegisterInputChange} />
                      </div>
                      <div className="form-group" style={inputMarginBottom}>
                        <label htmlFor="lastName">
                          <span className="material-icons" style={iconsColor}>
                            person
                          </span>
                        </label>
                        <input type="text" name="lastName" id="lastName" placeholder="Your Last Name" onChange={this.handleRegisterInputChange} />
                      </div>
                      <div className="form-group" style={inputMarginBottom}>
                        <label htmlFor="email">
                          <span className="material-icons" style={iconsColor}>
                            mail
                          </span>
                        </label>
                        <input type="email" name="usernameRegister" id="email" placeholder="Your Email" onChange={this.handleRegisterInputChange} />
                        {formErrorsRegister.usernameRegister.length > 0 && <span style={errorMsg}>{formErrorsRegister.usernameRegister}</span>}
                      </div>
                      <div className="form-group" style={inputMarginBottom}>
                        <label htmlFor="contact">
                          <span className="material-icons" style={iconsColor}>
                            contact_phone
                          </span>
                        </label>
                        <input type="tel" name="contact" id="contact" placeholder="Your Contact Number" onChange={this.handleRegisterInputChange} />
                      </div>
                      <div className="form-group" style={inputMarginBottom}>
                        <label htmlFor="pass">
                          <span className="material-icons" style={iconsColor}>
                            enhanced_encryption
                          </span>
                        </label>
                        <input type="password" name="passwordRegister" id="pass" placeholder="Password" onChange={this.handleRegisterInputChange} />
                        {formErrorsRegister.passwordRegister.length > 0 && <span style={errorMsg}>{formErrorsRegister.passwordRegister}</span>}
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
                          <a href="/policy" className="term-service" style={{color: "#999"}}>
                            *Terms of service
                          </a>
                        </label>
                      </div>
                      <Recaptcha sitekey="6LdV8ekUAAAAAIYVaObLOWBnjxP7jC-FMLIrvYBB" theme="light" render="explicit" onloadCallback={this.recaptchaLoaded} verifyCallback={this.verifyCallback} />
                      <div className="form-group" style={inputMarginBottom}>
                        <div className="container-login100-form-btn">
                          <div className="wrap-login100-form-btn" style={{width: "20%", marginTop: "10px"}}>
                            <div className="login100-form-bgbtn"></div>
                            <button type="submit" className="login100-form-btn" onClick={this.handleRegisterUser}>
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </ModalBody>
              </Modal>

              <Modal show={this.state.setNewPswdModal} onHide={this.hideNewPswdModal}>
                <Modal.Header style={modalBgColor}>
                  <ModalTitle style={{fontSize: "24px", color: "#ffa834"}}>
                    Set New Password
                    <a href="# " style={registerCloseBtn} onClick={this.hideNewPswdModal}>
                      &times;
                    </a>
                  </ModalTitle>
                </Modal.Header>
                <ModalBody style={modalBgColor}>
                  {/* <ForgotPswdComp /> */}
                  <form className="register-form" id="register-form">
                    <div className="form-group" style={inputMarginBottom}>
                      <label htmlFor="email">
                        <span className="material-icons" style={iconsColor}>
                          mail
                        </span>
                      </label>
                      <input type="email" name="usernameNewPswd" id="email" placeholder="Your Email" onChange={this.handleNewPswdInputChange} />
                      {formErrorsNewPswd.usernameNewPswd.length > 0 && <span style={errorMsg}>{formErrorsNewPswd.usernameNewPswd}</span>}
                    </div>

                    <div className="form-group" style={inputMarginBottom}>
                      <label htmlFor="pass">
                        <span className="material-icons" style={iconsColor}>
                          enhanced_encryption
                        </span>
                      </label>
                      <input type="password" name="passwordNewPswd" id="pass" placeholder="New Password" onChange={this.handleNewPswdInputChange} />
                      {formErrorsNewPswd.passwordNewPswd.length > 0 && <span style={errorMsg}>{formErrorsNewPswd.passwordNewPswd}</span>}
                    </div>
                    <div className="form-group" style={inputMarginBottom}>
                      <label htmlFor="re-pass">
                        <span className="material-icons" style={iconsColor}>
                          enhanced_encryption
                        </span>
                      </label>
                      <input type="password" name="re_pass" id="re_pass" placeholder="Retype-password" />
                    </div>
                    <br />
                    <div className="container-login100-form-btn">
                      <div className="wrap-login100-form-btn" style={{width: "20%"}}>
                        <div className="login100-form-bgbtn"></div>
                        <button type="button" className="login100-form-btn" onClick={this.handleSetNewPswdUser}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </ModalBody>
              </Modal>

              <div className="flex-col-c p-t-20">
                <span className="txt1 p-b-17" style={{color: "#999", textAlign: "center"}}>
                  Or New User
                </span>
              </div>
              <a href="# " className="txt2" style={{color: "#ffa834", textAlign: "center"}} onClick={this.showModal}>
                Register
              </a>
            </form>
          </div>
        </div>
        {/* login page end here*/}

        <section className="first" style={{height: "400px"}}>
          <header>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active">
                  {" "}
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1">
                  {" "}
                </li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2">
                  {" "}
                </li>{" "}
              </ol>
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active" style={{backgroundImage: "url('https://wallpapercave.com/wp/wp1874155.jpg')"}}>
                  <div className="carousel-caption d-none d-md-block"></div>
                </div>
                <div className="carousel-item" style={{backgroundImage: "url('https://arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/2MTHOQUULYI6TGQJXV3PLWIYH4.jpg')"}}>
                  ">
                  <div className="carousel-caption d-none d-md-block"></div>{" "}
                </div>
                <div
                  className="carousel-item"
                  style={{
                    backgroundImage: "url('https://graffiti-artist.net/wp-content/uploads/2018/04/KlugHaus-Make-HI-REZ-4000-90-5078_r.jpg')",
                  }}
                >
                  <div className="carousel-caption d-none d-md-block"></div>{" "}
                </div>{" "}
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true">
                  {" "}
                </span>
                <span className="sr-only"> Previous </span>{" "}
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true">
                  {" "}
                </span>
                <span className="sr-only"> Next </span>{" "}
              </a>{" "}
            </div>{" "}
          </header>{" "}
        </section>

        <section className="bg1-pattern p-t-120 p-b-105">
          <div className="sec1-center">
            <h1 className="restaurantCafe" style={{marginBottom: "30px", textShadow: "2px 2px 5px grey"}}>
              {" "}
              Find the best restaurants, cafés, and bars of around you{" "}
            </h1>
            <h3> Select the city from the list... </h3>
            <div className="wrapper">
              <div id="search_main_container" style={{margin: "0 auto"}}>
                <select
                  className="mdb-select md-form"
                  value={this.state.city}
                  name="city"
                  id="city"
                  onChange={this.selectOptionCity}
                  style={{border: "3px solid", padding: "10px", borderRadius: "17px"}}
                >
                  <option value="" disabled selected>
                    Choose your city
                  </option>
                  <option value="Boston">Boston</option>
                  <option value="New York">New York</option>
                  <option value="San Jose">San Jose</option>
                  <option value="Chicago">Chicago</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <footer className="page-footer font-small mdb-color lighten-3 pt-4">
          <div className="container text-center text-md-left">
            <div className="row">
              <hr className="clearfix w-100 d-md-none"></hr>
              <div className="col-md-2 col-lg-2 mx-auto my-md-4 my-0 mt-4 mb-1">
                <h5 className="font-weight-bold text-uppercase mb-4">SITE LINKS</h5>

                <ul className="list-unstyled">
                  <li>
                    <p>
                      <a href="/policy" className="term-service" style={{color: "#222", fontWeight: "bold"}}>
                        Terms of service
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="/aboutus" className="term-service" style={{color: "#222", fontWeight: "bold"}}>
                        About US
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <a href="/contactus" className="term-service" style={{color: "#222", fontWeight: "bold"}}>
                        Contact US
                      </a>
                    </p>
                  </li>
                </ul>
              </div>

              <hr className="clearfix w-100 d-md-none"></hr>

              <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
                <h5 className="font-weight-bold text-uppercase mb-4 md-4">Address</h5>

                <ul className="list-unstyled">
                  <li>
                    <p>
                      <i className="fas fa-home"></i> New York, NY 10012, US
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-envelope"></i> info@grababite.com
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-phone"></i> + 01 234 567 88
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-print"></i> + 01 234 567 89
                    </p>
                  </li>
                </ul>
              </div>

              <hr className="clearfix w-100 d-md-none"></hr>

              <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
                <h5 className="font-weight-bold text-uppercase mb-4">Follow Us</h5>

                <a type="button" className="btn-floating btn-fb" style={{marginRight: "10px"}}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a type="button" className="btn-floating btn-tw" style={{marginRight: "10px"}}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a type="button" className="btn-floating btn-gplus" style={{marginRight: "10px"}}>
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a type="button" className="btn-floating btn-dribbble" style={{marginRight: "10px"}}>
                  <i className="fab fa-dribbble"></i>
                </a>
              </div>

              <div className="footer-copyright text-center py-3">
                © 2020 Copyright:
                <a href="https://grababite.com/" style={{color: "red", fontWeight: "bold"}}>
                  {" "}
                  grababite.com
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Login;
