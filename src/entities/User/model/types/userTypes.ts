interface UserSchema {
  user: UserProperties;
  isLoading: boolean;
  error?: string;
}

interface UserProperties {
  accessToken?: string;
  userId?: string;
  isLogined: boolean;
}

export { UserSchema };
