import {
  Clear,
  removeFilterCamera,
  removeFilterProcessor,
  removeFilterRam,
  removeFilterRom,
  removeFilterNetwork,
  setFilterCamera,
  setFilterNetwork,
  setFilterProcessor,
  setFilterRam,
  setFilterRom,
  Submit,
  removeFilterBattery,
  setFilterBattery,
} from "@/redux/filter/functions";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, StrictMode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "@/lib";
import { RootState } from "@/redux/rootReducer";
import { ShowMenu } from "@/redux/ShowMenu/functions";
import { Brand } from "@/data";
import { Transition } from "@headlessui/react";

const HeaderComponent = () => {
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
        <Link href="/" className="flex items-center">
          <span className="self-center lg:ml-16 ml-auto uppercase text-2xl leading-10 font-raleway font-bold text-primary-0">
            Phonew
          </span>
        </Link>
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
    const { ShowBrandMenu, ShowPriceMenu, ShowFilterMenu } = useSelector(
      (state: RootState) => state.ShowMenu
    );
    const dispatch = useDispatch();
    const router = useRouter();

    const Ram: string[] = ["3GB", "4GB", "6GB", "8GB", "12GB"];
    const Rom: string[] = ["64GB", "128GB", "256GB", "512GB", "1TB"];
    const Battery: string[] = ["2000", "3000", "4000", "5000"];
    const Camera: string[] = ["12", "20", "24", "48", "108"];
    const Network: string[] = ["3G", "4G", "5G"];
    const Processor: string[] = ["Snapdragon", "Mediatek", "Apple", "Exynos"];

    type price = { start: number; stop?: number; above: boolean }[];
    type features = { title: string; data: string[] }[];

    const [Brands, setBrands] = useState<string[]>([]);

    useEffect(() => {
      const BrandData = async () => {
        const brands = new Brand();
        const { data } = await brands.getBrandsName();
        setBrands(data.map((brand) => brand.name));
      };
      BrandData();
    }, []);

    const FilterFeatureList = (props: { d: string; title: string }) => {
      const { d } = props;
      const [Selected, setSelected] = useState<boolean>(false);
      const dispatch = useDispatch();

      const {
        ramFilter,
        romFilter,
        processorFilter,
        cameraFilter,
        networkFilter,
        betteryFilter,
      } = useSelector(
        (state: {
          filter: {
            ramFilter: string[];
            romFilter: string[];
            processorFilter: string[];
            networkFilter: string[];
            cameraFilter: string[];
            betteryFilter: string[];
            url: string[];
          };
        }) => state.filter
      );

      useEffect(() => {
        if (props.title == "RAM") {
          if (ramFilter.includes(d)) {
            setSelected(true);
          } else {
            setSelected(false);
          }
        } else if (props.title == "ROM") {
          if (romFilter.includes(d)) {
            setSelected(true);
          } else {
            setSelected(false);
          }
        } else if (props.title == "Camera") {
          if (cameraFilter.includes(d)) {
            setSelected(true);
          } else {
            setSelected(false);
          }
        } else if (props.title == "Processor") {
          if (processorFilter.includes(d)) {
            setSelected(true);
          } else {
            setSelected(false);
          }
        } else if (props.title == "Network") {
          if (networkFilter.includes(d)) {
            setSelected(true);
          } else {
            setSelected(false);
          }
        } else if (props.title == "Battery") {
          if (betteryFilter.includes(d)) {
            setSelected(true);
          } else {
            setSelected(false);
          }
        } else {
          setSelected(false);
        }
      }, []);

      useEffect(() => {
        if (Selected) {
          if (props.title == "RAM") {
            dispatch(setFilterRam(d));
          } else if (props.title == "ROM") {
            dispatch(setFilterRom(d));
          } else if (props.title == "Camera") {
            dispatch(setFilterCamera(d));
          } else if (props.title == "Processor") {
            dispatch(setFilterProcessor(d));
          } else if (props.title == "Network") {
            dispatch(setFilterNetwork(d));
          } else if (props.title == "Battery") {
            dispatch(setFilterBattery(d));
          }
        } else {
          if (props.title == "RAM") {
            dispatch(removeFilterRam(d));
          } else if (props.title == "ROM") {
            dispatch(removeFilterRom(d));
          } else if (props.title == "Camera") {
            dispatch(removeFilterCamera(d));
          } else if (props.title == "Processor") {
            dispatch(removeFilterProcessor(d));
          } else if (props.title == "Network") {
            dispatch(removeFilterNetwork(d));
          } else if (props.title == "Battery") {
            dispatch(removeFilterBattery(d));
          }
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
          {props.title === "Camera" && "MP"}
          {props.title === "Battery" && "mAh"}
        </li>
      );
    };

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

    return (
      <div className="relative transition-all">
        <div className="bg-filter min-h-[4rem] flex items-center font-medium justify-around">
          <ul className="flex capitalize items-center md:gap-36 gap-4 font-outfit">
            <li
              className={classNames(
                "hover:underline cursor-pointer",
                ShowBrandMenu
                  ? "underline text-white hover:text-white/70"
                  : "text-white/70 hover:text-white"
              )}
              onClick={() => {
                if (ShowBrandMenu) {
                  dispatch(ShowMenu.HideBrandMenu());
                } else {
                  dispatch(ShowMenu.ShowBrandMenu());
                }
              }}
            >
              Brands
            </li>
            <li
              className={classNames(
                "hover:underline cursor-pointer",
                ShowPriceMenu
                  ? "underline text-white hover:text-white/70"
                  : "text-white/70 hover:text-white"
              )}
              onClick={() => {
                if (ShowPriceMenu) {
                  dispatch(ShowMenu.HidePriceMenu());
                } else {
                  dispatch(ShowMenu.ShowPriceMenu());
                }
              }}
            >
              Pricing
            </li>
            <li
              className={classNames(
                "hover:underline cursor-pointer",
                ShowFilterMenu
                  ? "underline text-white hover:text-white/70"
                  : "text-white/70 hover:text-white"
              )}
              onClick={() => {
                if (ShowFilterMenu) {
                  dispatch(ShowMenu.HideFilterMenu());
                } else {
                  dispatch(ShowMenu.ShowFilterMenu());
                }
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
        <Transition
          show={ShowBrandMenu}
          appear={true}
          as={"div"}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute p-4 border border-filter rounded-sm font-medium font-outfit bg-white z-[500] left-1/2 -translate-x-1/2"
          onClick={() => {
            dispatch(ShowMenu.HideBrandMenu());
          }}
        >
          <ul className="grid md:grid-cols-6 grid-cols-2 gap-4">
            {Brands.map((item, index) => {
              return (
                <li className="hover:underline" key={index}>
                  <Link href={"/brand/" + item}>{item}</Link>
                </li>
              );
            })}
          </ul>
        </Transition>
        <Transition
          show={ShowPriceMenu}
          appear={true}
          as={"div"}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute p-4 border border-filter rounded-sm font-medium font-outfit bg-white z-[500] left-1/2 -translate-x-1/2"
          onClick={() => {
            dispatch(ShowMenu.HidePriceMenu());
          }}
        >
          <ul className="grid md:grid-cols-4 grid-cols-1 gap-4">
            {Price.map((p, index) => {
              if (p.above) {
                return (
                  <li className="hover:underline" key={index}>
                    <Link href={"/price?s=" + p.start + "&e=above"}>
                      Above ₹{p.start}
                    </Link>
                  </li>
                );
              }
              return (
                <li className="hover:underline" key={index}>
                  <Link href={"/price?s=" + p.start + "&e=" + p.stop}>
                    ₹{p.start} - ₹{p?.stop}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Transition>
        <Transition
          show={ShowFilterMenu}
          appear={true}
          as={"div"}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute p-4 border border-filter rounded-sm font-medium font-outfit bg-white z-[500] md:left-1/2 md:-translate-x-1/2 max-sm:w-full max-sm:border-b max-sm:border-x-0 max-sm:rounded-none"
        >
          <ul>
            {Features.map((Feature, index) => {
              return (
                <li className="grid grid-cols-5 max-md:grid-cols-4 mb-4" key={index}>
                  <h3 className="text-md col-span-1">{Feature.title}:</h3>
                  <ul className="col-span-4 max-md:col-span-3 flex gap-x-2 max-md:overflow-auto">
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
            <li className="w-full flex justify-center items-center text-center mt-4 gap-x-4">
              <button
                className="bg-primary-0 rounded-full px-6 py-2 text-white hover:bg-primary-0/80"
                onClick={() => {
                  dispatch(Submit());
                  dispatch(ShowMenu.HideFilterMenu());
                }}
              >
                Search
              </button>
              <button
                className="bg-primary-0 rounded-full px-6 py-2 text-white hover:bg-primary-0/80"
                onClick={() => {
                  dispatch(Clear());
                  dispatch(ShowMenu.HideFilterMenu());
                }}
              >
                Clear
              </button>
            </li>
          </ul>
        </Transition>
      </div>
    );
  };

  return (
    <StrictMode>
      <NavBarForHeader />
      <FilterSection />
    </StrictMode>
  );
};

const Header = memo(HeaderComponent);

export default Header;
