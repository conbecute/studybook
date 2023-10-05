import TitleComponent from "../../../components/title";
import { dataDownloadPage } from "../../selection";
const DownloadWrapper = (props) => {
  const data = dataDownloadPage;
  return (
    <div className="contact_wrapper">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            <TitleComponent
              title="phần mềm easycode"
              className="hoc10-bg-download text-uppercase monkey-fz-34 text-center mb-5"
            />
            <div className="introduce-header border-bottom monkey-pb-20 monkey-mb-30 ">
              <div className="col d-flex justify-content-center">
                {data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-12 col-sm-6 col-md-4 col-lg-4"
                    >
                      <div className="introduce-box mb-4">
                        <div className="introduce-box-content background-style d-flex justify-content-center align-items-end lazy">
                          <a
                            className="w-100 cursor p-5 monkey-bg-white"
                            href={item.url}
                            target="_blank"
                          >
                            <img className="w-100" src={item.thumb} alt="#" />
                          </a>
                        </div>
                        <div className="content-video monkey-f-medium p-3 monkey-bg-white border-top">
                          <p
                            className="monkey-fz-16 monkey-f-bold d-flex align-items-center"
                            style={{ height: "30px" }}
                          >
                            <a
                              className="w-100 cursor hoc10-bg-download text-center "
                              href={item.url}
                              target="_blank"
                            >
                              {item.title}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadWrapper;
