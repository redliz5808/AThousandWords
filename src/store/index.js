import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import collection from "./collection/collectionReducer";
import home from "./home/homeReducer";
import photo from "./photo/photoReducer";
import user from "./user/userReducer";
import collectionPhoto from "./collectionPhoto/collectionPhotoReducer";
import userCollections from "./userCollections/userCollectionsReducer";
import favoriteCollection from "./favoriteCollection/favoriteCollectionReducer";
import favoritePhoto from "./favoritePhoto/favoritePhotoReducer";
import favoritesSlider from "./favoriteSlider/favoriteSliderReducer";
import favoriteUser from "./favoriteUser/favoriteUserReducer";
import userPhotos from "./userPhotos/userPhotosReducer";
import searchCollections from "./searchCollections/searchCollectionsReducer";
import searchPhotos from "./searchPhotos/searchPhotosReducer";
import searchUsers from "./searchUsers/searchUsersReducer";
import userStats from "./userStats/userStatsReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["searchCollections", "collection", "home", "photo", "user"],
};

const reducers = combineReducers({
  collection,
  home,
  photo,
  user,
  collectionPhoto,
  userCollections,
  favoriteCollection,
  favoritePhoto,
  favoritesSlider,
  favoriteUser,
  userPhotos,
  searchCollections,
  searchPhotos,
  searchUsers,
  userStats,
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
