import { HeaderFooterLayout } from "@/layouts";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Contact = () => {
  const [Name, setName] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [Detail, setDetail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setShow(false);
    const res = await fetch(process.env.API_URL + "/contact-forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name: Name,
          email: Email,
          details: Detail,
        },
      }),
    });
    if (res.status === 200) {
      setIsSubmitted(true);
      setIsSubmitting(false);
      Router.push("/contact");
    } else {
      setIsError(true);
      setIsSubmitting(false);
      setIsSubmitted(false);
    }

    setTimeout(() => {
      setIsSubmitted(false);
      setIsError(false);
      setIsSubmitting(false);
      setShow(true);
    }, 3000);
  };

  return (
    <HeaderFooterLayout pageTitle="Contact us">
      <div className="grid px-16 py-8 bg-[#F8F8F8] gap-y-8">
        <div className="px-4 py-2 bg-[#EDF1FF] border rounded-xl border-primary-2">
          <div className="grid md:grid-cols-6 my-16 mx-16 max-md:my-8 max-md:mx-4 md:gap-x-16 md:divide-x-2 max-md:divide-y-2 divide-primary-2">
            <div className="md:col-span-3 flex flex-col text-left justify-left">
              <div>
                <h1 className="text-3xl font-PhosphateProSolid text-primary-1">
                  Contact us
                </h1>
                <p className="text-primary-2 my-12 max-md:my-4 w-72 font-semibold">
                  Thank you for visiting our website. If you have any questions
                  or comments, please don&lsquo;t hesitate to contact us.
                </p>
              </div>
              <hr className="bg-primary-2 h-px border-none w-full" />
              <div className="mt-6">
                <h2 className="font-outfit max-md:text-sm font-semibold text-primary-1">
                  Email address:{" "}
                  <Link
                    className="underline"
                    href={"mailto:phonew@deadmad.com"}
                  >
                    phonew@deadmad.com
                  </Link>
                </h2>
                <h3 className="gap-2 flex mt-4 max-md:my-4 max-md:text-sm text-primary-1 font-semibold font-outfit">
                  <span>Follow us:</span>
                  <Link className="underline" href={""}>
                    LinkedIn
                  </Link>
                  <Link className="underline" href={""}>
                    Instagram
                  </Link>
                  <Link className="underline" href={""}>
                    Dribbble
                  </Link>
                </h3>
              </div>
            </div>
            <div className="col-span-3 flex justify-center items-center font-outfit flex-col gap-6">
              <h2 className="text-primary-0 text-lg font-semibold max-md:mt-4">
                You can also fill out the contact form below
              </h2>
              <div className="grid grid-cols-2 gap-4 mx-auto">
                <input
                  required
                  type="text"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="rounded-xl border-primary-2 text-base w-full text-primary-1 col-span-2 placeholder:text-primary-1 px-4 py-2 border"
                />
                <input
                  required
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="rounded-xl border-primary-2 text-base w-full text-primary-1 col-span-2 placeholder:text-primary-1 px-4 py-2 border"
                />
                <textarea
                  required
                  value={Detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="Details"
                  rows={3}
                  className="rounded-xl border-primary-2 text-base w-full text-primary-1 col-span-2 placeholder:text-primary-1 px-4 py-2 border resize-none"
                ></textarea>

                <button
                  className={classNames(
                    "border-primary-1 border text-primary-1 flex justify-center hover:text-white hover:bg-primary-1 font-outfit font-semibold text-base rounded-full px-8 py-2",
                    isSubmitting ? "cursor-not-allowed" : "",
                    isSubmitted ? "bg-green-400 !text-white" : "",
                    isError ? "bg-red-500 text-white" : ""
                  )}
                  onClick={() => handleSubmit()}
                >
                  {isError && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  {isSubmitting && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  )}
                  {isSubmitted && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                  {show && "Submit"}
                </button>

                <p className="font-semibold text-xs flex justify-center font-outfit text-primary-3 max-w-[11rem]">
                  We will get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderFooterLayout>
  );
};

export default Contact;
