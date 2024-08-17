"use client"

import { useSession } from "next-auth/react"
import { signIn, signOut } from "@/auth/helpers"
import { redirect, usePathname } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function AuthButtonClient(){
    const session = useSession();
    const path = usePathname();

    return session?.data?.user ? (
        <button className="border-gray-700 border rounded-lg p-2" onClick={async () =>
            {
                await signOut()
                // revalidatePath("/")
            }
        }>
            {session.data?.user?.name} : Sign Out
        </button>
    ) : (
        <button className="border-gray-700 border rounded-lg p-2" onClick={async () => await signIn()}>
            Sign In
        </button>
    )
}