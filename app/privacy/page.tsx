import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: January 5, 2025
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg text-gray-600 max-w-none space-y-8">
            <p className="text-xl font-medium text-gray-900">
              At MyERAS Reviewer, we understand that your residency application contains deeply personal information about your academic journey, professional experiences, and career aspirations. We recognize the trust you place in us when sharing this information, and we are committed to protecting your privacy with the same rigor we apply to reviewing your application.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Information We Collect</h2>
              <p>
                When you engage with our services, we collect information through various channels to provide you with the most effective application review possible. During account creation, we gather basic identification information including your full name, email address, medical school affiliation, expected graduation year, and intended specialty. This foundational information allows us to match you with reviewers who have specific expertise in your specialty and understand the unique challenges faced by applicants from your background. We also collect payment information, which is processed securely through our third-party payment processors and never stored directly on our servers.
              </p>
              <p>
                The heart of our service involves reviewing your application materials, which means we receive and temporarily store the various components of your ERAS application. This includes your personal statement, experience descriptions, most meaningful experience narratives, and any additional documents you choose to share for review such as curriculum vitae, letters of recommendation drafts, or program lists. We understand these documents contain sensitive information about your academic performance, clinical experiences, research activities, and personal background. Each piece of information is treated with the utmost confidentiality and accessed only by your assigned reviewer and necessary support staff bound by strict confidentiality agreements.
              </p>
              <p>
                Throughout your interaction with our platform, we automatically collect certain technical information to ensure optimal service delivery and security. This includes your IP address, browser type and version, device information, operating system, and interaction patterns with our website. We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze aggregate usage patterns to improve our services. This technical data helps us identify and prevent security threats, optimize our platform's performance across different devices, and understand how users navigate our services to continually enhance the user experience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">How We Use Your Information</h2>
              <p>
                The primary purpose of collecting your information is to provide you with exceptional application review services tailored to your specific needs and circumstances. When you submit your application materials, our system analyzes various factors including your specialty choice, medical school background, and application timeline to match you with the most appropriate reviewer from our team. Your reviewer uses the information you provide to offer personalized feedback that considers your unique experiences, career goals, and the specific requirements of programs in your chosen specialty. This personalized approach extends beyond simple editing to strategic advice about how to position yourself competitively within your particular applicant pool.
              </p>
              <p>
                We utilize your information to facilitate seamless communication throughout the review process, sending you important updates about your review status, deadline reminders, and responses to any questions you submit. Our customer support team may access your account information to assist with technical issues, billing inquiries, or to provide additional guidance about our services. We maintain detailed records of all communications and service delivery to ensure consistency and quality across all interactions, allowing us to provide continuity of service if you engage with multiple reviewers or return for additional services.
              </p>
              <p>
                Beyond individual service delivery, we analyze anonymized and aggregated data from all applications to identify trends, common challenges, and successful strategies across different specialties and applicant demographics. This analysis informs our blog content, helps us develop new service offerings, and allows us to provide data-driven insights to future applicants. For instance, we might identify that applicants to certain specialties consistently struggle with particular aspects of their applications, prompting us to develop specialized resources or adjust our reviewer training. Importantly, this analysis never involves identifying individual applicants, and all insights are derived from aggregate data patterns that maintain complete individual privacy.
              </p>
              <p>
                We are required by law to maintain certain records for tax and regulatory compliance purposes, including transaction records and basic account information. Additionally, we may use your information to protect our legal rights, enforce our terms of service, and prevent fraud or abuse of our platform. In rare circumstances, we may be compelled by law enforcement or court order to disclose certain information, though we commit to resisting such requests to the fullest extent permitted by law and will notify affected users unless legally prohibited from doing so.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Data Security and Protection</h2>
              <p>
                Protecting your sensitive information requires a multi-layered approach to security that begins with our infrastructure and extends through every aspect of our operations. All data transmitted between your device and our servers is encrypted using industry-standard TLS 1.3 protocols, ensuring that your application materials cannot be intercepted or read during transmission. Once received, your data is stored on servers that employ AES-256 encryption at rest, meaning that even in the unlikely event of unauthorized server access, your information would remain unreadable without the corresponding encryption keys, which are stored separately and rotated regularly.
              </p>
              <p>
                Our servers are hosted in SOC 2 Type II certified data centers that maintain strict physical security controls, including biometric access restrictions, 24/7 monitoring, and redundant environmental controls. We implement comprehensive logical access controls, requiring multi-factor authentication for all staff members who may access user data. Access privileges are granted on a strict need-to-know basis and are regularly audited to ensure compliance with our principle of least privilege. All access to user data is logged and monitored, with automated alerts for any unusual access patterns that might indicate a security concern.
              </p>
              <p>
                We conduct regular security assessments including automated vulnerability scanning, manual penetration testing by third-party security firms, and code reviews for all platform updates. Our incident response team maintains detailed procedures for addressing potential security events, with clear escalation paths and communication protocols. We maintain comprehensive backup systems with encrypted, geographically distributed copies of data to ensure service continuity and data recovery capabilities in the event of any system failure or disaster. Despite these extensive measures, we acknowledge that no system is completely impenetrable, which is why we also maintain cyber liability insurance and have protocols in place for transparent communication with affected users in the unlikely event of a data breach.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Information Sharing and Disclosure</h2>
              <p>
                We fundamentally believe that your application information belongs to you, and we never sell, rent, or trade your personal information to third parties for their marketing purposes. The sharing of your information is limited to specific circumstances necessary for service delivery and legal compliance. Your assigned reviewer receives access to your application materials solely for the purpose of providing review services, and this access is revoked upon completion of the service period. Our reviewers are bound by comprehensive confidentiality agreements that survive their relationship with our company and include substantial penalties for any unauthorized disclosure of applicant information.
              </p>
              <p>
                We work with carefully selected third-party service providers who assist us in delivering our services, including payment processors, email communication platforms, and cloud infrastructure providers. These partners are contractually obligated to maintain the confidentiality of your information and are prohibited from using it for any purpose other than providing services to us. We conduct thorough due diligence on all service providers, requiring them to maintain security standards equivalent to or exceeding our own. For example, our payment processor is PCI DSS Level 1 certified, the highest level of certification available, ensuring your payment information is handled with bank-level security.
              </p>
              <p>
                In certain circumstances, we may share anonymized success stories or testimonials with your explicit written consent. Even in these cases, we work with you to ensure that any shared information doesn't compromise your privacy or professional standing. We may also share aggregated, non-identifying statistical information about our services, such as overall match rates or the distribution of applicants across specialties. This aggregate data is carefully reviewed to ensure it cannot be reverse-engineered to identify individual applicants, particularly for applicants from smaller medical schools or less common specialty choices where the applicant pool might be limited.
              </p>
              <p>
                If our company undergoes a business transition such as a merger, acquisition, or sale of assets, your information may be transferred to the successor entity. In such cases, we will notify you via email and prominent website notice before your information becomes subject to a different privacy policy. We will also provide you with the opportunity to opt-out of the transfer and request deletion of your information before any transition occurs. Additionally, we may disclose your information when we believe in good faith that such disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to government requests including court orders, subpoenas, or other legal process.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Your Rights and Choices</h2>
              <p>
                You maintain significant control over your personal information and how we use it throughout your relationship with our service. You have the right to access all personal information we hold about you, and we provide a self-service portal where you can view and download your data at any time. If you identify any inaccuracies in your information, you can either update it directly through your account settings or contact our support team for assistance. We maintain audit logs of all changes to ensure data integrity and can restore previous versions if changes are made in error.
              </p>
              <p>
                You may request the deletion of your account and associated personal information at any time, subject to certain legal requirements for record retention. When you request deletion, we immediately remove your active account and begin the process of purging your personal information from our production systems. Application materials and review correspondence are deleted within 30 days of your request. However, we may retain certain information for longer periods as required by law, such as transaction records for tax purposes, or in anonymized form for analytical purposes. We also maintain the right to retain information necessary to prevent fraud, resolve disputes, or enforce our agreements.
              </p>
              <p>
                You can control your communication preferences through your account settings, choosing which types of emails you wish to receive from us. We offer granular controls allowing you to maintain essential service communications while opting out of marketing messages, blog updates, or success story requests. You can also control whether we use your anonymized data for research and improvement purposes, though opting out of this doesn't affect the quality of service you receive. For users in jurisdictions with specific privacy rights such as the European Union under GDPR or California under CCPA, we provide additional tools and processes to exercise your rights under these regulations, including data portability options that allow you to receive your information in a structured, commonly used format.
              </p>
              <p>
                We respect Do Not Track signals and similar privacy preference signals from your browser, adjusting our tracking and analytics accordingly. You can also request that we limit the processing of your personal information to only what is necessary for service delivery, though this may affect our ability to provide certain features such as personalized recommendations or specialty-specific insights. If you believe we are not handling your information appropriately, you have the right to lodge a complaint with your local data protection authority, though we encourage you to contact us first so we can address your concerns directly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Data Retention and Deletion</h2>
              <p>
                Our data retention policies are designed to balance our commitment to protecting your privacy with our legal obligations and the potential value of maintaining records for your future benefit. Active application materials submitted for review are retained for the duration of your service period plus an additional 90 days to allow for any follow-up questions or clarifications you might need. After this period, application materials are automatically purged from our production systems unless you explicitly request extended retention for future review cycles. Many applicants who don't match on their first attempt find it valuable to have their previous application materials available for comparison when reapplying, and we accommodate these requests with appropriate security measures.
              </p>
              <p>
                Account information including your name, email, medical school, and specialty preference is retained for as long as you maintain an active account with us plus a period of three years after account closure. This extended retention allows us to provide references for successfully matched applicants who may need to verify their use of our services for residency programs or future fellowship applications. Review feedback and correspondence between you and your reviewer are retained for one year after service completion to allow for any questions about the feedback provided and to maintain quality assurance records. Financial records including invoices, payment confirmations, and refund documentation are retained for seven years in compliance with tax and accounting regulations.
              </p>
              <p>
                For users who contribute testimonials or success stories, we maintain these records indefinitely unless you request their removal, as they form part of our historical record of service effectiveness. However, you maintain the right to request removal of your testimonial at any time, and we will comply with such requests within 30 days. Anonymized and aggregated data derived from your application may be retained indefinitely for research and service improvement purposes, but this data is processed to ensure it cannot be linked back to you as an individual. We regularly review our data retention practices and purge information that no longer serves a legitimate business purpose or legal requirement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Special Considerations for International Users</h2>
              <p>
                As we serve medical students and graduates from around the world, we recognize that different jurisdictions have varying privacy expectations and legal requirements. For users accessing our services from outside the United States, particularly international medical graduates seeking U.S. residency positions, we want to be transparent about how cross-border data transfers work. Your information is primarily processed and stored on servers located in the United States, which may have different privacy protections than your home country. By using our services, you consent to the transfer of your information to the United States for processing.
              </p>
              <p>
                For users from the European Economic Area, United Kingdom, and Switzerland, we implement appropriate safeguards for international data transfers as required under GDPR, including standard contractual clauses approved by the European Commission. We also adhere to the principles of data minimization, purpose limitation, and privacy by design in all our processing activities. Users from these regions have additional rights including the right to data portability, the right to object to certain processing activities, and the right to withdraw consent where processing is based on consent. We maintain a dedicated process for handling requests from EU users and commit to responding within the timeframes specified by GDPR.
              </p>
              <p>
                For Canadian users, we comply with PIPEDA requirements and provincial privacy laws where applicable, ensuring that your personal information is protected to standards substantially similar to those in Canada. Australian users benefit from protections aligned with the Australian Privacy Principles, and we take reasonable steps to ensure that overseas recipients of Australian users' information do not breach these principles. We regularly monitor international privacy law developments and adjust our practices accordingly to ensure compliance with applicable regulations in jurisdictions where we have significant user populations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Children's Privacy</h2>
              <p>
                Our services are designed for medical students and graduates who are typically adults pursuing professional careers in medicine. We do not knowingly collect or solicit personal information from individuals under the age of 18. Medical school applicants are generally required to be at least 18 years old, and our services are tailored specifically for those applying to residency programs, which requires completion of medical school. If we become aware that we have inadvertently collected personal information from an individual under 18, we will take immediate steps to delete such information from our servers and terminate any associated account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Changes to This Privacy Policy</h2>
              <p>
                As our services evolve and privacy regulations change, we may need to update this privacy policy to reflect new practices or legal requirements. We commit to notifying you of any material changes to this policy through email notification to your registered email address and prominent notice on our website at least 30 days before such changes take effect. Material changes might include new categories of data collection, significant changes to how we use your information, or new third-party sharing arrangements. For minor changes such as clarifications or formatting updates, we may simply update the policy and change the "Last updated" date at the top of this document.
              </p>
              <p>
                Your continued use of our services after being notified of changes indicates your acceptance of the updated privacy policy. If you disagree with any changes, you have the right to close your account and request deletion of your information before the changes take effect. We maintain an archive of previous versions of our privacy policy, and you can request access to these historical versions by contacting our privacy team. This allows you to understand how our practices have evolved and ensures transparency in our data handling practices over time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Contact Information</h2>
              <p>
                We welcome your questions, concerns, and feedback about our privacy practices. If you have any inquiries about this privacy policy or how we handle your personal information, please don't hesitate to contact us. You can reach our privacy team by email at privacy@erasreviewer.com, and we commit to responding to all privacy-related inquiries within 48 business hours. For more complex requests such as data access requests or GDPR-related inquiries, we will acknowledge receipt within 48 hours and provide a detailed response within the timeframes required by applicable law.
              </p>
              <p>
                For formal privacy complaints or concerns that cannot be resolved through normal channels, you can contact our Data Protection Officer at dpo@erasreviewer.com. We take all privacy concerns seriously and will investigate and respond to complaints thoroughly. Our physical mailing address for privacy-related correspondence is MyERAS Reviewer, Privacy Department, 123 Medical Plaza, Suite 100, Boston, MA 02115. We also maintain relationships with privacy regulators in key jurisdictions and can provide contact information for relevant authorities if you wish to escalate concerns beyond our internal processes.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                This privacy policy was last updated on January 5, 2025. By using MyERAS Reviewer's services, you acknowledge that you have read and understood this privacy policy and agree to the collection, use, and disclosure of your information as described herein. Your privacy is fundamental to our mission of democratizing access to residency application support, and we remain committed to protecting it with the highest standards of care and professionalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}