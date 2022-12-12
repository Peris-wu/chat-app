const Friends = require('../model/friends')

const friendsController = {
  isFriends: (params) => Friends.isFriend(params),
  buildFriend: (params) => Friends.buildFriend(params),
  updateApplyTime: (params, updateParams) =>
    Friends.updateApplyTime(params, updateParams)
}

module.exports = friendsController
