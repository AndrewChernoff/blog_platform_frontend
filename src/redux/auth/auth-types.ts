export type LoggedInUserType = {
  _id: "65de186ce48569bba7261393";
  fullName: "Andrew Chernoff";
  email: "whitedrew538@gmail.com";
  createdAt: "2024-02-27T17:14:20.351Z";
  updatedAt: "2024-02-27T17:14:20.351Z";
  __v: 0;
  token?: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRlMTg2Y2U0ODU2OWJiYTcyNjEzOTMiLCJpYXQiOjE3MDk1NjkyNjYsImV4cCI6MTcxMjE2MTI2Nn0.HoIlZY_W7cYqqefm6STtHN_x_ZxOUzk7jZXPKrCMBEM";
};

export type LoginDataType = { email: string; password: string };

export type RegisterDataType = {
  fullName: string;
  email: string;
  avatarUrl?: string;
  password: string;
};
