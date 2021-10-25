import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, db } from "../config";

export function createAction(type, payload) {
  return {
    type,
    payload,
  };
}
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            user: { ...action.payload },
          };
        case "REMOVE_USER":
          return {
            ...state,
            user: undefined,
          };
        case "SET_LOADING":
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    }
  );
  const auth = React.useMemo(
    () => ({
      login: async (username, password) => {
        let { data } = await axios
          .post(
            `${BASE_URL}/api/auth/get_tokens/?db=${db}&username=${username}&password=${password}`,
            undefined,
            { withCredentials: false }
          )
          .catch((error) => {
            console.log("login error ::: " + error);
          });
        console.log("login success ");

        let user = {
          token: data.access_token,
          userinfo: false,
        };

        await AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch(createAction("SET_USER", user));

        let userinfo = "";

        await fetch(`${BASE_URL}/api/userinfo`, {
          credentials: "omit",
          headers: {
            access_token: user.token,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log("user data success ");
            user.userinfo = res;
          })
          .catch((error) => {
            console.log("user data error : " + error);
          });
        // user.userinfo = res;

        await AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch(createAction("SET_USER", user));
      },
      logout: async () => {
        await AsyncStorage.removeItem("user");
        dispatch(createAction("REMOVE_USER"));
      },
    }),
    []
  );
  React.useEffect(() => {
    sleep(2000).then(() => {
      AsyncStorage.getItem("user").then((user) => {
        if (user) {
          dispatch(createAction("SET_USER", JSON.parse(user)));
        }
        dispatch(createAction("SET_LOADING", false));
      });
    });
  }, []);
  return { auth, state };
}
