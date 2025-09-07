export interface ILoginRequestBody {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IProfileResponse {
  id: string;
  fullname: string;
  email: string;
  dateOfBirth: string;
  address: string;
  avatarId: string;
  avatar: string;
}

export type TChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export interface IUpdateProfileForm {
  fullname: string;
  email: string;
  dateOfBirth: string;
  address: string;
  avatarId?: string;
}
