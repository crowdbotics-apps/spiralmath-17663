import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Tabs,
  Tab,
  Navbar,
  Nav,
  Table,
  Form,
  Button,
} from "react-bootstrap";

import { userActions } from "../../redux/user/user.actions";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("home");

  useEffect(() => {
    dispatch(userActions.getAllUsers());
  }, []);

  const users = useSelector((state) => state.users.items);
  console.log(users);
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <Logo />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">users Management</Nav.Link>
          <Nav.Link href="#home">
            <pre> </pre>
          </Nav.Link>
          <Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="dashboard" title="Home"></Tab>
            <Tab eventKey="users" title="Users"></Tab>
            <Tab eventKey="user-types" title="User Types"></Tab>
            <Tab eventKey="settings" title="Settings"></Tab>
          </Tabs>
        </Nav>
        User
      </Navbar>
      <Form>
        <Form.Row>
          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationEmail">
            <Form.Label>Email</Form.Label>

            <Form.Control type="email" placeholder="Email" required />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="exampleForm.SelectCustom">
            <Form.Label>Custom select</Form.Label>
            <Form.Control as="select" custom>
              <option>SystemAdministrator</option>
              <option>Author</option>
              <option>Reviewer</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit">Close</Button>
          <Button type="submit">Create</Button>
        </Form.Row>
      </Form>

      <Row>
        <Col className="mt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Id</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Create User</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Jacob</td>
                <td>Jacob@gmail.com</td>
                <td>SystemAdministrator</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" label="Active" />
                </td>
                <td>
                  <pre>Delete Edit</pre>
                </td>
              </tr>
              <tr>
                <td>002</td>

                <td>Bhaluvendra</td>
                <td>Bhaluvendra@gmail.com</td>
                <td>SystemAdministrator</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" label="Active" />
                </td>
                <td>
                  <pre>Delete Edit</pre>
                </td>
              </tr>
              <tr>
                <td>003</td>
                <td>Sitamssa</td>
                <td>Sitamssa@gmail.com</td>
                <td>SystemAdministrator</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" label="Active" />
                </td>
                <td>
                  <pre>Delete Edit</pre>
                </td>
              </tr>
              <tr>
                <td>004</td>
                <td>Thornton</td>
                <td>Thornton@gmail.com</td>
                <td>Reviewer</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" label="Active" />
                </td>
                <td>
                  <pre>Delete Edit</pre>
                </td>
              </tr>
              <tr>
                <td>005</td>
                <td>@fat</td>
                <td>@fat@gmail.com</td>
                <td>Reviewer</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" label="Active" />
                </td>
                <td>
                  <pre>Delete Edit</pre>
                </td>
              </tr>
              <tr>
                <td>006</td>
                <td>@fat</td>
                <td>@fat@gmail.com</td>
                <td>Reviewer</td>
                <td>
                  <Form.Check type="switch" id="custom-switch" label="Active" />
                </td>
                <td>
                  <pre>Delete Edit</pre>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Dashboard;
