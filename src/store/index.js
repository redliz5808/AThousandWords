import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import collection from "./collection/collectionReducer";
import home from "./home/homeReducer";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  collection,
  home,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize... (Keeping comment in as a reminder)
      })
    : compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
