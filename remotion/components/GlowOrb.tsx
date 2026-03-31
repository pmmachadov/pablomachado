import { useCurrentFrame, interpolate } from 'remotion';

interface GlowOrbProps {
  color: string;
  size: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration?: number;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({
  color,
  size,
  startX,
  startY,
  endX,
  endY,
  duration = 450,
}) => {
  const frame = useCurrentFrame();

  const x = interpolate(frame, [0, duration], [startX, endX], {
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [0, duration], [startY, endY], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        opacity: 0.4,
        pointerEvents: 'none',
      }}
    />
  );
};
