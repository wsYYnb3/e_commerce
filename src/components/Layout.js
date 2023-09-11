import React from "react";
import Header from "./Header";
import { ContentWrapper } from "../styles/LayoutStyles";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};
export default Layout;
