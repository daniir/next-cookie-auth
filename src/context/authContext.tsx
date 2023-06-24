"use client";

import React, { createContext, useState } from "react";
import axios from "axios";
import { UserDto, UserPayload, AuthHookProps, UserAuth } from "@/types/index";

const defaultState = {
  signup: async (user: UserDto) => "" || undefined,
  login: async (user: UserPayload) => {},
  logout: async () => {},
  isAuth: false,
  user: null,
};

export const AuthContext = createContext<AuthHookProps>(defaultState);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<UserAuth | null>(null);

  const signup = async (user: UserDto): Promise<string | undefined> => {
    try {
      const {
        data: { message },
      } = await axios.post("/api/auth/signup/", user);
      return message;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const login = async (user: UserPayload) => {
    try {
      const {
        data: { Id, UserName, FirstName, LastName },
      } = await axios.post("/api/auth/login/", user);
      setUser({
        Id,
        UserName,
        FirstName,
        LastName,
      });
      setIsAuth(true);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/auth/login/");
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        isAuth,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
