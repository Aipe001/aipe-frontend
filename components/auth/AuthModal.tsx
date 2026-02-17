"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginStart, otpSentSuccess } from "@/lib/store/slices/authSlice";
import { RootState } from "@/lib/store/store";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import Image from "next/image";

const phoneRegex = /^[6-9]\d{9}$/;

const loginSchema = z.object({
  mobile: z.string().regex(phoneRegex, "Invalid Indian mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  mobile: z.string().regex(phoneRegex, "Invalid Indian mobile number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [view, setView] = useState<"login" | "signup">("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

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

  const onLoginSubmit = async (data: LoginFormData) => {
    dispatch(loginStart());
    console.log("Login Data:", data, "Remember Me:", rememberMe);
    // Simulate API call
    setTimeout(() => {
      dispatch(otpSentSuccess());
      onClose();
      resetLogin();
    }, 1000);
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    dispatch(loginStart());
    console.log("Signup Data:", data);
    // Simulate API call
    setTimeout(() => {
      dispatch(otpSentSuccess());
      onClose();
      resetSignup();
    }, 1000);
  };

  const handleForgotPassword = () => {
    onClose(); // Close main modal
    setShowForgotPassword(true); // Open forgot password modal
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setView("login");
      setShowForgotPassword(false);
    }
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
                {view === "login" ? "Welcome Back!" : "Create Account"}
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground mt-0">
                {view === "login"
                  ? "Please enter your details to sign in."
                  : "Start your journey with us today."}
              </DialogDescription>
            </div>

            {view === "login" ? (
              <form
                onSubmit={handleSubmitLogin(onLoginSubmit)}
                className="space-y-2.5"
              >
                <div className="space-y-2">
                  <Label htmlFor="login-mobile" className="font-medium text-sm">
                    Mobile Number
                  </Label>
                  <Input
                    id="login-mobile"
                    placeholder="Enter 10 digit mobile number"
                    {...registerLogin("mobile")}
                    className="h-11 bg-muted/30 border-input focus:ring-[#1C8AFF] focus:border-[#1C8AFF] rounded-lg transition-all"
                  />
                  {errorsLogin.mobile && (
                    <span className="text-destructive text-xs">
                      {errorsLogin.mobile.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter password"
                    {...registerLogin("password")}
                    className="h-11 bg-muted/30 border-input focus:ring-[#1C8AFF] focus:border-[#1C8AFF] rounded-lg transition-all"
                  />
                  {errorsLogin.password && (
                    <span className="text-destructive text-xs">
                      {errorsLogin.password.message}
                    </span>
                  )}
                </div>

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
                    onClick={handleForgotPassword}
                    className="text-sm font-medium text-[#1C8AFF] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-2"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

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
              </form>
            ) : (
              <form
                onSubmit={handleSubmitSignup(onSignupSubmit)}
                className="space-y-2.5"
              >
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
                <div className="space-y-1">
                  <Label htmlFor="signup-mobile">Mobile Number</Label>
                  <Input
                    id="signup-mobile"
                    placeholder="Enter 10 digit mobile number"
                    {...registerSignup("mobile")}
                    className="h-11 bg-muted/30 border-input focus:ring-[#1C8AFF] focus:border-[#1C8AFF] rounded-lg transition-all"
                  />
                  {errorsSignup.mobile && (
                    <span className="text-destructive text-xs">
                      {errorsSignup.mobile.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-email">Email ID (Optional)</Label>
                  <Input
                    id="signup-email"
                    placeholder="Enter email address"
                    {...registerSignup("email")}
                    className="h-11 bg-muted/30 border-input focus:ring-[#1C8AFF] focus:border-[#1C8AFF] rounded-lg transition-all"
                  />
                  {errorsSignup.email && (
                    <span className="text-destructive text-xs">
                      {errorsSignup.email.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    {...registerSignup("password")}
                    className="h-11 bg-muted/30 border-input focus:ring-[#1C8AFF] focus:border-[#1C8AFF] rounded-lg transition-all"
                  />
                  {errorsSignup.password && (
                    <span className="text-destructive text-xs">
                      {errorsSignup.password.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-2"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
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
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onBack={() => {
          setShowForgotPassword(false);
          // Re-open auth modal if needed, but standard UX is usually staying closed or explicit back button
          // Since onClose is passed from Header to AuthModal, we can't easily re-open it unless we manage state up.
          // But here we are managing local state.
          // Ideally we want to go back to Login modal.
          // We can pass a callback or just expect user to click login again.
          // For better UX, let's keep it simple: Forgot Password closes, user has to click login again.
          // OR: we can lift the state up to Header context, but refactoring Header again is complex.
          // Let's rely on the user clicking Login again or handling it via the onBack prop.
          // Actually, since I control AuthModal rendering in Header, and ForgotPassword is here...
          // Wait, where should ForgotPasswordModal live?
          // If it lives inside AuthModal, it's weird because Dialog inside Dialog is bad.
          // It should be a sibling.
          // I'll keep it here but rendered conditionally.
          // Actually I'll render it as a sibling in the return of AuthModal? No that's fine.
        }}
      />
      {/* 
        NOTE: The "Back to Log In" in ForgotPasswordModal should probably close it 
        and re-open AuthModal. 
        Currently AuthModal takes isOpen prop. 
        If I close AuthModal to show ForgotPw, I can't easily re-open it from inside simple props 
        without a "onSwitchToForgot" callback type thing. 
        
        Let's modify AuthModal to handle the switch gracefully visually 
        OR just let the parent Header manage both? 
        Header manages `isAuthModalOpen`.
        
        Let's make AuthModal handle the view switching internally? 
        No, Dialog content cannot change size easily without jarring effect. 
        And ForgotPassword might be a different size.
        
        Current approach: 
        1. AuthModal is open. 
        2. User clicks "Forgot Password". 
        3. AuthModal closes (via local logic? no, props.onClose).
        4. ForgotPassword opens (local state in AuthModal? No, if parent closes, child closes).
        
        Let's move ForgotPasswordModal to Header to be safe and clean.
        
        Wait, I already put it in the return of AuthModal. 
        If AuthModal is unmouted (isOpen=false) then ForgotPasswordModal also unmounts? 
        Component is `AuthModal`. Header renders `<AuthModal isOpen={...} />`.
        If isOpen is false, AuthModal component relies on Dialog `open` prop. 
        The component itself is still mounted? 
        No, usually Dialog implementation keeps it mounted but hidden? 
        Or conditional render in Header?
        
        In Header: 
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        
        If I put ForgotPasswordModal INSIDE AuthModal's return:
          return (
             <>
               <Dialog open={isOpen} ... /> 
               <ForgotPasswordModal open={showForgot} ... />
             </>
          )
        
        Even if `isOpen` is false, `AuthModal` component is still rendered by Header (unless Header conditionally renders it).
        In Header: it is NOT conditionally rendered. It is: `{!isAuthenticated ? <Button.../> : ...} ... <AuthModal ... />`.
        So AuthModal component IS mounted. 
        So I CAN manage ForgotPassword state inside AuthModal.
        
        Perfect.
      */}
    </>
  );
}
