import logo from './logo.svg';
import './App.css';
import './stylesheet.css';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  return (
    <div className="overlay">
      <Container className={"shopcontainer"} fluid>
          <Row>
              <Col>
                  <div className={"item"}>
                      <img src="https://www.mandysam.com/img/random.jpg" alt="item1"/>
                      <h2>Item 1</h2>
                  </div>
              </Col>
              <Col sm>
                  <div className={"item"}>
                      <img src="https://www.computerhope.com/jargon/r/random-dice.jpg" alt="item1"/>
                      <h2>Item 2</h2>
                  </div>
              </Col>
              <Col sm>
                  <div className={"item"}>
                      <img src="https://www.gamasutra.com/db_area/images/news/2018/Jun/320213/supermario64thumb1.jpg" alt="item 3"/>
                      <h2>Item 3</h2>
                  </div>
              </Col>
              <Col sm>
                  <div className={"item"}>
                      <img src="https://www.gamasutra.com/db_area/images/news/2018/Jun/320213/supermario64thumb1.jpg" alt="item 3"/>
                      <h2>Item 3</h2>
                  </div>
              </Col>
              <Col sm>
                  <div className={"item"}>
                      <img src="https://www.gamasutra.com/db_area/images/news/2018/Jun/320213/supermario64thumb1.jpg" alt="item 3"/>
                      <h2>Item 3</h2>
                  </div>
              </Col>
          </Row>

      </Container>
    </div>
  );
}

export default App;
