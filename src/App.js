import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import CountactUs from "./components/ContactUs";
import SearchResturant from "./components/SearchResturant";
import UserProfile from "./components/UserProfile";
import Terms from "./components/Terms";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";

class App extends Component {
  constructor(props) {
    super(props);
  }
  //after all the elements of the page is rendered correctly, this method is called.
  componentDidMount() {
    window.addEventListener("scroll", this.closeNav);
  }

  closeNav() {
    //document.getElementById("loginSideNav").style.width = "0";
  }
  render() {
    return (
      // mention all your routes Header, this is like the index
      <BrowserRouter>
        <div className="App" onScroll={this.closeNav}>
          {/* <Route path="/" component={Root}/> */}
          {/* //exact ensure it is called only once */}
          <Route path="/" component={Login} exact />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/home" component={Home} />
          <Route path="/contactus" component={CountactUs} />
          <Route path="/searchResturant/:cityName" component={SearchResturant} />
          <Route path="/#/searchResturant/:cityName" component={SearchResturant} />
          <Route path="/userprofile" component={UserProfile} />
          <Route path="/policy" component={Terms} />
          <Route path="/menu/:resName" component={Menu} />
          <Route path="/gallery/:resName" component={Gallery} />
          {/* route is bascially the way the url in browser should look, even
        if you type localoat:3000/About, the page will display
        Here the path is what will get appended to localhost and component is what should be rendered*/}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
