import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { MemberActions, MemberContext, MemberState } from '.';
import { getCurrentMember, Member } from '..';

interface MemberProviderProps {
  children: ReactNode;
}

export const MemberProvider: React.FC<MemberProviderProps> = ({ children }) => {
  const [state, setState] = useState<MemberState>({
    member: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const loadCurrentMember = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const member = await getCurrentMember();

      if (member) {
        setState({
          member,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false, isAuthenticated: false }));
      }
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load member'
      }));
    }
  }, []);

  const login = useCallback(() => {
    // In local mode, we just reload to "log in" (mock user is always there)
    window.location.reload();
  }, []);

  const logout = useCallback(() => {
    // In local mode, effectively "do nothing" or maybe clear local storage user?
    // For now, prompt user that this is a demo
    alert("This is a demo. Logout doesn't actually clear the mock user.");
  }, []);

  const clearMember = useCallback(() => {
    setState({
      member: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const actions: MemberActions = {
    loadCurrentMember,
    login,
    logout,
    clearMember
  };

  useEffect(() => {
    loadCurrentMember();
  }, [loadCurrentMember]);

  return (
    <MemberContext.Provider value={{ ...state, actions }}>
      {children}
    </MemberContext.Provider>
  );
};
