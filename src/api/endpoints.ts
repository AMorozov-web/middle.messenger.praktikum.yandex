export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/signin',
  LOGOUT: '/auth/logout',
  SIGN_UP: '/auth/signup',
  GET_USER: '/auth/user',
} as const;

export const USER_ENDPOINTS = {
  PROFILE: '/user/profile',
  AVATAR: '/user/profile/avatar',
  PASSWORD: '/user/password',
} as const;
