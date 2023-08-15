import { Navbar, Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

function Menu() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Row className="align-items-start">
          <Col>
            <Nav variant="underline">
              <Nav.Item>
                <Nav.Link className="m-0 text-center text-white" href="/">
                  Sol Stock
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/stock" eventKey="stock">
                  전일 주식 시세
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/news" eventKey="news">
                  주식 뉴스
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/graph" eventKey="graph">
                  주식 동향
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Menu;
