import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Shield, ArrowLeft } from "lucide-react";

const LegalHeader = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[hsl(222,47%,8%)] border-[hsl(217,33%,20%)]">
      <div className="container flex h-16 items-center justify-between px-6 mx-auto">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-[hsl(215,20%,65%)] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="h-6 w-px bg-[hsl(217,33%,20%)]" />
          <Link to="/" className="flex items-center gap-3">
            <img src="/star.png" alt="Starlit Logo" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              starlit
            </span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-1">
          <Link 
            to="/docs/terms"
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              isActive('/docs/terms')
                ? 'bg-[hsl(217,91%,60%,0.15)] text-[hsl(217,91%,60%)]'
                : 'text-[hsl(215,20%,65%)] hover:text-white hover:bg-[hsl(217,33%,17%)]'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Terms
            </div>
          </Link>
          <Link 
            to="/docs/privacy"
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              isActive('/docs/privacy')
                ? 'bg-[hsl(217,91%,60%,0.15)] text-[hsl(217,91%,60%)]'
                : 'text-[hsl(215,20%,65%)] hover:text-white hover:bg-[hsl(217,33%,17%)]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LegalHeader;