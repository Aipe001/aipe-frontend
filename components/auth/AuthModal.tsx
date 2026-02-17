"use client";

// import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
import { loginStart, otpSentSuccess } from "@/lib/store/slices/authSlice";
import Image from "next/image";
import { useSendOtpMutation } from "@/hooks/useAuthMutation";
// import { useLoginMutation, useRegisterMutation } from "@/hooks/useAuthMutation";
// import { ForgotPasswordModal } from "./ForgotPasswordModal";

const phoneRegex = /^[6-9]\d{9}$/;

const loginSchema = z.object({
  mobile: z.string().regex(phoneRegex, "Invalid Indian mobile number"),
  // password: z.string().min(6, "Password must be at least 6 characters"), // Legacy: Password field
});

/*
const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  mobile: z.string().regex(phoneRegex, "Invalid Indian mobile number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
*/

type LoginFormData = z.infer<typeof loginSchema>;
// type SignupFormData = z.infer<typeof signupSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch = useDispatch();

  // --- Legacy State for View and Password/Remember Me ---
  // const [view, setView] = useState<"login" | "signup">("login");
  // const [showForgotPassword, setShowForgotPassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: "",
      // password: "",
    },
  });

  /*
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
    reset: resetSignup,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
    },
  });
  */

  const sendOtpMutation = useSendOtpMutation(() => {
    dispatch(otpSentSuccess());
    onClose();
    reset();
  });

  /*
  const loginMutation = useLoginMutation(() => {
    dispatch(otpSentSuccess());
    onClose();
    reset();
  });

  const registerMutation = useRegisterMutation(() => {
    dispatch(otpSentSuccess());
    onClose();
    resetSignup();
  });
  */

  const isLoading = sendOtpMutation.isPending; // || loginMutation.isPending || registerMutation.isPending;

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginStart());
    sendOtpMutation.mutate(data.mobile);
    // loginMutation.mutate({ mobile: data.mobile, password: data.password });
  };

  /*
  const onSignupSubmit = (data: SignupFormData) => {
    dispatch(loginStart());
    registerMutation.mutate({
      name: data.name,
      mobile: data.mobile,
      email: data.email || undefined,
      password: data.password,
    });
  };
  */

  const handleOpenChange = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="w-[90%] max-w-[350px] p-0 bg-white rounded-xl overflow-hidden border-none shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 gap-0">
          <div className="px-6 py-4">
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/assets/aipe_logo2.png"
                  alt="Aipe"
                  fill
                  className="object-contain"
                />
              </div>
              <DialogTitle className="text-2xl font-bold text-center text-foreground tracking-tight">
                {/* {view === "login" ? "Welcome" : "Create Account"} */}
                Welcome
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground mt-0">
                {/* {view === "login" ? "Enter your mobile number to continue." : "Start your journey with us today."} */}
                Enter your mobile number to continue.
              </DialogDescription>
            </div>

            {/* Legacy: View Toggle (Login / Signup) */}
            {/* {view === "login" ? ( */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile" className="font-medium text-sm">
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  placeholder="Enter 10 digit mobile number"
                  {...register("mobile")}
                  className="h-11 bg-muted/30 border-input focus:ring-[#1C8AFF] focus:border-[#1C8AFF] rounded-lg transition-all"
                />
                {errors.mobile && (
                  <span className="text-destructive text-xs">
                    {errors.mobile.message}
                  </span>
                )}
              </div>

              {/* --- Legacy Password Field --- */}
              {/* 
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter password"
                    {...register("password")}
                    className="h-11 bg-muted/30 border-input focus:ring-[#1C8AFF] focus:border-[#1C8AFF] rounded-lg transition-all"
                  />
                  {errors.password && (
                    <span className="text-destructive text-xs">
                      {errors.password.message}
                    </span>
                  )}
                </div> 
                */}

              {/* --- Legacy Remember Me & Forgot Password --- */}
              {/* 
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(c) => setRememberMe(c as boolean)}
                      className="data-[state=checked]:bg-[#1C8AFF] data-[state=checked]:border-[#1C8AFF]"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm font-medium text-[#1C8AFF] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div> 
                */}

              <Button
                type="submit"
                className="w-full h-11 bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Get OTP"}
              </Button>

              {/* --- Legacy Signup Link --- */}
              {/* 
                <div className="text-center mt-6">
                  <span className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={() => setView("signup")}
                    className="text-sm font-semibold text-[#1C8AFF] hover:underline"
                  >
                    Sign up
                  </button>
                </div> 
                */}
            </form>

            {/* ) : ( */}

            {/* --- Legacy Signup Form --- */}
            {/* 
              <form onSubmit={handleSubmitSignup(onSignupSubmit)} className="space-y-2.5">
                <div className="space-y-1">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="Enter full name"
                    {...registerSignup("name")}
                    className="h-11 bg-muted/30 border-input focus:ring-[#1C8AFF] focus:border-[#1C8AFF] rounded-lg transition-all"
                  />
                  {errorsSignup.name && (
                    <span className="text-destructive text-xs">
                      {errorsSignup.name.message}
                    </span>
                  )}
                </div>
                // ... (Other Signup Fields would go here)
                <Button
                  type="submit"
                  className="w-full h-11 bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
                 <div className="text-center mt-3">
                  <span className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="text-sm font-semibold text-[#1C8AFF] hover:underline"
                  >
                    Log In
                  </button>
                </div>
              </form> 
              */}
            {/* ) */}
          </div>
        </DialogContent>
      </Dialog>

      {/* 
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onBack={() => {
          setShowForgotPassword(false);
        }}
      /> 
      */}
    </>
  );
}
