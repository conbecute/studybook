import { Collapse, Button, CardBody, Card } from "reactstrap";
import React, { useState, useEffect } from "react";

const VideoSupport = ({ data, status }) => {
  const [collapse, setCollapse] = useState(status);
  useEffect(() => {
    setCollapse(status);
  }, [status]);
  const toggle = () => setCollapse(!collapse);
  return (
    <div className="video-support-wrapper mt-5 mb-5">
      <div className="cursor">
        <a className="monkey-color-black" onClick={toggle}>
          <span className="monkey-color-blue">
            Xem video hoặc sử dụng gợi ý
          </span>
        </a>
      </div>
      <Collapse isOpen={collapse}>
        <Card className="border-0 monkey-bg-transparent">
          <CardBody>
            {data.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default VideoSupport;
