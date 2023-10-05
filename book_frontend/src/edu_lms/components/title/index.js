import renderHTML from "react-render-html";

const TitleComponent = (props) => {
  return (
    <div className={`box-success`}>
      <div className="txt-2 border-bottom text-center text-fsize pb-4 mb-3 ">
        Vui lòng đăng nhập
      </div>
      <p className={`${props.className || ""} pt-3`}>
        {props.title ? renderHTML(props.title) : ""}
      </p>
    </div>
  );
};

export default TitleComponent;
