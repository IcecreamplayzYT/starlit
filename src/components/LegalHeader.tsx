import { Link } from "react-router-dom";

const LegalHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-panel-darker">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link to="/docs" className="flex items-center gap-3">
          <img src="/starlit.png" alt="Starlit Logo" className="h-10 w-auto" />
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/docs/terms" 
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Terms
          </Link>
          <Link 
            to="/docs/privacy" 
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LegalHeader;
