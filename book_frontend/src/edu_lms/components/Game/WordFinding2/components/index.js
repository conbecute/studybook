import React, { Fragment, useEffect, useState } from "react";
import { styleWrapper, styleFooterWrapper } from "../../selection";
import FooterComponent from "./FooterComponent";
import ButtonReset from "../../DragDrop/component/ButtonReset";
import TitleQuestionTextAndImage from "../../component/TitleQuestionTextAndImage";

const WordFindingWrapper = ({
  isButtonReset,
  data,
  isDisabled,
  typeQuestion,
  arraySelected,
  typeText,
  fontSize,
  onActiveText,
  onResetData,
  onCheckAnswers,
}) => {
  if (isButtonReset) {
    arraySelected.map((item, index) => {
      item.map((item2) => {
        let element = document.getElementById(item2.text + "-" + index);
        if (item2.status == 1) {
          element.style.backgroundColor = "#92c83e";
        } else if (item2.status == 2) {
          element.style.backgroundColor = "#ee202e";
        }
      });
    });

    let lines = document.querySelectorAll(".find-words-body div");
    for (let i = 0; i < lines.length; i++) {
      let element = lines[i];
      let innerHTML = "";

      for (var j = 0; j < element.childNodes.length; ++j) {
        if (element.childNodes[j].nodeType === Node.TEXT_NODE) {
          let textContent = element.childNodes[j].textContent;
          data.answers[i].answer_result.map((item, index) => {
            if (textContent.includes(item)) {
              textContent = textContent.replace(
                item,
                `<span style="border: 2px solid #92c83e; border-radius: 10px;">${item}</span>`
              );
            }
          });
          innerHTML += textContent;
        } else {
          innerHTML += element.childNodes[j].outerHTML;
        }
      }
      lines[i].innerHTML = innerHTML;
    }
  } else {
    let lines = document.querySelectorAll(".find-words-body div");
    for (let i = 0; i < lines.length; i++) {
      lines[i].innerHTML = data?.answers[i].answer_text;
    }
  }

  const handleMouseUp = (index) => {
    if (!isButtonReset) {
      console.log(window.getSelection);

      var userSelection = window.getSelection();
      if (
        userSelection.anchorNode &&
        userSelection.anchorNode == userSelection.extentNode
      ) {
        onActiveText(window.getSelection().toString(), index);
        for (var i = 0; i < userSelection.rangeCount; i++) {
          highlightRange(
            userSelection.getRangeAt(i),
            window.getSelection().toString(),
            index
          );
        }
      }
    }
  };

  function highlightRange(range, text, index) {
    var newNode = document.createElement("span");
    newNode.setAttribute(
      "style",
      "background-color: yellow; display: inline; border-radius: 10px; pointer-events: none; user-select: none; id: " +
        text +
        "-" +
        index +
        ";"
    );
    newNode.setAttribute("id", `${text.trim()}-${index}`);
    newNode.appendChild(range.extractContents());
    range.insertNode(newNode);
  }

  return (
    <Fragment>
      <div className="find-words-container" style={{ ...styleWrapper }}>
        <TitleQuestionTextAndImage
          text={data?.question?.props[0]?.text}
          urlImage={data?.question?.path}
          typeQuestion={typeQuestion}
          typeText={typeText}
        />
        <div className="p-3 quicksand-medium">
          <div className="find-words-body mb-3 pr-3 pl-5 monkey-fz-30">
            {data?.answers.map((item, index) => {
              return (
                <div
                  className="p-2"
                  id={index}
                  onMouseUp={() => handleMouseUp(index)}
                >
                  {item?.answer_text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="find-words-footer d-flex justify-content-end text-right pr-3"
        style={{ ...styleFooterWrapper }}
      >
        <FooterComponent
          onResetData={onResetData}
          onCheckAnswers={onCheckAnswers}
        />
      </div>
    </Fragment>
  );
};
export default WordFindingWrapper;
