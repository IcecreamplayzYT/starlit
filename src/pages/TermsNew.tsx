import LegalLayout from "@/components/LegalLayout";
import LegalContentParser from "@/components/LegalContentParser";

const TermsNew = () => {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our services"
      breadcrumb="Terms"
      lastUpdated="January 14th, 2026"
    >
      <div 
        className="rounded-xl p-8 border"
        style={{
          backgroundColor: 'hsl(222, 47%, 9%)',
          borderColor: 'hsl(217, 33%, 20%)',
        }}
      >
        <LegalContentParser filePath="/legal/terms.txt" />
      </div>
    </LegalLayout>
  );
};

export default TermsNew;