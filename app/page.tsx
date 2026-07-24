import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Humble Office</h1>
        <Link 
          href="/career-guide" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-indigo-600 text-primary-foreground hover:bg-indigo-600/90 h-10 py-2 px-4"
        >
          Open Career Guide
        </Link>
      </div>
    </div>
  );
}
