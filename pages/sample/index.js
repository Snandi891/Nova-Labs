import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";

export default function SocialButtons() {
  const socials = [
    {
      name: "GitHub",
      icon: <FaGithub className="h-6 w-6" />,
      username: "Snandi891",
      handle: "Nova Labs",
      info: "10+ Repositories",
      href: "https://github.com/Snandi891",
      color: "hover:bg-gray-700 hover:shadow-gray-500/50",
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="h-6 w-6" />,
      username: "Nova Labs",
      handle: "@Nova-facebook",
      info: "Tech + Networking",
      href: "https://www.facebook.com/share/1FFHuPxPg3/",
      color: "hover:bg-blue-600 hover:shadow-blue-500/50",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="h-6 w-6" />,
      username: "novaprojects66",
      handle: "Nova Projects",
      info: "Tech & Codding",
      href: "https://www.instagram.com/novaprojects66?igsh=MTJnaXBoOHA0anZyag==",
      color:
        "hover:bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:shadow-pink-400/50",
    },
    {
      name: "Telegram",
      icon: <FaTelegram className="h-6 w-6" />,
      username: "shiva_tele",
      handle: "@tele_shiva",
      info: "Community & Updates",
      href: "https://t.me/shiva_tele",
      color: "hover:bg-sky-500 hover:shadow-sky-400/50",
    },
  ];

  return (
    <div className="mt-8 flex ">
      {/* right aligned */}
      <div className="flex space-x-8">
        {socials.map((social, idx) => (
          <div key={idx} className="relative group">
            {/* Social Icon Button */}
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gray-800 transition-all duration-300 
                         p-4 rounded-full shadow-lg text-white 
                         flex items-center justify-center 
                         hover:scale-110 transform ${social.color}`}
              aria-label={social.name}
            >
              {social.icon}
            </a>

            {/* Tooltip Box */}
            <div
              className="absolute -top-28 left-1/2 -translate-x-1/2 w-64 
                         bg-neutral-900/70 backdrop-blur-xl rounded-2xl p-4 
                         text-white text-sm shadow-[0_0_25px_rgba(0,0,0,0.8)] 
                         border border-white/10 
                         opacity-0 scale-90 group-hover:opacity-100 
                         group-hover:scale-100 group-hover:-translate-y-2 
                         transition-all duration-300 ease-out pointer-events-none"
            >
              <div className="flex items-center">
                <div
                  className="w-12 h-12 rounded-lg bg-white text-black 
                             flex items-center justify-center font-bold mr-3 shadow-md"
                >
                  {social.username.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-sky-400">
                    {social.username}
                  </div>
                  <div className="text-gray-300 text-xs">{social.handle}</div>
                </div>
              </div>
              <div className="mt-2 text-gray-200">{social.info}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
