import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';

const QuizSection = () => {
    // Quiz state management
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState('');
    const [resultDescription, setResultDescription] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    // Quiz questions
    const questions = [
        {
            question: "What interests you the most?",
            options: [
                "Building and creating new things",
                "Analyzing data and finding patterns",
                "Designing beautiful user experiences",
                "Managing projects and coordinating teams",
                "Marketing and promoting products"
            ]
        },
        {
            question: "How do you prefer to work?",
            options: [
                "Independently with focused tasks",
                "In a collaborative team environment",
                "A mix of both, depending on the task",
                "Leading others and delegating tasks",
                "Flexible environment with creative freedom"
            ]
        },
        {
            question: "Which skills would you like to develop?",
            options: [
                "Technical and programming skills",
                "Analytical and problem-solving skills",
                "Creative and design skills",
                "Leadership and management skills",
                "Communication and marketing skills"
            ]
        },
        {
            question: "What type of challenges excite you?",
            options: [
                "Solving complex technical problems",
                "Analyzing data to derive insights",
                "Creating visually appealing designs",
                "Coordinating people and resources",
                "Crafting compelling content and strategies"
            ]
        },
        {
            question: "What's your ideal work environment?",
            options: [
                "Fast-paced startup culture",
                "Structured corporate setting",
                "Creative agency atmosphere",
                "Remote work with flexible hours",
                "Client-facing consultancy role"
            ]
        }
    ];

    // Internship types based on quiz results
    const internshipTypes = [
        {
            type: "Technical Development Internship",
            description: "You're well-suited for roles in software development, engineering, or IT. You enjoy building things, solving technical problems, and have an analytical mindset that thrives in implementation-focused environments.",
            keySkills: ["Programming", "Problem-solving", "Technical documentation", "Debugging", "System design"]
        },
        {
            type: "Data Analysis Internship",
            description: "Your analytical mindset and interest in finding patterns makes you perfect for data-focused roles. You'd excel in positions involving data analysis, business intelligence, or research where you can derive meaningful insights.",
            keySkills: ["Statistical analysis", "Data visualization", "Critical thinking", "Attention to detail", "Research methodology"]
        },
        {
            type: "Design & Creative Internship",
            description: "Your creative talents and eye for aesthetics make you ideal for design-related internships. You'd thrive in UI/UX design, graphic design, or content creation roles where you can express your creativity.",
            keySkills: ["Visual design", "User experience", "Creative thinking", "Attention to detail", "Design software proficiency"]
        },
        {
            type: "Project Management Internship",
            description: "Your organizational skills and leadership qualities suit you for project management roles. You excel at coordinating teams, managing timelines, and ensuring successful project delivery.",
            keySkills: ["Organization", "Leadership", "Communication", "Time management", "Risk assessment"]
        },
        {
            type: "Marketing & Communications Internship",
            description: "Your communication skills and strategic thinking make you perfect for marketing roles. You'd excel in positions focused on digital marketing, content creation, social media, or public relations.",
            keySkills: ["Communication", "Strategic thinking", "Content creation", "Social media management", "Market research"]
        }
    ];

    // Handle option selection
    const handleOptionSelect = (optionIndex) => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        
        // Add answer to the answers array
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);
        
        // If all questions are answered, calculate result
        if (currentQuestion === questions.length - 1) {
            // Simple algorithm: find the most frequent answer
            const counts = {};
            newAnswers.forEach(answer => {
                counts[answer] = (counts[answer] || 0) + 1;
            });
            
            // Find the most common answer
            let maxCount = 0;
            let maxAnswer = 0;
            
            Object.keys(counts).forEach(key => {
                if (counts[key] > maxCount) {
                    maxCount = counts[key];
                    maxAnswer = parseInt(key);
                }
            });
            
            // Set result based on the most common answer
            setResult(internshipTypes[maxAnswer].type);
            setResultDescription(internshipTypes[maxAnswer].description);
            
            setTimeout(() => {
                setShowResult(true);
                setIsAnimating(false);
            }, 500);
        } else {
            // Move to next question
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
                setIsAnimating(false);
            }, 500);
        }
    };

    // Reset quiz
    const resetQuiz = () => {
        setCurrentQuestion(0);
        setShowResult(false);
        setAnswers([]);
        setResult('');
        setResultDescription('');
    };

    return (
        <section id="quiz" className="py-20 relative overflow-hidden bg-gradient-to-b from-soft-champagne to-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-rich-black">
                        Find Your <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Perfect Internship</span>
                    </h2>
                    <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
                        Take our quick quiz to discover which type of internship aligns best with your interests, 
                        skills, and career aspirations. Your ideal professional path is just a few clicks away!
                    </p>
                </motion.div>

                {/* Quiz Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 md:p-10">
                            {!showResult ? (
                                <div>
                                    {/* Progress Bar */}
                                    <div className="mb-8">
                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-500 ease-out"
                                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-right text-sm text-stone-500 mt-2">
                                            Question {currentQuestion + 1} of {questions.length}
                                        </p>
                                    </div>
                                    
                                    {/* Question */}
                                    <motion.div
                                        key={currentQuestion}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h3 className="text-2xl font-bold text-stone-800 mb-6">
                                            {questions[currentQuestion].question}
                                        </h3>
                                        
                                        {/* Options */}
                                        <div className="space-y-3">
                                            {questions[currentQuestion].options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleOptionSelect(index)}
                                                    className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-amber-300 
                                                    bg-stone-50 hover:bg-amber-50 transition-all duration-300 flex items-center"
                                                    disabled={isAnimating}
                                                >
                                                    <span className="w-6 h-6 rounded-full border-2 border-amber-400 flex-shrink-0 mr-3"></span>
                                                    <span className="text-stone-700">{option}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
                                        <CheckCircle className="w-10 h-10 text-amber-600" />
                                    </div>
                                    
                                    <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4">
                                        Your Ideal Match: <span className="text-gradient">{result}</span>
                                    </h3>
                                    
                                    <p className="text-stone-600 mb-8 text-lg">
                                        {resultDescription}
                                    </p>
                                    
                                    {/* Key Skills */}
                                    <div className="mb-8">
                                        <h4 className="text-lg font-semibold text-stone-700 mb-3">Key Skills You'll Develop:</h4>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {internshipTypes[answers.reduce((a, b) => a + b, 0) % 5].keySkills.map((skill, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button 
                                            onClick={resetQuiz}
                                            className="flex items-center justify-center px-6 py-3 rounded-full border border-stone-300 
                                            text-stone-700 hover:bg-stone-50 transition-all duration-300"
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Retake Quiz
                                        </button>
                                        
                                        <a 
                                            href="https://api.whatsapp.com/send/?phone=918757728679&text=Hello%2C%20I%20am%20interested%20in%20applying%20for%20an%20internship.%20I%20would%20like%20to%20share%20my%20CV%20for%20your%20review.&type=phone_number&app_absent=0"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r 
                                            from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600 
                                            transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            Apply Now
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </section>
    );
};

export default QuizSection;