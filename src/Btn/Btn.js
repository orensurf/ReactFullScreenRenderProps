import React from "react";
import PropTypes from "prop-types";

class Btn extends React.Component {
  render() {
    const { btnText, click } = this.props;
    return <input type="button" value={btnText} onClick={click} />;
  }
}

Btn.propTypes = {
  btnText: PropTypes.string,
  click: PropTypes.func
};
export default Btn;
