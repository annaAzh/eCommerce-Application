interface UserSchema {
  user: UserProperties;
  isLoading: boolean;
  error?: string;
}

interface UserProperties {
  accessToken?: string;
  userId?: string;
}

export { UserSchema };
