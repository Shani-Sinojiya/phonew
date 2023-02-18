import Head from "next/head";
import Link from "next/link";

const error404 = () => {
  return (
    <section className="flex items-center justify-center py-10 px-0 bg-white font-arvo h-screen">
      <Head>
        <title>404 - Oops Page Not Found</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="bg-[url('/404.gif')] bg-center bg-no-repeat h-[400px]">
                <h1 className="text-8xl">404</h1>
              </div>
              <div className="-mt-12">
                <h3 className="text-3xl">Look like you{"`"}re lost</h3>
                <p className="text-xl">
                  the page you are looking for not avaible!
                </p>
                <Link
                  className="inline-block text-white bg-[#39ac31] hover:bg-[#39ac31]/80 py-2 px-5 my-5 mx-0 rounded-lg"
                  href="/"
                  prefetch
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default error404;
