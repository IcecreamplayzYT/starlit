import { Link } from "react-router-dom";
import { FileText, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-panel-darker">
        <div className="container mx-auto flex h-16 items-center px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src="/starlit.png" alt="Starlit Logo" className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Legal Documents
            </h1>
            <p className="text-lg text-text-secondary">
              Select a document to view
            </p>
          </div>

          {/* Document Selector Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Terms of Service */}
            <Link
              to="/docs/terms"
              className="group bg-card border border-border rounded-xl p-8 hover:border-primary transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary mb-2">
                    Terms of Service
                  </h2>
                  <p className="text-text-muted">
                    Read our terms and conditions for using Starlit services
                  </p>
                </div>
              </div>
            </Link>

            {/* Privacy Policy */}
            <Link
              to="/docs/privacy"
              className="group bg-card border border-border rounded-xl p-8 hover:border-primary transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-success/10 group-hover:bg-success/20 transition-colors">
                  <Shield className="h-8 w-8 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary mb-2">
                    Privacy Policy
                  </h2>
                  <p className="text-text-muted">
                    Learn how we collect, use, and protect your personal data
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-panel-darker">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">
              © 2025 Starlit. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/docs/terms" className="text-sm text-text-muted hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/docs/privacy" className="text-sm text-text-muted hover:text-primary transition-colors">
                Privacy
              </Link>
              <a href="https://discord.com/starlit" className="text-sm text-text-muted hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
