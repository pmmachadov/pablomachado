import React from "react";
import SectionCard from "@components/SectionCard";
import SkillCard from "@components/SkillCard";
import styles from "@styles/Skills.module.sass";
import {
  skillcard_Languages,
  skillcard_Styles,
  skillcard_Frameworks,
} from "@sections/Me";
import BgTitle from "@components/BgTitle";

const Skills = () => {
  // Combinar todas las skills en un solo array para cuadrícula 3x4
  const allSkills = [
    ...skillcard_Languages,
    ...skillcard_Styles,
    ...skillcard_Frameworks,
  ];

  return (
    <SectionCard id="skills" title="TOOLS" page="SKILLS">
      <>
        <BgTitle title="TOOLS" />
        <div className={styles.skillCardWrapper}>
          <SkillCard items={allSkills} itemHeight={85} />
        </div>
      </>
    </SectionCard>
  );
};

export default Skills;
