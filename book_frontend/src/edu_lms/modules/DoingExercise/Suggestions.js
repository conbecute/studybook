import classNames from "classnames";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ItemSuggestion from "./ItemSuggestion";
import ideaImg from "edu_lms_v2/assets/img/idea.svg";

export default function Suggestions({
  suggestions,
  iconList,
  typeText,
  handleClickAudio,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [newSuggestions, setNewSuggestions] = useState();
  const [data, setData] = useState();
  const countStep = newSuggestions ? Object.keys(newSuggestions).length : 0;
  useEffect(() => {
    const newArr = suggestions?.reduce((group, suggestion) => {
      const index = suggestion.index;
      group[index - 1] = group[index - 1] ?? [];
      group[index - 1].push(suggestion);
      return group;
    }, {});
    setNewSuggestions(newArr);
  }, [suggestions]);

  useEffect(() => {
    const newData = newSuggestions
      ? newSuggestions[currentPage]?.map((suggestion) =>
          iconList.find((icon) => icon.icon_id === suggestion.icon_id)
        )
      : [];
    setData(newData);
  }, [currentPage, newSuggestions]);

  const onClickPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClickNext = () => {
    if (currentPage < countStep - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Wrapper className="pb-5 pl-4">
        <Step className="ml-md-4">
          <img src={ideaImg} alt="#" width={20} />
          <span className="ml-2">
            Gợi ý:
            <span className="ml-3">
              {currentPage + 1}/{countStep}
            </span>
          </span>
        </Step>
        {data?.length > 0 &&
          data.map((item, index) => (
            <ItemSuggestion
              data={item}
              typeText={typeText}
              handleClickAudio={handleClickAudio}
              key={index}
            />
          ))}
        <Footer>
          <Button
            className={classNames("mx-2", {
              prev: currentPage > 0,
              disabled: currentPage <= 0,
            })}
            onClick={() => onClickPrev()}
          >
            Quay lại
          </Button>
          <Button
            className={classNames("mx-2 next", {
              next: currentPage < countStep - 1,
              disabled: currentPage >= countStep - 1,
            })}
            onClick={() => onClickNext()}
          >
            Xem tiếp
          </Button>
        </Footer>
      </Wrapper>
    </>
  );
}

const Button = styled.button`
  width: 120px;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  &.prev {
    background-color: #a6a6a6;
  }
  &.next {
    background-color: #f70;
  }
  &.prev:hover,
  &.next:hover {
    background-color: #e36b09;
  }
  &.disabled {
    pointer-events: none;
    background-color: #ccc;
  }
  @media (max-width: 500px) {
    font-size: 16px;
    width: 100px;
    padding: 5px;
  }
`;
const Footer = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;
const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border: 1px solid #ff7707;
  border-radius: 5px;
  width: 180px;
  text-align: center;
  vertical-align: center;
  padding: 5px;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;
const Wrapper = styled.div`
  line-height: 1.8;
`;
