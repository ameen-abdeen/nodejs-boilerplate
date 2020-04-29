export interface DecodedJwt {
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  realm_access?: {
    roles: string[];
  };
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  organization: string[];
  clientId: string;
}
