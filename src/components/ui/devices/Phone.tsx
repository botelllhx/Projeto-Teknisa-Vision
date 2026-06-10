import { FRAME } from "./frame-tokens";
import { SvgDevice, type DeviceFrameProps } from "./parts";

/** Smartphone em retrato: cantos proporcionais (não exagerados) + pílula superior. */
export function Phone({ children, className, style }: DeviceFrameProps) {
  return (
    <SvgDevice
      viewBox={[440, 900]}
      screen={{ x: 3.4, y: 1.8, w: 93.2, h: 96.4 }}
      screenClassName="rounded-[26px]"
      className={className}
      style={style}
      chassis={
        <>
          <rect
            x={3}
            y={3}
            width={434}
            height={894}
            rx={74}
            fill={FRAME.fill}
            stroke={FRAME.stroke}
            strokeWidth={3}
          />
          <rect x={170} y={20} width={100} height={13} rx={6.5} fill={FRAME.dot} />
        </>
      }
    >
      {children}
    </SvgDevice>
  );
}
