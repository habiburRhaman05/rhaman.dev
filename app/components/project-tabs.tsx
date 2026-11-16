"use client";

import type { ReactNode } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

export interface ProjectTab {
  id: string;
  label: string;
  count: number;
}

interface ProjectTabsProps {
  tabs: ProjectTab[];
  /** Panel content per tab id, rendered on the server and passed through. */
  panels: Record<string, ReactNode>;
  label: string;
}

/**
 * Tab header for the client-work disciplines. Panels are server-rendered and
 * handed in as children, so only the tab switching runs on the client.
 */
export default function ProjectTabs({
  tabs,
  panels,
  label,
}: ProjectTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <Tabs defaultValue={tabs[0].id} className="w-full">
      <TabsList
        aria-label={label}
        className="mb-10 flex h-auto w-full items-end justify-start gap-1 overflow-x-auto rounded-none border-b border-border bg-transparent p-0 scrollbar-hide sm:gap-2"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="group relative shrink-0 rounded-none border-b-2 border-transparent px-1 pb-3 pt-0 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground sm:px-2 sm:text-base"
          >
            <span className="px-2 sm:px-1">{tab.label}</span>
            <span className="ml-0.5 font-mono text-[11px] text-muted-foreground/70 group-data-[state=active]:text-primary">
              {tab.count}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.id}
          value={tab.id}
          className="mt-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {panels[tab.id]}
        </TabsContent>
      ))}
    </Tabs>
  );
}
