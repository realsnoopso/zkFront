import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const { ethereum } = window;

// actions
const LOG_IN = "LOG_IN";
const GET_USER = "GET_USER";

// action creators
const login = createAction(LOG_IN, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const loginDB = () => {
  return function (dispatch, getState, { history }) {
    window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
      dispatch(login({ user: res[0], is_login: true }));
      setTimeout(function () {
        history.push("/2");
      }, 3000);
    });
  };
};

const loginCheckDB = () => {
  return async function (dispatch, getState, { history }) {
    console.log("hidafdsfa");
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("authroized account is: ", account);
      dispatch(login({ user: account, is_login: true }));
      // setCurrentAccount(account);
    } else {
      console.log("undefined");
    }
  };
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        localStorage.setItem("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = { loginDB, loginCheckDB };

export { actionCreators };
