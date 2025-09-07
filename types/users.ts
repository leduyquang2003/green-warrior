export type TGetUsersResponse = {
  id: string;
  fullname: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  marital: boolean;
};

export type TGetTransactionResponse = {
  id: string;
  type: string;
  note: string;
  token: number;
  createdDate: string;
};

export type TGetAcceptanceResponse = {
  title: string;
  description: string;
  type: string;
  start: string;
  end: string;
  date: string;
  serviceFee: number;
  poster: string;
  status: string;
};

export type TGetPostedResponse = {
  id: string;
  type: string;
  title: string;
  description: string;
  fullname: string;
  date: string;
  start: string;
  end: string;
  serviceFee: string;
  status: string;
  categories: string[];
  mediaFiles: string[];
};

export type TGetUserDetailResponse = {
  id: string;
  fullname: string;
  gender: number;
  dateOfBirth: string;
  phone: string;
  email: string;
  avatar: string;
  address: string;
  marital: boolean;
  province: {
    code: string;
    name: string;
  };
  district: {
    code: string;
    name: string;
  };
  ward: {
    code: string;
    name: string;
  };
};

export type TGetRatingResponse = {
  postId: string;
  poster: string;
  avatar: string;
  postTitle: string;
  score: number;
  feedback: string;
};
