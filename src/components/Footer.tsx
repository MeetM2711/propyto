import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const sections = {
    propyto: {
      title: 'Propyto',
      links: [
        { label: 'Mobile Apps', href: '/mobile-apps' },
        { label: 'Our Services', href: '/services' },
        { label: 'Price Trends', href: '/price-trends' },
        { label: 'Post your Property', href: '/post-property' },
        { label: 'Builders in India', href: '/builders' },
        { label: 'Area Converter', href: '/area-converter' },
        { label: 'Articles', href: '/articles' },
        { label: 'Customer Service', href: '/customer-service' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About us', href: '/about' },
        { label: 'Contact us', href: '/contact' },
        { label: 'Careers with us', href: '/careers' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Request Info', href: '/request-info' },
        { label: 'Feedback', href: '/feedback' },
        { label: 'Report a problem', href: '/report' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Summons/Notices', href: '/notices' },
        { label: 'Grievances', href: '/grievances' },
        { label: 'Safety Guide', href: '/safety' },
      ],
    },
    partners: {
      title: 'Our Partners',
      links: [
        { label: 'Naukri.com - Jobs in India', href: 'https://www.naukri.com' },
        { label: 'Naukrigulf.com - Jobs in middle east', href: 'https://www.naukrigulf.com' },
        { label: 'Jeevansathi.com - Matrimonials', href: 'https://www.jeevansathi.com' },
        { label: 'Brijj.com - Professional Networking', href: 'https://www.brijj.com' },
        { label: 'Shiksha.com - Education Career Info', href: 'https://www.shiksha.com' },
        { label: 'Policybazaar.com - Insurance India', href: 'https://www.policybazaar.com' },
        { label: 'Meritnation.com - Online Educational Assessment', href: 'https://www.meritnation.com' },
        { label: 'PaisaBazaar.com', href: 'https://www.paisabazaar.com' },
        { label: 'AmbitionBox.com', href: 'https://www.ambitionbox.com' },
        { label: 'FirstNaukri.com - A jobsite for campus hiring', href: 'https://www.firstnaukri.com' },
        { label: 'Jobhai.com – Find Jobs Near You', href: 'https://www.jobhai.com' },
      ],
    },
    contact: {
      title: 'Contact Us',
      phone: 'Toll Free - 1800 41 99099',
      timing: 'Monday - Saturday (9:00AM to 7:00PM IST)',
      email: 'Email - feedback@99acres.com',
      social: {
        title: 'Connect with us',
        links: [
          { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
          { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
          { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
          { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
        ],
      },
    },
  };

  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case 'facebook':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z" />
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
            <path d="M16.5 7.5C16.5 7.77614 16.2761 8 16 8C15.7239 8 15.5 7.77614 15.5 7.5C15.5 7.22386 15.7239 7 16 7C16.2761 7 16.5 7.22386 16.5 7.5Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Propyto Section */}
          <div>
            <h3 className="text-[#bc9b54] font-semibold mb-4">{sections.propyto.title}</h3>
            <ul className="space-y-2">
              {sections.propyto.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-[#bc9b54] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-[#bc9b54] font-semibold mb-4">{sections.company.title}</h3>
            <ul className="space-y-2">
              {sections.company.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-[#bc9b54] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners Section */}
          <div>
            <h3 className="text-[#bc9b54] font-semibold mb-4">{sections.partners.title}</h3>
            <ul className="space-y-2">
              {sections.partners.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-[#bc9b54] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[#bc9b54] font-semibold mb-4">{sections.contact.title}</h3>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm font-medium">{sections.contact.phone}</p>
              <p className="text-gray-400 text-xs">{sections.contact.timing}</p>
              <p className="text-gray-300 text-sm">{sections.contact.email}</p>

              {/* Social Media */}
              <div>
                <h4 className="text-[#bc9b54] font-semibold mb-3">{sections.contact.social.title}</h4>
                <div className="flex space-x-4">
                  {sections.contact.social.links.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="text-gray-300 hover:text-[#bc9b54] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {renderSocialIcon(social.icon)}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>All rights reserved - Info Edge (India) Ltd.</p>
            <p>
              A{' '}
              <Link 
                href="https://crealogic.tech/" 
                className="text-[#bc9b54] hover:text-[#c69531]"
                target="_blank"
                rel="Crealogic Technologies"
              >
                crealogic.tech
              </Link>
              {' '}group venture.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
