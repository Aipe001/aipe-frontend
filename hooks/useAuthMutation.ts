import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setTempIdentifier } from "@/lib/store/slices/authSlice";

export const useSendOtpMutation = (onSuccess?: () => void) => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (identifier: string) => authApi.sendOtp(identifier),
    onSuccess: (data, variables) => {
      toast.success(data.message || "OTP sent successfully");
      dispatch(setTempIdentifier(variables)); // Save mobile number
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send OTP");
    },
  });
};
