import { motion } from "framer-motion";
import { BRAND } from "../data/content";

export default function Disclaimer() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Disclaimer
          </h1>
          <p className="text-white/60 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. General Disclaimer</h2>
              <p>
                The information provided on {BRAND.domain} and by {BRAND.full} is for informational and educational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Professional Advice Disclaimer</h2>
              <p>
                The information provided on this website and through our services is not a substitute for professional tax, legal, or financial advice. While we provide tax and compliance services, each client's situation is unique. You should:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Review all documents and advice provided by us before implementation</li>
                <li>Seek independent professional advice for your specific circumstances</li>
                <li>Consult with qualified professionals before making financial or business decisions</li>
                <li>Verify all information with relevant government authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. No Liability for Third-Party Content</h2>
              <p>
                {BRAND.full} is not responsible for any third-party websites, links, or content accessible through our website. We do not endorse any third-party services, products, or information. Your use of third-party websites is at your own risk and subject to their terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Tax Law Changes</h2>
              <p>
                Tax laws, regulations, and compliance requirements change frequently. While we endeavor to keep our information current, we cannot guarantee that all information reflects the latest changes in tax laws, government policies, or regulatory requirements. We recommend verifying current requirements with the relevant government authorities before taking action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Government Processing Timelines</h2>
              <p>
                Processing timelines for GST registration, company incorporation, trademark registration, and other government services are determined by the respective government authorities. {BRAND.full} cannot guarantee specific timelines and is not responsible for delays caused by government departments or incomplete documentation from clients.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall {BRAND.full}, its owners, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of our website or services, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Accuracy of Client-Provided Information</h2>
              <p>
                The accuracy and completeness of services provided depend entirely on the information and documents provided by clients. {BRAND.full} is not responsible for errors, omissions, or inaccuracies in client-provided information. Clients are responsible for verifying all information before submission to government authorities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. No Guarantee of Results</h2>
              <p>
                While we provide professional services based on current tax laws and best practices, we cannot guarantee specific outcomes or results. Government authorities make final decisions on registrations, approvals, and compliance matters. {BRAND.full} is not responsible for rejections or additional requirements imposed by government departments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Calculators and Tools</h2>
              <p>
                The calculators and tools on our website are provided for informational purposes only. While we strive for accuracy, these tools may contain errors or may not account for all individual circumstances. Results should be verified with professional advisors before relying on them for decision-making.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Compliance Responsibility</h2>
              <p>
                While {BRAND.full} provides compliance services and advice, ultimate responsibility for compliance with all applicable laws and regulations rests with the client. Clients should independently verify that all filings and registrations meet current legal requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Disclaimer</h2>
              <p>
                {BRAND.full} reserves the right to modify this disclaimer at any time. Changes will be effective immediately upon posting to the website. Your continued use of our website and services constitutes acceptance of any modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact for Clarifications</h2>
              <p>
                If you have questions about this disclaimer or our services, please contact us at:<br />
                Email: {BRAND.email}<br />
                Phone: {BRAND.phoneDisplay}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
