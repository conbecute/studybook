import { select, all, fork, cancel, takeLatest } from "redux-saga/effects";

export function* watchRouteSagas() {}

export default function* routes() {
  yield all([fork(watchRouteSagas)]);
}
