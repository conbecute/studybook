import React from "react";
import { Accordion, Card } from "react-bootstrap";
import NavItem from "./NavItem";
import AccordionToggle from "./AccordionToggle";

const NavDashboard = ({
  dataNavDashboard,
  onChangeValueBreadcrumb,
  numberIndex,
  roleId,
  onAccordionToggle,
}) => {
  return (
    <Accordion defaultActiveKey={numberIndex} className="p-0">
      {dataNavDashboard.map((item, index) => {
        return (
          <Card
            key={index}
            className="rounded-0 border-0 monkey-bg-transparent"
          >
            <Card.Header className="p-0 rounded-0 monkey-bg-transparent">
              <AccordionToggle
                key={index}
                eventKey={item.index}
                value={item.value}
                icon={item.icon}
                data={item}
                onAccordionToggle={onAccordionToggle}
              />
            </Card.Header>
            <Accordion.Collapse eventKey={item.index}>
              <Card.Body>
                {roleId !== 0 &&
                  roleId !== 4 &&
                  item?.data[roleId].map((itemCard, indexCard) => {
                    return (
                      <NavItem
                        key={indexCard}
                        onChangeValueBreadcrumb={onChangeValueBreadcrumb}
                        data={itemCard}
                      />
                    );
                  })}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })}
    </Accordion>
  );
};
export default NavDashboard;
