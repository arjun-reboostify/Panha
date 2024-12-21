import React from 'react';
import { Facebook, Twitter, Instagram,MessageCircle, Linkedin } from 'lucide-react';

const SocialQuoteComponent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-blue-900 to-black text-center items-center justify-between">
      {/* Heading */}
      <div className='flex justify-center items-center'>
          <img src="/logo.jpg" className="h-10 w-10" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 m-5 bg-clip-text text-transparent">
            Panha
          </h1>
        </div>

      {/* Quote */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
        <blockquote
          className="text-2xl italic text-white px-8 max-w-xl animate-fadeIn"
        >
      "You're not alone. We've got your back, no matter what."
        </blockquote>

        {/* Timing Schedule */}
        <div className="shadow-2xl rounded-lg p-6 bg-black w-full max-w-xl transform hover:scale-105 transition-transform duration-500">
          <h2 className="text-3xl font-semibold text-gray-300 mb-6 underline decoration-dotted">
        Online Group Discussion Schedule
          </h2>
          <div className="overflow-x-auto">
  <table className="w-full table-auto border-collapse border  border-black text-left">
    <thead>
      <tr className=" bg-gradient-to-br from-black via-blue-900 to-black text-white">
        <th className="border border-black px-6 py-3"></th>
        <th className="border border-black px-6 py-3">Details</th>
      </tr>
    </thead>
    <tbody>
      {[
        { attribute: 'Schedule', details: 'Saturday, Sundays' },
        { attribute: 'Posted', details: '9:00 PM' },
        { attribute: 'Discussion', details: '9:30 - 10:30 PM' },
      ].map((row, index) => (
        <tr
          key={index}
          className={`${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
          } hover:bg-gray-200 transition-colors duration-300`}
        >
          <td className="border bg-black border-white px-6 py-4 text-white">
            {row.attribute}
          </td>
          <td className="border bg-black border-white px-6 py-4 text-white">
            {row.details}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
      </main>

      {/* Socials Footer */}
      <footer className="w-full py-6 bg-black">
  <div className="flex justify-center space-x-6 animate-bounce">
    <div className="flex flex-col items-center">
      <a
        href="https://chat.whatsapp.com/BLikt4WP0yt2AG1paLIRFA"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
      >
        <MessageCircle size={32} />
      </a>
      <span className="text-sm text-gray-300 mt-1">WhatsApp</span>
    </div>
    {/* <div className="flex flex-col items-center">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
      >
        <Facebook size={32} />
      </a>
      <span className="text-sm text-gray-300 mt-1">Facebook</span>
    </div> */}
    {/* <div className="flex flex-col items-center">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
      >
        <Twitter size={32} />
      </a>
      <span className="text-sm text-gray-300 mt-1">Twitter</span>
    </div> */}
    <div className="flex flex-col items-center">
      <a
        href="https://www.instagram.com/panhamentalhealth/profilecard/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
      >
        <Instagram size={32} />
      </a>
      <span className="text-sm text-gray-300 mt-1">Instagram</span>
    </div>
    <div className="flex flex-col items-center">
      <a
        href="https://www.linkedin.com/company/your-panha/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors duration-200"
      >
        <Linkedin size={32} />
      </a>
      <span className="text-sm text-gray-300 mt-1">LinkedIn</span>
    </div>
  </div>
  <p className="text-white mt-4 text-center">&copy; 2024 Panha</p>
</footer>


    </div>
  );
};

export default SocialQuoteComponent;
