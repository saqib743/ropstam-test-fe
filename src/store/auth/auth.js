import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from "../../config.json";

const baseUrl = configData.urls.baseUrl;
const signInURL = configData.urls.signIn;
const roleShortCode = configData.roleShortCode;

const slice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isError: false,
    errorMessage: "",
    loading: false,
    loggedIn: false,
    token: "",
  },
  reducers: {
    authRequested: (auth, action) => {
      auth.isError = false;
      auth.errorMessage = "";
      // console.log("headers", { ...headers });
      auth.loggedIn = false;
      auth.loading = true;
    },
    authRecieved: (auth, action) => {
      auth.user = action.payload.user;
      // auth.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      auth.token = action.payload.token;
      auth.isError = false;
      auth.errorMessage = "";
      auth.loggedIn = true;
      auth.loading = false;
      localStorage.setItem("loggedIn", auth.loggedIn);
    },
    resetAuthIsError: (auth, action) => {
      auth.isError = false;
    },
    authRequestFailed: (auth, action) => {
      auth.isError = true;
      auth.errorMessage = action.payload.message;
      auth.loggedIn = false;
      auth.token = "";
      localStorage.setItem("loggedIn", auth.loggedIn);
      localStorage.setItem("token", auth.token);
      auth.loading = false;
    },
    currentAuthRecieved: (auth, action) => {
      auth.user = action.payload.user;
      auth.token = action.payload.token;
      auth.loggedIn = true;
      auth.loading = false;
      auth.isError = false;
      auth.errorMessage = "";

      localStorage.setItem("token", auth.token);
      localStorage.setItem("loggedIn", auth.loggedIn);
    },
    authLoggedOut: (auth, action) => {
      auth.user = {};
      auth.loggedIn = false;
      auth.token = "";
      localStorage.setItem("loggedIn", auth.loggedIn);
      localStorage.setItem("token", auth.token);
      auth.loading = false;
    },
    userAlreadySignedInRequested: (auth, action) => {
      auth.loading = true;
    },
    userAlreadySignedInFailed: (auth, action) => {
      auth.loading = false;
      auth.isError = true;
      auth.errorMessage = action.payload.message;
      auth.loggedIn = false;
    },
    profileChangeRequested: (auth, action) => {
      auth.isErrorProfileSave = false;
      auth.profileSave = false;
      auth.errorMessageProfileSave = "";
    },
    profileChangeSuccess: (auth, action) => {
      auth.isErrorProfileSave = false;
      auth.errorMessageProfileSave = "";
      auth.profileSave = true;
      auth.user.profile = action.payload;
    },
    resetProfileSave: (auth, action) => {
      auth.profileSave = false;
    },
    profileChangeFailed: (auth, action) => {
      auth.isErrorProfileSave = true;
      auth.profileSave = false;
      auth.errorMessageProfileSave = action.payload.message;
    },
    profileEmailChangeRequested: (auth, action) => {
      auth.isErrorEmailSave = false;
      auth.emailSave = false;
      auth.errorMessageEmailSave = "";
    },
    accountSaveRequested: (auth, action) => {
      auth.isErrorAccountSettingSave = false;
      auth.accountSettingSave = false;
      auth.errorMessageAccountSettingSave = "";
    },
    accountSaveSuccess: (auth, action) => {
      auth.isErrorAccountSettingSave = false;
      auth.accountSettingSave = true;
      auth.errorMessageAccountSettingSave = "";
    },
    accountSaveFailed: (auth, action) => {
      auth.isErrorAccountSettingSave = true;
      auth.accountSettingSave = false;
      auth.errorMessageAccountSettingSave = action.payload.message;
    },
    profileEmailChangeSuccess: (auth, action) => {
      auth.isErrorEmailSave = false;
      auth.errorMessageEmailSave = "";
      auth.emailSave = true;
      auth.user.email = action.payload.user.email;
    },
    resetEmailSave: (auth, action) => {
      auth.emailSave = false;
    },
    resetEmailSaveError: (auth, action) => {
      auth.isErrorEmailSave = false;
    },
    resetProfileSaveError: (auth, action) => {
      auth.isErrorProfileSave = false;
    },
    profileEmailChangeFailed: (auth, action) => {
      auth.isErrorEmailSave = true;
      auth.emailSave = false;
      auth.errorMessageEmailSave = action.payload.message;
    },
    profilePasswordChangeRequested: (auth, action) => {
      auth.isErrorPasswordSave = false;
      auth.passwordSave = false;
      auth.errorMessagePasswordSave = "";
    },
    profilePasswordChangeSuccess: (auth, action) => {
      auth.isErrorPasswordSave = false;
      auth.passwordSave = true;
      auth.errorMessagePasswordSave = "";
    },
    resetPasswordSave: (auth, action) => {
      auth.passwordSave = false;
    },
    profilePasswordChangeFailed: (auth, action) => {
      auth.isErrorPasswordSave = true;
      auth.passwordSave = false;
      auth.errorMessagePasswordSave = action.payload.message;
    },
    resetAccountSettingSave: (auth, action) => {
      auth.accountSettingSave = false;
    },
  },
});

export const {
  authRequested,
  authRecieved,
  authRequestFailed,
  currentAuthRecieved,
  userAlreadySignedInRequested,
  userAlreadySignedInFailed,
  profileChangeRequested,
  profileChangeSuccess,
  resetProfileSave,
  resetAuthIsError,
  resetAccountSettingSave,
  resetEmailSave,
  resetEmailSaveError,
  resetProfileSaveError,
  resetPasswordSave,
  profileChangeFailed,
  profileEmailChangeRequested,
  profileEmailChangeSuccess,
  profileEmailChangeFailed,
  accountSaveRequested,
  accountSaveSuccess,
  accountSaveFailed,
  // authLoggedOut,
  authLoggedOut,
} = slice.actions;

export const authenticateUser = (email, passWord) =>
  apiCallBegan({
    url: signInURL,
    method: "post",
    data: {
      email: email,
      password: passWord,
    },
    // headers: {
    //     ...headers,
    // },
    onStart: authRequested.type,
    onSuccess: authRecieved.type,
    onError: authRequestFailed.type,
  });

export default slice.reducer;
