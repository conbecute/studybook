import { Link } from "react-router-dom";
import * as IMAGES from "../../constants/background";
const LogoComponent = () => {
  return (
    <Link className="navbar-brand m-auto" to="/">
      <img
        className="mr-2"
        style={{ height: "55px" }}
        src={IMAGES.LOGO_MONKEY}
        alt=""
      />
      {/* <img style={{ height: "40px" }} src={IMAGES.LOGO_VEPIC} alt="" /> */}
    </Link>
  );
};
export default LogoComponent;
