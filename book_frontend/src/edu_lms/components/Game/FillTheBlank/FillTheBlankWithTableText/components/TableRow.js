import React, { Fragment, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import {
  TYPE_SPLIT,
  COLOR_RED,
  COLOR_GRAY,
  COLOR_BLUE,
  URL_AUDIO,
} from "../../../../../constants/type";
import { onResultIcon } from "../../../selection";

const TableRow = ({ index, data, iconList, innerRef }) => {
  const [srcAudio, setStateSrcAudio] = useState("");
  const [valueInput, setStateValueInput] = useState("?");

  const onFocusInputPage = () => {
    setStateValueInput("");
  };
  const onBlurInputPage = () => {
    if (valueInput) {
      setStateValueInput("");
    } else {
      setStateValueInput("?");
    }
  };
  const onPlayAudio = (src) => {
    setStateSrcAudio(src);
  };
  const idAnswer = data.column_1.icon_id.replace(/[^a-zA-Z0-9 ]/g, "");
  return (
    <Fragment>
      <tr className="text-center quicksand-medium">
        <th scope="row" className="vertical-middle">
          {index + 1}
        </th>
        <td className="vertical-middle">
          {!data.column_1.blank &&
            onResultIcon(data.column_1.icon_id, iconList).props[0].text}
          {data.column_1.blank && (
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control monkey-fz-20 text-center"
                style={{
                  width: "100px",
                  height: "35px",
                  margin: "auto",
                  border: `1px solid ${onColorBorder(data.status)}`,
                }}
                name={`${idAnswer}${TYPE_SPLIT}-${index}`}
                ref={innerRef}
                autoComplete="off"
                onFocus={onFocusInputPage}
                onBlur={onBlurInputPage}
                placeholder={valueInput}
              />
            </div>
          )}
        </td>
        <td className="vertical-middle">
          {!data.column_2.blank && (
            <Fragment>
              <span>
                {onResultIcon(data.column_2.icon_id, iconList).props[0].text}
              </span>
              <span>
                <i
                  onClick={() =>
                    onPlayAudio(
                      `${URL_AUDIO}${
                        onResultIcon(data.column_2.icon_id, iconList).props[0]
                          .audio[0].path
                      }`
                    )
                  }
                  className=" monkey-fz-18 fa fa-volume-up ml-3 cursor"
                  aria-hidden="true"
                ></i>
              </span>
              <ReactAudioPlayer
                src={srcAudio}
                className="d-none"
                autoPlay={true}
                controls={true}
                onEnded={() => setStateSrcAudio("")}
              />
            </Fragment>
          )}
        </td>
      </tr>
    </Fragment>
  );
};

export default TableRow;

function onColorBorder(status) {
  switch (status) {
    case 1:
      return COLOR_BLUE;
    case 2:
      return COLOR_RED;
    default:
      return COLOR_GRAY;
  }
}
