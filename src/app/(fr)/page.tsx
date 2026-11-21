import { OnePage } from "@/components/one-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/", "/en", "fr");

export default function Page() {
  return <OnePage locale="fr" />;
}
