import SERVER_URL from "../util/Settings";

function getCourses() {
  return fetch(SERVER_URL + "course/all")
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getClasses() {
  const options = makeOptions("GET", true);
  return fetch(SERVER_URL + "course/classes", options)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getTeachers() {
  const options = makeOptions("GET", true);
  return fetch(SERVER_URL + "teacher/teachers", options)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

// true med i header så den tager token med.
function addTeacher(teacher) {
  const options = makeOptions("POST", true, teacher);
  return fetch(SERVER_URL + "teacher/add", options)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

// true med i header så den tager token med.
function addCourse(course) {
  const options = makeOptions("POST", true, course);
  return fetch(SERVER_URL + "course/add", options)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function addClassEntity(classEntity) {
  const options = makeOptions("POST", true, classEntity);
  return fetch(SERVER_URL + "course/addTo/class", options)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function updateCourse(course) {
  const options = makeOptions("PUT", true, course);
  return fetch(SERVER_URL + "course/update/class", options)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function updateTeacher(teacher) {
  const options = makeOptions("PUT", true, teacher);
  return fetch(SERVER_URL + "teacher/update/teacher", options)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function deleteCourse(course) {
  const options = makeOptions("DELETE", true, course);
  return fetch(SERVER_URL + "course/delete/" + course, options)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getCourseByName(courseName) {
  return fetch(SERVER_URL + "course/" + courseName)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

const getToken = () => {
  return localStorage.getItem("jwtToken");
};
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
};

const apiFacade = {
  getCourses,
  addCourse,
  getCourseByName,
  addClassEntity,
  getClasses,
  updateCourse,
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteCourse,
};

const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    opts.headers["x-access-token"] = getToken();
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

export default apiFacade;
