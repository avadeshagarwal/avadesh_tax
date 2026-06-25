import { motion } from "framer-motion";
import { BRAND } from "../data/content";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/60 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                {BRAND.full} ("we", "us", "our", or "Company") operates the {BRAND.domain} website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information Collection and Use</h2>
              <p className="mb-4">We collect several different types of information for various purposes to provide and improve our service to you.</p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Types of Data Collected:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Data:</strong> Name, email address, phone number, postal address, and other information you provide when contacting us or requesting services.</li>
                <li><strong>Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, pages visited, and time spent.</li>
                <li><strong>Financial Data:</strong> Payment information is processed securely through third-party payment processors. We do not store complete credit card details.</li>
                <li><strong>Professional Data:</strong> Business information, financial documents, and compliance-related data shared for service delivery purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Use of Data</h2>
              <p className="mb-4">{BRAND.full} uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide, maintain, and improve our services</li>
                <li>To notify you about changes to our services</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To gather analysis or valuable information to improve our website</li>
                <li>To monitor the usage of our website</li>
                <li>To detect, prevent, and address technical and security issues</li>
                <li>To comply with legal obligations and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security. We use encrypted connections (SSL/TLS) and secure cloud storage for sensitive information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Disclosure of Data</h2>
              <p className="mb-4">We may disclose your personal information in the following situations:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>By law or when required by government authorities</li>
                <li>To protect the rights, privacy, safety, or property of {BRAND.full}</li>
                <li>To third-party service providers who assist us in operating our website and conducting our business (under confidentiality agreements)</li>
                <li>With your consent for any other purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Retention of Data</h2>
              <p>
                {BRAND.full} will retain your personal data for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. We retain professional data as required by Indian tax and compliance laws (typically 6-7 years). You may request deletion of your data at any time, subject to legal retention requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies</h2>
              <p>
                Our website uses cookies to enhance user experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:<br />
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
