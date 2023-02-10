import { HeaderFooterLayout } from "@/layouts";
import { ShowMenu } from "@/redux/ShowMenu/functions";
import {
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";

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
    if (
      validator.isEmpty(Email) ||
      validator.isEmpty(Name) ||
      !validator.isEmail(Email) ||
      validator.isEmpty(Detail)
    ) {
      setShow(false);
      setIsError(true);
      setIsSubmitted(false);
      setIsSubmitting(false);
      setTimeout(() => {
        setIsError(false);
        setShow(true);
      }, 3000);
    } else {
      setIsSubmitting(true);
      setShow(false);
      const res = await fetch(process.env.API_URL + "/contact-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        setDetail("");
        setName("");
        setEmail("");
        setIsSubmitted(false);
        setIsError(false);
        setIsSubmitting(false);
        setShow(true);
      }, 3000);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowMenu.HideAllMenu());
  }, []);

  return (
    <HeaderFooterLayout pageTitle="Contact us">
      <div className="grid md:px-16 py-8 bg-[#F8F8F8] gap-y-8 max-md:px-4">
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
              <form
                className="grid grid-cols-2 gap-4 mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <input
                  required
                  type="text"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name *"
                  className="rounded-xl border-primary-2 text-base w-full text-primary-1 col-span-2 placeholder:text-primary-1 px-4 py-2 border"
                />
                <input
                  required
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email *"
                  className="rounded-xl border-primary-2 text-base w-full text-primary-1 col-span-2 placeholder:text-primary-1 px-4 py-2 border"
                />
                <textarea
                  required
                  value={Detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="Details *"
                  rows={3}
                  className="rounded-xl border-primary-2 text-base w-full text-primary-1 col-span-2 placeholder:text-primary-1 px-4 py-2 border resize-none"
                ></textarea>
                <button
                  className={classNames(
                    "flex justify-center font-outfit font-semibold text-base rounded-full px-8 py-2",
                    isSubmitting
                      ? "cursor-not-allowed hover:text-white hover:bg-primary-1 "
                      : "hover:text-white hover:bg-primary-1 border-primary-1 border text-primary-1",
                    isSubmitted
                      ? "bg-green-400 !text-white border-green-800 border hover:bg-green-600"
                      : "hover:text-white hover:bg-primary-1 border-primary-1 border text-primary-1",
                    isError
                      ? "bg-red-500 !text-white border-red-500 border hover:bg-red-700"
                      : "hover:text-white hover:bg-primary-1 border-primary-1 border text-primary-1"
                  )}
                  type="submit"
                >
                  {isError && <XMarkIcon className="w-6 h-6" />}
                  {isSubmitting && <ArrowPathIcon className="w-6 h-6" />}
                  {isSubmitted && <CheckIcon className="w-6 h-6" />}
                  {show && "Submit"}
                </button>

                <p className="font-semibold text-xs flex justify-center font-outfit text-primary-3 max-w-[11rem]">
                  We will get back to you as soon as possible.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </HeaderFooterLayout>
  );
};

export default Contact;
