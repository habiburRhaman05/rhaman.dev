import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";

export default function ProjectNotFound() {
  return (
    <div className="relative min-h-screen grid-bg">
      <div className="grid-glow" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 sm:px-8 sm:pt-32">
        <Breadcrumb className="mb-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/#projects">Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground">
                Not found
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Project not found
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          There is no project at this address. It may have been renamed, or the
          link may be incomplete.
        </p>

        <div className="mt-8">
          <Button asChild className="rounded-xl">
            <Link href="/#projects">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to all projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
