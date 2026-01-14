import LegalLayout from "@/components/LegalLayout";
import LegalContentParser from "@/components/LegalContentParser";

const PrivacyNew = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Learn how we collect, use, and protect your data"
      breadcrumb="Privacy"
      lastUpdated="January 14th, 2026"
    >
      <div 
        className="rounded-xl p-8 border"
        style={{
          backgroundColor: 'hsl(222, 47%, 9%)',
          borderColor: 'hsl(217, 33%, 20%)',
        }}
      >
        <LegalContentParser filePath="/legal/privacy.txt" />
      </div>
    </LegalLayout>
  );
};

export default PrivacyNew;