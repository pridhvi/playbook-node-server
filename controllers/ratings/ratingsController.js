import * as ratingsDao from "./ratingsDao.js";

const RatingsController = (app) => {
  const getAllRatingsByItem = async (req, res) => {
    const ratings = await ratingsDao.getAllRatingsByItem(
      req.params.itemType,
      req.params.itemId
    );
    res.json(ratings);
  };

  const getAllRatingsByUsername = async (req, res) => {
    const ratings = await ratingsDao.getAllRatingsByUsername(
      req.params.username
    );
    res.json(ratings);
  };

  const createRating = async (req, res) => {
    const rating = await ratingsDao.createRating(req.body);
    res.json(rating);
  };

  const updateRating = async (req, res) => {
    const rating = await ratingsDao.updateRating(
      req.params.ratingId,
      req.body
    );
    res.json(rating);
  };

  const deleteRating = async (req, res) => {
    const rating = await ratingsDao.deleteRating(req.params.ratingId);
    res.json(rating);
  };

  app.get("/api/ratings/:itemType/:itemId", getAllRatingsByItem);
  app.get("/api/ratings/:username", getAllRatingsByUsername);
  app.post("/api/ratings", createRating);
  app.put("/api/ratings/:ratingId", updateRating);
  app.delete("/api/ratings/:ratingId", deleteRating);
};

export default RatingsController;
