import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/prisma";

export const BASE_PATH = "/api/auth"

const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(db),
    providers: [
        // github({
        //     clientId: process.env.AUTH_GITHUB_ID,
        //     clientSecret: process.env.AUTH_GITHUB_SECRET
        // }),
        google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        // credentials({
        //     name: "Credentials",
        //     credentials: {
        //         email: {label: "Email", type: "text", placeholder: "hello@example.com"},
        //         password: {label: "Password", type:"password"}
        //     },
        //     async authorize(credentials): Promise<User | null> {
        //         const users = [
        //             {
        //                 id: "test-user-1",
        //                 name: "Test 1",
        //                 password: "pass",
        //                 email: "test1@donotreply.com",
        //             },
        //             {
        //                 id: "test-user-2",
        //                 name: "Test 2",
        //                 password: "pass",
        //                 email: "test2@donotreply.com",
        //             },
        //         ];
        //         const user = users.find(
        //             (user) =>
        //                 user.email === credentials.email &&
        //                 user.password === credentials.password
        //         );
        //         return user
        //             ? { id: user.id, name: user.name, email: user.email}
        //             : null;
        //     },
        // }),
    ],
    basePath: BASE_PATH,
    secret: process.env.NEXTAUTH_SECRET
}

export const {handlers, auth, signIn, signOut} = NextAuth(authOptions)