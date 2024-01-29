import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
export default function DefaultPagination({callApiBlog,totalData=0}) {
  const [active, setActive] = React.useState(1);
  const getItemProps = (index) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => reloadPage(index),
    });
    const reloadPage = (index) => {
        callApiBlog(index)
        setActive(index)
    }
  const next = () => {
    if (active === totalData) return;
    let index = active + 1
    callApiBlog(index)
    setActive(index);
  };
 
  const prev = () => {
    if (active === 1) return;
    let index = active - 1
    callApiBlog(index)
    setActive(index - 1);
  };
 
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalData }, (_, index) => (
            <IconButton key={index + 1} {...getItemProps(index + 1)}>
                {index + 1}
            </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}