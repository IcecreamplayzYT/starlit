import { Link } from "react-router-dom";

const LegalFooter = () => {
  return (
    <footer className="w-full border-t border-border bg-panel-darker mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            © 2025 Starlit. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              to="/docs/terms" 
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link 
              to="/docs/privacy" 
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <a 
              href="https://discord.com/starlit" 
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;
