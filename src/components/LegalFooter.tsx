import { Link } from "react-router-dom";

const LegalFooter = () => {
  return (
    <footer 
      className="w-full border-t py-8"
      style={{
        backgroundColor: 'hsl(222, 47%, 8%)',
        borderColor: 'hsl(217, 33%, 20%)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/star.png" alt="Starlit Logo" className="h-6 w-6" />
            <span 
              className="text-sm"
              style={{ color: 'hsl(215, 20%, 65%)' }}
            >
              © {new Date().getFullYear()} Starlit - Lighting Your Way. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link 
              to="/docs/terms"
              className="hover:text-[hsl(217,91%,60%)] transition-colors"
              style={{ color: 'hsl(215, 20%, 65%)' }}
            >
              Terms of Service
            </Link>
            <Link 
              to="/docs/privacy"
              className="hover:text-[hsl(217,91%,60%)] transition-colors"
              style={{ color: 'hsl(215, 20%, 65%)' }}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/"
              className="hover:text-[hsl(217,91%,60%)] transition-colors"
              style={{ color: 'hsl(215, 20%, 65%)' }}
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LegalFooter;