import { redirect } from "next/navigation";

// Send the root URL into the default English experience.
export const instant = false;
export default function RootPage() {
  redirect("/en");
}

