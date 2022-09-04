import React from "react";

// Custom Components
import Header from "./common/header.layout";
import Navigation from "./common/navigation.layout";
import Footer from "./common/footer.layout";

function DefaultLayout({ children }) {
  return (
    <div>
      {/* Nagivation */}
      <Navigation />
      {/* <!-- Header--> */}
      <Header />
      {children}
      {/* <!-- Footer--> */}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
