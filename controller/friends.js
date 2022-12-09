const Friends = require('../model/friends')

const friendsController = {
  isFriends: (params) => Friends.isFriend(params)
}

module.exports = friendsController
