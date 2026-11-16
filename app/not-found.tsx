import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "./components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen grid-bg">
      <div className="grid-glow" aria-hidden="true" />

      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-32">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="rounded-xl">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back home
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/#projects">Browse projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
