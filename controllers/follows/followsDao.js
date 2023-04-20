import followsModel from './followsModel.js'

export const getAllFollowsByMasterUser = (masterUser) => {
    return followsModel.find({masterUser});
};

export const getAllFollowsByFollowingUser = (followingUser) => {
    return followsModel.find({followingUser});
};

export const createFollow = (masterUser, followingUser) => {
    return followsModel.create({ masterUser, followingUser });
};

export const deleteFollow = (masterUser, followingUser) => {
    return followsModel.deleteOne({ masterUser, followingUser });
};

