export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface ArtPieceLike {
  id: number;
  userId: number;
  artPieceId: number;
  imageUrl: string;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface UserData {
  username: string;
  email: string;
  id: string;
  intro: string;
  profile_image: string | null;
  cover_image: string | null;
}
