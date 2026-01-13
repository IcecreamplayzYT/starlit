import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import LegalHeader from "./LegalHeader";
import LegalFooter from "./LegalFooter";

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  breadcrumb: string;
  lastUpdated: string;
}

const LegalLayout = ({ children, title, subtitle, breadcrumb, lastUpdated }: LegalLayoutProps) => {
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: 'hsl(222, 47%, 6%)',
        color: 'hsl(210, 40%, 98%)',
      }}
    >
      <LegalHeader />
      
      {/* Hero Section */}
      <div 
        className="w-full border-b"
        style={{
          backgroundColor: 'hsl(222, 47%, 8%)',
          borderColor: 'hsl(217, 33%, 20%)',
        }}
      >
        <div className="container mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link 
              to="/" 
              className="hover:text-[hsl(217,91%,60%)] transition-colors"
              style={{ color: 'hsl(215, 20%, 65%)' }}
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4" style={{ color: 'hsl(215, 20%, 50%)' }} />
            <span style={{ color: 'hsl(215, 20%, 65%)' }}>Legal</span>
            <ChevronRight className="w-4 h-4" style={{ color: 'hsl(215, 20%, 50%)' }} />
            <span style={{ color: 'hsl(210, 40%, 98%)' }}>{breadcrumb}</span>
          </div>
          
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: 'hsl(210, 40%, 98%)' }}
          >
            {title}
          </h1>
          <p 
            className="text-lg max-w-3xl"
            style={{ color: 'hsl(215, 20%, 65%)' }}
          >
            {subtitle}
          </p>
          <p 
            className="text-sm mt-4"
            style={{ color: 'hsl(215, 20%, 50%)' }}
          >
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