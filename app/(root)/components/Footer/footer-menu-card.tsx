import React from "react";

const FooterMenuCard = ({
  headline,
  children,
}: {
  headline: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="">
      <h4 className="mb-4">{headline}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
};
export default FooterMenuCard;
