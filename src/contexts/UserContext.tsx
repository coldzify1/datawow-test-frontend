import { User } from '@/dto/user.dto';
import clientApi from '@/utils/api';
import { isAuthenticated, logout as authLogout } from '@/utils/auth';
import { AxiosError } from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';


export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  getProfile: () => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    if (isAuthenticated()) {
      getProfile();
    }
    else {
      setLoading(false);
    }

  }, []);

  const logout = () => {
    setUser(null);
    authLogout();
  }
  const getProfile = async () => {
    try {
      const res = await clientApi.getProfile();
      setUser(res.data);
    }
    catch (err) {
      console.log((err as AxiosError).response);
    }
    setLoading(false);
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
}
