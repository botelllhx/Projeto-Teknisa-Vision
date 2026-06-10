import { FRAME } from "./frame-tokens";
import { SvgDevice, type DeviceFrameProps } from "./parts";

/**
 * Display de mesa (painel limpo, sem haste): a tela ÂNCORA grande, pensada para
 * sangrar a 100% da direita da seção. Bezel fino e uniforme, cantos sutis.
 */
export function DesktopMonitor({ children, className, style }: DeviceFrameProps) {
  return (
    <SvgDevice
      viewBox={[1000, 642]}
      screen={{ x: 1.6, y: 2.5, w: 96.8, h: 95 }}
      screenClassName="rounded-[10px]"
      className={className}
      style={style}
      chassis={
        <>
          <rect
            x={2}
            y={2}
            width={996}
            height={638}
            rx={26}
            fill={FRAME.fill}
            stroke={FRAME.stroke}
            strokeWidth={3}
          />
          <circle cx={500} cy={20} r={4} fill={FRAME.dot} />
        </>
      }
    >
      {children}
    </SvgDevice>
  );
}
