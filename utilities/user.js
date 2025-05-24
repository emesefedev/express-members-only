const membershipStatus = {
  admin: "admin",
  normal: "normal",
  premium: "premium"
}

const isAdminUser = (user) => {
  return user.membership_status === membershipStatus.admin
}

module.exports = {
  isAdminUser
}