import React from 'react';

interface SocialLink {
  name: string;
  url: string;
}

interface FooterProps {
  socialLinks: SocialLink[];
  copyright: string;
}

const Footer: React.FC<FooterProps> = ({ socialLinks, copyright }) => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center w-full m-0">
      <div className="flex justify-center mb-4">
        {socialLinks.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="mx-2">
            {link.name}
          </a>
        ))}
      </div>
      <p>{copyright}</p>
    </footer>
  );
};

export default Footer;
