import apiFacade from "../api/apiFacade";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import AddClassModal from "../components/AddClassModal";
import EditCourseModal from "../components/EditCourseModal";

export default function AdminCourse() {
  // Course to search for in the Facade
  const [searchForCourse, setSearchForCourse] = useState("JavaScript");

  // Full Course List
  const [courseList, setCourseList] = useState([
    {
      courseName: "",
      description: "",
    },
  ]);

  // Full Class List
  const [classList, setClassList] = useState([
    {
      courseName: "",
      description: "",
      semester: "",
      numberOfStudents: "",
    },
  ]);

  // Selected Course in the Select component
  const [selectedCourse, setSelectedCourse] = useState({
    courseName: "",
    description: "",
  });

  // Course info to Add a new Course
  const [courseInfo, setCourseInfo] = useState({
    courseName: "",
    description: "",
  });

  // Fetches Course and Class list
  const fetchData = () => {
    apiFacade.getCourses().then((data) => setCourseList(data));
    apiFacade.getClasses().then((data) => setClassList(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Maps the course list to Select bar.
  const options = courseList.map((item) => {
    return {
      value: item.courseName,
      label: item.courseName,
    };
  });

  // Fetches Course and sets the Seleceted Course to be rendered.
  const fetchCourseByName = (courseName) => {
    apiFacade
      .getCourseByName(courseName)
      .then((data) => setSelectedCourse(data));
  };

  const onChange = (evt) => {
    setSearchForCourse(evt.value);
    console.log(selectedCourse);
    console.log(searchForCourse);
  };

  useEffect(() => {
    fetchCourseByName(searchForCourse);
  }, [searchForCourse]);

  const onChangeCourse = (e) => {
    setCourseInfo({
      ...courseInfo,
      [e.target.id]: e.target.value,
    });
  };

  // Adds a new Course
  const addCourse = (e) => {
    e.preventDefault();
    apiFacade.addCourse(courseInfo);
  };

  const deleteCourse = (e) => {
    e.preventDefault();
    apiFacade.deleteCourse(selectedCourse.courseName);
    console.log(selectedCourse.courseName);
    fetchData();
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Course Administration</h2>
          <h4>Search for a specific course</h4>
          <Select
            options={options}
            isSearchable
            placeholder="Search for Course"
            onChange={onChange}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Name</th>
                <th scope="col">Description</th>
                <th scope="col">Add a class</th>
                <th scope="col">Edit a course</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr key={selectedCourse.courseName}>
                <td>{selectedCourse.courseName}</td>
                <td>{selectedCourse.description}</td>
                <td>
                  <AddClassModal selectedCourse={selectedCourse} />
                </td>
                <td>
                  <EditCourseModal selectedCourse={selectedCourse} />
                </td>
                <td>
                  <button
                    className="btn btn-primary ml-2"
                    onClick={deleteCourse}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <h4>Add a new course</h4>
          <div>
            <form onChange={onChangeCourse}>
              <input
                className="mb-2"
                placeholder="Course name"
                id="courseName"
              />
              <input
                className="mb-2 ml-2"
                placeholder="Description"
                id="description"
              />
              <button className="btn btn-primary ml-2" onClick={addCourse}>
                Add Course
              </button>
            </form>
            <h4 className="mt-5">Full Course List with classes</h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Course Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Class(Semester)</th>
                  <th scope="col">Number Of Students</th>
                </tr>
              </thead>
              <tbody>
                {classList && classList.length > 0 ? (
                  classList.map((c) => (
                    <tr key={c.courseName}>
                      <td>{c.courseName}</td>
                      <td>{c.description}</td>
                      <td>{c.semester}</td>
                      <td>{c.numberOfStudents}</td>
                    </tr>
                  ))
                ) : (
                  <p>No classes</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
