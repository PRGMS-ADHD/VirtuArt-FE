import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithubAlt,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface IconLinkProps {
  type: string;
  text: string;
  to: string;
}

const IconLink: React.FC<IconLinkProps> = ({ type, text, to }) => {
  const renderIcon = () => {
    switch (type) {
      case 'github':
        return <FontAwesomeIcon icon={faGithubAlt} />;
      case 'youtube':
        return <FontAwesomeIcon icon={faYoutube} />;
      case 'instagram':
        return <FontAwesomeIcon icon={faInstagram} />;
      case 'contact':
        return <FontAwesomeIcon icon={faEnvelope} />;
      default:
        return null;
    }
  };

  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className="font-helvetica text-[12px] font-light text-customGray3"
    >
      {renderIcon()}
      {text}
    </a>
  );
};

export default IconLink;
