import React, { useState, useEffect } from "react";
import apiFacade from "../api/apiFacade";

export default function Home() {
  // Full Course List
  const [courseList, setCourseList] = useState([
    {
      courseName: "",
      description: "",
    },
  ]);

  // Fetches Course list
  const fetchData = () => {
    apiFacade.getCourses().then((data) => setCourseList(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Course list</h2>
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

          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
