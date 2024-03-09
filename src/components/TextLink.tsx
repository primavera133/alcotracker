import { Icon, Link } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  style?: Object;
  isExternal?: boolean;
}

export function TextLink({
  href,
  children,
  style,
  isExternal = false,
}: TextLinkProps) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const defaultStyle = {
    textDecoration: "none",
    color: "lightskyblue",
    cursor: "pointer",
  };

  const hoverStyle = {
    textDecoration: "underline",
  };

  const activeStyle = {
    color: "blue", // Change to desired active color
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseDown = () => {
    setActive(true);
  };

  const handleMouseUp = () => {
    setActive(false);
  };

  return (
    <Link
      isExternal={isExternal}
      href={href}
      style={{
        ...defaultStyle,
        ...(hovered && hoverStyle),
        ...(active && activeStyle),
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
      {isExternal && (
        <>
          {" "}
          <Icon as={FiExternalLink} />
        </>
      )}
    </Link>
  );
}

export default Link;
