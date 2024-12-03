"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "./components/button";

export default function Home() {
  const router = useRouter();

  const handleBookClick = () => {
    router.push("/booking");
  };

  return (
    <main className="min-h-screen p-6 pb-[53px] flex flex-col justify-between">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="font-normal text-[80px] leading-[80px] align-cap mt-[124px]">
          Boka ett rum
        </h1>
      </div>
      <div className="flex justify-center">
        <Button text="Boka" onClick={handleBookClick} />
      </div>
    </main>
  );
}
