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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
    };
  }
  //  Sanjana's code here
  toggleDrawer = (e, showDrawer) => {
    e.preventDefault();
    console.log("toggle drawer home call");
    this.setState({showDrawer: showDrawer});
  };
  //  Sanjana's code here
  render() {
    //Sanjana's code here//
    const drawerStyle = {
      // marginTop: '80px',
      padding: "15px 50px 20px 50px",
      // backgroundColor: '#ffbd59',
      fontSize: "1em",
      color: "#ffbd59",
    };
    // const otherDrawerStyle = {
    //   padding: '15px 50px 20px 50px',
    //   backgroundColor: '#ffbd59',
    //   fontSize: "1em"
    // }

    //Sanjana's code here//
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
          <Link style={drawerStyle} to="/userprofile">
            <PersonIcon /> Profile
          </Link>
          <Link style={drawerStyle} to="/">
            <LockOpenIcon /> Login
          </Link>
          <Link style={drawerStyle} onClick={(e) => window.localStorage.clear()} to="/">
            <ExitToAppIcon /> Logout
          </Link>
          {/* <Route path="/aboutus" component={AboutUs} />
            <Route path="/home" component={Home} /> */}
          {/* <Route path="/contactus" component={ContactUs} /> */}
        </Drawer>
        {/* /*Sanjana's code here */}

        <section className="bg2-pattern" style={{backgroundRepeat: "no-repeat", backgroundImage: "url('https://cdn.hipwallpaper.com/i/41/73/Yj2Sr0.jpg')"}}>
          <div className="container sec1-center" style={{backgroundColor: "#ffbd59", padding: "4%"}}>
            <h3 style={{fontStyle: "italic", marginTop: "45px", textDecoration: "underline"}}>Terms and Conditions for GrabABite</h3>
            <h4 style={{fontStyle: "italic", textAlign: "left", marginTop: "30px"}}>Introduction</h4>
            <p style={{marginBottom: "15px", fontSize: "16px", color: "#222", textAlign: "left"}}>
              These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Webiste Name accessible at Website.com. These Terms will be applied fully and
              affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these
              Website Standard Terms and Conditions.
            </p>
            <h5 style={{marginTop: "30px", fontStyle: "italic", textAlign: "left"}}>Restrictions </h5>
            <h6 style={{marginBottom: "15px", fontStyle: "italic", textAlign: "left"}}>You are specifically restricted from all of the following:</h6>
            <ul type="a">
              <li style={{textAlign: "left"}}>1) Publishing any Website material in any other media</li>
              <li style={{textAlign: "left"}}>2) Using this Website in any way that is or may be damaging to this Website</li>
              <li style={{textAlign: "left"}}>3) Using this Website in any way that impacts user access to this Website</li>
              <li style={{textAlign: "left"}}>4) Using this Website to engage in any advertising or marketing</li>
            </ul>
          </div>
        </section>

        {/* <section className = "bg3-pattern" >
            <div className = "container sec1-center" > </div >  */}
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

export default Terms;
