import { FRAME } from "./frame-tokens";
import { SvgDevice, type DeviceFrameProps } from "./parts";

/** Tablet em retrato: bezel uniforme, cantos arredondados na medida, câmera frontal. */
export function TabletPortrait({ children, className, style }: DeviceFrameProps) {
  return (
    <SvgDevice
      viewBox={[720, 980]}
      screen={{ x: 4.7, y: 3.5, w: 90.6, h: 93 }}
      screenClassName="rounded-[16px]"
      className={className}
      style={style}
      chassis={
        <>
          <rect
            x={3}
            y={3}
            width={714}
            height={974}
            rx={58}
            fill={FRAME.fill}
            stroke={FRAME.stroke}
            strokeWidth={3}
          />
          <circle cx={360} cy={32} r={5} fill={FRAME.dot} />
        </>
      }
    >
      {children}
    </SvgDevice>
  );
}
