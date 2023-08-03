import React from "react";
import { Formik, Field, Form } from "formik";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import styled from "@emotion/styled";
import { useSpring, animated } from "react-spring";

const ContactCard = styled(Card)`
  margin-top: 1rem;
  transition: 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;

const SupportPage = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  return (
    <animated.div style={fade}>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12} md={8} lg={6}>
            <h1 className='text-center my-4'>Support Center</h1>
            <ContactCard>
              <Card.Body>
                <Card.Title>
                  <FaEnvelope /> Email Support
                </Card.Title>
                <Card.Text>support@yielddeal.com</Card.Text>
              </Card.Body>
            </ContactCard>
            <ContactCard>
              <Card.Body>
                <Card.Title>
                  <FaPhone /> Phone Support
                </Card.Title>
                <Card.Text>+1-800-123-4567</Card.Text>
              </Card.Body>
            </ContactCard>
            <h4 className='my-4'>Or send us a message</h4>
            <Formik
              initialValues={{
                name: "",
                email: "",
                message: "",
              }}
              onSubmit={async (values) => {
                alert(JSON.stringify(values, null, 2));
                // You would send the form values to your server here.
              }}
            >
              <Form>
                <label htmlFor='name'>Name</label>
                <Field
                  id='name'
                  name='name'
                  placeholder='John Doe'
                  className='form-control'
                />

                <label htmlFor='email' className='mt-3'>
                  Email
                </label>
                <Field
                  id='email'
                  name='email'
                  placeholder='john.doe@example.com'
                  type='email'
                  className='form-control'
                />

                <label htmlFor='message' className='mt-3'>
                  Message
                </label>
                <Field
                  id='message'
                  name='message'
                  as='textarea'
                  rows='3'
                  className='form-control'
                />

                <Button variant='primary' type='submit' className='mt-3'>
                  Submit
                </Button>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default SupportPage;
