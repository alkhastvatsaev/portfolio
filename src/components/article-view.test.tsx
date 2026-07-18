/** @vitest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

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

import { ArticleView } from "./article-view";
import { articlesFr } from "@/data/articles";

describe("ArticleView", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders title, breadcrumb and related links", () => {
    const [article, ...related] = articlesFr;

    render(
      <ArticleView
        article={article}
        path={`/fr/articles/${article.slug}`}
        related={related}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: article.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Fil d’Ariane" }),
    ).toBeInTheDocument();
    expect(screen.getByText(article.description)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Profil Full Stack/i }),
    ).toHaveAttribute("href", "/fr/developpeur-full-stack");
    expect(screen.getByRole("link", { name: /Me contacter/i })).toHaveAttribute(
      "href",
      "mailto:alkhastvatsaev@icloud.com",
    );
  });
});
