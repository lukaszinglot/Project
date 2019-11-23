import heroku from "../../api/heroku";
import { FETCH_USER, USER_LOGIN, USER_REGISTER } from "./actiontypes";
import database from "../../firebase/firebase";

export function fetchUsers(data) {
  return {
    type: FETCH_USER,
    data
  };
}

export function fetchLogin(data) {
  return {
    type: USER_LOGIN,
    data
  };
}

export function fetchRegister(data) {
  return {
    type: USER_REGISTER,
    data
  };
}

export const userValidationLogin = (email, password) => dispatch => {
  heroku.post("/login", { email, password }).then(data => {
    const user = { email: email, status: data.data };
    database.ref("user").push(user);
    console.log(data);
    if (data.data === "Success") {
      dispatch(fetchLogin(user));
    }
  });
};

export const userValidationRegister = (email, password) => dispatch => {
  heroku.post("/register", { email, password }).then(data => {
    const registered = { email: email };
    if (data.data === "Registered") {
      dispatch(fetchRegister(registered));
    } else {
      console.log("You cant register!");
    }
  });
};
