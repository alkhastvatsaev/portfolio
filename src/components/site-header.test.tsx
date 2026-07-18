/** @vitest-environment jsdom */
import { cleanup, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const usePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  beforeEach(() => {
    usePathname.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders French navigation on /fr routes", () => {
    usePathname.mockReturnValue("/fr");
    render(<SiteHeader />);

    expect(
      screen.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projets" })).toHaveAttribute(
      "href",
      "/fr/projets",
    );
    expect(screen.getByRole("link", { name: "Recruteurs" })).toHaveAttribute(
      "href",
      "/fr/pour-recruteurs",
    );
    expect(screen.getByRole("link", { name: "Français" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders English navigation on / routes", () => {
    usePathname.mockReturnValue("/");
    render(<SiteHeader />);

    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: "Recruiters" })).toHaveAttribute(
      "href",
      "/for-recruiters",
    );
  });

  it("maps project case-study paths in the language switcher", () => {
    usePathname.mockReturnValue("/projects/hopla");
    render(<SiteHeader />);

    const switcher = screen.getByLabelText("Choose language");
    expect(
      within(switcher).getByRole("link", { name: "Français" }),
    ).toHaveAttribute("href", "/fr/projets/hopla");
    expect(
      within(switcher).getByRole("link", { name: "English" }),
    ).toHaveAttribute("href", "/projects/hopla");
  });
});
