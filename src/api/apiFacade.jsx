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
