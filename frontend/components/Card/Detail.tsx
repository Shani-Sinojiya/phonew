import { Fragment } from "react";

const CardDetail = (props: { title: string; details: string }) => {
  return (
    <Fragment>
      <h3 className="md:col-span-1 text-[#494949] md:text-lg max-md:text-sm max-md:col-span-2 font-medium">
        {props.title}:
      </h3>
      <p className="md:col-span-5 text-black md:text-lg max-md:text-sm max-md:col-span-6 font-medium">
        {props.details}
      </p>
    </Fragment>
  );
};


export default CardDetail;