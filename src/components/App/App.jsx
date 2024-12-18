import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  getItems,
  addItem,
  deleteItem,
  editUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signin, signup, checkToken } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, setUserToken] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleEditClick = () => {
    setActiveModal("edit-profile");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = (values) => {
    const lastId = Math.max(...clothingItems.map((item) => item._id));
    const newId = lastId + 1;
    const newItem = { owner: currentUser._id, _id: newId, ...values };
    return addItem(newItem, userToken)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        setToken(res);
        setUserToken(res.token);
        return res.token;
      })
      .then((token) => {
        return checkToken(token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error);
    handleModalClose();
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => {
        handleLogin({ email, password }).catch(console.error);
      })
      .catch(console.error);
    handleModalClose();
  };

  const handleUpdateUser = ({ name, avatar }) => {
    return editUser({ name, avatar }, userToken)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => {
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleLogoutClick = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  const handleDeleteItem = () => {
    return deleteItem(selectedCard._id, userToken)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
      })
      .then(() => {
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    // const isLiked = item.likes.some((id) => id === CurrentUser._id);

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    function handleCloseMethods(evt) {
      if (evt.key === "Escape" || evt.key === "esc" || evt.keyCode === 27) {
        handleModalClose();
      }
      if (evt.type === "click" && evt.target.classList.contains("modal")) {
        handleModalClose();
      }
    }

    if (activeModal !== "") {
      document.addEventListener("keydown", handleCloseMethods);
      document.addEventListener("click", handleCloseMethods);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseMethods);
      document.removeEventListener("click", handleCloseMethods);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          setUserToken(token);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditClick={handleEditClick}
                      handleLogoutClick={handleLogoutClick}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={handleModalClose}
            onAddItem={handleAddItemSubmit}
            activeModal={activeModal}
          />
          <ItemModal
            card={selectedCard}
            activeModal={activeModal}
            onClose={handleModalClose}
            onDelete={handleDeleteItem}
          />
          <LoginModal
            onClose={handleModalClose}
            handleLogin={handleLogin}
            activeModal={activeModal}
          />
          <RegisterModal
            onClose={handleModalClose}
            handleRegistration={handleRegistration}
            activeModal={activeModal}
          />
          <EditProfileModal
            onClose={handleModalClose}
            handleUpdateUser={handleUpdateUser}
            activeModal={activeModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
