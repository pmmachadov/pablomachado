import {
  faRobot,
  faWindowMaximize,
  faFileCode,
  faCodeBranch,
  faUpRightFromSquare,
  faComments,
  faDatabase,
  faBolt,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import {
  faReact,
  faHtml5,
  faCss3,
  faJs,
  faNodeJs,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import {
  NavLinkType,
  ProjectCardType,
  SkillItemType,
  SocialLinkType,
} from "types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomIcon from "@components/CustomIcon";

// Theme - Solo Dark Mode
export const darkTheme = {
  color: "#e0e7ff",
  backgroundColor: "#1e3a8a",
};
// NAVIGATION

export const links: NavLinkType[] = [
  {
    name: "intro",
    path: "#intro",
    icon: (
      <FontAwesomeIcon
        icon={faRobot}
        title="scroll to section: intro"
        size="lg"
      />
    ),
  },
  {
    name: "software",
    path: "#skills",
    icon: (
      <FontAwesomeIcon
        icon={faFileCode}
        title="scroll to section: software"
        size="lg"
      />
    ),
  },
  {
    name: "projects",
    path: "#projects",
    icon: (
      <FontAwesomeIcon
        icon={faWindowMaximize}
        title="scroll to section: projects"
        size="lg"
      />
    ),
  },
  {
    name: "contact",
    path: "#contact",
    icon: (
      <FontAwesomeIcon
        icon={faComments}
        title="scroll to section: contact"
        size="lg"
      />
    ),
  },
];

// SOCIAL LINKS

export const socialLinks: SocialLinkType[] = [
  {
    icon: <FontAwesomeIcon icon={faGithub} title="github" size="4x" />,
    link: "https://github.com/pmmachadov",
    title: "github",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    icon: <FontAwesomeIcon icon={faLinkedin} title="linkedIn" size="4x" />,
    link: "https://www.linkedin.com/in/pmmachadov/?locale=en_US",
    title: "linkedIn",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];
// PROJECT CARDS

export const projectData: ProjectCardType[] = [
  {
    title: "TrelloBoard",
    image: "/assets/images/trelloboard.jpg",
    description: "Full-featured Kanban board with drag-and-drop cards and columns, multiple views (Board, Table, Calendar, Timeline), undo/redo history, auto-save to IndexedDB, zen mode, command palette, smart search, and keyboard shortcuts. Built with React 19, TypeScript, and Zustand; architected normalized immutable state with O(1) lookups and comprehensive test coverage.",
    links: [
      {
        name: "Code",
        path: "https://github.com/pmmachadov/TrelloBoard",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      },
    ],
  },
  {
    title: "File Tree Visualizer",
    image: "/assets/images/file-tree.jpg",
    description: "Developer tool that renders any directory structure as an interactive visual tree. Solves the need to quickly understand project layouts at a glance. Built with JavaScript DOM manipulation; designed and implemented the full parsing and rendering logic from scratch.",
    links: [
      {
        name: "Live Project",
        path: "https://my-folder-explorer.vercel.app/",
        icon: <FontAwesomeIcon icon={faUpRightFromSquare} />,
      },
      {
        name: "Code",
        path: "https://github.com/pmmachadov/my-folder-explorer",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      },
    ],
  },
  {
    title: "AnkiCards",
    image: "/assets/images/anki-cards.jpg",
    description: "Spaced-repetition flashcard app for vocational and university students. Features interactive 3D-flip cards, an adapted SM-2 algorithm, visual progress statistics with charts, and a full deck/card editor. Built with React and Vite; implemented flip logic, local-storage persistence, and responsive dark UI optimised for long study sessions.",
    links: [
      {
        name: "Live Project",
        path: "https://anki-cards-liart.vercel.app/",
        icon: <FontAwesomeIcon icon={faUpRightFromSquare} />,
      },
      {
        name: "Code",
        path: "https://github.com/pmmachadov/anki-cards",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      },
    ],
  },
  {
    title: "Super-Quiz",
    image: "/assets/images/questionsjpg.jpg",
    description: "Timed multiple-choice quiz app with score tracking and a results summary screen. Solves keeping users engaged with immediate feedback and a clear final score. Built with JavaScript; implemented question shuffling, countdown timer, and local-storage score persistence.",
    links: [
      {
        name: "Live Project",
        path: "https://my-s-q.vercel.app/",
        icon: <FontAwesomeIcon icon={faUpRightFromSquare} />,
      },
      {
        name: "Code",
        path: "https://github.com/pmmachadov/super_quiz",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
        style: { zIndex: 1000 },
      },
    ],
  },
  {
    title: "Super-Flashcards",
    image: "/assets/images/flashcardsimage.jpg",
    description: "Spaced-repetition flashcard app that lets users create, study, and score custom decks. Solves the need for a personalised study tool without relying on third-party services. Built with React and TypeScript; architected component state, deck CRUD operations, and the study-session scoring flow.",
    links: [
      {
        name: "Live Project",
        path: "https://super-flashcards-ebon.vercel.app/",
        icon: <FontAwesomeIcon icon={faUpRightFromSquare} />,
      },
      {
        name: "Code",
        path: "https://github.com/pmmachadov/super-flashcards",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
        style: { zIndex: 1000 },
      },
    ],
  },
  {
    title: "Pokémon Card Game",
    image: "/assets/images/Pokemon-Charizard-Wallpaper.png",
    description: "Browser-based memory card game that fetches live Pokémon data from the PokéAPI. Solves the challenge of building engaging stateful UIs without a framework. Built with JavaScript and async/await; implemented flip/match logic, score tracking, and API integration.",
    links: [
      {
        name: "Live Project",
        path: "https://pokemon-card-game-theta.vercel.app/",
        icon: <FontAwesomeIcon icon={faUpRightFromSquare} />,
      },
      {
        name: "Code",
        path: "https://github.com/pmmachadov/Pokemon-Card-Game",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
        style: { position: 'relative', zIndex: 10 },
      },
    ],
  },
];

// SKILL CARDS - Organized by category from CV

export const skillcard_Frontend: SkillItemType[] = [
  {
    text: "React",
    icon: <FontAwesomeIcon icon={faReact} size="2x" />,
    skillLevel: "",
  },
  {
    text: "Next.js",
    icon: <CustomIcon path="/icons/typescript-icon.png" size={40} />,
    skillLevel: "",
  },
  {
    text: "TypeScript",
    icon: <CustomIcon path="/icons/typescript-icon.png" size={40} />,
    skillLevel: "",
  },
  {
    text: "JavaScript",
    icon: <FontAwesomeIcon icon={faJs} size="2x" />,
    skillLevel: "",
  },
  {
    text: "HTML5",
    icon: <FontAwesomeIcon icon={faHtml5} size="2x" />,
    skillLevel: "",
  },
  {
    text: "CSS3",
    icon: <FontAwesomeIcon icon={faCss3} size="2x" />,
    skillLevel: "",
  },
  {
    text: "Tailwind CSS",
    icon: <FontAwesomeIcon icon={faPaintBrush} size="2x" />,
    skillLevel: "",
  },
  {
    text: "Vite",
    icon: <FontAwesomeIcon icon={faBolt} size="2x" />,
    skillLevel: "",
  },
];

export const skillcard_Backend: SkillItemType[] = [
  {
    text: "Node.js",
    icon: <FontAwesomeIcon icon={faNodeJs} size="2x" />,
    skillLevel: "",
  },
  {
    text: "Express",
    icon: <FontAwesomeIcon icon={faCodeBranch} size="2x" />,
    skillLevel: "",
  },
  {
    text: "MongoDB",
    icon: <FontAwesomeIcon icon={faDatabase} size="2x" />,
    skillLevel: "",
  },
  {
    text: "MySQL",
    icon: <FontAwesomeIcon icon={faDatabase} size="2x" />,
    skillLevel: "",
  },
  {
    text: "REST APIs",
    icon: <FontAwesomeIcon icon={faUpRightFromSquare} size="2x" />,
    skillLevel: "",
  },
];

export const skillcard_Tools: SkillItemType[] = [
  {
    text: "Git",
    icon: <FontAwesomeIcon icon={faGithub} size="2x" />,
    skillLevel: "",
  },
  {
    text: "GitHub",
    icon: <FontAwesomeIcon icon={faGithub} size="2x" />,
    skillLevel: "",
  },
  {
    text: "Jest",
    icon: <CustomIcon path="/icons/jest-icon.png" size={40} />,
    skillLevel: "",
  },
  {
    text: "Agile/Scrum",
    icon: <FontAwesomeIcon icon={faComments} size="2x" />,
    skillLevel: "",
  },
];
