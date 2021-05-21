import axios from 'axios';
import FileDownload from 'js-file-download';
import { Row, Col, Button, Card } from 'react-bootstrap';
import styles from '../styles/certGenStyles.module.css';

const Home = ({ setBodyState }) => {
  const downloadCsvTemplate = (templateName) => {
    axios({
      method: 'get',
      url: `/private/csv-template/${templateName}`,
      responseType: 'blob',
    }).then((response) => {
      FileDownload(response.data, `${templateName}.csv`);
    });
  };

  return (
    <div className={styles.container}>
      <Row className={styles.buttons}>
        <Col md={6} sm={12}>
          <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>Downloads</Card.Header>
            <Card.Body className={styles.cardBody}>
              <Button
                className={styles.button}
                onClick={() => downloadCsvTemplate('coordinators')}
              >
                Coordinators CSV Template
              </Button>
              <Button
                className={styles.button}
                onClick={() => downloadCsvTemplate('participants')}
              >
                Participants CSV Template
              </Button>
              <Button
                className={styles.button}
                onClick={() => downloadCsvTemplate('winners')}
              >
                Winners CSV Template
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} sm={12}>
          <Card className={styles.card}>
            <Card.Header className={styles.cardHeader}>Additional</Card.Header>
            <Card.Body className={styles.cardBody}>
              <Button
                className={styles.button}
                onClick={() => setBodyState('eventAdd')}
              >
                Add an Event
              </Button>
              <Button
                className={styles.button}
                onClick={() => setBodyState('sendCerts')}
              >
                Mail Certificates
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
