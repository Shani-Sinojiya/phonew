import { Fragment } from "react";

const CardDetail = (props: { title: string; details: string }) => {
  return (
    <Fragment>
      <h3 className="md:col-span-1 font-outfit text-[#424242] md:text-lg max-md:text-sm max-md:col-span-2 font-medium max-md:my-1">
        {props.title}:
      </h3>
      <p className="md:col-span-5 font-outfit text-black md:text-lg max-md:text-sm max-md:col-span-6 font-medium max-md:my-1">
        {props.details}
      </p>
    </Fragment>
  );
};


export default CardDetail;