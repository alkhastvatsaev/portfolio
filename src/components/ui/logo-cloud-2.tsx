import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/** Technologies actually used in the shipped projects (see src/data/metrics.ts). */
export const defaultLogos: readonly Logo[] = [
  { src: "/logos/nextdotjs.svg", alt: "Next.js" },
  { src: "/logos/react.svg", alt: "React" },
  { src: "/logos/typescript.svg", alt: "TypeScript" },
  { src: "/logos/swift.svg", alt: "Swift" },
  { src: "/logos/python.svg", alt: "Python" },
  { src: "/logos/firebase.svg", alt: "Firebase" },
  { src: "/logos/postgresql.svg", alt: "PostgreSQL" },
  { src: "/logos/stripe.svg", alt: "Stripe" },
  { src: "/logos/openai.svg", alt: "OpenAI" },
  { src: "/logos/claude.svg", alt: "Claude" },
  { src: "/logos/threedotjs.svg", alt: "Three.js" },
  { src: "/logos/vercel.svg", alt: "Vercel" },
];

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos?: readonly Logo[];
};

/**
 * Bordered logo grid with "+" crosshairs on the inner corners.
 * 2 columns on mobile, 3 on tablet, 6 on desktop.
 */
export function LogoCloud({
  className,
  logos = defaultLogos,
  ...props
}: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-border sm:grid-cols-3 lg:grid-cols-6",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t border-border" />

      {logos.map((logo, index) => (
        <LogoCard
          className={cn(
            "border-b border-r border-border",
            index % 2 === 0 && "bg-secondary/40",
          )}
          key={logo.alt}
          logo={logo}
        >
          {index % 3 === 0 ? (
            <PlusIcon
              aria-hidden="true"
              className="absolute -right-[12.5px] -bottom-[12.5px] z-10 size-6 text-muted-foreground"
              strokeWidth={1}
            />
          ) : null}
        </LogoCard>
      ))}

      <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b border-border" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3 bg-background px-4 py-8 transition-colors hover:bg-secondary md:p-8",
        className,
      )}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={logo.alt}
        className="pointer-events-none h-5 w-auto select-none opacity-70 brightness-0 invert transition-opacity group-hover:opacity-100 md:h-6"
        height={logo.height ?? 24}
        loading="lazy"
        src={logo.src}
        width={logo.width ?? 96}
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {logo.alt}
      </span>
      {children}
    </div>
  );
}
