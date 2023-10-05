import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import FillTheBlankWithTableTextWrapper from "./components";
import { onResultIcon } from "../../selection";
import { onDispatchDataAlert } from "../../../ListQuestion/actions";
import { AlertSuccess, AlertError, AlertDefault } from "../../selection";
import { postHistoryGame } from "../../../../services/readingBook";

const FillTheBlankWithTableText = ({
  data,
  dataDefault,
  objectId,
  titleTable,
  alert,
  languageBook,
  iconList,
  onDispatchDataAlert,
}) => {
  const [dataConfig, setStateDataConfig] = useState([]);
  const [isButtonReset, setStateButtonReset] = useState(false);
  const [dataInput, setDataInput] = useState({});

  useEffect(() => {
    setDataInput({
      ...dataDefault.game_config,
      data: { ...dataDefault.game_config.data, table: [] },
    });
  }, [dataDefault]);

  useEffect(() => {
    if (dataInput?.data?.table.length) {
      let dataPost = {
        objectId: objectId,
        gameId: dataDefault.game_id,
        data: JSON.stringify(dataInput),
      };
      postHistoryGame(dataPost);
    }
  }, [dataInput]);

  useEffect(() => {
    const dataConfig = data.map((item) => ({
      ...item,
      status: false,
      value: onResultIcon(item.column_1.icon_id, iconList).props[0].text,
    }));
    setStateDataConfig(dataConfig);
    return () => {
      onDispatchDataAlert(AlertDefault);
    };
  }, [data]);

  const onHandleForm = (data) => {
    const dataConvert = dataConfig.map((item) => {
      let status = null;
      data.forEach((i) => {
        const iconId = item.column_1.icon_id.replace(/[^a-zA-Z0-9 ]/g, "");
        if (i.icon_id === iconId) {
          status = i.value === item.value.toLowerCase() ? 1 : 2;
        }
      });
      return { ...item, status };
    });
    let resultStatus = [];
    _.forEach(dataConvert, function (item) {
      if (item.status) {
        resultStatus = [...resultStatus, item.status];
      }
    });
    const isStatus = resultStatus.includes(2);
    setDataInput({
      ...dataInput,
      data: {
        ...dataInput.data,
        table: dataConvert,
        results: isStatus ? 0 : 1,
      },
    });
    if (!isStatus) {
      onDispatchDataAlert(AlertSuccess);
    } else {
      onDispatchDataAlert(AlertError);
    }
    setStateDataConfig(dataConvert);
    setStateButtonReset(!isStatus);
  };
  const onResetForm = (reset) => {
    const dataConfig = data.map((item) => ({
      ...item,
      status: false,
      value: onResultIcon(item.column_1.icon_id, iconList).props[0].text,
    }));
    setStateDataConfig(dataConfig);
    setStateButtonReset(false);
    onDispatchDataAlert(AlertDefault);
    reset();
  };
  const handleDispatchDataAlert = (dataAlert) => {
    onDispatchDataAlert(dataAlert);
  };
  return (
    <FillTheBlankWithTableTextWrapper
      titleTable={titleTable}
      iconList={iconList}
      data={dataConfig}
      isButtonReset={isButtonReset}
      alert={alert}
      languageBook={languageBook}
      onHandleForm={onHandleForm}
      onResetForm={onResetForm}
      handleDispatchDataAlert={handleDispatchDataAlert}
    />
  );
};
const mapStateToProps = (state) => {
  const { alert } = state.listQuestion;
  const { languageBook } = state.readingBookReducers;
  return {
    alert,
    languageBook,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onDispatchDataAlert,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FillTheBlankWithTableText);
