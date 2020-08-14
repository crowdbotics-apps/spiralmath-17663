import React from "react";
import { Popover, InputGroup, FormControl } from "react-bootstrap";

const CustomPopover = () => {
  return (
    <React.Fragment>
      <Popover className="popover" id="popover-positioned-bottom">
        <Popover.Title as="h3">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Popover.Title>
        <Popover.Content></Popover.Content>
      </Popover>
    </React.Fragment>
  );
};

export default CustomPopover;
