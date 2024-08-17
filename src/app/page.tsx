'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import AuthButtonClient from "@/components/AuthButton.client"

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/generate'); // Redirect to the /generate page
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      {/* Header */}
      <header className="w-full bg-blue-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">FlashMind ⚡</h1>
          <AuthButtonClient />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center text-center py-12 px-6">
        <div className="animate-fadeIn">
          <h2 className="text-5xl font-extrabold mb-4">Welcome to FlashMind ⚡</h2>
          <p className="text-2xl mb-6">The easiest way to make flashcards from your text</p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Features Section */}
        <section className="mt-12 w-full flex flex-col items-center space-y-8 container mx-auto md:flex-row md:space-y-0 md:space-x-6 md:justify-around text-left">
          {[
            {
              title: 'Effortless Creation ✨',
              description: 'Simply paste your text, and our AI handles the rest. Turning notes into flashcards has never been easier.',
            },
            {
              title: 'Intelligent Flashcards 🧠',
              description: 'Our AI transforms your text into precise, study-ready flashcards, tailored to boost your learning.',
            },
            {
              title: 'Study Anywhere, Anytime 🌍',
              description: 'Study on your schedule. Access your flashcards from any device, anytime, anywhere.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`flex-1 max-w-xs bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${index === 0 ? 'animate-fadeIn1' : index === 1 ? 'animate-fadeIn2' : 'animate-fadeIn3'}`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

// import { auth } from "@/auth"
// import AuthButton from "@/components/AuthButton.server"
// import { db } from "@/prisma";

// export default async function Home() {
//   const session = await auth()

  // const testDbCall = await db.user.findMany({ 
  //   where: {
  //     email: { 
  //       contains: "whitallee@gmail.com",
  //     },
  //   },
  //   // cacheStrategy: { ttl: 60 },
  // });

//   return (
//     <>
//       <h1>Home</h1>
//       <div>{JSON.stringify(session, null, 2)}</div>
//       {/* <h2>Test db call</h2>
//       <div>{JSON.stringify(testDbCall)}</div> */}
//       <AuthButton/>
//     </>
//   )
// }