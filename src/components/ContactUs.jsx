import "bootstrap/dist/css/bootstrap.min.css";
import React, {Component} from "react";
import glyph from "glyphicons";
import {withRouter, Redirect} from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Login from "./Login";
import ToggleTheme from "./ToggleTheme";
import Logo from "../Images/LOGO.png";
import "./Login.css";
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Home";
import About from "../Images/about-bg.jpg";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import ContactsIcon from "@material-ui/icons/Contacts";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {Alert} from "react-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import UserProfile from "./UserProfile";

const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const formValid = ({formErrors, ...rest}) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });
  return valid;
};

export class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      message: "",
      formErrors: {
        email: "",
      },
      submit: false,
      success: false,
    };
  }
  handleInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value) && value.length > 0 ? "" : "Invalid email id";
        break;
    }
    this.setState({formErrors, [name]: value});
  };

  handleEmail = async (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      const templateId = "template_x7q1o1Pz";
      this.sendFeedback(templateId, {message_html: this.state.message, from_name: this.state.email, reply_to: "ajaytestdev@gmail.com"});
    } else {
      this.setState({submit: true});
      this.setState({success: false});
    }
  };
  sendFeedback(templateId, variables) {
    console.log("Variables", variables);
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        this.setState({submit: false});
        this.setState({success: true});
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) => {
        this.setState({submit: true});
        this.setState({success: false});
        console.error("Oh well, you failed. Here some thoughts on the error that occured:", err);
      });
  }
  //  Sanjana's code here
  toggleDrawer = (e, showDrawer) => {
    e.preventDefault();
    console.log("toggle drawer home call");
    this.setState({showDrawer: showDrawer});
  };
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
  render() {
    //Sanjana's code here//
    const drawerStyle = {
      padding: "15px 50px 20px 50px",
      fontSize: "1em",
      color: "#ffbd59",
    };
    //Sanjana's code here//
    const inputMarginBottom = {
      marginBottom: "1px",
      backgroundColor: "#222",
    };
    const iconsColor = {
      color: "white",
      fontSize: "20px",
    };
    return (
      <div className="Homepage">
        <nav id="nav" className="navbar fixed-top navbar-expand-sm" data-spy="affix" style={{backgroundColor: "#ffa834"}}>
          <div className="container" style={{backgroundColor: "#ffbd59"}}>
            <img src={Logo} width="65" alt="Logo" className="d-inline-block align-middle mr-2" />
            <h1>GrabABite</h1>
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
        {/* login page end here*/}

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
          <Link style={drawerStyle} to="/">
            <LockOpenIcon /> Login
          </Link>
          <Link style={drawerStyle} onClick={(e) => window.localStorage.clear()} to="/">
            <ExitToAppIcon /> Logout
          </Link>
        </Drawer>
        {/* /*Sanjana's code here */}

        <section className="bg2-pattern" style={{backgroundRepeat: "no-repeat", backgroundImage: "url('https://cdn.hipwallpaper.com/i/41/73/Yj2Sr0.jpg')"}}>
          <div className="container sec1-center" style={{backgroundColor: "#ffbd59", padding: "6%"}}>
            <h3 style={{marginBottom: "8px", fontStyle: "italic", marginTop: "20px", textDecoration: "underline"}}>Contact US</h3>
            <h5 style={{marginBottom: "50px", fontStyle: "italic"}}>Please fill the below form for any grievances and we will get back to you before you grab another bite</h5>
            <div className="main registerForm" style={{border: "3px solid #222", borderRadius: "10px"}}>
              <form className="register-form" id="register-form" action="mailto:ajaytestdev@gmail.com">
                <div className="form-group" style={inputMarginBottom}>
                  <label htmlFor="firstName">
                    <span className="material-icons" style={iconsColor}>
                      person
                    </span>
                  </label>
                  <input type="text" name="firstName" id="firstName" placeholder="Your First Name" onChange={this.handleInputChange} />
                </div>
                <div className="form-group" style={inputMarginBottom}>
                  <label htmlFor="lastName">
                    <span className="material-icons" style={iconsColor}>
                      person
                    </span>
                  </label>
                  <input type="text" name="lastName" id="lastName" placeholder="Your Last Name" onChange={this.handleInputChange} />
                </div>
                <div className="form-group" style={inputMarginBottom}>
                  <label htmlFor="email">
                    <span className="material-icons" style={iconsColor}>
                      mail
                    </span>
                  </label>
                  <input type="email" name="email" id="email" placeholder="Your Email" onChange={this.handleInputChange} />
                </div>
                <div className="form-group" style={inputMarginBottom}>
                  <label htmlFor="contact">
                    <span className="material-icons" style={iconsColor}>
                      contact_phone
                    </span>
                  </label>
                  <input type="tel" name="contact" id="contact" placeholder="Your Contact Number" onChange={this.handleInputChange} />
                </div>

                <div className="form-group" style={inputMarginBottom}>
                  <label htmlFor="message">
                    <span className="material-icons" style={iconsColor}>
                      note
                    </span>
                  </label>
                  <input type="text" name="message" id="message" placeholder="Your Message" onChange={this.handleInputChange} />
                </div>

                <div className="form-group" style={inputMarginBottom}>
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn" style={{width: "10%", marginTop: "15px", marginBottom: "5px"}}>
                      <div className="login100-form-bgbtn"></div>
                      <button type="submit" className="login100-form-btn" onClick={this.handleEmail}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <Alert variant="danger" show={this.state.submit} onClose={() => this.setState({submit: false})} style={{color: "red"}} dismissible>
                  <Alert.Heading style={{fontSize: "18px"}}>Oh snap! Email could not be sent! Please check your details</Alert.Heading>
                </Alert>
                <Alert variant="success" show={this.state.success} onClose={() => this.setState({success: false})} style={{color: "#013220"}} dismissible>
                  <Alert.Heading style={{fontSize: "18px"}}>Email sent successfully!</Alert.Heading>
                </Alert>
              </form>
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

export default ContactUs;
