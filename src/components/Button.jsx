import React from 'react'

function Button({
    bgColor= "bg-blue-500",
    textColor = "text-white",
    children,
    classname="",
    ...props
}) {

  return (
    <button className={`py-2 px-3 rounded-lg ${bgColor} ${textColor} ${classname}`} {...props}>
        {children}
    </button>
  )
}

export default Button