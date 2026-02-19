
export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
	password: string;
}

export interface ResendCodeRequest {
  email: string;
  type: "email_verification" | "password_reset"
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}