import { FRAME } from "./frame-tokens";
import { SvgDevice, type DeviceFrameProps } from "./parts";

/** Totem de autoatendimento (TAA): quiosque vertical alto + gabinete. */
export function Totem({ children, className, style }: DeviceFrameProps) {
  return (
    <SvgDevice
      viewBox={[460, 900]}
      screen={{ x: 5.2, y: 3.3, w: 89.6, h: 75.5 }}
      screenClassName="rounded-[12px]"
      className={className}
      style={style}
      chassis={
        <>
          <rect
            x={3}
            y={3}
            width={454}
            height={894}
            rx={30}
            fill={FRAME.fill}
            stroke={FRAME.stroke}
            strokeWidth={3}
          />
          {/* alto-falante do gabinete */}
          <rect x={200} y={812} width={60} height={10} rx={5} fill={FRAME.dot} />
        </>
      }
    >
      {children}
    </SvgDevice>
  );
}
