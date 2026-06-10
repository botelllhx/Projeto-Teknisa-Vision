import { FRAME } from "./frame-tokens";
import { SvgDevice, type DeviceFrameProps } from "./parts";

/** Notebook: tampa (lid) com bezel fino + deck trapezoidal mais largo e entalhe. */
export function Laptop({ children, className, style }: DeviceFrameProps) {
  return (
    <SvgDevice
      viewBox={[1000, 612]}
      screen={{ x: 10.6, y: 3, w: 78.8, h: 82 }}
      screenClassName="rounded-[6px]"
      className={className}
      style={style}
      chassis={
        <>
          {/* deck / base */}
          <path
            d="M44 540 H956 L996 590 Q1004 602 992 602 H8 Q-4 602 4 590 Z"
            fill={FRAME.part}
            stroke={FRAME.stroke}
            strokeWidth={3}
          />
          <rect x={440} y={540} width={120} height={9} rx={4.5} fill={FRAME.dot} />
          {/* lid / tela */}
          <rect
            x={90}
            y={2}
            width={820}
            height={540}
            rx={22}
            fill={FRAME.fill}
            stroke={FRAME.stroke}
            strokeWidth={3}
          />
        </>
      }
    >
      {children}
    </SvgDevice>
  );
}
