const { students } = require("../data/studentsDb");
const { users } = require("../data/usersDb");

// CHECK AUTH
exports.isAuth = (req, res, next) => {
  if (!req.session.user) return res.redirect("login");
  next();
};

// HOME
exports.getHome = (req, res) => {
  const user = req.session.user;
  res.render("home", { pageTitle: "Home", user: user ? user : null });
};

// STUDENTS
exports.getStudents = (req, res) => {
  res.json(students);
};

// LOGIN (GET)
exports.getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login", logState: "OK" });
};

// LOGIN (POST)
exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).render("login", {
      pageTitle: "Login",
      logState: "!success",
      message: "Please, fill the required fields.",
    });
  }

  if (!req.session.user) {
    const user = users.find(
      (usr) => usr.username === username && usr.password === password
    );
    if (!user) {
      return res.status(403).render("login", {
        pageTitle: "Login",
        logState: "!success",
        message: "Incorrect credentials!",
      });
    }

    req.session.user = {
      username: user.username,
      name: user.name,
    };
    res.redirect("/");
  } else {
    res.status(400).render("login", {
      pageTitle: "Login",
      logState: "!success",
      message: "Already logged in.",
    });
  }
};

// LOGOUT
exports.getLogout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
