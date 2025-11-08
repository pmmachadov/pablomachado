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

// THEMES

export const lightTheme = {
  color: "#293241",
  backgroundColor: "#f0efeb",
};
export const darkTheme = {
  color: "#6EDB93",
  backgroundColor: "#0b132b",
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
    icon: <FontAwesomeIcon icon={faGithub} title="github" size="2x" />,
    link: "https://github.com/pmmachadov",
    title: "github",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    icon: <FontAwesomeIcon icon={faLinkedin} title="linkedIn" size="2x" />,
    link: "https://www.linkedin.com/in/pmmachadov/?locale=en_US",
    title: "linkedIn",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];
// PROJECT CARDS

export const projectData: ProjectCardType[] = [
  {
    title: "File Tree Visualizer",
    image: "/assets/images/file-tree.jpg",
    links: [
      {
        name: "Live Project",
        path: "https://shimmering-griffin-6b06b7.netlify.app/",
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
    title: "Pokeom Card Game",
    image: "/assets/images/Pokemon-Charizard-Wallpaper.png",
    links: [
      {
        name: "Live Project",
        path: "https://statuesque-capybara-b6c91d.netlify.app/",
        icon: <FontAwesomeIcon icon={faUpRightFromSquare} />,
      },
      {
        name: "Code",
        path: "https://github.com/pmmachadov/Pokemon-Card-Game",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      },
    ],
  },
  {
    title: "Pokedex",
    image: "/assets/images/pokemon-go.png",
    links: [
      {
        name: "Live Project",
        path: "https://keen-kataifi-559ed9.netlify.app/",
        icon: <FontAwesomeIcon icon={faUpRightFromSquare} />,
      },
      {
        name: "Code",
        path: "https://github.com/pmmachadov/Javascript-Pokedex",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      },
    ],
  },
  {
    title: "Tic Tac Toe",
    image: "/assets/images/tic-tac-toe.webp",
    links: [
      {
        name: "Live Project",
        path: "https://my-version-tic-tac-toe.netlify.app/",
        icon: <FontAwesomeIcon icon={faUpRightFromSquare} />,
      },
      {
        name: "Code",
        path: "https://github.com/pmmachadov/super_quiz",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      },
    ],
  },
  {
    title: "Connect four",
    image: "/assets/images/connect-four.webp",
    links: [
      {
        name: "Live Project",
        path: "https://my-last-connect-four.netlify.app/",
        icon: <FontAwesomeIcon icon={faUpRightFromSquare} />,
      },
      {
        name: "Code",
        path: "https://github.com/pmmachadov/my-connect-four",
        icon: <FontAwesomeIcon icon={faCodeBranch} />,
      },
    ],
  },
  {
    title: "Super-Flashcards",
    image: "/assets/images/flashcardsimage.jpg",
    links: [
      {
        name: "Live Project",
        path: "https://super-flashcards.netlify.app/",
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
    title: "Super-quiz",
    image: "/assets/images/questionsjpg.jpg",
    links: [
      {
        name: "Live Project",
        path: "https://pmmachadov.github.io/super_quiz/",
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
];

// SKILL CARDS

export const skillcard_Styles: SkillItemType[] = [
  {
    text: "JavaScript",
    icon: <FontAwesomeIcon icon={faJs} size="2x" />,
    skillLevel: "80%",
  },
  {
    text: "TypeScript",
    icon: <CustomIcon path="/icons/typescript-icon.png" size={40} />,
    skillLevel: "60%",
  },
  {
    text: "React",
    icon: <FontAwesomeIcon icon={faReact} size="2x" />,
    skillLevel: "70%",
  },
];
export const skillcard_Languages: SkillItemType[] = [
  {
    text: "HTML5",
    icon: <FontAwesomeIcon icon={faHtml5} size="2x" />,
    skillLevel: "100%",
  },
  {
    text: "CSS",
    icon: <FontAwesomeIcon icon={faCss3} size="2x" />,
    skillLevel: "90%",
  },
  {
    text: "Tailwind CSS",
    icon: <FontAwesomeIcon icon={faPaintBrush} size="2x" />,
    skillLevel: "85%",
  },
  {
    text: "GIT",
    icon: <FontAwesomeIcon icon={faGithub} size="2x" />,
    skillLevel: "90%",
  },
];
export const skillcard_Frameworks: SkillItemType[] = [
  {
    text: "Node.js",
    icon: <FontAwesomeIcon icon={faNodeJs} size="2x" />,
    skillLevel: "70%",
  },
  {
    text: "Vite",
    icon: <FontAwesomeIcon icon={faBolt} size="2x" />,
    skillLevel: "75%",
  },
  {
    text: "SQL",
    icon: <FontAwesomeIcon icon={faDatabase} size="2x" />,
    skillLevel: "60%",
  },
  {
    text: "MongoDB",
    icon: <FontAwesomeIcon icon={faDatabase} size="2x" />,
    skillLevel: "65%",
  },
  {
    text: "Jest",
    icon: <CustomIcon path="/icons/jest-icon.png" size={40} />,
    skillLevel: "50%",
  },
];
