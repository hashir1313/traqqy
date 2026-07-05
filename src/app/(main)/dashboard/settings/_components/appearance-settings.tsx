"use client";

import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type FontKey, fontOptions } from "@/lib/fonts/registry";
import type { ContentLayout, NavbarStyle, SidebarCollapsible, SidebarVariant } from "@/lib/preferences/layout";
import { THEME_PRESET_OPTIONS, type ThemeMode, type ThemePreset } from "@/lib/preferences/theme";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

export function AppearanceSettings() {
  const { values, resolvedThemeMode, setPreference, resetPreferences } = usePreferencesStore(
    useShallow((state) => ({
      values: state.values,
      resolvedThemeMode: state.resolvedThemeMode,
      setPreference: state.setPreference,
      resetPreferences: state.resetPreferences,
    })),
  );

  const {
    theme_mode: themeMode,
    theme_preset: themePreset,
    content_layout: contentLayout,
    navbar_style: navbarStyle,
    sidebar_variant: variant,
    sidebar_collapsible: collapsible,
    font,
  } = values;

  const onThemePresetChange = (preset: ThemePreset) => {
    setPreference("theme_preset", preset);
  };

  const onThemeModeChange = (mode: ThemeMode | "") => {
    if (!mode) return;
    setPreference("theme_mode", mode);
  };

  const onContentLayoutChange = (layout: ContentLayout | "") => {
    if (!layout) return;
    setPreference("content_layout", layout);
  };

  const onNavbarStyleChange = (style: NavbarStyle | "") => {
    if (!style) return;
    setPreference("navbar_style", style);
  };

  const onSidebarStyleChange = (value: SidebarVariant | "") => {
    if (!value) return;
    setPreference("sidebar_variant", value);
  };

  const onSidebarCollapseModeChange = (value: SidebarCollapsible | "") => {
    if (!value) return;
    setPreference("sidebar_collapsible", value);
  };

  const onFontChange = (value: FontKey | "") => {
    if (!value) return;
    setPreference("font", value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-0.5">
          <Label className="font-medium text-sm">Theme Preset</Label>
          <p className="text-muted-foreground text-xs">Choose a color preset for your dashboard.</p>
        </div>
        <Select value={themePreset} onValueChange={onThemePresetChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {THEME_PRESET_OPTIONS.map((preset) => (
                <SelectItem key={preset.value} value={preset.value}>
                  <span
                    className="size-2.5 rounded-full"
                    style={{
                      backgroundColor: resolvedThemeMode === "dark" ? preset.primary.dark : preset.primary.light,
                    }}
                  />
                  {preset.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-0.5">
          <Label className="font-medium text-sm">Font</Label>
          <p className="text-muted-foreground text-xs">Select the font family for the dashboard.</p>
        </div>
        <Select value={font} onValueChange={onFontChange}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {fontOptions.map((f) => (
                <SelectItem key={f.key} value={f.key}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-0.5">
          <Label className="font-medium text-sm">Theme Mode</Label>
          <p className="text-muted-foreground text-xs">Switch between light, dark, or system theme.</p>
        </div>
        <ToggleGroup spacing={0} variant="outline" type="single" value={themeMode} onValueChange={onThemeModeChange}>
          <ToggleGroupItem value="light" aria-label="Toggle light">
            Light
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Toggle dark">
            Dark
          </ToggleGroupItem>
          <ToggleGroupItem value="system" aria-label="Toggle system">
            System
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator />

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-0.5">
          <Label className="font-medium text-sm">Page Layout</Label>
          <p className="text-muted-foreground text-xs">Choose how page content is positioned.</p>
        </div>
        <ToggleGroup
          spacing={0}
          variant="outline"
          type="single"
          value={contentLayout}
          onValueChange={onContentLayoutChange}
        >
          <ToggleGroupItem value="centered" aria-label="Toggle centered">
            Centered
          </ToggleGroupItem>
          <ToggleGroupItem value="full-width" aria-label="Toggle full-width">
            Full Width
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator />

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-0.5">
          <Label className="font-medium text-sm">Navbar Behavior</Label>
          <p className="text-muted-foreground text-xs">Control how the top navbar behaves on scroll.</p>
        </div>
        <ToggleGroup
          spacing={0}
          variant="outline"
          type="single"
          value={navbarStyle}
          onValueChange={onNavbarStyleChange}
        >
          <ToggleGroupItem value="sticky" aria-label="Toggle sticky">
            Sticky
          </ToggleGroupItem>
          <ToggleGroupItem value="scroll" aria-label="Toggle scroll">
            Scroll
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator />

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-0.5">
          <Label className="font-medium text-sm">Sidebar Style</Label>
          <p className="text-muted-foreground text-xs">Choose the visual style of the sidebar.</p>
        </div>
        <ToggleGroup spacing={0} variant="outline" type="single" value={variant} onValueChange={onSidebarStyleChange}>
          <ToggleGroupItem value="inset" aria-label="Toggle inset">
            Inset
          </ToggleGroupItem>
          <ToggleGroupItem value="sidebar" aria-label="Toggle sidebar">
            Sidebar
          </ToggleGroupItem>
          <ToggleGroupItem value="floating" aria-label="Toggle floating">
            Floating
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator />

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="space-y-0.5">
          <Label className="font-medium text-sm">Sidebar Collapse Mode</Label>
          <p className="text-muted-foreground text-xs">Choose how the sidebar collapses on smaller screens.</p>
        </div>
        <ToggleGroup
          spacing={0}
          variant="outline"
          type="single"
          value={collapsible}
          onValueChange={onSidebarCollapseModeChange}
        >
          <ToggleGroupItem value="icon" aria-label="Toggle icon">
            Icon
          </ToggleGroupItem>
          <ToggleGroupItem value="offcanvas" aria-label="Toggle offcanvas">
            OffCanvas
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator />

      <Button type="button" size="sm" variant="outline" className="w-full md:w-auto" onClick={resetPreferences}>
        Restore Defaults
      </Button>
    </div>
  );
}
