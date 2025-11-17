import { ReactNode } from "react";
import LegalHeader from "./LegalHeader";
import LegalFooter from "./LegalFooter";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  breadcrumb: string;
  lastUpdated: string;
}

const LegalLayout = ({ children, title, subtitle, breadcrumb, lastUpdated }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <LegalHeader />
      
      {/* Hero Section */}
      <div className="w-full bg-panel-dark border-b border-border">
        <div className="container mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link to="/" className="text-text-muted hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-text-subtle" />
            <span className="text-text-muted">Legal</span>
            <ChevronRight className="w-4 h-4 text-text-subtle" />
            <span className="text-text-secondary">{breadcrumb}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            {title}
          </h1>
          <p className="text-lg text-text-muted max-w-3xl">
            {subtitle}
          </p>
          <p className="text-sm text-text-subtle mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          {children}
        </div>
      </main>
      
      <LegalFooter />
    </div>
  );
};

export default LegalLayout;