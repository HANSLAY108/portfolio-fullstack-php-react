// src/data/mockData.js
import project1Img from '../assets/project1.png';
import project2Img from '../assets/project2.png';
import project3Img from '../assets/project3.png';
// Add three more placeholder images to src/assets
import project4Img from '../assets/project4.png';
import project5Img from '../assets/project5.png';
import project6Img from '../assets/project6.png';


 
// src/data/mockData.js
// ... (keep the mockProjects array above this)

export const mockSkills = [
  {
    name: "Web Development",
    icon: "Code", // Corresponds to <Code /> from lucide-react
    level: 95,
  },
  {
    name: "UI/UX Design",
    icon: "LayoutGrid", // Corresponds to <LayoutGrid />
    level: 80,
  },
  {
    name: "Graphic Design",
    icon: "PenTool", // Corresponds to <PenTool />
    level: 75,
  },
  {
    name: "Project Management",
    icon: "Briefcase", // Corresponds to <Briefcase />
    level: 90,
  },
  {
    name: "Technical Writing",
    icon: "FileText", // Corresponds to <FileText />
    level: 85,
  },
  {
    name: "Problem Solving",
    icon: "Lightbulb", // Corresponds to <Lightbulb />
    level: 98,
  },
];
// src/data/mockData.js
import client1Img from '../assets/client1.png';
import client2Img from '../assets/client2.png';
import client3Img from '../assets/client3.png';
// ... (keep the other mock data arrays)

export const mockTestimonials = [
  {
    quote: "Working with Toh Hanslay was an absolute pleasure. Their attention to detail and ability to bring complex ideas to life is truly remarkable. The final product exceeded our expectations.",
    name: "Jane Doe",
    title: "CEO, Tech Solutions Inc.",
    image: client1Img,
  },
  {
    quote: "The team delivered a high-quality product on time and within budget. Their communication was excellent, keeping us informed every step of the way. Highly recommend!",
    name: "Alex Smith",
    title: "Marketing Director, Global Brands",
    image: client2Img,
  },
  {
    quote: "Innovative solutions and a deep understanding of our needs. The website is performing incredibly well, and we've seen a significant increase in user engagement.",
    name: "Maria K.",
    title: "Founder, Creative Agency",
    image: client3Img,
  },
];
// src/data/mockData.js
// ... (keep the other mock data arrays)

export const mockExperience = [
  {
    role: "Senior Full-Stack Developer",
    company: "Afritech Global",
    period: "2021 - Present",
    description: "Lead development on critical enterprise applications, optimizing performance and implementing new features using React, Node.js, and AWS. Mentored junior developers and spearheaded architectural decisions.",
  },
  {
    role: "Full-Stack Developer",
    company: "Web Innovations Co.",
    period: "2018 - 2021",
    description: "Developed and maintained several client websites and web applications. Responsible for both front-end (Vue.js, SASS) and back-end (Python/Django, PostgreSQL) development.",
  },
  {
    role: "Junior Web Developer",
    company: "Digital Design Studio",
    period: "2016 - 2018",
    description: "Assisted in the development of responsive web interfaces and content management systems. Gained foundational experience in HTML, CSS, JavaScript, and WordPress.",
  },
];

export const mockEducation = [
  {
    degree: "Master of Science in Computer Science",
    institution: "University of Technology",
    period: "2014 - 2016",
    description: "Focused on advanced algorithms, distributed systems, and user interface design. Completed a thesis on real-time data visualization techniques.",
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "State University",
    period: "2010 - 2014",
    description: "Comprehensive study of software development lifecycle, data structures, and programming paradigms. Graduated with honors.",
  },
];
// src/data/mockData.js
// ... (keep the other mock data arrays)

export const mockExpertise = [
  {
    category: "Frontend Development",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3/SASS", "Vue.js"],
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Express.js", "Python", "Django", "PHP", "Laravel", "REST APIs", "GraphQL"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "Prisma"],
  },
  {
    category: "DevOps & Cloud",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Vercel", "Netlify"],
  },
  {
    category: "Tools & Methodologies",
    skills: ["Git", "Figma", "Trello", "Agile", "Scrum", "Jira", "Postman"],
  },
  {
    category: "Soft Skills",
    skills: ["Problem Solving", "Communication", "Team Leadership", "Mentorship", "Adaptability", "Time Management"],
  },
];
// src/data/mockData.js
// ... (keep the other mock data arrays)

