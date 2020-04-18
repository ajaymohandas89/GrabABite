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
import EditIcon from "@material-ui/icons/Edit";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import MyDrawer from "./MyDrawer";
import Drawer from "@material-ui/core/Drawer";
import ContactsIcon from "@material-ui/icons/Contacts";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {ngUrl} from "./ngrokvar";

const drawerStyle = {
  padding: "15px 50px 20px 50px",
  fontSize: "1em",
  color: "#ffbd59",
};

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

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.state = {
      isEditDisabled: false,
      isSaveDisabled: true,
      isFNDisabled: true,
      isLNDisabled: true,
      isEmailDisabled: true,
      isPhoneDisabled: true,
      isPasswordDisabled: true,
      alertProfile: false,
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
      isSearchResturant: false,
      showDrawer: false,
    };
  }
  //Sanjana's code start here --- for populating profile data on page load
  componentDidMount = () => {
    let firstName = localStorage.getItem("firstName");
    let _id = localStorage.getItem("_id");
    let lastName = localStorage.getItem("lastName");
    let phone = localStorage.getItem("phone");
    let email = localStorage.getItem("email");
    this.setState({
      firstName,
      _id,
      lastName,
      contact: phone,
      email,
    });
  };
  openNav() {
    document.getElementById("loginSideNav").style.width = "280px";
    document.getElementById("loginSideNav").style.top = "50px";
  }
  closeNav() {
    document.getElementById("loginSideNav").style.width = "0";
  }

  handleLoginUser = async (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      this.setState({isSubmitLogin: true});
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
  handleEditProfile = async (e) => {
    e.preventDefault();
    this.setState({
      isEditDisabled: false,
      isSaveDisabled: true,
      isFNDisabled: true,
      isLNDisabled: true,
      isPhoneDisabled: true,
      isPasswordDisabled: true,
      isEmailDisabled: true,
    });

    const dbUrl = `${ngUrl}/user/profile/${this.state._id}`; //ngrok ask
    const user = {
      // _id:
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.contact,
    };

    axios
      .put(dbUrl, user)
      .then((resp) => {
        if (resp && resp.status === 200 && resp.data) {
          const {_id, firstName, lastName, phone, email} = resp.data;
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("_id", _id);
          localStorage.setItem("lastName", lastName);
          localStorage.setItem("phone", phone);
          localStorage.setItem("email", email);
          this.setState({
            _id,
            firstName,
            lastName,
            phone,
            email,
          });
        }
      })
      .catch((e) => {
        this.setState({alertShow: true});
      });
  };

  handleLoginAuthorization = () => {
    let islogin = localStorage.getItem("islogin");
    if (islogin == null) {
      this.setState({
        alertProfile: true,
      });
      window.alert("Please login");
    } else {
      this.state.alertProfile = false;
      return <UserProfile />;
    }
  };

  hideNewPswdModal = () => {
    this.setState({setNewPswdModal: false});
    document.getElementById("loginSideNav").style.width = "280px";
    document.getElementById("loginSideNav").style.top = "50px";
  };

  handleInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    console.log("handleInputChange", name);
    this.setState({[name]: value});
  };

  toggleDrawer = (e, showDrawer) => {
    e.preventDefault();
    this.setState({showDrawer: showDrawer});
  };

  searchResturant = (e) => {
    if (
      (this.state.isSubmitLogin != undefined && this.state.usernameLogin != undefined) ||
      (this.state.isSubmitNewPswd != undefined && this.state.usernameNewPswd != undefined) ||
      (this.state.isSubmitRegister != undefined && this.state.usernameRegister != undefined)
    ) {
      this.setState({isSearchResturant: true});
    } else {
      this.setState({isSearchResturant: false});
    }
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

  render() {
    const divFormGroup = {
      border: "3px solid #222",
      borderRadius: "40px",
    };
    const inutFontColor = {
      fontSize: "20px",
    };
    const modalBgColor = {
      backgroundColor: "#222",
    };
    const inputMarginBottom = {
      marginBottom: "0px",
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
      position: "absolute",
      top: "0",
      right: "10px",
    };
    const errorMsg = {
      fontSize: "14px",
      color: "red",
    };
    //sending username data as props to Home
    if (this.state.isSubmitLogin == true || this.state.isSubmitRegister == true || this.state.isSubmitNewPswd == true) {
      localStorage.setItem("userLocalSt", this.state.usernameLogin);
      localStorage.setItem("userNewPswdLocalSt", this.state.usernameNewPswd);
      localStorage.setItem("userRegisterLocalSt", this.state.usernameRegister);
      localStorage.setItem("islogin", true);
      return <Home />;
    }

    if (this.state.isSearchResturant == true) {
      return (
        <SearchResturant
          isSubmitLogin={this.state.isSubmitLogin}
          usernameLogin={this.state.usernameLogin}
          isSubmitNewPswd={this.state.isSubmitNewPswd}
          usernameNewPswd={this.state.usernameNewPswd}
          isSubmitRegister={this.state.isSubmitRegister}
          usernameRegister={this.state.usernameRegister}
        />
      );
    }

    const {formErrorsLogin, formErrorsNewPswd, formErrorsRegister} = this.state;
    return (
      <div className="Homepage">
        <nav id="nav" className="navbar fixed-top navbar-expand-sm" data-spy="affix" style={{backgroundColor: "#ffa834"}}>
          <Tooltip title="Theme Change">
            <IconButton aria-label="Theme Change">
              <ToggleTheme />
            </IconButton>
          </Tooltip>
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
        <Drawer anchor={"right"} open={this.state.showDrawer} onClose={(e) => this.toggleDrawer(e, false)}>
          <Link style={drawerStyle} to="/home">
            <HomeIcon /> Home
          </Link>
          <Link style={drawerStyle} to="/aboutus">
            <InfoIcon /> About Us
          </Link>
          <Link style={drawerStyle} to="/contactus">
            <ContactsIcon /> Contact Us
          </Link>
          <Link style={drawerStyle} to="/userprofile">
            <PersonIcon /> Profile
          </Link>
          <Link style={drawerStyle} onClick={(e) => window.localStorage.clear()} to="/">
            <ExitToAppIcon /> Logout
          </Link>
        </Drawer>
        <div id="loginSideNav" className="sidenav">
          <a href="# " className="closebtn" onClick={this.closeNav} style={{textDecoration: "none"}}>
            &times;
          </a>
        </div>
        <section
          className="first"
          style={{height: "500px", backgroundSize: "cover", backgroundImage: "url(https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)"}}
        >
          <header>
            <h2 style={{paddingTop: "150px", color: "white", fontSize: "50px", fontFamily: "Segoe UI"}}>YOUR PROFILE</h2>
          </header>{" "}
        </section>

        <section className="p-t-120 p-b-105" style={{marginTop: "-100px", height: "500px"}}>
          <div className="container" style={{padding: "10px 0 10px 450px"}}>
            <button
              type="edit"
              id="editform"
              disabled={this.state.isEditDisabled}
              onClick={() =>
                this.setState({
                  isEditDisabled: true,
                  isSaveDisabled: false,
                  isFNDisabled: false,
                  isLNDisabled: false,
                  isPhoneDisabled: false,
                  isPasswordDisabled: false,
                  isEmailDisabled: false,
                })
              }
            >
              <EditIcon />
              Edit
            </button>
            <div className="wrapper">
              <form>
                <div className="form-group" style={divFormGroup}>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    placeholder="FirstName"
                    disabled={this.state.isFNDisabled}
                    onChange={this.handleInputChange}
                    style={inutFontColor}
                  />
                </div>
                <div className="form-group" style={divFormGroup}>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    placeholder="LastName"
                    disabled={this.state.isLNDisabled}
                    onChange={this.handleInputChange}
                    style={inutFontColor}
                  />
                </div>
                <div className="form-group" style={divFormGroup}>
                  <input
                    type="text"
                    name="contact"
                    className="form-control"
                    value={this.state.contact}
                    placeholder="Phone Number"
                    disabled={this.state.isPhoneDisabled}
                    onChange={this.handleInputChange}
                    style={inutFontColor}
                  />
                </div>
                <div className="form-group" style={divFormGroup}>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    disabled={this.state.isEmailDisabled}
                    onChange={this.handleInputChange}
                    style={inutFontColor}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={this.state.isSaveDisabled}
                  style={{border: "3px solid #222", fontSize: "20px", color: "white", borderRadius: "200px", width: "100px", backgroundColor: "#ffa834"}}
                  onClick={this.handleEditProfile}
                >
                  Save
                </button>
              </form>
            </div>
          </div>{" "}
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

export default UserProfile;
