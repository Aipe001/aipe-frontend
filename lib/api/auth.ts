import { apiClient } from "./client";

export interface SendOtpPayload {
  identifier: string;
  type: "login";
}

export interface VerifyOtpPayload {
  identifier: string;
  code: string;
}

export interface VerifyOtpResponse {
  accessToken: string;
  user: {
    id: string;
    email: string | null;
    phone: string;
    firstName: string | null;
    lastName: string | null;
    status: string;
  };
}

export const authApi = {
  sendOtp: async (identifier: string): Promise<{ message: string }> => {
    return apiClient<{ message: string }>("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ identifier, type: "login" }),
    });
  },

  verifyOtp: async (data: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
    return apiClient<VerifyOtpResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
