"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { generateAIFlashcardsAction } from "../actions";

interface AIGenerationButtonProps {
  deckId: number;
  deckDescription?: string;
  hasAIFeature: boolean;
  size?: "sm" | "lg";
}

export default function AIGenerationButton({
  deckId,
  deckDescription,
  hasAIFeature,
  size = "sm",
}: AIGenerationButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const hasDescription = !!deckDescription && deckDescription.trim() !== "";

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateAIFlashcardsAction({ deckId });

      if (result.success) {
        console.log(
          `Generated ${result.cards?.length || 0} cards successfully`
        );
      } else {
        console.error("AI Generation failed:", result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("AI Generation error:", error);
      alert("Failed to generate flashcards. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasAIFeature) {
    return (
      <Button
        asChild
        variant="outline"
        size={size}
        title="AI flashcard generation is a Pro feature"
      >
        <Link href="/pricing">
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade to Pro for AI
        </Link>
      </Button>
    );
  }

  if (!hasDescription) {
    return (
      <Button
        variant="outline"
        size={size}
        disabled
        title="Add a deck description to enable AI generation"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Generate with AI
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleGenerate}
      disabled={isGenerating}
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
