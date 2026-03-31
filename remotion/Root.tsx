import { Composition } from 'remotion';
import { Showreel } from './compositions/Showreel';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Showreel"
        component={Showreel}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
