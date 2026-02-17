"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resetAuth } from "@/lib/store/slices/authSlice";
import { RootState } from "@/lib/store/store";
import { useVerifyOTPMutation } from "@/hooks/useVerifyOTPMutation";

export function OTPModal() {
  const dispatch = useDispatch();
  const { otpSent, tempIdentifier } = useSelector(
    (state: RootState) => state.auth,
  );
  const [value, setValue] = useState("");

  const verifyMutation = useVerifyOTPMutation(() => {
    setValue("");
  });

  const handleVerify = () => {
    if (tempIdentifier) {
      verifyMutation.mutate({ identifier: tempIdentifier, code: value });
    } else {
      console.error("Missing identifier for OTP verification");
    }
  };

  const handleClose = () => {
    dispatch(resetAuth());
    setValue("");
  };

  return (
    <Dialog open={otpSent} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Enter OTP</DialogTitle>
          <DialogDescription className="text-center">
            A 6-digit OTP has been sent to your mobile number.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            className="w-full bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleVerify}
            disabled={value.length < 6 || verifyMutation.isPending}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
