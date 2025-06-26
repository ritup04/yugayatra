// import React from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, Award, Globe, Star } from 'lucide-react';

// const TimelineItem = ({ date, title, description, icon: Icon, side, index, offset }) => {
//     return (
//         <motion.div
//             initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: index * 0.3 }}
//             viewport={{ once: true }}
//             className={`flex items-left w-full my-12 ${side === 'left' ? 'justify-start' : 'justify-end'} relative`}
//         >
//             {/* Timeline Content (No Rotation) */}
//             <div className={`w-5/12 ${side === 'left' ? 'text-right pr-8' : 'text-left pl-8'}`}>
//                 <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     className="relative bg-stone-900/40 backdrop-blur-lg border border-amber-500/30 rounded-xl shadow-2xl p-6 hover:shadow-amber-500/20 transition-all duration-500"
//                 >
//                     {/* Shimmer Effect on Hover */}
//                     <motion.div
//                         className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
//                         animate={{ x: ['-100%', '100%'] }}
//                         transition={{ repeat: Infinity, duration: 2 }}
//                     />
//                     <div className="flex items-center mb-3">
//                         {side === 'left' ? (
//                             <>
//                                 <h3 className="text-xl font-serif font-bold text-amber-100 mr-2">{title}</h3>
//                                 <Icon className="w-5 h-5 text-amber-400" />
//                             </>
//                         ) : (
//                             <>
//                                 <Icon className="w-5 h-5 text-amber-400 mr-2" />
//                                 <h3 className="text-xl font-serif font-bold text-amber-100">{title}</h3>
//                             </>
//                         )}
//                     </div>
//                     <span className="inline-block text-sm text-amber-300 font-semibold bg-amber-900/30 px-4 py-1 rounded-full border border-amber-500/50 mb-3">
//                         {date}
//                     </span>
//                     <p className="text-amber-200 text-sm leading-relaxed">{description}</p>
//                 </motion.div>
//             </div>

//             {/* Timeline Marker and Line with Horizontal Offset */}
//             <div
//                 className="w-2/12 flex justify-center relative"
//                 style={{ transform: `translateX(${offset}px)` }}
//             >
//                 {/* Dashed Line */}
//                 <div className="w-1 h-full absolute bg-gradient-to-b from-amber-500 to-amber-700 [mask-image:linear-gradient(#fff_0%,#fff_50%,transparent_50%,transparent_100%)]"></div>
//                 {/* Diamond Marker */}
//                 <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg rotate-45 flex items-center justify-center z-10 shadow-lg shadow-amber-500/30">
//                     <div className="rotate-[-45deg]">
//                         <Icon className="w-5 h-5 text-amber-100" />
//                     </div>
//                 </div>
//             </div>

//             {/* Empty Space on the Other Side */}
//             <div className="w-5/12"></div>

//             {/* Ornate Divider */}
//             <div
//                 className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
//                 style={{ transform: `translateX(${offset}px)` }}
//             ></div>
//         </motion.div>
//     );
// };

// const TimelineSection = () => {
//     const timelineEvents = [
//         {
//             date: "May 16, 2024",
//             title: "Company Founded",
//             description: "YugaYatra Retail (OPC) Private Limited was officially incorporated, marking the beginning of our journey in digital innovation.",
//             icon: Calendar,
//             offset: 0
//         },
//         {
//             date: "June 2024",
//             title: "GateBell.in Launch",
//             description: "Launched GateBell.in, a smart visitor management system, revolutionizing office operations with IoT integration.",
//             icon: Globe,
//             offset: 50
//         },
//         {
//             date: "July 2024",
//             title: "FoodCaravan.in Launch",
//             description: "Introduced FoodCaravan.in, an online food delivery platform connecting local customers with restaurants, enhancing food accessibility.",
//             icon: Globe,
//             offset: -50
//         },
//         {
//             date: "August 2024",
//             title: "DIPP Startup Recognition",
//             description: "Received official recognition as a startup by the Department for Promotion of Industry and Internal Trade (DIPP).",
//             icon: Award,
//             offset: 40
//         },
//         {
//             date: "September 2024",
//             title: "SatyaPandey.com Launch",
//             description: "Launched SatyaPandey.com, a personal portfolio and blog for Satya Pandey, showcasing professional achievements and insights.",
//             icon: Globe,
//             offset: -40
//         },
//         {
//             date: "October 2024",
//             title: "MyPressWala.in Launch",
//             description: "Rolled out MyPressWala.in, a SaaS platform for businesses to distribute press releases and news updates efficiently.",
//             icon: Globe,
//             offset: 30
//         },
//         {
//             date: "November 2024",
//             title: "12thFailJobs.com Launch",
//             description: "Unveiled 12thFailJobs.com, a job portal for freshers and students with 12th pass qualifications, empowering young talent.",
//             icon: Globe,
//             offset: -30
//         },
//         {
//             date: "December 2024",
//             title: "TheBrightLearn.in Launch",
//             description: "Launched TheBrightLearn.in, an online learning platform for students and professionals, fostering education and skill development.",
//             icon: Globe,
//             offset: 20
//         },
//         {
//             date: "June 2025",
//             title: "Reached 10,000 Users",
//             description: "Celebrated a major milestone as our platforms collectively reached over 10,000 active users, reflecting our growing impact.",
//             icon: Star,
//             offset: -20
//         }
//     ];

//     return (
//         <section id="timeline" className="py-20 relative overflow-hidden bg-gradient-to-b from-stone-900 to-amber-900/20">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Section Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     viewport={{ once: true }}
//                     className="text-center mb-16"
//                 >
//                     <h2 className="text-5xl font-serif font-bold mb-4 text-amber-100">
//                         Our <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">Journey</span>
//                     </h2>
//                     <p className="text-xl text-amber-200 max-w-3xl mx-auto leading-relaxed font-light">
//                         Embark on a journey through our milestones, where innovation meets elegance in the pursuit of digital excellence.
//                     </p>
//                     <div className="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
//                 </motion.div>

//                 {/* Timeline */}
//                 <div className="relative">
//                     {timelineEvents.map((event, index) => (
//                         <TimelineItem
//                             key={index}
//                             date={event.date}
//                             title={event.title}
//                             description={event.description}
//                             icon={event.icon}
//                             side={index === 0 ? 'left' : (index % 2 === 0 ? 'right' : 'left')} // First card on left, then alternate right, left, right, ...
//                             index={index}
//                             offset={event.offset}
//                         />
//                     ))}
//                 </div>

//                 {/* Call to Action */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.8 }}
//                     viewport={{ once: true }}
//                     className="text-center mt-16"
//                 >
//                     <h3 className="text-4xl font-serif font-bold text-amber-100 mb-6">Join Our Legacy</h3>
//                     <p className="text-amber-200 mb-10 max-w-2xl mx-auto text-lg leading-relaxed font-light">
//                         Be a part of our story as we continue to craft luxurious digital experiences. Let’s create something extraordinary together.
//                     </p>
//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="bg-gradient-to-r from-yellow-600 to-amber-500 text-amber-100 px-10 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 text-lg border border-amber-400"
//                     >
//                         Explore More
//                     </motion.button>
//                 </motion.div>
//             </div>

//             {/* Decorative Elements */}
//             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
//             <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-600/10 rounded-full blur-3xl"></div>
//         </section>
//     );
// };

// export default TimelineSection;