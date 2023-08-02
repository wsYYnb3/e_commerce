import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Container } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';

const SignUpPage = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  
  return (
    <animated.div style={fade}>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <SignUp path="/sign-up" routing="path" />
      </Container>
    </animated.div>
  );
};

export default SignUpPage;
