import React from "react";
import "../styles/popup.scss";

function Popup({ title, onClose, handleButtonClick, students, setStudents }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudents({
      ...students,
      [name]: value,
    });
  };
  return (
    <div className="overlay">
      <div className="overlay-container-popup">
        <img
          className="overlay-container-popup-close-button"
          alt="close"
          src={require("../images/close.png")}
          onClick={onClose}
        ></img>
          <div className="overlay-container-popup-body">
            <div>
              <div className="overlay-container-popup-body-text">Name</div>
              <input
                className={title.includes('Delete') ? 'overlay-container-popup-body-not-editable': 'overlay-container-popup-body-input'}
                name="firstName"
                placeholder="Enter your name"
                value={students.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="overlay-container-popup-body-text">Surname</div>
              <input
                className={title.includes('Delete') ? 'overlay-container-popup-body-not-editable': 'overlay-container-popup-body-input'}
                name="lastName"
                placeholder="Enter your surname"
                value={students.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="overlay-container-popup-body-text">Email</div>
              <input
                className={title.includes('Delete') ? 'overlay-container-popup-body-not-editable': 'overlay-container-popup-body-input'}
                name="email"
                placeholder="Enter your Email"
                value={students.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="overlay-container-popup-body-text">Phone</div>
              <input
                className={title.includes('Delete') ? 'overlay-container-popup-body-not-editable': 'overlay-container-popup-body-input'}
                name="phone"
                placeholder="Enter your phone"
                value={students.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="overlay-container-popup-body-text">Website</div>
              <input
                className={title.includes('Delete') ? 'overlay-container-popup-body-not-editable': 'overlay-container-popup-body-input'}
                name="domain"
                placeholder="Enter your website"
                value={students.domain}
                onChange={handleInputChange}
              />
            </div>
            <div onClick={handleButtonClick} className="overlay-container-popup-body-save-button-wrapper">
              <button className={title.includes('Delete') ? 'overlay-container-popup-body-save-button-wrapper-delete-btn': 'overlay-container-popup-body-save-button-wrapper-btn'}>
                {title}
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Popup;
