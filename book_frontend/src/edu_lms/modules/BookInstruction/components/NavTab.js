import { Nav, NavItem } from "reactstrap";
import styled from "styled-components";
const NavTab = ({ classnames, activeTab, toggle }) => {
  return (
    <NavTabWrapper>
      <Nav tabs className="position-relative">
        <NavItem
          className={`${classnames({
            active: activeTab === "1",
          })} monkey-color-gray cursor monkey-fz-18 nav-item`}
          onClick={() => {
            toggle("1");
          }}
        >
          Mục lục
        </NavItem>
        <NavItem
          className={`${classnames({
            active: activeTab === "2",
          })} monkey-color-gray cursor monkey-fz-18 nav-item`}
          onClick={() => {
            toggle("2");
          }}
        >
          Thông tin
        </NavItem>
        <span className="active-concerned-parents start-nav active-animation"></span>
      </Nav>
    </NavTabWrapper>
  );
};
export default NavTab;

const NavTabWrapper = styled.div`
  .nav-item {
    width: 130px;
    &.active {
      border: none;
      background-color: transparent;
      color: red;
    }
    &:hover {
      color: red;
    }
  }
  .active-animation {
    position: absolute;
    height: 100%;
    top: 0;
    z-index: 0;
    background: red;
    width: 130px;
    transition: all 0.5s ease 0s;
    &.active-concerned-parents {
      height: 5px;
      top: inherit;
      bottom: -3px;
    }
  }
  .start-nav,
  .nav-item:nth-child(1).active ~ .active-concerned-parents {
    left: 0px;
  }

  .start-nav,
  .nav-item:nth-child(2).active ~ .active-concerned-parents {
    left: 130px;
  }

  .nav-item {
    padding: 1rem;
    cursor: pointer;
    text-align: center;
  }
`;
