import { AlertTriangle } from "lucide-react";

interface LocalStorageWarningProps {
  className?: string;
}

/**
 * Warning banner about localStorage limitations
 * Use on any page that stores user data in localStorage
 */
export function LocalStorageWarning({ className = "" }: LocalStorageWarningProps) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 ${className}`}>
      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="text-sm">
        <p className="font-semibold mb-1">Your data is saved locally in this browser</p>
        <p className="text-amber-700">
          To avoid losing your work, don't clear your browser data or use a different browser/device. 
          Use the Print option to save a permanent copy of your reflections.
        </p>
      </div>
    </div>
  );
}