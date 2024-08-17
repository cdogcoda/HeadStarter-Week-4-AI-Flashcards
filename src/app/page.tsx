import { auth } from "@/auth"
import AuthButton from "@/components/AuthButton.server"
import { db } from "@/prisma";

export default async function Home() {
  const session = await auth()

  // const testDbCall = await db.user.findMany({ 
  //   where: {
  //     email: { 
  //       contains: "whitallee@gmail.com",
  //     },
  //   },
  //   // cacheStrategy: { ttl: 60 },
  // });

  return (
    <>
      <h1>Home</h1>
      <div>{JSON.stringify(session, null, 2)}</div>
      {/* <h2>Test db call</h2>
      <div>{JSON.stringify(testDbCall)}</div> */}
      <AuthButton/>
    </>
  )
}
