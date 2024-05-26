import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type, classname = "", ...props },
  ref
) {
  const Id = useId();

  return (
    <div className="w-full flex justify-between items-center gap-2 py-3 ">
      {label && (
        <label htmlFor={Id} className="w-28 text-xl">
          {label}
        </label>
      )}
      <input
        type={type}
        id={Id}
        className={`rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200  ${classname}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
