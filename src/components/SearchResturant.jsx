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
import {Button, Modal} from "react-bootstrap";
import resturantImgUrl1 from "../Images/resturant_images/1.jpg";
import resturantImgUrl2 from "../Images/resturant_images/2.jpg";
import resturantImgUrl3 from "../Images/resturant_images/3.jpg";
import resturantImgUrl4 from "../Images/resturant_images/4.jpg";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {getAllRestaurants} from "../restaurantService";
import axios from "axios";
import {Alert} from "react-bootstrap";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import ContactsIcon from "@material-ui/icons/Contacts";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserProfile from "./UserProfile";
import {ngUrl} from "./ngrokvar";

const formValid = ({formErrorsReservation, ...rest}) => {
  let valid = true;
  Object.values(formErrorsReservation).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });
  return valid;
};
const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
export class SearchResturant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenReservationModal: false,
      city: "",
      resType: "",
      resCusine: "",
      resFeatures: "",
      resPics: "",
      resMenu: "",
      restNewCity: "",
      formErrorsReservation: {
        email: "",
      },
      email: "",
      contact: "",
      meetingtime: "",
      isReserved: false,
      seat: "",
      successMsg: false,
      failedMsg: false,
      showDrawer: false,
      restaurantList: [],
    };
  }

  async componentDidMount() {
    let cityName = this.props.match.params.cityName;
    console.log(`ngurl: ${ngUrl}/restaurant/getDetails/${cityName}`);
    fetch(`${ngUrl}/restaurant/getDetails/${cityName}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Authorization",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({restaurantList: data}, () => console.log("Login list", this.state.restaurantList));
      });
  }
  toggleDrawer = (e, showDrawer) => {
    e.preventDefault();
    console.log("toggle drawer home call");
    this.setState({showDrawer: showDrawer});
  };
  handleInputChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    let formErrorsReservation = this.state.formErrorsReservation;
    switch (name) {
      case "email":
        formErrorsReservation.email = emailRegex.test(value) && value.length > 0 ? "" : "Invalid email id";
        break;
    }
    this.setState({formErrorsReservation, [name]: value});
  };
  handleReserveSeat = (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      this.setState({isReserved: true}, () => {
        console.log("Seats reserved", this.state.isReserved);
        const templateId = "template_x7q1o1Pz";
        this.sendFeedback(templateId, {message_html: "Your seat has been reserved", from_name: this.state.email, reply_to: "ajaytestdev@gmail.com"});
      });
    } else {
      this.setState({isReserved: false});
      console.log("Invalid form");
      window.alert("Incomplete form");
    }
  };
  sendFeedback(templateId, variables) {
    console.log("Variables", variables);
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        this.setState({successMsg: true});
        this.setState({failedMsg: false});
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) => {
        this.setState({successMsg: false});
        this.setState({failedMsg: true});
      });
  }
  handleCityChange = (event) => {
    this.setState({
      restNewCity: event.target.value,
    });
  };
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
      this.state.alertProfile = false;
      return <UserProfile />;
    }
  };
  handleTypeChange = (event) => {
    this.setState({
      resType: event.target.value,
    });
  };

  handleCusineChange = (event) => {
    this.setState({
      resCusine: event.target.value,
    });
  };

  handleFeaturesChange = (event) => {
    this.setState({
      resFeatures: event.target.value,
    });
  };

  showReservationModal = () => {
    let islogin = localStorage.getItem("islogin");
    if (islogin == null || islogin == false) {
      window.alert("Please login");
    } else {
      this.setState({isOpenReservationModal: true});
    }
  };
  hideReservationModal = () => {
    this.setState({isOpenReservationModal: false});
  };

  reserveBook = (e) => {
    e.preventDefault();
    this.setState({restName: true});
  };
  handleUserProfile(e) {
    let isLoggedin = localStorage.getItem("islogin");
    console.log("isLoggedin:" + isLoggedin);
    if (isLoggedin == null) {
      e.preventDefault();
      window.alert("Kindly login to access this feature");
    }
  }
  render() {
    const drawerStyle = {
      padding: "15px 50px 20px 50px",
      fontSize: "1em",
      color: "#ffbd59",
    };
    const {formErrorsReservation} = this.state;
    const restaurantFiltered = this.state.restaurantList !== undefined ? this.state.restaurantList : null;
    console.log(restaurantFiltered);
    if (this.state.city !== "") restaurantFiltered = this.state.restaurantList.filter((restaurant) => restaurant.resAddress.city.toUpperCase().includes(this.props.city.toUpperCase()));

    let resTypeFiltered = restaurantFiltered;
    if (this.state.resType !== "") resTypeFiltered = restaurantFiltered.filter((restaurant) => restaurant.resType.includes(this.state.resType));

    let resCusineFiltered = resTypeFiltered;
    if (this.state.resCusine !== "") resCusineFiltered = resTypeFiltered.filter((restaurant) => restaurant.resCusine.includes(this.state.resCusine));

    let resFeaturesFiltered = resCusineFiltered;
    if (this.state.resFeatures !== "") resFeaturesFiltered = resCusineFiltered.filter((restaurant) => restaurant.resFeatures.includes(this.state.resFeatures));

    const totalCount = resFeaturesFiltered.length;

    const {city, resType, resCusine, resFeatures} = this.state;
    const marginPara = {
      marginBottom: "4px",
      fontWeight: "bold",
    };
    const resturantCardLayout = {
      paddingTop: "30px",
      backgroundColor: "#ffa834",
      marginBottom: "20px",
      paddingBottom: "30px",
    };
    const buttonColor = {
      paddingRight: "10px",
      backgroundColor: "white",
      border: "3px solid #ffbd59",
      borderRadius: "15px",
      color: "black",
      paddingLeft: "10px",
      margin: "20px",
      fontSize: "18px",
      fontWeight: "bold",
    };
    const buttonReserveBook = {
      paddingRight: "3px",
      backgroundColor: "white",
      border: "3px solid #ffbd59",
      borderRadius: "15px",
      color: "black",
      paddingLeft: "3px",
      marginLeft: "30px",
    };
    const modalBgColor = {
      backgroundColor: "#222",
    };
    const registerCloseBtn = {
      textDecoration: "none",
      fontSize: "30px",
      color: "#ffa834",
      position: "absolute",
      top: "0",
      right: "10px",
    };
    const menuMargin = {
      marginRight: "20px",
    };
    const errorMsg = {
      fontSize: "16px",
      color: "red",
    };
    const iconsColor = {
      color: "white",
      fontSize: "20px",
    };
    const inputMarginBottom = {
      marginBottom: "1px",
      backgroundColor: "#222",
    };
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
              </ul>
            </div>
          </div>
        </nav>
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
        <div className="container sec1-center" style={{backgroundColor: "#ffbd59", padding: "4%", marginBottom: "2px"}}>
          <h2 style={{fontStyle: "italic", marginTop: "50px", textDecoration: "underline"}}>Restaurants of your choice</h2>
        </div>

        <div className="resturantFilters">
          <form>
            <select value={resType} id="resType" onChange={this.handleTypeChange} style={buttonColor}>
              <option value="Fine Dining"> Fine Dining </option>
              <option value="Cafe"> Cafe </option>
              <option value="Pubs"> Pubs </option>
              <option value="Sports Bar"> Sports Bar </option>
            </select>
            <select value={resCusine} id="resCusine" onChange={this.handleCusineChange} style={buttonColor}>
              <option value="Indian"> Indian </option>
              <option value="American"> American </option>
              <option value="Thai"> Thai </option>
              <option value="Mexican"> Mexican </option>
            </select>
            <select value={resFeatures} id="resFeatures" onChange={this.handleFeaturesChange} style={buttonColor}>
              <option value="Wifi"> Wifi </option>
              <option value="Outdoor Seating"> Outdoor Seating </option>
              <option value="Alcohol Served"> Alcohol Served </option>
              <option value="Pet Friendly"> Pet Friendly </option>
            </select>
          </form>
          {/* Modal of Reservation page */}
          <Modal show={this.state.isOpenReservationModal} onHide={this.hideReservationModal}>
            <Modal.Header style={modalBgColor}>
              <Modal.Title style={{fontSize: "24px", color: "#ffa834"}}>
                Reserve Seat
                <a href="# " style={registerCloseBtn} onClick={this.hideReservationModal}>
                  &times;
                </a>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalBgColor}>
              <form className="register-form" id="register-form">
                <div className="form-group" style={inputMarginBottom}>
                  <label htmlFor="email">
                    <span className="material-icons" style={iconsColor}>
                      mail
                    </span>
                  </label>
                  <input type="email" name="email" id="email" placeholder="Your Email" onChange={this.handleInputChange} />
                  {formErrorsReservation.email.length > 0 && <span style={errorMsg}>{formErrorsReservation.email}</span>}
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
                  <label htmlFor="seat">
                    <span className="material-icons" style={iconsColor}>
                      event_seat
                    </span>
                  </label>
                  <input type="number" name="seat" id="seat" placeholder="Number of Seats" onChange={this.handleInputChange} />
                </div>
                <div className="form-group" style={inputMarginBottom}>
                  <label htmlFor="timing">
                    <span className="material-icons" style={iconsColor}>
                      calendar_today
                    </span>
                  </label>
                  <input type="datetime-local" id="meetingtime" name="meetingtime" min="2020-01-01T00:00" max="2020-12-31T00:00" onChange={this.handleInputChange} />
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn" style={{width: "20%", marginTop: "5px"}}>
                    <div className="login100-form-bgbtn"></div>
                    <button type="button" className="login100-form-btn" onClick={this.handleReserveSeat}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>

              <Alert variant="danger" show={this.state.failedMsg} onClose={() => this.setState({failedMsg: false})} style={{color: "red", marginTop: "5px"}} dismissible>
                <Alert.Heading style={{fontSize: "16px"}}>Oh snap! We could not reserve your seat! Please try again</Alert.Heading>
              </Alert>
              <Alert variant="success" show={this.state.successMsg} onClose={() => this.setState({successMsg: false})} style={{color: "#013220", marginTop: "5px"}} dismissible>
                <Alert.Heading style={{fontSize: "16px"}}>Seat reserved successfully! Please check your email for confirmation</Alert.Heading>
              </Alert>
            </Modal.Body>
          </Modal>
          {/* Modal of reservation page */}

          <div id="values" className="values container" style={resturantCardLayout}>
            <div className="row">
              {resFeaturesFiltered.map((restaurant) => (
                <div className="col-md-6 d-flex align-items-stretch" style={{marginBottom: "5px"}}>
                  <div className="card" style={{backgroundImage: `url(${restaurant.resPics[0]})`}}>
                    <div className="card-body">
                      <h5 className="card-title">{restaurant.resName}</h5>
                      <span className="card-text cardRating">
                        Average Price: {restaurant.resAvgPrice}
                        <p className="card-text">Rating: {restaurant.resRatings}</p>
                      </span>
                      <p className="card-text" style={marginPara}>
                        Type: {restaurant.resType}
                      </p>
                      <p className="card-text" style={marginPara}>
                        Cuisine:
                      </p>
                      <ul className="card-text">
                        <li>{restaurant.resCusine[0]}</li>
                        <li>{restaurant.resCusine[1]}</li>
                        <li>{restaurant.resCusine[2]}</li>
                      </ul>

                      <p className="card-text" style={marginPara}>
                        Feature:
                      </p>
                      <ul className="card-text">
                        <li>{restaurant.resFeatures[0]}</li>
                        <li>{restaurant.resFeatures[1]}</li>
                        <li>{restaurant.resFeatures[2]}</li>
                      </ul>
                      <div className="read-more">
                        <Link to={`/menu/${restaurant.resName}`} style={{marginRight: "20px", marginLeft: "45px"}}>
                          {" "}
                          Menu{" "}
                        </Link>
                        <Link to={`/gallery/${restaurant.resName}`} style={{marginRight: "20px", marginLeft: "4px"}}>
                          {" "}
                          Gallery{" "}
                        </Link>
                        <a href="# " onClick={this.showReservationModal} style={{marginLeft: "10px"}}>
                          Reserve Seat
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resturant cards code ends here */}
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

export default SearchResturant;
