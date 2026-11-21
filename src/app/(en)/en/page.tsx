import { OnePage } from "@/components/one-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/", "/en", "en");

export default function Page() {
  return <OnePage locale="en" />;
}
