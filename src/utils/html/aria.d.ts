export type AriaBoolean = "true" | "false";
export type AriaCurrent = "page" | "step" | "location" | "date" | "time" | "true" | "false";

export interface AriaProps {
  "aria-hidden"?: AriaBoolean;
  "aria-current"?: AriaCurrent;
  "aria-selected"?: AriaBoolean;
  "aria-label"?: string;
  "aria-labelledby"?: string[];
  "aria-describedby"?: string[];
  "aria-live"?: "off" | "polite" | "assertive";
  "aria-busy"?: AriaBoolean;
  "aria-atomic"?: AriaBoolean;
  "aria-relevant"?: "additions" | "removals" | "text" | "all";
  role?: string;
}
