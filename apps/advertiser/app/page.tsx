import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const signedIn = cookieStore.get("aduo_signed_in")?.value === "true";
  if (signedIn) {
    redirect("/dashboard");
  }
  redirect("/signin");
}
