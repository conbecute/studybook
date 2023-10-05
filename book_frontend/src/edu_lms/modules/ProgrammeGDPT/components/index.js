import BoxItem from "../../../components/BoxItem";

const ProgrammerWrapper = (props) => {
  return (
    <div className="programmer_wrapper">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            {props.data.map((item, index) => {
              return <BoxItem key={index} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProgrammerWrapper;
