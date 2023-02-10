import { Navbar } from "flowbite-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminHeader = () => {
  const router = useRouter();
  const navLinks = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      active: router.asPath === "/admin/dashboard" ? true : false,
    },
    {
      name: "Manage data",
      link: "/admin/manage-data",
      active: router.asPath === "/admin/manage-data" ? true : false,
    },
    {
      name: "Manage brand",
      link: "/admin/manage-brand",
      active: router.asPath === "/admin/manage-brand" ? true : false,
    },
  ];
  return (
    <Navbar fluid={true} rounded={true}>
      <Link href={"/admin/dashboard"} className="flex items-center">
        <span className="self-center lg:ml-16 ml-auto uppercase text-2xl leading-10 font-raleway font-bold text-primary-0">
          Phonew
        </span>
      </Link>
      <Navbar.Toggle color="gray" />
      <Navbar.Collapse className="mr-16 max-md:mr-0">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.link}
            className={
              link.active
                ? "block py-2 pr-4 pl-3 md:p-0 bg-blue-700 text-white dark:text-white md:bg-transparent md:text-blue-700"
                : "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            }
          >
            {link.name}
          </Link>
        ))}
        <button
          className="block py-2 pl-3 pr-4 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminHeader;
