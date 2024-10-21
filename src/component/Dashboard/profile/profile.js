import React, { useState, useEffect } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import profile from "../image/profile.png";
import "../profile/profilr.css";

function Profile() {
  // Fetch username from localStorage using the Cognito key
  const usernameKey =
    "CognitoIdentityServiceProvider.5i8900dta48q73gns6006v3u1c.LastAuthUser";
  const username = localStorage.getItem(usernameKey) || "User"; // Default to "User" if not found
  console.log(username);
  const [inputValue, setInput] = useState("");
  const [inputErr, setInputErr] = useState(false);
  const [list, setList] = useState([]);
  const [savedProfile, setSavedProfile] = useState(null);

  // Effect to load saved profile if it exists
  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("profile"));
    if (savedData && savedData.address) {
      setList(savedData.address); // Load saved addresses
      setSavedProfile(savedData); // Display saved profile
    }
  }, []);

  function AddEvent() {
    if (inputValue.trim().length === 0) {
      setInputErr(true);
    } else {
      setInputErr(false);
      const newList = [...list, inputValue];
      setList(newList);
      setInput(""); // Clear input field
    }
  }

  function SaveProfile() {
    const profileData = { name: username, address: list };
    sessionStorage.setItem("profile", JSON.stringify(profileData));
    setSavedProfile(profileData); // Update saved profile in state
  }

  function remove(listName) {
    const updatedList = list.filter((ele) => ele !== listName);
    setList(updatedList);
  }

  return (
    <div className="profile-bg">
      <Header />
      <div className="profile-main">
        <img src={profile} className="imge" alt="Profile" />
        <br />
        <label>Username: </label>
        <p>{username}</p> {/* Display username from localStorage */}
        <br />
        <label>Phone no: </label>
        <p>9003079869</p> {/* You can fetch this dynamically as well */}
        <label>Address: </label>
        <div style={{ marginLeft: "208px", marginTop: "-32px" }}>
          <textarea
            rows="4"
            cols="55"
            value={inputValue}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Your Address..."
          />
          {inputErr && (
            <small style={{ display: "block", color: "red" }}>
              You must write something
            </small>
          )}
          <button className="btne" onClick={AddEvent}>
            Add Address
          </button>

          {/* List of addresses */}
          <ul className="profile-ul">
            {list.map((ele, index) => (
              <li key={index} className="profile-li">
                {ele}
                <button onClick={() => remove(ele)}>x</button>
              </li>
            ))}
          </ul>

          <button onClick={SaveProfile} className="savebutton">
            Save
          </button>
        </div>
        {/* Display saved profile data */}
        {savedProfile && (
          <div>
            <h3>Saved Profile:</h3>
            <p>
              <strong>Name:</strong> {savedProfile.name}
            </p>
            <p>
              <strong>Addresses:</strong>
            </p>
            <ul>
              {savedProfile.address.map((addr, index) => (
                <li key={index}>{addr}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
