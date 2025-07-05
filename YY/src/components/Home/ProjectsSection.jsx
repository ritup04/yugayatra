import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const ProjectCard = ({ emoji, title, description, tags, link, keyFeatures, technologies, titleColor }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group h-full"
        >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden h-full flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                {/* Icon Section with Subtle Color */}
                <div className="relative h-40 flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
                    <div className="text-5xl">{emoji}</div>
                    <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl shadow-lg">
                        <div className="text-stone-600">
                            <Globe className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 space-y-3">
                    <div className="space-y-2">
                        <h3 className={`text-lg font-bold text-stone-800 ${titleColor}`}>{title}</h3>
                        <span className="inline-block text-xs text-amber-700 font-semibold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                            {tags}
                        </span>
                    </div>
                    
                    <p className="text-stone-600 leading-snug text-xs">
                        {description}
                    </p>
                    
                    <div className="space-y-2 mt-1">
                        <div>
                            <h4 className="text-xs font-semibold text-stone-700">Key Features:</h4>
                            <ul className="text-stone-600 text-xs list-disc list-inside">
                                {keyFeatures.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-stone-700">Technologies Used:</h4>
                            <p className="text-stone-600 text-xs">{technologies}</p>
                        </div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="pt-2 mt-auto flex justify-start">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs font-semibold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-200 hover:bg-amber-100 hover:border-amber-400 transition-all duration-300"
                        >
                            <Globe className="w-4 h-4 mr-2 text-amber-500" />
                            Visit Website
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const projects = [
        {
            emoji: "🔔",
            title: "GateBell.in",
            description: "A smart visitor management system designed to streamline office operations by automating guest check-ins, enhancing security, and providing real-time analytics for office administrators.",
            tags: "IoT, Web App",
            link: "http://gatebell.in",
            keyFeatures: [
                "Automated visitor registration and check-in process",
                "Real-time notifications for office staff",
                "Integration with IoT-enabled doorbells",
                "Detailed visitor logs and analytics dashboard"
            ],
            technologies: "React, Node.js, MQTT, AWS IoT, MongoDB",
            titleColor: "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"
        },
        {
            emoji: "🏫",
            title: "SchoolDekho.in",
            description: "A comprehensive platform for parents and students to find and compare schools nearby based on location, ratings, facilities, and educational offerings, making the school selection process easier and more informed.",
            tags: "EdTech, Location-based",
            link: "http://schooldekho.in",
            keyFeatures: [
                "Location-based school search with interactive map",
                "Detailed school profiles with photos and virtual tours",
                "Parent reviews and ratings system",
                "School comparison tool for informed decision making"
            ],
            technologies: "React, Express, MongoDB, Google Maps API, Cloudinary",
            titleColor: "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"
        },
        {
            emoji: "🍔",
            title: "FoodCaravan.in",
            description: "An online food delivery platform that connects local customers with nearby restaurants, offering a seamless ordering experience with real-time tracking and personalized recommendations.",
            tags: "FoodTech, Web App",
            link: "http://foodcaravan.in",
            keyFeatures: [
                "User-friendly interface for browsing menus",
                "Real-time order tracking with GPS",
                "Personalized restaurant and dish recommendations",
                "Secure payment gateway integration"
            ],
            technologies: "Next.js, Express, PostgreSQL, Firebase, Stripe",
            titleColor: "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"
        },
        {
            emoji: "👤",
            title: "SatyaPandey.com",
            description: "A personal portfolio and blog for Satya Pandey, showcasing professional achievements, projects, and thought leadership articles on technology, design, and innovation.",
            tags: "Portfolio, Blog",
            link: "http://satyapandey.com",
            keyFeatures: [
                "Responsive portfolio showcasing projects",
                "Blog section with rich text formatting",
                "SEO optimization for better visibility",
                "Contact form for inquiries"
            ],
            technologies: "Gatsby, GraphQL, Tailwind CSS, Contentful",
            titleColor: "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"
        },
        {
            emoji: "📰",
            title: "MyPressWala.in",
            description: "A SaaS platform for businesses to distribute press releases and news updates, providing tools for creating, scheduling, and analyzing the reach of media content across multiple channels.",
            tags: "Media, SaaS",
            link: "http://mypresswala.in",
            keyFeatures: [
                "Press release creation with templates",
                "Distribution to major news outlets",
                "Analytics for tracking media reach",
                "Scheduling and automated publishing"
            ],
            technologies: "Vue.js, Laravel, MySQL, Google Analytics API",
            titleColor: "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"
        },
        {
            emoji: "🎯",
            title: "12thFailJobs.com",
            description: "A job portal dedicated to freshers and students with a 12th pass qualification, offering access to entry-level job opportunities, career guidance, and resume-building tools.",
            tags: "Job Portal, EdTech",
            link: "http://12thfailjobs.com",
            keyFeatures: [
                "Job listings tailored for 12th pass candidates",
                "Resume builder with templates",
                "Career advice and interview preparation resources",
                "Employer dashboard for posting jobs"
            ],
            technologies: "Angular, Django, SQLite, AWS S3",
            titleColor: "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"
        },
        {
            emoji: "📚",
            title: "TheBrightLearn.in",
            description: "An online learning management system (LMS) for students and professionals, offering courses, quizzes, and progress tracking to support continuous learning and skill development.",
            tags: "EdTech, LMS",
            link: "http://thebrightlearn.in",
            keyFeatures: [
                "Interactive courses with video and text content",
                "Quizzes and assessments for knowledge checks",
                "Progress tracking and certificates of completion",
                "Discussion forums for peer interaction"
            ],
            technologies: "React, Ruby on Rails, PostgreSQL, AWS CloudFront",
            titleColor: "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"
        },
        {
            emoji: "🚀",
            title: "Coming Soon - NextGen Project",
            description: "An exciting upcoming project that will revolutionize how users interact with digital services. Stay tuned for the launch of this innovative solution.",
            tags: "Upcoming, Innovation",
            link: "#",
            keyFeatures: [
                "Revolutionary user experience",
                "Cutting-edge technology integration",
                "Seamless cross-platform functionality",
                "Advanced data analytics capabilities"
            ],
            technologies: "Next.js, GraphQL, TensorFlow, Blockchain",
            titleColor: "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"
        }
    ];

    return (
        <section id="projects" className="py-20 mt-16 relative overflow-hidden bg-gradient-to-b from-yellow-50 to-amber-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-800">
                        Our <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Projects</span>
                    </h2>
                    <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
                        Showcasing our diverse portfolio of innovative solutions, from visitor management systems to educational platforms, 
                        each project reflects our commitment to excellence and digital innovation.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {projects.map((project, index) => (
                        <div key={index} className="h-full flex">
                            <ProjectCard
                                emoji={project.emoji}
                                title={project.title}
                                description={project.description}
                                tags={project.tags}
                                link={project.link}
                                keyFeatures={project.keyFeatures}
                                technologies={project.technologies}
                                titleColor={project.titleColor}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-0 -left-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </section>
    );
};

export default ProjectsSection;