import ratingsModel from './ratingsModel.js'

export const getAllRatingsByItem = (itemType, itemId) => {
    return ratingsModel.find({itemType, itemId});
};

export const getAllRatingsByUsername = (username) => {
    return ratingsModel.find({username});
};

export const getLatestRatings = () => {
    return ratingsModel.find().sort({ _id: -1 }).limit(50);
};

export const createRating = (rating) => {
    return ratingsModel.create(rating);
};

export const updateRating = (ratingId, rating) => {
    return ratingsModel.updateOne({ _id: ratingId }, rating);
};

export const deleteRating = (ratingId) => {
    return ratingsModel.deleteOne({ _id: ratingId });
};
