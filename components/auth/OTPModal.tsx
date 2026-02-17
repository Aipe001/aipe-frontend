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
import { loginSuccess, resetAuth } from "@/lib/store/slices/authSlice";
import { RootState } from "@/lib/store/store";

export function OTPModal() {
  const dispatch = useDispatch();
  const { otpSent } = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState("");

  const handleVerify = () => {
    // Simulate API verification
    dispatch(
      loginSuccess({
        name: "John Doe",
        mobile: "9876543210",
        email: "john@example.com",
        address: "123, Main Street, City",
        profession: "Software Engineer",
        description: "Passionate developer building great things.",

        govtId: "ABCD12345",
      }),
    );
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
            className="w-full"
            onClick={handleVerify}
            disabled={value.length < 6}
          >
            Verify OTP
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
