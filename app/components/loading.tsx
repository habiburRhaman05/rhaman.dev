export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          <span className="gradient-text">Habib</span>
          <span className="text-primary">.</span>
        </span>
      </div>
    </div>
  );
}
