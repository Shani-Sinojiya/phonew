import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Fragment, ReactNode } from "react";

const AdminLayout = (props: { children: ReactNode }) => {
  return (
    <Fragment>
      {props.children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </Fragment>
  );
};

export default AdminLayout;
