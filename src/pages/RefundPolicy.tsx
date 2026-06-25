import { motion } from "framer-motion";
import { BRAND } from "../data/content";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Refund Policy
          </h1>
          <p className="text-white/60 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Refund Eligibility</h2>
              <p className="mb-4">
                {BRAND.full} offers refunds under the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Not Initiated:</strong> If payment is received but the service has not been initiated, a full refund is available within 7 days of payment.</li>
                <li><strong>Service Cancellation by Client:</strong> Refunds for cancellation depend on the stage of service completion (see below).</li>
                <li><strong>Service Failure:</strong> If we fail to deliver the promised service due to our error, a full refund is available.</li>
                <li><strong>Duplicate Payment:</strong> If duplicate payments are made, the duplicate amount will be refunded within 5-7 business days.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Refund Timeline Based on Service Stage</h2>
              <p className="mb-4">Refund eligibility varies based on how much work has been completed:</p>
              
              <div className="space-y-4 ml-4">
                <div className="border-l-4 border-gold-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">Before Service Initiation (0-2 days)</h3>
                  <p>100% refund available</p>
                </div>
                
                <div className="border-l-4 border-gold-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">During Initial Consultation & Document Collection (2-7 days)</h3>
                  <p>75% refund available. 25% retained for consultation and documentation review.</p>
                </div>
                
                <div className="border-l-4 border-gold-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">During Active Processing (7-50% completion)</h3>
                  <p>50% refund available. 50% retained for work completed and resources utilized.</p>
                </div>
                
                <div className="border-l-4 border-gold-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">Near Completion (50%+ completion)</h3>
                  <p>No refund available. Payment is non-refundable once service is substantially complete. However, we will complete the service or provide alternative solutions.</p>
                </div>
                
                <div className="border-l-4 border-gold-500 pl-4">
                  <h3 className="font-semibold text-white mb-2">After Delivery</h3>
                  <p>No refund available. If you are unsatisfied, we will work with you to address concerns or provide corrective services.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Government Processing Delays</h2>
              <p>
                Delays in government processing (GST registration, company incorporation, trademark registration, etc.) are not grounds for refund. Government processing timelines are beyond our control. We will continue to follow up with authorities and provide updates on the status of your application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Incomplete Client Documentation</h2>
              <p>
                If a service cannot be completed due to incomplete or incorrect documentation provided by the client, no refund is available. We will work with you to gather the required information and complete the service. If you choose not to provide the necessary documentation, payment is non-refundable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Refund Process</h2>
              <p className="mb-4">
                To request a refund, please contact us within 30 days of payment with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your name and contact information</li>
                <li>Invoice or receipt number</li>
                <li>Reason for refund request</li>
                <li>Proof of payment (transaction ID, bank statement, etc.)</li>
              </ul>
              <p className="mt-4">
                Upon approval, refunds will be processed to the original payment method within 5-7 business days. Bank processing may take an additional 2-3 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Non-Refundable Items</h2>
              <p className="mb-4">
                The following are non-refundable:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Consultation fees (after consultation is provided)</li>
                <li>Document preparation fees (after documents are prepared)</li>
                <li>Government filing fees (these are passed through to government authorities)</li>
                <li>Services completed and delivered</li>
                <li>Expedited processing fees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Partial Refunds</h2>
              <p>
                In cases where partial work has been completed, we may offer a partial refund or credit toward future services. The specific amount will be determined based on the stage of completion and work performed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Disputes and Escalation</h2>
              <p>
                If you disagree with a refund decision, you may escalate your request by providing additional documentation or explanation. We will review your case and respond within 10 business days. Our decision on refund disputes is final.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Service Correction vs. Refund</h2>
              <p>
                If there is an error in our service delivery, we will first attempt to correct the error at no additional cost. Refunds are only considered if the error cannot be corrected or if the client chooses not to proceed with correction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Refund Policy</h2>
              <p>
                {BRAND.full} reserves the right to modify this refund policy at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of any modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p>
                For refund requests or questions about this policy, please contact us at:<br />
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
