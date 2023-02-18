import { HeaderFooterLayout } from "@/layouts";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <HeaderFooterLayout pageTitle="Privacy Policy">
      <div className="md:mx-32 md:my-8 font-outfit max-md:mx-4 max-md:my-4">
        <div className="mb-3">
          <h1 className="text-2xl my-2">Introduction</h1>
          <p className="text-lg my-1">
            We respect the privacy of our users and are committed to protecting
            their personal information. This Privacy Policy outlines the types
            of personal information we collect and how we use, disclose and
            protect it.
          </p>
        </div>
        <div className="mb-3">
          <h1 className="text-2xl my-2">Information Collection and Use</h1>
          <p className="text-lg my-1">
            We not collect personal information such as name, email address and
            demographic information when you sign up for our newsletter,
            participate in surveys or submit a contact form. We use this
            information to provide you with customized content and to improve
            our services.
          </p>
          <p className="text-lg my-1">
            Additionally, we collect technical information such as IP address,
            browser type and operating system when you access our website. This
            information is used to improve our website's performance and to
            enhance your user experience.
          </p>
        </div>
        <div className="mb-3">
          <h1 className="text-2xl my-2"> Disclosure of Information</h1>
          <p className="text-lg my-1">
            We do not sell or rent your personal information to third parties.
            We may disclose your personal information to third-party service
            providers who assist us in operating our website, conducting our
            business or serving you. These service providers are contractually
            bound to keep your information confidential and use it only for the
            purpose for which it was disclosed.
          </p>
          <p className="text-lg my-1">
            We may also disclose your personal information if we are required to
            do so by law or if we believe that such action is necessary to
            protect and defend our rights or property.
          </p>
        </div>
        <div className="mb-3">
          <h1 className="text-2xl my-2">Security</h1>
          <p className="text-lg my-1">
            We take the security of your personal information seriously and have
            implemented appropriate measures to protect it from unauthorized
            access, use, disclosure, alteration or destruction. We regularly
            review our security practices to ensure that your information is
            protected.
          </p>
        </div>
        <div className="mb-3">
          <h1 className="text-2xl my-2">Cookies and Tracking Technology</h1>
          <p className="text-lg my-1">
            We use cookies and tracking technologies to improve your experience
            on our website and to gather usage information. Cookies are small
            text files that are stored on your device when you visit our
            website. They allow us to remember your preferences and to
            understand how you interact with our website. You can configure your
            browser to reject cookies, but this may limit your ability to use
            some features of our website.
          </p>
        </div>
        <div className="mb-3">
          <h1 className="text-2xl my-2">Third-Party Websites</h1>
          <p className="text-lg my-1">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of these websites and
            encourage you to read their privacy policies before providing any
            personal information.
          </p>
        </div>
        <div className="mb-3">
          <h1 className="text-2xl my-2">Changes to this Privacy Policy</h1>
          <p className="text-lg my-1">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or to comply with legal requirements. We
            will notify you of any changes by posting the updated Privacy Policy
            on our website. Your continued use of our website after any changes
            indicates your acceptance of the updated Privacy Policy.
          </p>
        </div>
        <div className="mb-3">
          <h1 className="text-2xl my-2">Contact Us</h1>
          <p className="text-lg my-1">
            If you have any questions or concerns about our Privacy Policy,
            please contact us by email at{" "}
            <Link
              target={"_blank"}
              className="text-blue-900 hover:text-blue-600 hover:underline"
              href={"mailto:phonew@deadmad.com"}
            >
              phonew@deadmad.com
            </Link>{" "}
            We will make every effort to respond to your inquiries in a timely
            and efficient manner.
          </p>
          <p className="text-lg my-1">
            This Privacy Policy applies to Deadmad Technologies, the owner and
            operator of{" "}
            <Link
              target={"_blank"}
              className="text-blue-900 hover:text-blue-600 hover:underline"
              href={"https://deadmadtechnologies.com"}
            >
              deadmadtechnologies.com
            </Link>
            . Your privacy is important to us and we are committed to protecting
            your personal information.
          </p>
        </div>
      </div>
    </HeaderFooterLayout>
  );
};

export default PrivacyPolicy;
