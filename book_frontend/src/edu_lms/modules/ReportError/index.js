import styled from "styled-components";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReportBugButton from "../../assets/images/report-bug-button.svg";

const Image = styled.img`
  position: fixed;
  bottom: 120px;
  right: 24px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  z-index: 10;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const ReportError = ({ onReport }) => (
  <OverlayTrigger
    placement="left"
    overlay={<Tooltip id="reportbug-tooltip">Góp ý/Báo lỗi </Tooltip>}
  >
    <Image src={ReportBugButton} onClick={onReport} />
  </OverlayTrigger>
);

export default ReportError;
