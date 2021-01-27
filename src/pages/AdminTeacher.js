import apiFacade from "../api/apiFacade";
import React, { useState, useEffect } from "react";
import AddTeacherClassModal from "../components/AddTeacherClassModal";

export default function AdminTeacher() {
  const [teacherList, setTeacherList] = useState([
    {
      id: "",
      name: "",
      email: "",
      classEntityList: [],
    },
  ]);

  // Teacher info to Add a new Teacher
  const [teacherInfo, setTeacherInfo] = useState({
    id: "",
    name: "",
    email: "",
  });

  const fetchData = () => {
    apiFacade.getTeachers().then((data) => setTeacherList(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (e) => {
    setTeacherInfo({
      ...teacherInfo,
      [e.target.id]: e.target.value,
    });
  };

  // Adds a new Teacher
  const addTeacher = (e) => {
    e.preventDefault();
    apiFacade.addTeacher(teacherInfo);
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h4 className="mt-5">Teacher List</h4>

          <form onChange={onChange}>
            <input className="mb-2" placeholder="Teacher Name" id="name" />
            <input className="mb-2 ml-2" placeholder="Email" id="email" />
            <button className="btn btn-primary ml-2" onClick={addTeacher}>
              Add Teacher
            </button>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Class (semester)</th>
                <th scope="col">Add teacher to class</th>
              </tr>
            </thead>
            <tbody>
              {teacherList && teacherList.length > 0 ? (
                teacherList.map((t) => (
                  <tr key={t.id}>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td>{t.classEntityList}</td>
                    <td>
                      <AddTeacherClassModal
                        teacherName={t.name}
                        teacherEmail={t.email}
                        classEntity={t.classEntityList}
                        teacherId={t.id}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p>No teachers</p>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
