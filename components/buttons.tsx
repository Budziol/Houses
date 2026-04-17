type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = ({
  children,
  className,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      className={`flex gap-3 items-center justify-center w-full px-6 py-3 text-sm rounded-4xl bg-accent text-white font-medium shadow transition-colors duration-150 whitespace-nowrap ${disabled ? "bg-main/60 cursor-not-allowed" : "hover:bg-accent-hover cursor-pointer"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const GhostButton = ({
  children,
  className,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      className={`flex gap-3 items-center justify-center w-full px-6 py-3 text-sm rounded-4xl bg-background text-text-main border border-text-main font-medium transition-colors duration-150 whitespace-nowrap ${disabled ? "bg-main/60 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton = ({
  children,
  className,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      className={`flex gap-3 items-center justify-center w-full px-6 py-3 text-sm rounded-4xl bg-red-500 text-background font-medium transition-colors duration-150 whitespace-nowrap ${disabled ? "bg-main/60 cursor-not-allowed" : "hover:bg-red-400 cursor-pointer"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
