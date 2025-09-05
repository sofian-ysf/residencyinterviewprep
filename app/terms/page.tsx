import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Effective Date: January 5, 2025
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg text-gray-600 max-w-none space-y-8">
            <p className="text-xl font-medium text-gray-900">
              These Terms of Service constitute a legally binding agreement between you and MyERAS Reviewer, governing your use of our residency application review services. By creating an account, submitting application materials for review, or otherwise using our services, you acknowledge that you have read, understood, and agree to be bound by these terms in their entirety.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Service Description and Scope</h2>
              <p>
                MyERAS Reviewer provides professional review and editing services for residency application materials, including personal statements, experience descriptions, and other components of the Electronic Residency Application Service application. Our services are designed to help medical students and graduates present their qualifications, experiences, and aspirations in the most compelling and effective manner possible. We accomplish this through a combination of expert human review by physicians who have served on admission committees and sophisticated technological tools that analyze applications for optimization opportunities.
              </p>
              <p>
                It is crucial to understand that our services are limited to reviewing and providing feedback on application materials that you create and submit to us. We do not write application materials on your behalf, fabricate experiences or qualifications, or guarantee admission to any residency program. Our role is advisory and editorial in nature, aimed at helping you articulate your own authentic experiences and qualifications more effectively. The ultimate responsibility for the accuracy, truthfulness, and submission of your application materials remains entirely with you as the applicant.
              </p>
              <p>
                Our reviewers provide suggestions, edits, and strategic advice based on their expertise and understanding of what residency programs seek in candidates. However, these suggestions are recommendations only, and you retain complete discretion over which suggestions to implement in your final application. We strongly emphasize that all information in your application must be truthful and accurate, and we will not knowingly assist in the submission of false or misleading information. If we become aware that an applicant is attempting to use our services to submit fraudulent information, we reserve the right to immediately terminate services and report such conduct to appropriate authorities.
              </p>
              <p>
                The scope of our services varies depending on the package you purchase, and specific service limitations are detailed in your service agreement. Standard turnaround times, revision limits, and included features are clearly specified at the time of purchase. Additional services beyond your purchased package may be available for an additional fee. We reserve the right to refuse service to any individual who violates these terms, engages in abusive behavior toward our staff or reviewers, or attempts to use our services for any unlawful purpose.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Account Registration and Security</h2>
              <p>
                To use our services, you must create an account providing accurate, current, and complete information about yourself. You represent and warrant that you are at least 18 years of age and have the legal capacity to enter into binding contracts. If you are creating an account on behalf of another person or entity, you represent that you have the authority to bind that person or entity to these terms. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account, whether or not you have authorized such activities.
              </p>
              <p>
                You agree to immediately notify us of any unauthorized use of your account or any other breach of security of which you become aware. We implement industry-standard security measures to protect your account, but we cannot guarantee absolute security. You acknowledge that you provide your account information and application materials at your own risk. To enhance account security, we strongly recommend using a unique, strong password for your account, enabling two-factor authentication when available, and avoiding accessing your account from public or shared computers.
              </p>
              <p>
                We reserve the right to suspend or terminate accounts that we reasonably believe have been compromised, are being used in violation of these terms, or pose a security risk to our systems or other users. If we suspend or terminate your account for security reasons, we will make reasonable efforts to notify you and provide an opportunity to resolve the issue, unless doing so would compromise security or violate applicable law. You may not create multiple accounts to circumvent service limitations, take advantage of promotional offers multiple times, or for any other purpose that violates the spirit of our single-account policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Payment Terms and Refund Policy</h2>
              <p>
                Payment for our services is due in full at the time of purchase unless otherwise agreed in writing. We accept major credit cards, debit cards, and certain digital payment methods through our secure payment processing partners. By providing payment information, you represent and warrant that you are authorized to use the payment method and authorize us to charge the full amount of your purchase to that payment method. If your payment is declined, you remain responsible for any outstanding balance, and we may suspend service until payment is received.
              </p>
              <p>
                Our pricing is clearly displayed at the time of purchase and includes all standard features of your selected package. Additional services, rush processing, or extra revisions beyond your package limits may incur additional charges, which will be clearly communicated before you incur them. Prices are subject to change, but any price changes will not affect services already purchased. We may occasionally offer promotional pricing or discounts, but these offers are not retroactively applicable to previous purchases and may not be combined with other offers unless explicitly stated.
              </p>
              <p>
                We stand behind the quality of our services with a satisfaction guarantee, the specific terms of which vary by package and are detailed at the time of purchase. Generally, if you are dissatisfied with our services, you must notify us within 7 days of receiving your reviewed materials and provide specific details about your concerns. We will first attempt to address your concerns through additional revisions or clarifications. If we are unable to resolve your concerns satisfactorily, we may offer a partial or full refund at our discretion. Refunds are typically processed within 10 business days and will be credited to the original payment method.
              </p>
              <p>
                Certain circumstances may void your eligibility for a refund, including but not limited to: failure to provide materials within the agreed timeframe, submission of plagiarized or fabricated content, abusive behavior toward our staff or reviewers, or use of our services in violation of these terms. Additionally, our match guarantee, where offered, is subject to specific conditions including timely submission of applications, application to a reasonable number of programs as recommended by our reviewers, and following through with interview invitations received. The mere fact of not matching does not automatically entitle you to a refund if you have not met all conditions of the guarantee.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Intellectual Property Rights</h2>
              <p>
                You retain all ownership rights to the original application materials you submit to us for review. By submitting materials to us, you grant MyERAS Reviewer a limited, non-exclusive, worldwide license to use, reproduce, modify, and display your materials solely for the purpose of providing our services to you. This license automatically terminates when our services to you are complete, except that we may retain copies as necessary for legal compliance, quality assurance, and service improvement purposes as described in our privacy policy.
              </p>
              <p>
                The feedback, suggestions, edits, and strategic advice provided by our reviewers constitute our proprietary work product and remain the intellectual property of MyERAS Reviewer. You are granted a perpetual, non-exclusive license to use this feedback for your personal residency application purposes. However, you may not resell, redistribute, or share our feedback with others for commercial purposes. This restriction is intended to protect the value of our services and ensure that each applicant receives individualized attention rather than recycled advice.
              </p>
              <p>
                Our website, platform, blog content, and all associated materials including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the exclusive property of MyERAS Reviewer or our content suppliers and are protected by United States and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any of our proprietary content without our express written permission. Limited exceptions apply for personal, non-commercial use, such as printing blog articles for your own reference.
              </p>
              <p>
                If you provide us with any feedback, suggestions, or ideas for improving our services, you agree that we may use such feedback without any obligation to compensate you and that such feedback will become our property. We value user input in improving our services, but we cannot accept unsolicited ideas for new services or features to avoid potential intellectual property disputes. Any feedback you provide should be limited to your experience with existing services rather than proposals for new offerings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">User Conduct and Responsibilities</h2>
              <p>
                As a user of our services, you agree to conduct yourself professionally and ethically in all interactions with our platform, staff, and reviewers. You are solely responsible for ensuring that all information you submit in your application materials is truthful, accurate, and your own original work. Plagiarism, fabrication of experiences or qualifications, or any other form of academic or professional dishonesty is strictly prohibited and will result in immediate termination of services without refund. We reserve the right to report instances of suspected fraud to relevant medical schools, residency programs, or professional organizations.
              </p>
              <p>
                You agree not to use our services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks. Prohibited conduct includes but is not limited to: attempting to gain unauthorized access to any portion of our platform or other users' accounts, using automated tools to access our services without permission, transmitting viruses or malicious code, harassing or threatening our staff or other users, or using our services to violate the rights of third parties. We maintain the right to investigate and take appropriate legal action against anyone who violates these provisions.
              </p>
              <p>
                You are responsible for maintaining appropriate backups of your application materials and any other important information. While we implement robust data protection measures, we recommend that you maintain your own copies of all materials submitted to us. You acknowledge that technology failures can occur despite our best efforts, and you agree not to hold us liable for any loss of data that may result from such failures, provided we have implemented commercially reasonable data protection measures.
              </p>
              <p>
                Communication with our reviewers and support staff must remain professional and respectful at all times. We understand that the residency application process can be stressful, but abusive language, threats, harassment, or discriminatory behavior toward our team members will not be tolerated and may result in immediate termination of services. Our reviewers are professionals who dedicate their time and expertise to helping you succeed, and they deserve to be treated with courtesy and respect. Constructive feedback about our services is always welcome, but it must be delivered in a professional manner.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Disclaimers and Limitations of Liability</h2>
              <p>
                While we strive to provide high-quality review services and valuable feedback, we must emphasize that success in the residency match process depends on numerous factors beyond our control. We do not guarantee that using our services will result in matching to a residency program, receiving interview invitations, or achieving any specific outcome in your application process. The residency selection process is highly competitive and subjective, influenced by factors including but not limited to academic performance, board scores, clinical experience, research background, letters of recommendation, interview performance, and program-specific preferences that may not be publicly disclosed.
              </p>
              <p>
                Our services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, we disclaim all warranties including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that our services will be uninterrupted, error-free, secure, or free from viruses or other harmful components. While we implement industry-standard security measures, we cannot guarantee absolute security of your data and you acknowledge that you provide information at your own risk.
              </p>
              <p>
                In no event shall MyERAS Reviewer, its officers, directors, employees, reviewers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your use or inability to use our services, unauthorized access to or alteration of your data, statements or conduct of any third party on our platform, or any other matter relating to our services, even if we have been advised of the possibility of such damages. Our total liability to you for all claims arising from or relating to these terms or your use of our services shall not exceed the amount you paid us in the twelve months preceding the claim.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the above limitations may not apply to you. In such jurisdictions, our liability will be limited to the greatest extent permitted by law. You acknowledge that the limitations of liability set forth in these terms reflect a reasonable allocation of risk between the parties and form an essential basis of the bargain between us. Our services would not be provided to you on an economically reasonable basis without these limitations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless MyERAS Reviewer, its officers, directors, employees, reviewers, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorney's fees) arising from or related to your use of our services, your violation of these terms, your violation of any rights of another party, or any false or fraudulent information you provide in connection with our services. This indemnification obligation will survive the termination of these terms and your use of our services.
              </p>
              <p>
                We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and in such case, you agree to cooperate with our defense of such claim. You may not settle any claim that affects us without our prior written consent. We will use reasonable efforts to notify you of any such claim, action, or proceeding upon becoming aware of it, though our failure to provide prompt notice will not relieve you of your indemnification obligations except to the extent you are materially prejudiced by such failure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Dispute Resolution and Arbitration</h2>
              <p>
                In the interest of resolving disputes efficiently and cost-effectively, you and MyERAS Reviewer agree that any dispute arising out of or relating to these terms or our services shall first be subject to good faith negotiations between the parties. If a dispute cannot be resolved through negotiation within thirty days, except for disputes in which either party seeks injunctive or other equitable relief, any controversy or claim arising out of or relating to these terms shall be settled by binding arbitration in accordance with the commercial arbitration rules of the American Arbitration Association.
              </p>
              <p>
                The arbitration shall be conducted in Boston, Massachusetts, before a single arbitrator with substantial experience in healthcare services and technology disputes. The arbitrator shall apply Massachusetts law consistent with the Federal Arbitration Act and applicable statutes of limitations, and shall honor claims of privilege recognized at law. The arbitrator's award shall be final and binding, and judgment on the award rendered by the arbitrator may be entered in any court having jurisdiction thereof. Each party shall bear its own costs and attorneys' fees, except that the arbitrator may award costs and fees to the prevailing party if permitted by applicable law.
              </p>
              <p>
                You and MyERAS Reviewer agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action. You hereby waive any right to participate in a class action lawsuit or class-wide arbitration. If for any reason a claim proceeds in court rather than in arbitration, each party waives any right to a jury trial. These dispute resolution provisions shall be governed by federal arbitration law and shall survive termination of these terms.
              </p>
              <p>
                Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in state or federal court in Massachusetts to prevent the actual or threatened infringement, misappropriation, or violation of a party's copyrights, trademarks, trade secrets, patents, or other intellectual property rights. You consent to exclusive jurisdiction and venue in the state and federal courts located in Boston, Massachusetts for any such action.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time, in our sole discretion, to reflect changes in our services, legal requirements, or business practices. If we make material changes to these terms, we will notify you by email to the address associated with your account or by prominent notice on our website at least thirty days before the changes take effect, unless the changes are required by law to take effect immediately. Material changes include modifications to payment terms, dispute resolution procedures, liability limitations, or any provisions that substantially affect your rights or obligations.
              </p>
              <p>
                Your continued use of our services after the effective date of any changes constitutes your acceptance of the modified terms. If you do not agree to the modified terms, you must discontinue use of our services before the changes take effect. For ongoing service relationships, we will complete any services already purchased under the previous terms unless you explicitly consent to the new terms applying to those services. We maintain an archive of previous versions of our terms, and you may request access to these by contacting our support team.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Termination</h2>
              <p>
                These terms remain in effect until terminated by either party. You may terminate your agreement with us at any time by closing your account and discontinuing use of our services. Closing your account does not relieve you of any obligations incurred prior to termination, including payment obligations for services already rendered. We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including if you breach these terms, engage in fraudulent or illegal activity, or if required by law.
              </p>
              <p>
                Upon termination, your right to use our services will immediately cease. Provisions of these terms that by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnification obligations, and limitations of liability. We are not liable to you or any third party for any termination of your access to our services. After termination, we may retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements, but otherwise will handle your information in accordance with our privacy policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">General Provisions</h2>
              <p>
                These terms, together with our privacy policy and any service-specific agreements, constitute the entire agreement between you and MyERAS Reviewer regarding our services and supersede all prior agreements and understandings, whether written or oral. No waiver of any term or condition of these terms shall be deemed a further or continuing waiver of such term or condition or any other term or condition, and any failure to assert a right or provision under these terms shall not constitute a waiver of such right or provision.
              </p>
              <p>
                If any provision of these terms is held by a court or arbitrator of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of these terms will continue in full force and effect. The section titles in these terms are for convenience only and have no legal or contractual effect. These terms and any rights and licenses granted hereunder may not be transferred or assigned by you but may be assigned by us without restriction.
              </p>
              <p>
                These terms are governed by the laws of the Commonwealth of Massachusetts, without regard to its conflict of law provisions. You and MyERAS Reviewer agree to submit to the personal and exclusive jurisdiction of the courts located within Suffolk County, Massachusetts for the resolution of any disputes not subject to arbitration as set forth above. Any notices to us must be sent to MyERAS Reviewer, Legal Department, 123 Medical Plaza, Suite 100, Boston, MA 02115, via certified mail, return receipt requested. We may provide notice to you via email to the address associated with your account or by posting notice on our website.
              </p>
              <p>
                No agency, partnership, joint venture, or employment relationship is created as a result of these terms, and you do not have any authority to bind us in any respect. Our reviewers are independent contractors and not employees of MyERAS Reviewer, though they are bound by confidentiality agreements and service standards. These terms do not create any third-party beneficiary rights. Force majeure events including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials will excuse performance of obligations to the extent such performance is affected by the force majeure event.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Contact Information</h2>
              <p>
                If you have any questions, concerns, or comments about these terms of service, please contact our legal team at legal@erasreviewer.com. We strive to respond to all inquiries within two business days, though complex legal questions may require additional time for thorough consideration. For urgent matters requiring immediate attention, you may contact us by phone at (617) 555-0100 during regular business hours (9 AM - 5 PM EST, Monday through Friday).
              </p>
              <p>
                For service-related issues or technical support, please contact support@erasreviewer.com rather than the legal team to ensure your inquiry is routed to the appropriate department for fastest resolution. Our support team is available seven days a week and typically responds within 24 hours. For billing inquiries, please contact billing@erasreviewer.com with your account information and transaction details.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                By using MyERAS Reviewer's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms were last updated on January 5, 2025. We encourage you to review these terms periodically to stay informed of any updates. Your use of our services constitutes your ongoing agreement to these terms and any future modifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}