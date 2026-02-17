"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
  onBack,
}: ForgotPasswordModalProps) {
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Reset password for:", mobile);
      setIsLoading(false);
      toast.success("Reset link sent to your mobile number");
      onClose();
      setMobile("");
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-6 bg-background rounded-xl border border-border shadow-2xl backdrop-blur-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center tracking-tight">
            Reset Password
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground mt-2">
            Enter your mobile number to receive a reset link.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="reset-mobile" className="sr-only">
              Mobile Number
            </Label>
            <Input
              id="reset-mobile"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="h-11 bg-muted/30 border-input focus:ring-[#1C8AFF] focus:border-[#1C8AFF]"
              required
              pattern="^[0-9]{10}$"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
            disabled={isLoading || mobile.length < 10}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-muted-foreground hover:text-[#1C8AFF] transition-colors"
            >
              Back to Log In
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
