import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectShow } from "../../../redux/modals/modal.select";
import { toggleShow } from "../../../redux/modals/modals.actions";
import ContactUs from "../../Common/contact-us-modal/contact-us-modal.component";
import "./footer.styles.css";

const Footer = ({ show, toggleShow }) => {
   const handleContactUs = () => {
      toggleShow();
   };

   return (
      <div className="  fluid footer">
         <div className="have-issue-text">
            <p className="mt-2">
               <FormattedMessage
                  defaultMessage="Have issues? "
                  id="pageLoginHaveIssue"
               />
               <span
                  className="text-orange pointerType"
                  onClick={handleContactUs}
               >
                  <FormattedMessage
                     defaultMessage="Contact Us"
                     id="pageLoginContactUs"
                  />
               </span>
            </p>
         </div>
         <h6>
            &#169;
            <FormattedMessage
               defaultMessage="2020 Spiralmath Inc. All rights reserved.
          "
               id="componentFooterText"
            />
         </h6>
         {show ? <ContactUs /> : ""}
      </div>
   );
};

const mapStateToProps = createStructuredSelector({
   show: selectShow,
});

const mapDispatchToProps = (dispatch) => {
   return {
      toggleShow: () => dispatch(toggleShow()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
