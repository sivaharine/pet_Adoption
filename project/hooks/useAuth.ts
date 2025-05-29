import { useState, useEffect } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Check if user is already logged in
        // This would be where you'd check stored tokens or session data
        const isLoggedIn = false; // Replace with actual check
        
        if (isLoggedIn) {
          // Fetch user data
          // This would be an API call in a real app
          const userData = {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
            address: '123 Pet Street, Pawville, CA',
          };
          
          setAuthState({
            isAuthenticated: true,
            user: userData,
            isLoading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    };
    
    checkAuthState();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // This would be an API call in a real app
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        // Simulate successful login
        const userData = {
          id: '1',
          name: 'John Doe',
          email,
          phone: '+1 (555) 123-4567',
          address: '123 Pet Street, Pawville, CA',
        };
        
        setAuthState({
          isAuthenticated: true,
          user: userData,
          isLoading: false,
        });
        
        return true;
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };
  
  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // This would be an API call in a real app
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (name && email && phone && password) {
        // Simulate successful signup
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return true;
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };
  
  const logout = async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // This would be an API call in a real app
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  return {
    ...authState,
    login,
    signup,
    logout,
  };
}