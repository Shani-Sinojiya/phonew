import FilterContextProvider from "@/context/Filter.context.provider";
import {
  removeFilterCamera,
  removeFilterProcessor,
  removeFilterRam,
  removeFilterRom,
  setFilterCamera,
  setFilterProcessor,
  setFilterRam,
  setFilterRom,
} from "@/redux/filter/functions";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const NavBarForHeader = () => {
    const router = useRouter();
    const navLinks = [
      {
        name: "Home",
        link: "/",
        active: router.asPath === "/" ? true : false,
      },
      {
        name: "About us",
        link: "/about",
        active: router.asPath === "/about" ? true : false,
      },
      {
        name: "Contact us",
        link: "/contact",
        active: router.asPath === "/contact" ? true : false,
      },
    ];

    const SearchVa = router.query.q ? router.query.q.toString() : "";

    const [search, setSearch] = useState<string>(SearchVa);

    const OnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        router.push(`/search/${search}`);
      }
    };

    return (
      <Navbar fluid={true} rounded={true} className="font-outfit">
        <Navbar.Brand href="/">
          <span className="self-center lg:ml-16 ml-auto uppercase text-2xl leading-10 font-raleway font-bold text-primary-0">
            Phonew
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Navbar.Toggle
            barIcon={() => (
              <svg
                className="w-5 h-5"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1586 21.3L25.5 25.5M14.25 9C16.7353 9 18.75 11.0147 18.75 13.5M24.1 14.3C24.1 19.7124 19.7124 24.1 14.3 24.1C8.88761 24.1 4.5 19.7124 4.5 14.3C4.5 8.88761 8.88761 4.5 14.3 4.5C19.7124 4.5 24.1 8.88761 24.1 14.3Z"
                  stroke="#4468E9"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          />
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 w-5 h-5"
              >
                <path
                  d="M21.1586 21.3L25.5 25.5M14.25 9C16.7353 9 18.75 11.0147 18.75 13.5M24.1 14.3C24.1 19.7124 19.7124 24.1 14.3 24.1C8.88761 24.1 4.5 19.7124 4.5 14.3C4.5 8.88761 8.88761 4.5 14.3 4.5C19.7124 4.5 24.1 8.88761 24.1 14.3Z"
                  stroke="#4468E9"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={OnKeyPress}
            />
          </div>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <div className="relative my-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 w-5 h-5"
              >
                <path
                  d="M21.1586 21.3L25.5 25.5M14.25 9C16.7353 9 18.75 11.0147 18.75 13.5M24.1 14.3C24.1 19.7124 19.7124 24.1 14.3 24.1C8.88761 24.1 4.5 19.7124 4.5 14.3C4.5 8.88761 8.88761 4.5 14.3 4.5C19.7124 4.5 24.1 8.88761 24.1 14.3Z"
                  stroke="#4468E9"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={OnKeyPress}
            />
          </div>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              className={
                link.active
                  ? "block py-2 text-base px-4 md:!mx-12 md:p-0 bg-gray-700 text-white dark:text-white md:bg-transparent md:text-black md:underline"
                  : "block py-2 text-base px-4 md:!mx-12 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              }
            >
              {link.name}
            </Link>
          ))}
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const FilterSection = () => {
    const [showBrand, setShowBrand] = useState<boolean>(false);
    const [showPricing, setShowPricing] = useState<boolean>(false);
    const [showFeatures, setShowFeatures] = useState<boolean>(false);

    const Ram: string[] = ["3GB", "4GB", "6GB", "8GB", "12GB"];
    const Rom: string[] = ["64GB", "128GB", "256GB", "512GB", "1TB"];
    const Battery: string[] = ["2000mAh", "3000mAh", "4000mAh", "5000mAh"];
    const Camera: string[] = ["12MP", "20MP", "24MP", "48MP", "108MP"];
    const Network: string[] = ["3G", "4G", "5G"];
    const Processor: string[] = ["Snapdragon", "Mediatek", "Apple", "Exynos"];

    type price = { start: number; stop?: number; above: boolean }[];
    type features = { title: string; data: string[] }[];

    const Brand: string[] = [
      "Apple",
      "Vivo",
      "Realme",
      "Xiaomi",
      "Huawei",
      "Nokia",
      "Samsung",
      "Oppo",
      "Redmi",
      "OnePlus",
      "Motorola",
      "Techno",
    ];

    const Price: price = [
      {
        start: 1000,
        stop: 3000,
        above: false,
      },
      {
        start: 5000,
        stop: 10000,
        above: false,
      },
      {
        start: 20000,
        stop: 30000,
        above: false,
      },
      {
        start: 40000,
        stop: 50000,
        above: false,
      },
      {
        start: 3000,
        stop: 5000,
        above: false,
      },
      {
        start: 10000,
        stop: 20000,
        above: false,
      },
      {
        start: 30000,
        stop: 40000,
        above: false,
      },
      {
        above: true,
        start: 50000,
      },
    ];

    const Features: features = [
      {
        title: "RAM",
        data: Ram,
      },
      {
        title: "ROM",
        data: Rom,
      },
      {
        title: "Battery",
        data: Battery,
      },
      {
        title: "Camera",
        data: Camera,
      },
      {
        title: "Network",
        data: Network,
      },
      {
        title: "Processor",
        data: Processor,
      },
    ];

    const FilterFeatureList = (props: { d: string; title: string }) => {
      const { d } = props;
      const [Selected, setSelected] = useState<boolean>();

      const dispatch = useDispatch();

      useEffect(() => {
        switch (props.title) {
          case "RAM":
            if (Selected) {
              dispatch(setFilterRam(d));
            } else {
              dispatch(removeFilterRam(d));
            }
            break;
          case "ROM":
            if (Selected) {
              dispatch(setFilterRom(d));
            } else {
              dispatch(removeFilterRom(d));
            }
            break;
          case "Camera":
            if (Selected) {
              dispatch(setFilterCamera(d));
            } else {
              dispatch(removeFilterCamera(d));
            }
            break;
          case "Processor":
            if (Selected) {
              dispatch(setFilterProcessor(d));
            } else {
              dispatch(removeFilterProcessor(d));
            }
            break;
          default:
            break;
        }
      }, [Selected]);

      return (
        <li
          className={classNames(
            "rounded-full px-3 cursor-pointer text-sm py-1",
            Selected ? "bg-[#EDF1FF] border border-primary-0" : "bg-gray-200"
          )}
          onClick={() => {
            setSelected(!Selected);
          }}
        >
          {d}
        </li>
      );
    };

    const router = useRouter();

    return (
      <div className="relative transition-all">
        <div className="bg-filter min-h-[4rem] flex items-center font-medium justify-around">
          <ul className="flex capitalize items-center md:gap-36 gap-4 font-outfit">
            <li
              className={classNames(
                "hover:underline cursor-pointer",
                showBrand
                  ? "underline text-white hover:text-white/70"
                  : "text-white/70 hover:text-white"
              )}
              onClick={() => {
                setShowBrand(!showBrand);
                setShowPricing(false);
                setShowFeatures(false);
              }}
            >
              Brands
            </li>
            <li
              className={classNames(
                "hover:underline cursor-pointer",
                showPricing
                  ? "underline text-white hover:text-white/70"
                  : "text-white/70 hover:text-white"
              )}
              onClick={() => {
                setShowPricing(!showPricing);
                setShowBrand(false);
                setShowFeatures(false);
              }}
            >
              Pricing
            </li>
            <li
              className={classNames(
                "hover:underline cursor-pointer",
                showFeatures
                  ? "underline text-white hover:text-white/70"
                  : "text-white/70 hover:text-white"
              )}
              onClick={() => {
                setShowFeatures(!showFeatures);
                setShowPricing(false);
                setShowBrand(false);
              }}
            >
              Features
            </li>
            <li
              className={classNames(
                "hover:underline cursor-pointer",
                router.asPath === "/latest-phone"
                  ? "underline text-white hover:text-white/70"
                  : "text-white/70 hover:text-white"
              )}
            >
              <Link href={"/latest-phone"}>Latest Mobiles</Link>
            </li>
          </ul>
        </div>
        {(showBrand || showPricing || showFeatures) && (
          <div
            className={classNames(
              "absolute p-4 border border-filter rounded-sm font-medium font-outfit bg-white z-50",
              showFeatures
                ? "md:left-1/2 md:-translate-x-1/2 max-sm:w-full max-sm:border-b max-sm:border-x-0 max-sm:rounded-none"
                : "left-1/2 -translate-x-1/2"
            )}
          >
            {/* brand */}
            {showBrand && (
              <ul className="grid md:grid-cols-6 grid-cols-3 gap-4">
                {Brand.map((item, index) => {
                  return (
                    <li className="hover:underline" key={index}>
                      <Link href={"/search?q=" + item.toLowerCase()}>
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
            {/* pricing */}
            {showPricing && (
              <ul className="grid md:grid-cols-4 grid-cols-1 gap-4">
                {Price.map((p, index) => {
                  if (p.above) {
                    return (
                      <li className="hover:underline" key={index}>
                        Above ₹{p.start}
                      </li>
                    );
                  }
                  return (
                    <li className="hover:underline" key={index}>
                      ₹{p.start} - ₹{p?.stop}
                    </li>
                  );
                })}
              </ul>
            )}
            {/* Features */}
            {showFeatures && (
              <ul>
                {Features.map((Feature, index) => {
                  return (
                    <li className="grid grid-cols-5 mb-4" key={index}>
                      <h3 className="text-md col-span-1">{Feature.title}:</h3>
                      <ul className="col-span-4 flex gap-x-2">
                        {Feature.data.map((d, index) => {
                          return (
                            <FilterFeatureList
                              key={index}
                              d={d}
                              title={Feature.title}
                            />
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
                <li className="w-full flex justify-center items-center text-center mt-4">
                  <button
                    className="bg-primary-0 rounded-full px-6 py-2 text-white hover:bg-primary-0/80"
                    onClick={() => {}}
                  >
                    Search
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Fragment>
      <NavBarForHeader />
      <FilterSection />
    </Fragment>
  );
};

export default Header;
