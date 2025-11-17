// import '../styles/legal.css'
// import LegalLayout from "@/components/LegalLayout";
// import LegalContentParser from "@/components/LegalContentParser";

// const PrivacyNew = () => {
//   return (
//     <LegalLayout
//       title="Privacy Policy"
//       subtitle="Learn how we collect, use, and protect your data"
//       breadcrumb="Privacy"
//       lastUpdated="October 11, 2025"
//     >
//       <div className="bg-card border border-border rounded-xl p-8">
//         <LegalContentParser filePath="/legal/privacy.txt" />
//       </div>
//     </LegalLayout>
//   );
// };

// export default PrivacyNew;


import '../styles/legal.css'
import LegalLayout from "@/components/LegalLayout";
import LegalContentParser from "@/components/LegalContentParser";

const PrivacyNew = () => {
  return (
    <div className="legal-page">
      <LegalLayout
        title="Privacy Policy"
        subtitle="Learn how we collect, use, and protect your data"
        breadcrumb="Privacy"
        lastUpdated="October 11, 2025"
      >
        <div className="bg-card border border-border rounded-xl p-8">
          <LegalContentParser filePath="/legal/privacy.txt" />
        </div>
      </LegalLayout>
    </div>
  );
};

export default PrivacyNew;