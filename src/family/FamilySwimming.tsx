import {
  AbsoluteFill,
  Composition,
  Sequence,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
  staticFile,
} from "remotion";
import { Audio, Video } from "@remotion/media";

const Frame = ({
  wide,
  children,
}: {
  wide: boolean;
  children: React.ReactNode;
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: "#07394a",
        opacity: interpolate(frame, [0, 10], [0, 1], {
          extrapolateRight: "clamp",
        }),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
export const FamilySwimming = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#07394a" }}>
      <Audio
        name="Естественный звук — финальный микс"
        src={staticFile("projects/Family-Swimming/natural.wav")}
        premountFor={fps}
      />
      <Sequence
        name="Подмигивание — целиком"
        from={0 * fps}
        durationInFrames={6 * fps}
        premountFor={fps}
      >
        <Frame wide={false}>
          <Video
            objectFit="cover"
            name="Подмигивание — целиком"
            src={staticFile("projects/Family-Swimming/18363149322960.mp4")}
            trimBefore={9.5 * fps}
            premountFor={fps}
            muted
            style={{
              width: "100%",
              height: "100%",
              filter: "saturate(0.92) contrast(1.02) brightness(1.01)",
            }}
          />
        </Frame>
      </Sequence>
      <Sequence
        name="Первые движения"
        from={6 * fps}
        durationInFrames={6 * fps}
        premountFor={fps}
      >
        <Frame wide={false}>
          <Video
            objectFit="cover"
            name="Первые движения"
            src={staticFile("projects/Family-Swimming/18363151551184.mp4")}
            trimBefore={2.5 * fps}
            premountFor={fps}
            muted
            style={{
              width: "100%",
              height: "100%",
              filter: "saturate(0.92) contrast(1.02) brightness(1.01)",
            }}
          />
        </Frame>
      </Sequence>
      <Sequence
        name="Игра с тренером"
        from={12 * fps}
        durationInFrames={5 * fps}
        premountFor={fps}
      >
        <Frame wide={true}>
          <Video
            objectFit="cover"
            name="Мягкий фон"
            src={staticFile("projects/Family-Swimming/18363154500304.mp4")}
            trimBefore={19 * fps}
            muted
            premountFor={fps}
            style={{
              width: "100%",
              height: "100%",
              filter: "blur(32px) brightness(0.72) saturate(0.85)",
              scale: "1.08",
            }}
          />
          <Video
            objectFit="cover"
            name="Игра с тренером"
            src={staticFile("projects/Family-Swimming/18363154500304.mp4")}
            trimBefore={19 * fps}
            premountFor={fps}
            muted
            style={{
              position: "absolute",
              left: 0,
              top: 430,
              width: "100%",
              height: 1060,
              filter: "saturate(0.92) contrast(1.02) brightness(1.01)",
            }}
          />
        </Frame>
      </Sequence>
      <Sequence
        name="Погружение — подготовка и возвращение"
        from={17 * fps}
        durationInFrames={8.5 * fps}
        premountFor={fps}
      >
        <Frame wide={true}>
          <Video
            objectFit="cover"
            name="Мягкий фон"
            src={staticFile("projects/Family-Swimming/18363149847248.mp4")}
            trimBefore={17 * fps}
            muted
            premountFor={fps}
            style={{
              width: "100%",
              height: "100%",
              filter: "blur(32px) brightness(0.72) saturate(0.85)",
              scale: "1.08",
            }}
          />
          <Video
            objectFit="cover"
            name="Погружение — подготовка и возвращение"
            src={staticFile("projects/Family-Swimming/18363149847248.mp4")}
            trimBefore={17 * fps}
            premountFor={fps}
            muted
            style={{
              position: "absolute",
              left: 0,
              top: 430,
              width: "100%",
              height: 1060,
              filter: "saturate(0.92) contrast(1.02) brightness(1.01)",
            }}
          />
        </Frame>
      </Sequence>
      <Sequence
        name="Тёплый финал"
        from={25.5 * fps}
        durationInFrames={7 * fps}
        premountFor={fps}
      >
        <Frame wide={true}>
          <Video
            objectFit="cover"
            name="Мягкий фон"
            src={staticFile("projects/Family-Swimming/18363154500304.mp4")}
            trimBefore={31 * fps}
            muted
            premountFor={fps}
            style={{
              width: "100%",
              height: "100%",
              filter: "blur(32px) brightness(0.72) saturate(0.85)",
              scale: "1.08",
            }}
          />
          <Video
            objectFit="cover"
            name="Тёплый финал"
            src={staticFile("projects/Family-Swimming/18363154500304.mp4")}
            trimBefore={31 * fps}
            premountFor={fps}
            muted
            style={{
              position: "absolute",
              left: 0,
              top: 430,
              width: "100%",
              height: 1060,
              filter: "saturate(0.92) contrast(1.02) brightness(1.01)",
            }}
          />
        </Frame>
      </Sequence>
      <AbsoluteFill
        style={{
          backgroundColor: "#07394a",
          pointerEvents: "none",
          opacity: interpolate(frame, [945.0, 974.0], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
export const FamilyCompositions = () => (
  <Composition
    id="Family-Swimming"
    component={FamilySwimming}
    durationInFrames={975}
    fps={30}
    width={1080}
    height={1920}
  />
);
