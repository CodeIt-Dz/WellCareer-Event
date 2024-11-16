import Link from "next/link";

const SidebarButton = ({
  children,
  startContent,
  isSelected,
  href,
  onClick,
}: {
  children: React.ReactNode;
  startContent: React.ReactNode;
  isSelected?: boolean;
  href?: string;
  onClick?: () => void;
}) => {
  if (!href && !onClick)
    throw new Error("Either href or onClick must be provided");
  if (href) {
    return (
      <Link href={href}>
        <button
          className={`flex flex-row gap-2 my-4 hover:text-primaryColor transition-colors ${
            isSelected ? "text-primaryColor hover:text-primaryColorSoft" : "text-grey"
          }`}
        >
          {startContent}
          {children}
        </button>
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`flex flex-row gap-2 my-4 hover:text-primaryColor transition-colors ${
        isSelected ? "text-primaryColor hover:text-primaryColorSoft" : "text-grey"
      }`}
    >
      {startContent}
      {children}
    </button>
  );
};

export default SidebarButton;
