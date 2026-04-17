type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const BenefitsCard = ({ icon, title, description }: Props) => {
  return (
    <div className="flex flex-col gap-4 items-center rounded-lg">
      <div className="text-accent">{icon}</div>
      <div className="space-y-4">
        <p className="font-semibold text-text-main">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default BenefitsCard;
