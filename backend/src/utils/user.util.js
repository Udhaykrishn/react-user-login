class UserData {
  static extractTokenPayload(user) {
    return {
      id: user._id,
      email: user.email,
      role: user.role,
    };
  }
}

export default UserData;
