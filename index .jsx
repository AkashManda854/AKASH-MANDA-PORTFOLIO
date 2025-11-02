const { useState, useEffect, useMemo } = React;
const { motion, AnimatePresence } = Motion;

// --- MOCK DATA ---
// Data is mocked here to simulate an API response, personalized with info from your resume.
const initialData = {
  user: {
    name: "Akash Manda",
    title: "Aspiring Data Scientist & Full-Stack Developer",
    email: "mandaakash33@gmail.com",
    linkedin: "https://www.linkedin.com/in/manda-akash-53654331b/",
    github: "https://github.com/AkashManda854",
    bio: "Passionate about building highly performant, scalable web applications and leveraging data to drive insights. Eager to apply my skills in a challenging and growth-oriented environment.",
    avatar: "https://avatars.githubusercontent.com/u/166212431?v=4", // Using GitHub avatar
  },
  skills: [
    {
      category: "Data Science & ML",
      list: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Keras", "Matplotlib", "Seaborn", "Power BI"],
    },
    {
      category: "Backend",
      list: ["Node.js", "Express", "Java", "C++", "SQL", "MySQL", "MongoDB"],
    },
    {
      category: "Frontend",
      list: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    },
    {
      category: "Tools & DevOps",
      list: ["Git", "GitHub", "VS Code", "Jupyter", "Flask"],
    },
  ],
  projects: [
    {
      id: 1,
      title: "Employee Salary Prediction",
      tags: ["Python", "Scikit-learn", "Flask", "Data Science"],
      description: "Developed a machine learning model to predict employee salaries based on various features. Deployed the model using a Flask API.",
      mock_url: "https://github.com/AkashManda854/Employee-Salary-Prediction",
    },
    {
      id: 2,
      title: "Full-Stack MERN Blog",
      tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      description: "A full-featured blog application with user authentication, post creation, and comment functionality using the MERN stack.",
      mock_url: "#",
    },
    {
      id: 3,
      title: "Interactive Data Dashboard",
      tags: ["React", "Power BI", "Data Science"],
      description: "Created a dynamic and interactive dashboard using Power BI, embedded within a React application to visualize complex business intelligence datasets.",
      mock_url: "#",
    },
    {
      id: 4,
      title: "Task Management API",
      tags: ["Node.js", "Express", "PostgreSQL"],
      description: "Designed and built a RESTful API for a task management application, featuring CRUD operations and JWT-based authentication.",
      mock_url: "#",
    },
    {
      id: 5,
      title: "Customer Churn Prediction Model",
      tags: ["Python", "TensorFlow", "Data Science"],
      description: "Built a deep learning model using TensorFlow and Keras to predict customer churn, helping to identify at-risk customers and improve retention strategies.",
      mock_url: "#",
    },
  ],
};

// --- HELPER HOOKS & COMPONENTS ---

// Dark Mode Hook
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const html = window.document.documentElement;
    const prev = isDarkMode ? "light" : "dark";
    html.classList.remove(prev);
    const next = isDarkMode ? "dark" : "light";
    html.classList.add(next);
    localStorage.setItem("theme", next);
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
}

// Typing Effect Hook
function useTypingEffect(text, speed = 100) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayedText;
}

// --- UI COMPONENTS ---

const Header = ({ user, toggleDarkMode, isDarkMode }) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          {user.name}
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Skills</a>
          <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Projects</a>
          <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Contact</a>
        </nav>
        <button
          onClick={() => toggleDarkMode(!isDarkMode)}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  </header>
);

const HeroSection = ({ user }) => {
  const typedTitle = useTypingEffect(user.title);
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-blue-500 shadow-lg"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-white">
            {user.name}
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-blue-600 dark:text-blue-400 font-mono h-8">
            {typedTitle}
            <span className="animate-ping">|</span>
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            {user.bio}
          </p>
          <div className="mt-8">
            <a
              href="#projects"
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              View Projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillsSection = ({ skills }) => (
  <section id="skills" className="py-20 bg-white dark:bg-gray-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillCategory) => (
            <div key={skillCategory.category} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                {skillCategory.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillCategory.list.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full transition duration-300 transform hover:scale-110 hover:shadow-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const ProjectCard = ({ project }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
  >
    <div className="p-6 flex-grow">
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="p-6 bg-gray-50 dark:bg-gray-700">
        <a
          href={project.mock_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Project &rarr;
        </a>
    </div>
  </motion.div>
);

const ProjectsSection = ({ projects }) => {
  // State for the active filter
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Memoize the unique tags to prevent recalculation on every render
  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return ["All", ...Array.from(tags)];
  }, [projects]);

  // Filter projects based on the active tag
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }
    return projects.filter(p => p.tags.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            Projects
          </h2>
          {/* Filtering buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  activeFilter === tag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-800"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* Animated project grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = ({ user }) => {
  // State for form fields, submission status, and errors
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Client-side validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
        newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid.";
    }
    if (!formData.message) newErrors.message = "Message is required.";
    return newErrors;
  };

  // Simulated form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      // Simulate API call and reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Have a question or want to work together? Feel free to reach out.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
              <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>
            <div className="text-center">
              <button type="submit" className="w-full sm:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
                Send Message
              </button>
            </div>
          </form>
          
          {isSubmitted && (
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 text-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md"
             >
                Thank you! Your message has been sent.
             </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ user }) => (
  <footer className="bg-gray-200 dark:bg-gray-800 py-6">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
            <a href={user.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
            </a>
            <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href={`mailto:${user.email}`} className="hover:text-blue-500 dark:hover:text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </a>
        </div>
      <p>&copy; {new Date().getFullYear()} {user.name}. All Rights Reserved.</p>
    </div>
  </footer>
);


// --- MAIN APP COMPONENT ---
function App() {
  const [data, setData] = useState(initialData);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <div className="text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Header user={data.user} toggleDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <main>
        <HeroSection user={data.user} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection projects={data.projects} />
        <ContactSection user={data.user} />
      </main>
      <Footer user={data.user} />
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);