import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import MainHeader from "./components/MainHeader/MainHeader";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import UseWinSize from "./utils/hooks/UseWinSize";
import { loadLogoData } from "./store/logo/operations";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogoLoading } from "./store/selectors/logoSelectors";
import { getIsNavbarLoading } from "./store/selectors/navbarSelectors";
import { loadNavbarData } from "./store/navbar/operations";
import { loadMainSection } from "./store/appMainSections/operations";
import "./theme/styles/App.scss";
import FeedbackForm from "./components/FeedbackForm/Main/FeedbackForm";
import ErrorModal from "./components/ErrorModal/ErrorModal";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNavbarData());
    dispatch(loadMainSection());
    dispatch(loadLogoData());
  }, [dispatch]);

  const isLogoLoading = useSelector(getIsLogoLoading);
  const isNavbarLoading = useSelector(getIsNavbarLoading);
  const {width: winWidth} = UseWinSize();

  if (isNavbarLoading || isLogoLoading) {
    return (
      <div className="App">
        <Loader />
      </div>
    );
  }

  return (
    <div className="App">
      <MainHeader />
      <FeedbackForm />
      <ErrorModal />
      <AppRoutes />
      {winWidth > 640 && <Footer />}
    </div>
  );
};

export default App;
