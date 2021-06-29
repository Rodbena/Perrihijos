import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducidores/indexRed";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));//Dejamos que el sitio guarde algunos datos 

export default store;