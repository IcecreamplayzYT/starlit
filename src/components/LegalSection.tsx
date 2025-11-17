import { ReactNode } from "react";

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

const LegalSection = ({ title, children }: LegalSectionProps) => {
  return (
    <section className="bg-card border border-border rounded-xl p-8">
      <h2 className="text-2xl font-semibold text-text-primary mb-4">
        {title}
      </h2>
      <div className="text-text-muted leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
};

export default LegalSection;
