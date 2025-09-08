import React from "react";

const PrimaryButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="py-2 px-4 rounded-lg bg-gray-600 font-semibold min-w-[100px]">
      {children}
    </button>
  );
};

export default PrimaryButton;
