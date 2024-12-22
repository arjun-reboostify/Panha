import React from 'react';
import { Facebook, Twitter, Instagram,MessageCircle, Linkedin } from 'lucide-react';


const SocialQuoteComponent = () => {
    
  const links = [
    {
      text: "WhatsApp Group:",
      icon: MessageCircle,
      label: "Click Here",
      href: "https://chat.whatsapp.com/BLikt4WP0yt2AG1paLIRFA",
      bgColor: "bg-green-600",
    },
    {
      text: "Instagram official:",
      icon: Instagram,
      label: "Click Here",
      href: "https://www.instagram.com/panha.co.in?igsh=MXIxa2U1aG5qdGN4dA==",
      bgColor: "bg-pink-600",
    },
    {
      text: "Instagram confessions:",
      icon: Instagram,
      label: "Click Here",
      href: "https://www.instagram.com/panha.co.in?igsh=MXIxa2U1aG5qdGN4dA==",
      bgColor: "bg-purple-600",
    },
    {
      text: "LinkedIn:",
      icon: Linkedin,
      label: "Click Here",
      href: "https://www.linkedin.com/company/your-panha/",
      bgColor: "bg-blue-600",
    },
  ];
  
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
  className="text-[1.2rem] italic w-full text-white  animate-fadeIn"
>
  <span className="font-bold text-yellow-300">Mission:</span> To provide compassionate counseling and support for individuals facing depression, trauma, and emotional challenges.
</blockquote>


        {/* Timing Schedule */}
        <div className="shadow-2xl rounded-lg p-6 bg-black w-full max-w-xl transform hover:scale-105 transition-transform duration-500">
          <h2 className="text-3xl font-semibold text-gray-300 mb-6 underline decoration-dotted">
        Online Group Discussion Schedule
          </h2>
          <div className="overflow-x-auto">
  <table className="w-full table-auto border-collapse border  border-black text-left">
    <thead>
      <tr className=" bg-transparent text-white">
        <th className="border border-white px-6 py-3"></th>
        <th className="border text-xl border-white px-6 py-3">Details</th>
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
      </main> <p
          className="text-2xl text-[1.4rem] text-white mt-5 mb-5  animate-fadeIn"
        >
  Yaha bina judge kiye aapko sunna jayega and aapki problem solve hogi

        </p>

      {/* Bouncing Links with Labels */}
      <div className="flex flex-col items-center space-y-8 z-10">
  <table className="table-auto border-4 border-gray-800 bg-transparent w-full">
    <thead className="bg-black text-white">
      <tr>
        <th className="px-6 py-3 text-lg font-bold">
          Toh Deri Kis Baat ki Join the Revolution Now!!!
        </th>
      </tr>
    </thead>
    <tbody>
      {links.map((link, index) => (
        <tr key={link.label} className="border-b border-gray-800">
          <td className="px-6 py-4 text-gray-300 flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center mb-2">
              <span className="text-gray-300 text-lg">{`${index + 1}. ${link.text}`}</span>
            </div>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-y-2 px-10 py-1 ${link.bgColor} rounded-lg transition-all duration-200  text-white animate-bounce`}
            >
              <link.icon className="font-bold" size={40} />
              <span className="text-2xl font-bold mx-4">{link.label}</span>
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      


    </div>
  );
};

export default SocialQuoteComponent;
