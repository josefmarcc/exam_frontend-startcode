import apiFacade from "../api/apiFacade";
import React, { useState, useEffect } from "react";
import Select from "react-select";

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

  // Fetches Course list
  const fetchData = () => {
    apiFacade.getCourses().then((data) => setCourseList(data));
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
              </tr>
            </thead>
            <tbody>
              <tr key={selectedCourse.courseName}>
                <td>{selectedCourse.courseName}</td>
                <td>{selectedCourse.description}</td>
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
            <h4 className="mt-5">Full Course List</h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Course Name</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {courseList && courseList.length > 0 ? (
                  courseList.map((c) => (
                    <tr key={c.courseName}>
                      <td>{c.courseName}</td>
                      <td>{c.description}</td>
                    </tr>
                  ))
                ) : (
                  <p>No courses</p>
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
