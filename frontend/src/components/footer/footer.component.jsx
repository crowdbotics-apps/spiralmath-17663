import React from "react";
import { FormattedMessage } from "react-intl";

import "./footer.styles.css";

const Footer = () => {
  return (
    <div className="  fluid footer">
      <h6>
        &#169;
        <FormattedMessage
          defaultMessage="2020 Spiralmath"
          id="componentFooterText"
        />
      </h6>
    </div>
  );
};
export default Footer;
