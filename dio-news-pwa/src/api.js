const params = {
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
};

const URL = "http://localhost:3000/api";
// const URL = "https://stormy-brook-79548.heroku.app/api";

function getNews(subject) {
  return fetch(`${URL}/${subject}`, params)
    .then((response) => response.json())
    .catch((err) => console.error("Ocorreu um erro", err));
}

function getNewsById(subject, id) {
  return fetch(`${URL}/${subject}/${id}`, params)
    .then((response) => response.json())
    .catch((err) => console.log("Ocorreu um erro", err));
}

const api = {
  getNews,
  getNewsById,
};

export default api;