export const mockServices = [
  {
    icon: "Code", // Icon name from lucide-react
    title: "Custom Web Development",
    description: "Building responsive, high-performance websites from the ground up, tailored to your specific business needs and brand identity.",
  },
  {
    icon: "Server",
    title: "Backend & API Development",
    description: "Creating robust and scalable server-side applications and RESTful APIs to power your web and mobile applications.",
  },
  {
    icon: "Cloud",
    title: "Cloud & DevOps Solutions",
    description: "Implementing cloud infrastructure and CI/CD pipelines to ensure your applications are scalable, secure, and easily deployable.",
  },
  {
    icon: "LayoutTemplate",
    title: "UI/UX Design & Prototyping",
    description: "Designing intuitive and engaging user interfaces that provide a seamless user experience, from wireframes to high-fidelity prototypes.",
  },
  {
    icon: "PenTool",
    title: "Brand & Logo Design",
    description: "Crafting unique visual identities, including logos and branding guidelines, that resonate with your target audience and set you apart.",
  },
  {
    icon: "Database",
    title: "Database Design & Optimization",
    description: "Structuring and optimizing databases for performance and scalability, ensuring your data is organized, secure, and accessible.",
  },
];
// src/data/mockData.js
// ... (keep the other mock data arrays)

export const mockContactInfo = {
  email: "tohhanslay@gmail.com",
  phone: "(+237) 683113216",
  availability: "Monday - Friday, 9:00 AM - 5:00 PM ",
  socials: {
    github: "https://github.com/HANSLAY108",
    linkedin: "linkedin.com/in/toh-hanslay-3066b533/",
    twitter: "https://twitter.com",
  }
};
// src/data/mockData.js
// ... (keep all the other mock data arrays/objects)

export const mockStats = {
  totalProjects: 6, // This matches the number of projects we have
  newMessages: 5, // A sample number
};
// src/data/mockData.js
// ... (keep other mock data)

export const mockMessages = [
  {
    id: 1,
    sender: "Alice Johnson",
    email: "alice@example.com",
    subject: "Inquiry about portfolio project",
    message: "Hello, I was very impressed with your e-commerce platform project. I'd love to discuss a similar project we have in mind. What is your availability for a quick call next week?",
    date: "2024-07-20 10:30 AM",
    status: "New", // Can be 'New', 'Read', 'Archived'
  },
  {
    id: 2,
    sender: "Bob Smith",
    email: "bob@company.org",
    subject: "Potential Collaboration Opportunity",
    message: "Hi there, my team and I are looking for a skilled developer for a 6-month contract. Your skills in React and Node.js seem like a perfect fit. Please let me know if you are interested.",
    date: "2024-07-19 03:15 PM",
    status: "Read",
  },
  {
    id: 3,
    sender: "Charlie Davis",
    email: "charlie.d@mail.net",
    subject: "Question regarding your About page",
    message: "Great work on your portfolio! I had a quick question about the technologies you mentioned in your journey section. Could you elaborate on your experience with DevOps?",
    date: "2024-07-18 09:00 AM",
    status: "Archived",
  },
  {
    id: 4,
    sender: "Diana Miller",
    email: "diana@designstudio.io",
    subject: "Feedback on your website design",
    message: "Just wanted to say that the UI/UX of your site is fantastic. It's clean, modern, and very easy to navigate. Keep up the great work!",
    date: "2024-07-17 01:40 PM",
    status: "New",
  },
  {
    id: 5,
    sender: "Eve White",
    email: "eve@startup.tech",
    subject: "Job Application Inquiry",
    message: "We came across your portfolio and were very impressed. We have an opening for a Senior Full-Stack Engineer at our company and would love for you to apply.",
    date: "2024-07-16 11:20 AM",
    status: "Read",
  },
];
// src/data/mockData.js
// ... (keep other mock data)

export const mockProfileData = {
  tagline: "Full Stack Developer | React, Node.js, TypeScript Expert",
  biography: "As a passionate Full Stack Developer, I thrive on building robust, scalable, and user-friendly web applications. With expertise in React, Next.js, Node.js, and a strong foundation in modern web technologies, I love translating complex ideas into elegant solutions. My focus is always on writing clean, efficient code and delivering exceptional user experiences.",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "GraphQL",
    "Docker",
    "PostgreSQL",
  ],
  resumeUrl: "current-resume-john-doe.pdf", // Just the filename for display
  socialLinks: [
    { id: 1, platform: "linkedin", url: "https://linkedin.com/in/john-doe_dev" },
    { id: 2, platform: "github", url: "https://github.com/john-doe_dev" },
    { id: 3, platform: "twitter", url: "https://twitter.com/john-doe_dev" },
  ],
};
// src/data/mockData.js
// ... (keep other mock data)

export const mockSiteSettings = {
  logoUrl: "/logo-placeholder.svg", // We will add a placeholder logo
  accentColor: "#8B5CF6", // Our current primary purple
  contactEmail: "developer@example.com",
  contactPhone: "+1 (555) 123-4567",
  socials: {
    github: "https://github.com/devsphere",
    linkedin: "https://linkedin.com/in/devspherepro",
  }
};