import { motion } from "framer-motion";
import { BRAND } from "../data/content";

export default function TermsConditions() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-white/60 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using the {BRAND.domain} website and services provided by {BRAND.full}, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on {BRAND.full}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
              <p className="mb-4">
                The materials on {BRAND.full}'s website are provided on an 'as is' basis. {BRAND.full} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p>
                Further, {BRAND.full} does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
              <p>
                In no event shall {BRAND.full} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {BRAND.full}'s website, even if {BRAND.full} or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on {BRAND.full}'s website could include technical, typographical, or photographic errors. {BRAND.full} does not warrant that any of the materials on its website are accurate, complete, or current. {BRAND.full} may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Links</h2>
              <p>
                {BRAND.full} has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by {BRAND.full} of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Modifications</h2>
              <p>
                {BRAND.full} may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Service Terms</h2>
              <p className="mb-4">
                By engaging {BRAND.full} for tax, compliance, or registration services, you acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You will provide accurate and complete information for service delivery</li>
                <li>You are responsible for reviewing all documents before submission to government authorities</li>
                <li>Government processing timelines are beyond our control and subject to departmental delays</li>
                <li>We provide advisory services based on current tax laws; changes in law may affect previously filed returns</li>
                <li>You will maintain confidentiality of sensitive documents shared with us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Payment Terms</h2>
              <p className="mb-4">
                Payment for services is due as per the agreed terms. We accept multiple payment methods. Invoices are issued upon service completion or as per the service agreement. Late payments may result in service suspension.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:<br />
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
