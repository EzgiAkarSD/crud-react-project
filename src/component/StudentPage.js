import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Popup from "./Popup";
import Loader from "./Loader";
import "../styles/students.scss";

function StudentPage() {
  const studentList = JSON.parse(localStorage.getItem("students")) || [];
  const [students, setStudents] = useState({});
  const [popupType, setPopupType] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);

  //Loader
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  //Open Popup
  const openPopup = (type, userId = null) => {
    setPopupType(type);
    if (type === "edit" || type === "delete") {
      setStudents(studentList.find((user) => user.id === userId));
    } else {
      setStudents({
        id: studentList.length + 1,
        image: "https://robohash.org/amettemporeea.png",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        domain: "",
      });
    }
  };

  //Close Popup
  const closePopup = () => {
    setPopupType(null);
    setStudents({});
  };

  //Save
  const saveUser = () => {
    if (popupType === "add") {
      localStorage.setItem(
        "students",
        JSON.stringify([...studentList, students])
      );
    } else if (popupType === "edit") {
      const updatedStudentList = studentList.map((item) =>
        item.id === students.id ? students : item
      );
      localStorage.setItem("students", JSON.stringify(updatedStudentList));
    } else if (popupType === "delete") {
      const deletedUser = studentList.filter((user) => user.id !== students.id);
      localStorage.setItem("students", JSON.stringify(deletedUser));
    }
    closePopup();
  };

  //Search and Pagination
  const filtered = studentList.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(searchText.toLocaleLowerCase())
    );
  });

  useEffect(() => {
    setCurrentPage(1); //Reset page on search
  }, [searchText]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const changePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedUsers = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = Number(e.target.value);
    setRowsPerPage(newRowsPerPage);
  };
  const nextPageClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const previousPageClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderPageNumbers = () =>
    Array.from({ length: totalPages }, (_, index) => (
      <div
        key={index + 1}
        className={
          index + 1 === currentPage ? "pagination-active" : "pagination-number"
        }
        onClick={() => changePage(index + 1)}
      >
        {index + 1}
      </div>
    ));

  return (
    <div className="container-students">
      <Sidebar></Sidebar>
      <div className="container-students-body">
        <div className="container-students-body-topbar">
          <div className="container-students-body-topbar-header">
            Students List
          </div>
          <div className="container-students-body-topbar-right">
            <div className="group-ii">
              <input
                className="group-ii-input"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                value={searchText}
              ></input>
              <img
                className="group-ii-icon"
                alt="search"
                src={require("../images/search.png")}
              ></img>
            </div>
            <button className="add-button" onClick={() => openPopup("add")}>
              ADD NEW STUDENT
            </button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="list-body">
            <div className="list-body-titles">
              <div>Name & Surname</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Website</div>
            </div>
            <div className="list-body-students">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="student-map">
                  <img
                    className="student-map-image"
                    src={user.image}
                    alt="studentImage"
                  ></img>
                  <div className="student-map-line">
                    {`${user.firstName} ${user.lastName}`}
                  </div>
                  <div className="student-map-line">{user.email}</div>
                  <div className="student-map-line">{user.phone}</div>
                  <div className="student-map-line">{user.domain}</div>
                  <img
                    className="student-map-icon"
                    src={require("../images/edit.png")}
                    alt="edit"
                    onClick={() => openPopup("edit", user.id)}
                  />
                  <img
                    className="student-map-icon"
                    src={require("../images/trash.png")}
                    alt="trash"
                    onClick={() => openPopup("delete", user.id)}
                  />
                </div>
              ))}
            </div>
            <div className="pagination">
              <div className="pagination-rows">
                <div className="pagination-rows-title">Rows per page: </div>
                <div className="select">
                  <select
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}
                  >
                    <option value={6}>6</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </div>
              </div>
              <div className="pagination-page-number">
                {renderPageNumbers()}
              </div>
              <div className="pagination-text">of</div>
              <div className="pagination-length">{filtered.length}</div>
              <img
                className="pagination-arrow"
                src={require("../images/left-arrow.png")}
                alt="leftArrow"
                onClick={previousPageClick}
              ></img>
              <img
                className="pagination-arrow"
                src={require("../images/right-arrow.png")}
                alt="rightArrow"
                onClick={nextPageClick}
              ></img>
            </div>
          </div>
        )}
      </div>
      {popupType && (
        <Popup
          title={
            popupType === "add"
              ? "Add Student"
              : popupType === "edit"
              ? "Edit Student"
              : "Delete Student"
          }
          onClose={closePopup}
          handleButtonClick={saveUser}
          students={students}
          setStudents={setStudents}
        />
      )}
    </div>
  );
}

export default StudentPage;
