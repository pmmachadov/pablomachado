import { useCurrentFrame, interpolate } from 'remotion';
import { codeTheme } from '../styles/code-theme';

interface Token {
  text: string;
  color: string;
}

interface TypewriterProps {
  tokens: Token[];
  startFrame: number;
  endFrame: number;
  lineHeight?: number;
  fontSize?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  tokens,
  startFrame,
  endFrame,
  lineHeight = 48,
  fontSize = 28,
}) => {
  const frame = useCurrentFrame();

  const totalChars = tokens.reduce((acc, token) => acc + token.text.length, 0);
  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, totalChars],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const charsToShow = Math.floor(progress);
  let remaining = charsToShow;

  const visibleTokens: { text: string; color: string }[] = [];

  for (const token of tokens) {
    if (remaining <= 0) break;
    if (remaining >= token.text.length) {
      visibleTokens.push(token);
      remaining -= token.text.length;
    } else {
      visibleTokens.push({
        text: token.text.slice(0, remaining),
        color: token.color,
      });
      remaining = 0;
    }
  }

  const lines: { text: string; color: string }[][] = [[]];
  for (const token of visibleTokens) {
    const parts = token.text.split('\n');
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) lines.push([]);
      if (parts[i]) {
        lines[lines.length - 1].push({ text: parts[i], color: token.color });
      }
    }
  }

  const showCursor =
    frame >= startFrame &&
    frame < endFrame + 15 &&
    Math.floor(frame / 8) % 2 === 0;

  return (
    <div
      style={{
        fontFamily: "'Ubuntu Mono', 'Fira Code', 'Consolas', monospace",
        fontSize,
        lineHeight: `${lineHeight}px`,
        color: codeTheme.foreground,
        whiteSpace: 'pre',
      }}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} style={{ display: 'flex' }}>
          {line.map((part, partIndex) => (
            <span key={partIndex} style={{ color: part.color }}>
              {part.text}
            </span>
          ))}
          {lineIndex === lines.length - 1 && showCursor && (
            <span
              style={{
                display: 'inline-block',
                width: '0.6em',
                height: '1.1em',
                backgroundColor: codeTheme.foreground,
                marginLeft: 2,
                verticalAlign: 'text-bottom',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
