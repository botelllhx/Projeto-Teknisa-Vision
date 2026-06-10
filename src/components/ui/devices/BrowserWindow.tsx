import { FRAME } from "./frame-tokens";
import { SvgDevice, type DeviceFrameProps } from "./parts";

/** Janela de navegador (web app): chrome claro com 3 pontinhos + barra de URL. */
export function BrowserWindow({ children, className, style }: DeviceFrameProps) {
  return (
    <SvgDevice
      viewBox={[1000, 640]}
      screen={{ x: 1.4, y: 8.6, w: 97.2, h: 89 }}
      screenClassName="rounded-b-[10px]"
      className={className}
      style={style}
      chassis={
        <>
          <rect
            x={2}
            y={2}
            width={996}
            height={636}
            rx={20}
            fill={FRAME.fill}
            stroke={FRAME.stroke}
            strokeWidth={3}
          />
          <circle cx={34} cy={28} r={7} fill={FRAME.dot} />
          <circle cx={60} cy={28} r={7} fill={FRAME.dot} />
          <circle cx={86} cy={28} r={7} fill={FRAME.dot} />
          <rect x={150} y={16} width={780} height={24} rx={12} fill={FRAME.part} />
        </>
      }
    >
      {children}
    </SvgDevice>
  );
}
