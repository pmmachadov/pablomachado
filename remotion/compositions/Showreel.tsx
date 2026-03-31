import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { CodeEditor } from '../components/CodeEditor';
import { Typewriter } from '../components/Typewriter';
import { codeTheme } from '../styles/code-theme';

const codeTokens = [
  { text: 'interface ', color: codeTheme.keyword },
  { text: 'Skill ', color: codeTheme.type },
  { text: '{\n  ', color: codeTheme.punctuation },
  { text: 'name', color: codeTheme.foreground },
  { text: ': ', color: codeTheme.punctuation },
  { text: 'string', color: codeTheme.type },
  { text: ';\n  ', color: codeTheme.punctuation },
  { text: 'level', color: codeTheme.foreground },
  { text: ': ', color: codeTheme.punctuation },
  { text: 'number', color: codeTheme.type },
  { text: ';\n}\n\n', color: codeTheme.punctuation },
  { text: 'const ', color: codeTheme.keyword },
  { text: 'SkillBadge ', color: codeTheme.function },
  { text: '= ({ ', color: codeTheme.punctuation },
  { text: 'name ', color: codeTheme.foreground },
  { text: '}: Skill) => {\n  ', color: codeTheme.punctuation },
  { text: 'return ', color: codeTheme.keyword },
  { text: '(\n    ', color: codeTheme.punctuation },
  { text: '<span ', color: codeTheme.keyword },
  { text: 'className', color: codeTheme.foreground },
  { text: '=\"', color: codeTheme.punctuation },
  { text: 'badge', color: codeTheme.string },
  { text: '\">\n      ', color: codeTheme.punctuation },
  { text: '{name}', color: codeTheme.foreground },
  { text: '\n    ', color: codeTheme.punctuation },
  { text: '</span>\n  ', color: codeTheme.keyword },
  { text: ');\n}', color: codeTheme.punctuation },
];

export const Showreel: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [330, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = spring({
    frame: frame - 330,
    fps: 30,
    config: { damping: 12, stiffness: 60 },
    from: 30,
    to: 0,
  });

  const subtitleOpacity = interpolate(frame, [360, 390], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#264da7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Exact same ambient glows as the website globals.css */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 1000px 700px at 80% -10%, rgba(99, 102, 241, 0.10), transparent 70%), radial-gradient(ellipse 800px 600px at 5% 100%, rgba(139, 92, 246, 0.07), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Code Editor */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <CodeEditor>
          <Typewriter
            tokens={codeTokens}
            startFrame={60}
            endFrame={320}
            lineHeight={72}
            fontSize={44}
          />
        </CodeEditor>
      </div>

      {/* Branding Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 20,
        }}
      >
        <h1
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 96,
            color: '#e0e7ff',
            margin: 0,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textShadow: '0 4px 40px rgba(99, 102, 241, 0.35)',
            letterSpacing: '-0.02em',
          }}
        >
          PABLO MACHADO
        </h1>
        <p
          style={{
            fontFamily: "'Ubuntu', sans-serif",
            fontSize: 40,
            color: '#94a3b8',
            margin: '16px 0 0',
            opacity: subtitleOpacity,
          }}
        >
          Full Stack Web Developer
        </p>
      </div>
    </AbsoluteFill>
  );
};
