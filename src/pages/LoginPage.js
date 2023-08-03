import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Container } from "react-bootstrap";
import { useSpring, animated } from "react-spring";

const LoginPage = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  return (
    <animated.div style={fade}>
      <Container className='d-flex justify-content-center align-items-center vh-100'>
        <SignIn path='/login' routing='path' />
      </Container>
    </animated.div>
  );
};

export default LoginPage;
