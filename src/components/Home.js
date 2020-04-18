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
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import ContactsIcon from "@material-ui/icons/Contacts";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchResturant from "./SearchResturant";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import UserProfile from "./UserProfile";
import {ngUrl} from "./ngrokvar";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      restaurantList: [],
      submitResturantBtn: false,
      city: "",
    };
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

  //  Sanjana's code here
  toggleDrawer = (e, showDrawer) => {
    e.preventDefault();
    console.log("toggle drawer home call");
    this.setState({showDrawer: showDrawer});
  };
  //  Sanjana's code here

  handleLoginAuthorization = () => {
    let islogin = localStorage.getItem("islogin");
    console.log(islogin);
    if (islogin == null) {
      this.setState({
        alertProfile: true,
      });
      console.log("Test isLogin success: " + this.state.alertProfile);
      window.alert("Please login");
    } else {
      this.setState({
        alertProfile: false,
      });
      return <UserProfile />;
    }
  };
  render() {
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

    var user = "Guest";
    console.log(this.props.isSubmitLogin);
    const {isSubmitLogin, isSubmitNewPswd, isSubmitRegister, usernameLogin, usernameNewPswd, usernameRegister} = this.props;
    if (isSubmitLogin != undefined && isSubmitNewPswd != undefined && isSubmitRegister != undefined && usernameLogin != undefined && usernameNewPswd != undefined && usernameRegister != undefined) {
      if (!isSubmitLogin && !isSubmitNewPswd && !isSubmitLogin) {
        return (
          <Switch>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        );
      }
    }

    var tempUser = localStorage.getItem("userLocalSt") || localStorage.getItem("userNewPswdLocalSt") || localStorage.getItem("userRegisterLocalSt");
    if (user == "Guest" && tempUser != null) {
      console.log("local storage", tempUser);
      user = tempUser.split("@")[0].toUpperCase();
    }
    return (
      <div className="Homepage">
        <nav id="nav" className="navbar fixed-top navbar-expand-sm" data-spy="affix" style={{backgroundColor: "#ffa834"}}>
          <div className="container" style={{backgroundColor: "#ffbd59"}}>
            <img src={Logo} width="65" alt="Logo" className="d-inline-block align-middle mr-2" />
            <h1>GrabABite</h1> <h4 style={{marginLeft: "236px"}}>Welcome {user}</h4>
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
            <h1 style={{marginBottom: "30px", textShadow: "2px 2px 5px grey"}}> Find the best restaurants, cafés, and bars of around you </h1>
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

export default Home;
