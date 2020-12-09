import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import MainHeader from "./components/MainHeader/MainHeader";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import UseWinSize from "./utils/hooks/UseWinSize";
import { loadLogoData } from "./store/logo/operations";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogoLoading } from "./store/logo/selectors";
import { getIsNavbarLoading } from "./store/navbar/selectors";
import { loadNavbarData } from "./store/navbar/operations";
import { loadMainSection } from "./store/appMainSections/operations";
import "./theme/styles/App.scss";
import FeedbackForm from "./components/FeedbackForm/Main/FeedbackForm";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import { loadFeatures } from "./store/aboutUs/operations";
import { loadPackages } from "./store/servicePackages/operations";
import { loadWorkStages } from "./store/workStages/operations";
import { loadReviews } from "./store/ReviewCarousel/operations";
import { useHistory } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const { location } = useHistory();

  useEffect(() => {
    dispatch(loadNavbarData());
    dispatch(loadMainSection());
    dispatch(loadLogoData());
    dispatch(loadFeatures());
    dispatch(loadPackages());
    dispatch(loadWorkStages());
    dispatch(loadReviews());
  }, [dispatch]);

  const isLogoLoading = useSelector(getIsLogoLoading);
  const isNavbarLoading = useSelector(getIsNavbarLoading);
  const { width: winWidth } = UseWinSize();

  if (isNavbarLoading || isLogoLoading) {
    return (
      <div className="App">
        <Loader />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App__bg">
        <div className="App__main-page">
          {location.pathname !== "/admin" && <MainHeader />}
          <FeedbackForm />
          <ErrorModal />
          <AppRoutes />
          {winWidth > 640 || (location.pathname !== "/admin" && <Footer />)}
        </div>
      </div>
    </div>
  );
};

export default App;
