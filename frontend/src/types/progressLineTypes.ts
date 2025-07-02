export interface VisualPart {
  percentage: string; // Contoh: "40%"
  color: string;
}

export interface ProgressLineProps {
  backgroundColor?: string;
  visualParts?: VisualPart[];
}
