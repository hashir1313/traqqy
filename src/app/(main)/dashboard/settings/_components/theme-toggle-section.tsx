"use client";

import { useShallow } from "zustand/react/shallow";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

export function ThemeToggleSection() {
  const { themeMode, setPreference } = usePreferencesStore(
    useShallow((state) => ({
      themeMode: state.values.theme_mode,
      setPreference: state.setPreference,
    })),
  );

  return (
    <div className="flex items-center justify-between">
      <div>
        <Label className="font-medium text-sm">Theme</Label>
        <p className="text-muted-foreground text-xs">Select your preferred theme.</p>
      </div>
      <Select
        value={themeMode}
        onValueChange={(value) => setPreference("theme_mode", value as "light" | "dark" | "system")}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
