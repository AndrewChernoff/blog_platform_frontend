export type UserType = {
  _id: string;
  avatarUrl?: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PostItemType = {
  _id: string;
  title: string;
  text: string;
  imageUrl?: string;
  tags: Array<string>;
  viewsCount: number;
  user: UserType;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type SortType = 'new' | 'popular'