import React from "react";
import "../styles/cards.scss";

function Cards() {
  const card = [
    {
      id: 1,
      image: require("../images/card-student.png"),
      alt: "cardStudent",
      text: "Students",
      number: "30",
      backgroundColor: "#F0F9FF",
    },
    {
      id: 2,
      image: require("../images/card-course.png"),
      alt: "cardCourse",
      text: "Couse",
      number: "13",
      backgroundColor: "#fdffe7",
    },
    {
      id: 3,
      image: require("../images/card-payments.png"),
      alt: "cardPayments",
      text: "Payments",
      number: "556,000₺",
      backgroundColor: "#ffe7f3",
    },
    {
      id: 4,
      image: require("../images/card-users.png"),
      alt: "cardUsers",
      text: "Users",
      number: "3",
      backgroundColor: "#e3ffe5",
    },
  ];
  return (
    <div className="container-page">
      <div className="container-page-cards">
        {card.map((item) => (
          <div key={item.id} className="container-page-cards-card" style={{ backgroundColor: item.backgroundColor }}>
            <div>
            <img className="container-page-cards-card-image" alt={item.alt} src={item.image} />
            <div className="container-page-cards-card-text">{item.text}</div>
            </div>
            <div className="container-page-cards-card-number">{item.number}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
