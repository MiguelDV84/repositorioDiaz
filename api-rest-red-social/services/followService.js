//Importar modelo
const Follow = require("../models/Follow");

const followUserIds = async (identityUserId) => {
  try {
    let following = await Follow.find({ "user": identityUserId })
      .select({ followed: 1, _id: 0 })
      .exec();

    let followers = await Follow.find({ "followed": identityUserId })
      .select({ user: 1, _id: 0 })
      .exec();

    let followingClean = [];
    following.forEach((follow) => {
      followingClean.push(follow.followed);
    });

    let followersClean = [];
    followers.forEach((follow) => {
      followersClean.push(follow.user);
    });
    return {
      followingClean,
      followersClean,
    };
  } catch (error) {
    return {};
  }
};

const followThisUser = async (identityUserId, profileUserID) => {
  let following = await Follow.findOne({ "user": identityUserId, "followed": profileUserID })
    

  let followers = await Follow.findOne({ "user": profileUserID, "followed" : identityUserId })
   

    return {
        following,
        followers
    }
};

module.exports = {
  followUserIds,
  followThisUser,
};
