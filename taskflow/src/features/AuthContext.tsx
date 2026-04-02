import { useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authReducer, initialState } from './authReducer';
import type { AuthState, AuthAction } from './authReducer';
import { AuthContext } from './AuthContextDef';
import { setAuthToken } from '../api/axios';

export interface AuthContextType {
	state: AuthState;
	dispatch: React.Dispatch<AuthAction>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(authReducer, initialState);

	useEffect(() => {
		setAuthToken(state.token);
	}, [state.token]);
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}
