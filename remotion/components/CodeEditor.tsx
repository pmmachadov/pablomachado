import { useCurrentFrame, interpolate, spring } from 'remotion';
import { codeTheme } from '../styles/code-theme';

interface CodeEditorProps {
  children: React.ReactNode;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ children }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 80,
      mass: 1,
    },
    from: 0.9,
    to: 1,
    durationInFrames: 30,
  });

  return (
    <div
      style={{
        width: 1300,
        backgroundColor: codeTheme.background,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 44,
          backgroundColor: 'rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 8,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <span
          style={{
            marginLeft: 16,
            fontSize: 14,
            color: codeTheme.comment,
            fontFamily: "'Ubuntu', sans-serif",
          }}
        >
          PortfolioShowreel.tsx
        </span>
      </div>

      {/* Code Area */}
      <div style={{ padding: '32px 40px' }}>{children}</div>
    </div>
  );
};
