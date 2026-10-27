"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThumbsDownIcon } from "@phosphor-icons/react";

import { PokemonPreview } from "@/components/feature/PokemonPreview";

import { TestFlex } from "@/components/feature/TestFlex";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-mono dark:bg-black">
      <main className="flex flex-1 gap-8 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <TestFlex></TestFlex>
        <PokemonPreview
          name="Bulbasaur"
          stillImagePath="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/1.png"
          animImagePath="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
        />
        <div className="flex justify-center gap-1">
          <Button variant="outline">Ligma</Button>
          <Button variant="outline" size="icon">
            <ThumbsDownIcon />
          </Button>
        </div>
      </main>
    </div>
  );
}
