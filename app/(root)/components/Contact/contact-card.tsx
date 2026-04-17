type Props = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

const ContactCard = ({ icon, title, children }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="text-accent">{icon}</div>
      <div className="space-y-1">
        <p className="font-semibold text-text-main">{title}</p>
        <div className="">{children}</div>
      </div>
    </div>
  );
};
export default ContactCard;
