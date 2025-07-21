import Header from './common/Header';

const PrivacyPolicy = () => {
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10 mt-16 sm:mt-0 text-gray-700">
        <Header title="Privacy Policy" />
        <div className="p-4 w-full mt-16 sm:mt-0">
          <p className="mb-2 text-sm ">
            Last updated: July 8, 2025
          </p>
          <div className="flex items-center gap-4 mb-6">
            <img src="/assets/KKMMS_logo.png" alt="Kalakairali Logo" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold">Kalakairali Member Management System</h1>
              <p className="text-sm text-gray-600">By Kalakairali Regd.</p>
            </div>
          </div>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>We at <strong>Kalakairali</strong> respect your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we
              collect, use, store, and share personal information when you
              register or log in using Facebook or WhatsApp, manage member
              details, and interact with the web app.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">2. Data We Collect</h2>
            <p className="mb-2 font-medium">
              Member (User) Data including but not limited to:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Full name</li>
              <li>Date of birth</li>
              <li>Mobile number</li>
              <li>Email address</li>
              <li>Postal address</li>
              <li>Educational details</li>
            </ul>

            <p className="mb-2 font-medium">Admin Data:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Username</li>
              <li>Email address</li>
            </ul>

            <p className="mb-2 font-medium">Automatically Collected:</p>
            <ul className="list-disc list-inside">
              <li>IP address, browser/OS</li>
              <li>Login timestamp</li>
              <li>Usage patterns</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              3. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside">
              <li>Authenticate and verify user registrations</li>
              <li>Allow members to view and update their details</li>
              <li>Enable admins to manage member data</li>
              <li>Send notifications or support communication</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              4. Legal Basis for Processing
            </h2>
            <ul className="list-disc list-inside">
              <li>
                <strong>Consent:</strong> Given by user during
                registration/login
              </li>
              <li>
                <strong>Contractual necessity:</strong> For core app
                functionality
              </li>
              <li>
                <strong>Legitimate interest:</strong> App performance, analytics
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">5. Data Sharing</h2>
            <p>
              We do not sell or rent your personal data. We may share data with:
            </p>
            <ul className="list-disc list-inside">
              <li>Trusted service providers (hosting, email)</li>
              <li>Authorities when legally required</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              6. Data Storage & Security
            </h2>
            <p>
              Data is stored securely with encryption and access controls. We
              retain data only as long as required for services or legal
              compliance.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">7. User Rights</h2>
            <ul className="list-disc list-inside">
              <li>Access, update, or delete your data</li>
              <li>Withdraw consent or object to processing</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">8. Children</h2>
            <p>
              We do not knowingly collect data from users under 16. If such data
              is identified, it will be deleted.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              9. Updates to This Policy
            </h2>
            <p>
              This policy may be updated. Changes will be posted with a new
              effective date. Significant changes will be clearly communicated.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              10. Contact Information
            </h2>
            <p>If you have any questions about this policy, contact us at:</p>
            <ul className="list-disc list-inside">
              <li>
                Email:{' '}
                <a
                  href="mailto:kalakairali@kalakairali.com"
                  className="text-blue-600 underline"
                >
                  kalakairali@kalakairali.com
                </a>
              </li>
              <li>
                Address: Kalakairali, #322, Vasantha Bhavan, Nagashettihalli,
                RMV 2nd Stage, Bangalore - 560094
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
