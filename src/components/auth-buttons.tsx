"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AuthButtons() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="default">
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Sign In</DialogTitle>
          <SignIn routing="hash" fallbackRedirectUrl="/dashboard" />
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="default">
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Sign Up</DialogTitle>
          <SignUp routing="hash" fallbackRedirectUrl="/dashboard" />
        </DialogContent>
      </Dialog>
    </>
  );
}
