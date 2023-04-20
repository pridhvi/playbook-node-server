import * as followsDao from "./followsDao.js";

const FollowsController = (app) => {
  const getAllFollowsByMasterUser = async (req, res) => {
    const follows = await followsDao.getAllFollowsByMasterUser(
      req.params.masterUser
    );
    res.json(follows);
  };

  const getAllFollowsByFollowingUser = async (req, res) => {
    const follows = await followsDao.getAllFollowsByFollowingUser(
      req.params.followingUser
    );
    res.json(follows);
  };

  const createFollow = async (req, res) => {
    const follows = await followsDao.createFollow(req.params.masterUser, req.params.followingUser);
    res.json(follows);
  };

  const deleteFollow = async (req, res) => {
    const follows = await followsDao.deleteFollow(req.params.masterUser, req.params.followingUser);
    res.json(follows);
  };
  

  app.get("/api/follows/followers/:masterUser", getAllFollowsByMasterUser);
  app.get("/api/follows/following/:followingUser", getAllFollowsByFollowingUser);
  app.post("/api/follows/:masterUser/:followingUser", createFollow);
  app.delete("/api/follows/:masterUser/:followingUser", deleteFollow);
};

export default FollowsController;
