import { combineReducers } from "redux";
import {authReducer} from "../features/auth/authSlice";
import { dashboardReducer } from "@/features/dashboard/dashboardSlice";

export default combineReducers({
  auth: authReducer,
  dashobard: dashboardReducer,
});