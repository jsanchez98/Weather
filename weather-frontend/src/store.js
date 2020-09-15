import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";

const reducers = combineReducers({
    users: userReducer,
    notification: notificationReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store