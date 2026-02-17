"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AuthModal } from "@/components/auth/AuthModal";
import { updateProfile, logout } from "@/lib/store/slices/authSlice";
import { RootState } from "@/lib/store/store";
import { OTPModal } from "@/components/auth/OTPModal";
import { User, Briefcase, Camera } from "lucide-react";
import Image from "next/image";

const profileSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().optional(),
  profession: z.string().optional(),
  description: z.string().optional(),
  govtId: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      email: user?.email || "",
      address: user?.address || "",
      profession: user?.profession || "",
      description: user?.description || "",
      govtId: user?.govtId || "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    dispatch(updateProfile(data));
    setIsEditing(false);
  };

  const handleSignOutput = () => {
    dispatch(logout());
  };

  const handleAuthModalClose = () => {
    toast.error("Login process not completed.");
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background/50 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-background/20 backdrop-blur-md z-10" />
        <div className="z-20">
          <AuthModal isOpen={true} onClose={handleAuthModalClose} />
          <OTPModal />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Header / Cover */}
      <div className="h-48 bg-gradient-to-r from-blue-600 to-[#1C8AFF] w-full relative">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative -mt-20">
        <div className="grid gap-6">
          {/* Profile Header Card */}
          <Card className="border-0 shadow-lg overflow-visible">
            <CardContent className="pt-0 pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12 sm:-mt-16 px-4 pt-4 sm:pt-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden relative group">
                    {user?.profilePhoto ? (
                      <Image
                        src={user.profilePhoto}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <User className="w-16 h-16 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-sm border border-white"
                  >
                    <Camera className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1 pb-2 mt-4 sm:mt-0">
                  <h1 className="text-2xl font-bold text-foreground">
                    {`${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
                      "Guest User"}
                  </h1>
                  <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2 text-sm">
                    <Briefcase className="w-4 h-4" />
                    {user?.profession || "Add profession"}
                  </p>
                </div>

                <div className="flex gap-3 pb-2">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 shadow-sm transition-all"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="text-destructive border-destructive/20 hover:bg-destructive/5"
                    onClick={handleSignOutput}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Form */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Manage your personal details and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mobile - Read Only */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                        Mobile Number
                      </Label>
                      <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        Unique Identifier
                      </span>
                    </div>
                    <div className="relative">
                      <Input
                        value={user?.mobile || ""}
                        disabled
                        className="bg-muted/50 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        disabled={!isEditing}
                        className={`${isEditing ? "border-[#1C8AFF] ring-1 ring-[#1C8AFF]/20" : ""}`}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-destructive text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        disabled={!isEditing}
                        className={`${isEditing ? "border-[#1C8AFF] ring-1 ring-[#1C8AFF]/20" : ""}`}
                        {...register("name")}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-destructive text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="profession"
                      className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                    >
                      Profession
                    </Label>
                    <div className="relative">
                      <Input
                        id="profession"
                        disabled={!isEditing}
                        className={`${isEditing ? "border-[#1C8AFF] ring-1 ring-[#1C8AFF]/20" : ""}`}
                        {...register("profession")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="address"
                      className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                    >
                      Address
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="address"
                        disabled={!isEditing}
                        className={`min-h-[80px] pt-2 ${isEditing ? "border-[#1C8AFF] ring-1 ring-[#1C8AFF]/20" : ""}`}
                        {...register("address")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="description"
                      className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                    >
                      Bio / Description
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="description"
                        className={`min-h-[100px] pt-2 ${isEditing ? "border-[#1C8AFF] ring-1 ring-[#1C8AFF]/20" : ""}`}
                        disabled={!isEditing}
                        {...register("description")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="govtId"
                      className="text-muted-foreground text-xs font-semibold uppercase tracking-wider"
                    >
                      Government ID Proof
                    </Label>
                    <div className="relative">
                      <Input
                        id="govtId"
                        disabled={!isEditing}
                        className={`${isEditing ? "border-[#1C8AFF] ring-1 ring-[#1C8AFF]/20" : ""}`}
                        {...register("govtId")}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-4 border-t">
                    <Button
                      type="submit"
                      className="bg-[#1C8AFF] hover:bg-[#1C8AFF]/90 shadow-md"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <OTPModal />
    </div>
  );
}
