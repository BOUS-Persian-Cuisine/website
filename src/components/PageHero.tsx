import type { ReactNode } from "react";

type PageHeroProps = {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  overlay?: boolean;
};

export function PageHero({
  children,
  className = "bg-[url('/bous-bg-3.jpg')]",
  contentClassName = "",
  overlay = false,
}: PageHeroProps) {
  return (
    <main
      className={[
        "relative -mt-23 flex min-h-screen items-center justify-center bg-cover bg-center bg-repeat px-6 pb-20 pt-20 sm:px-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {overlay ? (
        <div className="absolute inset-0 bg-background/70" aria-hidden />
      ) : null}

      {children ? (
        <div
          className={["relative z-10 w-full", contentClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      ) : null}
    </main>
  );
}
