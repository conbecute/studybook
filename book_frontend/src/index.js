import React from "react";
import { hydrate, render } from "react-dom";
import { Provider } from "react-redux";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "edu_lms_v2/assets/css/bootstrap.min.scss";
import "font-awesome/css/font-awesome.min.css";
import "slick-carousel/slick/slick.css";

import "react-toastify/dist/ReactToastify.css";
import "edu_lms_v2/assets/css/style.scss";
import "edu_lms_v2/hoc10.scss";

// import "slick-carousel/slick/slick-theme.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-fancybox/lib/fancybox.css";
// import "react-phone-input-2/lib/style.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "./main.css";
import App from "edu_lms/modules/App";
import store from "edu_lms/redux/configureStore";
import reportWebVitals from "reportWebVitals";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { isSSR } from "edu_lms_v2/utils";

const rootElement = document.getElementById("root");

const Hoc10 = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

Sentry.init({
  dsn: "https://dec7e9954abb4f30ae93423cde3cb9f7@o293835.ingest.sentry.io/6610281",
  integrations: [new BrowserTracing()],
  enabled: false,
  // enabled:
  //   !isSSR &&
  //   process.env.NODE_ENV === "production" &&
  //   process.env.REACT_APP_ENVIROMENT === "production",
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.25,
});

render(<Hoc10 />, rootElement);

// if (rootElement.hasChildNodes()) {
//   hydrate(<Hoc10 />, rootElement);
// } else {
//   render(<Hoc10 />, rootElement);
// }

reportWebVitals();
