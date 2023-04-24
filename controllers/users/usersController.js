import * as usersDao from "./usersDao.js";

const UserController = (app) => {
  const findAllUsers = async (req, res) => {
    // if (currentUser && currentUser.isAdmin) {
    const users = await usersDao.findAllUsers();
    res.json(users);
    // } else {
    //   res.sendStatus(403);
    // }
  };

  const findUserByUsername = async (req, res) => {
    // if (currentUser && currentUser.isAdmin) {
    const user = await usersDao.findUserByUsername(req.params.username);
    res.json(user);
    // } else {
    //   res.sendStatus(403);
    // }
  };
  
  const isUser = async (req, res) => {
    // console.log(req.params.username)
    const user = await usersDao.findUserByUsername(req.params.username);
    if (user) res.sendStatus(200);
    else res.sendStatus(404);
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const status = await usersDao.updateUser(userId, req.body);
    req.session["currentUser"] = req.body;
    // res.send(status);
    res.json(req.body);
  };

  // const deleteUser = async (req, res) => {
  //   const userId = req.params.userId;
  //   const index = users.findIndex((user) => user._id === userId);
  //   if (index === -1) {
  //     res.sendStatus(404);
  //     return;
  //   }
  //   users.splice(index, 1);
  //   res.sendStatus(200);
  // };

  const signup = async (req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const role = req.body.role;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }

    const newUser = { username, firstName, lastName, password, role };
    req.session["currentUser"] = newUser;
    usersDao
      .createUser(newUser)
      .then((response) => {
        // console.log(response);
        res.json(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // res.json(newUser);
  };

  app.post("/api/users/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao.findUserByCredentials(username, password);

    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });

  app.post("/api/users/profile", async (req, res) => {
    if (!req.session["currentUser"]) {
      res.sendStatus(404);
      return;
    }
    res.json(req.session["currentUser"]);
  });

  app.post("/api/users/logout", async (req, res) => {
    // currentUser = null;
    req.session.destroy();
    res.sendStatus(200);
  });

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:username", findUserByUsername);
  app.get("/api/users/isUser/:username", isUser);
  app.post("/api/users/signup", signup);
  app.put("/api/users/:userId", updateUser);
  // app.delete("/api/users/:userId", deleteUser);
};

export default UserController;
