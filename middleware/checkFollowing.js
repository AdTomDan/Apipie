const checkFollowing = (users,currentUser) => {
    let userFriends = []
    let userNotFriends = []

    users.forEach(user=>{
        if(currentUser.friends.includes(user._id)) {
            userFriends.push(user)
        } else {
            userNotFriends.push(user)
        }
    })
    return {userFriends, userNotFriends}
}

module.exports = checkFollowing

