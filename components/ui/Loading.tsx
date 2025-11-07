/**
 * ローディングコンポーネント
 */

import { CircularProgress } from "@mui/material";

interface LoadingProps {
  size?: number;
  className?: string;
}

export default function Loading({ size = 20, className = "" }: LoadingProps) {
  return <CircularProgress size={size} className={className} />;
}
