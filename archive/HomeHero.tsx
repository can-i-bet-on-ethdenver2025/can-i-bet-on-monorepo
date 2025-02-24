// {
//   /* Hero Content */
// }
// <div className="container mx-auto">
//   {/* Mobile Card View */}
//   <div className="block md:hidden bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-sm mx-auto">
//     <div className="flex items-center gap-3 mb-3">
//       <div className="relative w-[60px] h-[60px]">
//         <Image
//           src={PromptBetLogo}
//           alt="PromptBet Logo"
//           fill
//           priority
//           className="object-contain"
//         />
//       </div>
//       <h1 className="text-2xl font-bold text-white">{title}</h1>
//     </div>
//     <p className="text-base text-white/90 mb-3">{subtitle}</p>
//     <button
//       onClick={onCtaClick}
//       className="w-full px-6 py-2.5 bg-white text-primary rounded-xl font-bold text-lg
//                      hover:bg-opacity-90 transition-all duration-200 
//                      focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
//     >
//       {ctaText}
//     </button>
//   </div>

//   {/* Desktop View */}
//   <div className="hidden md:flex flex-row items-center justify-between py-16">
//     {/* Left side - Text Content */}
//     <div className="w-1/2 text-left pr-8">
//       <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
//         {title}
//       </h1>
//       <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-xl">
//         {subtitle}
//       </p>
//       <button
//         onClick={onCtaClick}
//         className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg
//                          hover:bg-opacity-90 transition-all duration-200 
//                          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
//       >
//         {ctaText}
//       </button>
//     </div>

//     {/* Right side - Hero Image */}
//     <div className="w-1/2">
//       <div className="relative w-[700px] h-[700px]">
//         <Image
//           src={PromptBetLogo}
//           alt="PromptBet Logo"
//           fill
//           priority
//           className="object-contain"
//         />
//       </div>
//     </div>
//   </div>
// </div>;
