import SectionBox from "./SectionBox";
import SectionInfo from "./SectionInfo";
import SectionBanner from "./SectionBanner";
import { dataSectionInfo, dataSectionBox } from "../config";
export const HomeWrapper = () => {
  return (
    <div className="home_wrapper bg-light">
      <SectionBox data={dataSectionBox} />
      <SectionBanner />
      <SectionInfo data={dataSectionInfo} />
    </div>
  );
};
export default HomeWrapper;
