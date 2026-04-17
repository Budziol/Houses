type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalBackground = ({ children, onClose }: Props) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 w-full h-full bg-black/30 flex items-center justify-center p-8 z-50"
    >
      <div
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default ModalBackground;
