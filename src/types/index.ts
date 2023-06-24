export type UserPayload = {
  userName: string;
  password: string;
};

export type UserDto = {
  firstName: String;
  lastName: String;
  email: String;
  userName: String;
  password: String;
};

export type UserAuth = {
  Id: String;
  UserName: String;
  FirstName: String;
  LastName: String;
};

export type ErrorMsgComp = {
  msg: String;
};

export interface AuthHookProps {
  signup: (user: UserDto) => Promise<String | undefined>; 
  login: (user: UserPayload) => Promise<void>;
  logout: () => Promise<void>;
  isAuth: boolean;
  user: UserAuth | null;
};