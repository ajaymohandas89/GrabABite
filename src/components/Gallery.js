import React, {Component} from "react";
import axios from "axios";
import ModalImage from "react-modal-image";
import ReactModal from "react-modal";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ToggleTheme from "./ToggleTheme";
import Logo from "../Images/LOGO.png";
import "bootstrap/dist/css/bootstrap.min.css";
import {ngUrl} from "./ngrokvar";

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: [],
      showModal: false,
    };
  }

  setModalState(showModal) {
    this.setState({
      showModal: showModal,
    });
  }

  async componentDidMount() {
    let resName = this.props.match.params.resName;
    const url = `${ngUrl}/restaurant/getDetails/${resName}/images`;
    axios
      .get(url)
      .then((res) => {
        this.setState({imageUrl: res.data});
        console.log(this.state.imageUrl);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    let imageArr = this.state.imageUrl;
    const resturantCardLayout = {
      paddingTop: "30px",
      backgroundColor: "#ffa834",
      marginBottom: "20px",
      paddingBottom: "30px",
      marginTop: "150px",
      borderRadius: "40px",
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
            <h1 style={{marginRight: "850px"}}>GrabABite</h1>{" "}
          </div>
        </nav>
        <div id="values" className="values container" style={resturantCardLayout}>
          <div className="row">
            {imageArr.map((resImage) => (
              <div class="col-lg-3 col-md-4 col-6">
                <a target="_blank" rel="noopener noreferrer" href={resImage}>
                  <img class="img-fluid img-thumbnail" src={resImage} alt="" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
