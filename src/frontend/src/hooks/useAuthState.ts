import { useInternetIdentity } from './useInternetIdentity';

export function useAuthState() {
  const { identity, loginStatus } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const principalString = identity?.getPrincipal().toString() || '';
  const shortPrincipal = principalString ? `${principalString.slice(0, 8)}...${principalString.slice(-4)}` : '';

  return {
    isAuthenticated,
    identity,
    principalString,
    shortPrincipal,
    isLoggingIn: loginStatus === 'logging-in',
  };
}
