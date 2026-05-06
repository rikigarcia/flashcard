"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { generateAIFlashcardsAction } from "../actions";

interface AIGenerationButtonProps {
  deckId: number;
  deckDescription?: string;
  size?: "sm" | "lg";
}

export default function AIGenerationButton({
  deckId,
  deckDescription,
  size = "sm",
}: AIGenerationButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const hasDescription = deckDescription && deckDescription.trim() !== "";

  const handleGenerate = async () => {
    if (!hasDescription) {
      alert(
        "Please add a description to your deck before generating AI flashcards."
      );
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateAIFlashcardsAction({ deckId });

      if (result.success) {
        // Success - cards will be automatically shown due to revalidatePath
        console.log(
          `Generated ${result.cards?.length || 0} cards successfully`
        );
      } else {
        // Handle error
        console.error("AI Generation failed:", result.error);
        alert(result.error); // TODO: Replace with proper toast notification
      }
    } catch (error) {
      console.error("AI Generation error:", error);
      alert("Failed to generate flashcards. Please try again."); // TODO: Replace with proper toast notification
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleGenerate}
      disabled={isGenerating || !hasDescription}
      title={!hasDescription ? "Add a deck description to enable AI generation" : undefined}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate with AI
        </>
      )}
    </Button>
  );
}
