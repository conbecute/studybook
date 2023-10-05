import TitleComponent from "../../../components/title";
import TextContentComponent from "../../../components/TextContent";
// import { isMobile } from "react-device-detect";
import { COLOR_BLUE_2 } from "../../../constants/type";
export const SectionBoxItem = ({ data, index }) => {
  return (
    <div className="section_box_item">
      <TitleComponent
        title={data.title}
        className="monkey-color-violet monkey-mt-40 text-uppercase monkey-fz-34 monkey-mb-40 text-center"
      />

      <TextContentComponent
        content={data.content}
        className="monkey-mb-40 monkey-fz-20 text-center line-height-1-5"
      />
      {data.listImage.length > 0 && (
        <div className="list-image monkey-mb-40">
          <div className="row">
            {data.listImage.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-3 col-sm-6 col-12 text-center d-flex justify-content-sm-center align-items-center"
                >
                  <div className="list-image-content mb-3">
                    <img src={item.src} alt="#" />
                    <p className="mt-3">{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {index < 2 && (
        <div
          style={{
            width: "70px",
            height: "4px",
            backgroundColor: COLOR_BLUE_2,
            margin: "60px auto",
            borderRadius: "15px",
          }}
        ></div>
      )}
    </div>
  );
};
export default SectionBoxItem;
