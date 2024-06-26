import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithubAlt,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

interface IconLinkProps {
  type: string;
  text: string;
  to: string;
  iconSize?: string;
}

const IconLink: React.FC<IconLinkProps> = ({
  type,
  text,
  to,
  iconSize = 'w-3 h-3',
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'github':
        return <FontAwesomeIcon icon={faGithubAlt} className={iconSize} />;
      case 'youtube':
        return <FontAwesomeIcon icon={faYoutube} className={iconSize} />;
      case 'instagram':
        return <FontAwesomeIcon icon={faInstagram} className={iconSize} />;
      case 'contact':
        return <FontAwesomeIcon icon={faEnvelope} className={iconSize} />;
      case 'location':
        return <FontAwesomeIcon icon={faLocationDot} className={iconSize} />;
      default:
        return null;
    }
  };

  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className="font-noto-sans-kr text-[12px] font-light text-customGray3"
    >
      {renderIcon()}&nbsp;{text}
    </a>
  );
};

export default IconLink;
