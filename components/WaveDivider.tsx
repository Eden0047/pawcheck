interface WaveDividerProps {
  fill: string;
  bg: string;
  flip?: boolean;
}

export default function WaveDivider({ fill, bg, flip }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "56px", background: bg }}
      className={flip ? "-mt-px" : "-mb-px"}
    >
      <path fill={fill} d="M0,32 C240,8 480,56 720,32 C960,8 1200,56 1440,32 L1440,60 L0,60 Z" />
    </svg>
  );
}
