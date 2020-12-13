import React from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import UserRoutes from "../../routes/UserRoutes";
import Footer from "../../components/Footer/Footer";
import UseWinSize from "../../utils/hooks/UseWinSize";

const UserAppPage = () => {
  const { width: winWidth } = UseWinSize();

  return (
    <>
      <MainHeader />
      <UserRoutes />
      {winWidth > 640 && <Footer />}
    </>
  );
};

export default UserAppPage;
