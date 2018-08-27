import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class WithFullScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInFullScreen: false
    };
  }

  // get parent ref. can't use react create ref since parent is not rendering any child
  componentDidMount() {
    const { refElement } = this.props;
    this.myRef = refElement || ReactDOM.findDOMNode(this);
  }

  // set ref to full screen, fallback to fixed position if enabled
  enterFullScreen = () => {
    const { fallbackToFixedPosition } = this.props;
    const element = this.myRef;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } // browsers that dont support requestFullScreen
    else if (fallbackToFixedPosition && !this.state.isInFullScreen) {
      this.positionElementFixed(element);
    }
    this.setState({
      isInFullScreen: true
    });
  };

  // exit full screen, set ref to initial style if moved to fixed position
  exitFullScreen = () => {
    const { fallbackToFixedPosition } = this.props;
    const element = this.myRef;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } // browsers that dont support exitFullScreen
    else if (fallbackToFixedPosition && this.state.isInFullScreen) {
      this.positionElementInitial(element);
    }
    this.setState({
      isInFullScreen: false
    });
  };

  toggleFullScreen = () => {
    this.state.isInFullScreen ? this.exitFullScreen() : this.enterFullScreen();
  };

  // set element position fixed for unsupported browsers
  positionElementFixed = elem => {
    elem.style.position = "absolute";
    elem.style.top = 0;
    elem.style.left = 0;
    elem.style.width = "100vw";
    elem.style.height = "100vh";
  };

  // set element style to initial
  positionElementInitial = elem => {
    elem.style.position = elem.style.top = elem.style.left = elem.style.width = elem.style.height =
      "initial";
  };

  render() {
    const { render, method } = this.props;
    return render(this[method]);
  }
}

export const fsMethods = {
  toggleFullScreen: "toggleFullScreen",
  enterFullScreen: "enterFullScreen",
  exitFullScreen: "exitFullScreen"
};

WithFullScreen.defaultProps = {
  method: fsMethods.toggleFullScreen,
  fallbackToFixedPosition: false
};

WithFullScreen.propTypes = {
  render: PropTypes.func.isRequired,
  method: PropTypes.oneOf(Object.keys(fsMethods)),
  refElement: PropTypes.instanceOf(Element),
  fallbackToFixedPosition: PropTypes.bool
};

export default WithFullScreen;
