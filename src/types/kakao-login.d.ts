declare module '@react-native-seoul/kakao-login' {
    export interface KakaoOAuthToken {
      accessToken: string;
      refreshToken: string;
      idToken?: string;
      expiresIn: number;
      refreshTokenExpiresIn: number;
      scopes?: string[];
    }
  
    export function login(): Promise<KakaoOAuthToken>;
    export function logout(): Promise<void>;
    export function getAccessToken(): Promise<KakaoOAuthToken>;
    export function isKakaoTalkLoginAvailable(): Promise<boolean>;
  }
  