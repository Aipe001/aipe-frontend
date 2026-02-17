import { useMutation } from "@tanstack/react-query";
import { authApi, VerifyOtpPayload } from "@/lib/api/auth";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "@/lib/store/slices/authSlice";
import { toast } from "sonner";

export const useVerifyOTPMutation = (onSuccess?: () => void) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => authApi.verifyOtp(data),
    onSuccess: (data) => {
      // Map API response to Redux User state
      const userForState = {
        id: data.user.id,
        mobile: data.user.phone,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        status: data.user.status,
      };

      dispatch(loginSuccess({ user: userForState, token: data.accessToken }));
      toast.success(`Welcome back!`);
      if (onSuccess) onSuccess();
      // Optional: Redirect if needed, or handle in component
    },
    onError: (error: Error) => {
      dispatch(loginFailure(error.message));
      toast.error(error.message || "OTP verification failed");
    },
  });
};
