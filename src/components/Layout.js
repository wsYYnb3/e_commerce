import React from "react";
import Header from "./Header";
import styled from "styled-components";

const ContentWrapper = styled.div`
  padding: 20px 0;
`;
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};
export default Layout;
