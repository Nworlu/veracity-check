import { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../model/user.model";
import { _destoryToken, _getStorage, _getToken, _removeStorage } from "../utils/store";

interface AuthContextType {
    user: IUser | null;
    logout: () => void;
    setUserData: (user: IUser) => void;
    setWalletAddress: (address: string) => void;
    walletAddress: string | null;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined)
  export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [walletAddress, setWalletAddressState] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchAuthData = async () => {
        const token = await _getToken();
        const storedUserData = await _getStorage("userData");
        const storedWalletAddress = await _getStorage("walletAddress");
  
        if (token && storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
        if (storedWalletAddress) {
          setWalletAddressState(storedWalletAddress);
        }
      };
      fetchAuthData();
    }, []);
  
    const logout = () => {
      _destoryToken();
      _removeStorage("userData");
      _removeStorage("walletAddress");
      setUser(null);
      setWalletAddressState(null);
    };
  
    const setUserData = (userData: IUser) => {
      setUser(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
    };
  
    const setWalletAddress = (address: string) => {
      setWalletAddressState(address);
      localStorage.setItem("walletAddress", address);
    };
  
    return (
      <AuthContext.Provider value={{ user, logout, setUserData, setWalletAddress, walletAddress }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // Custom hook to use auth context
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
  };
  