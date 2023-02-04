import Image from "next/image";
import { Fragment, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import Head from "next/head";
import { AdminLayout } from "@/layouts";
import { toast } from "react-toastify";
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

const AdminLogin = () => {
  const FormCard = () => {
    const [Eamil, setEamil] = useState("");
    const [Password, setPassword] = useState("");

    const handleLogin = () => {
      if (Eamil == "" || Password == "") {
        toast.warn("Please fill all the fields");
      } else {
        signIn("credentials", {
          email: Eamil,
          password: Password,
        });
      }
    };
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-4 grid h-28 place-items-center">
            <h3 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
              Sign In
            </h3>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2" value="Your email" />
              </div>
              <TextInput
                id="email2"
                type="email"
                placeholder="name@phonew.com"
                required={true}
                shadow={true}
                value={Eamil}
                onChange={(e) => setEamil(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Your password" />
              </div>
              <TextInput
                id="password2"
                type="password"
                required={true}
                value={Password}
                shadow={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="p-6 pt-0">
            <button
              accessKey="Enter"
              className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] block w-full"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <AdminLayout>
      <Image
        src={"/Loginbg.jpg"}
        alt={"Loginbg.jpg"}
        fill
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <FormCard />
      <Head>
        <title>Admin Login</title>
      </Head>
    </AdminLayout>
  );
};

export default AdminLogin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
