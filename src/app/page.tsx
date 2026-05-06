import { SignIn, SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">FlashCard</h1>
          <h2 className="text-2xl text-muted-foreground">
            Your personal flashcard platform
          </h2>
        </div>

        <div className="flex gap-4 justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Sign In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogTitle className="sr-only">Sign In</DialogTitle>
              <SignIn routing="hash" fallbackRedirectUrl="/dashboard" />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sign Up</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogTitle className="sr-only">Sign Up</DialogTitle>
              <SignUp routing="hash" fallbackRedirectUrl="/dashboard" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
