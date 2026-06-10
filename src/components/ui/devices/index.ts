import type { ComponentType } from "react";
import type { DeviceKind } from "@/data/productShowcase";
import type { DeviceFrameProps } from "./parts";
import { BrowserWindow } from "./BrowserWindow";
import { DesktopMonitor } from "./DesktopMonitor";
import { Laptop } from "./Laptop";
import { TabletPortrait } from "./TabletPortrait";
import { TabletLandscape } from "./TabletLandscape";
import { Phone } from "./Phone";
import { POSTerminal } from "./POSTerminal";
import { Totem } from "./Totem";

export type { DeviceFrameProps } from "./parts";

/** Registro device → frame em código. Adicionar um device novo = uma linha aqui. */
export const DEVICE_FRAMES: Record<DeviceKind, ComponentType<DeviceFrameProps>> = {
  browser: BrowserWindow,
  desktop: DesktopMonitor,
  laptop: Laptop,
  "tablet-portrait": TabletPortrait,
  "tablet-landscape": TabletLandscape,
  phone: Phone,
  pos: POSTerminal,
  totem: Totem,
};
