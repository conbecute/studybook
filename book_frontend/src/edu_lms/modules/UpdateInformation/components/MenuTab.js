const MenuTab = (props) => {
  return (
    <div className="menu_tab_wrapper">
      <i className={`${props.data.icon} fa mr-2 money-fz-18`}></i>{" "}
      {props.data.value}
    </div>
  );
};
export default MenuTab;
