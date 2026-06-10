import { FRAME } from "./frame-tokens";
import { SvgDevice, type DeviceFrameProps } from "./parts";

/** Terminal de PDV: monitor touch quase retrato sobre haste e base. */
export function POSTerminal({ children, className, style }: DeviceFrameProps) {
  return (
    <SvgDevice
      viewBox={[620, 770]}
      screen={{ x: 2.4, y: 1.9, w: 95.2, h: 78 }}
      screenClassName="rounded-[12px]"
      className={className}
      style={style}
      chassis={
        <>
          {/* haste + base */}
          <rect x={282} y={612} width={56} height={86} fill={FRAME.part} />
          <rect x={196} y={692} width={228} height={24} rx={12} fill={FRAME.dot} />
          {/* monitor */}
          <rect
            x={3}
            y={3}
            width={614}
            height={624}
            rx={26}
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
