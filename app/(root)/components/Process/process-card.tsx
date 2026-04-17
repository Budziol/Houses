type Props = {
  subTitle: string;
  title: string;
  description: string;
};

const ProcessCard = ({ subTitle, title, description }: Props) => {
  return (
    <div className="space-y-6">
      <p className="text-[12px]">{subTitle}</p>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="">{description}</p>
    </div>
  );
};
export default ProcessCard;
