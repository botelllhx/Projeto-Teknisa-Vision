import { FRAME } from "./frame-tokens";
import { SvgDevice, type DeviceFrameProps } from "./parts";

/** Tablet em paisagem: bezel uniforme, cantos arredondados na medida. */
export function TabletLandscape({ children, className, style }: DeviceFrameProps) {
  return (
    <SvgDevice
      viewBox={[980, 720]}
      screen={{ x: 3.5, y: 4.7, w: 93, h: 90.6 }}
      screenClassName="rounded-[16px]"
      className={className}
      style={style}
      chassis={
        <>
          <rect
            x={3}
            y={3}
            width={974}
            height={714}
            rx={52}
            fill={FRAME.fill}
            stroke={FRAME.stroke}
            strokeWidth={3}
          />
          <circle cx={34} cy={360} r={5} fill={FRAME.dot} />
        </>
      }
    >
      {children}
    </SvgDevice>
  );
}
