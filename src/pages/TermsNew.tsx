// import '../styles/legal.css'
// import LegalLayout from "@/components/LegalLayout";
// import LegalContentParser from "@/components/LegalContentParser";

// const TermsNew = () => {
//   return (
//     <LegalLayout
//       title="Terms of Service"
//       subtitle="Please read these terms carefully before using our services"
//       breadcrumb="Terms"
//       lastUpdated="October 12, 2025"
//     >
//       <div className="bg-card border border-border rounded-xl p-8">
//         <LegalContentParser filePath="/legal/terms.txt" />
//       </div>
//     </LegalLayout>
//   );
// };

// export default TermsNew;


import '../styles/legal.css'
import LegalLayout from "@/components/LegalLayout";
import LegalContentParser from "@/components/LegalContentParser";

const TermsNew = () => {
  return (
    <div className="legal-page">
      <LegalLayout
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
        breadcrumb="Terms"
        lastUpdated="October 12, 2025"
      >
        <div className="bg-card border border-border rounded-xl p-8">
          <LegalContentParser filePath="/legal/terms.txt" />
        </div>
      </LegalLayout>
    </div>
  );
};

export default TermsNew;