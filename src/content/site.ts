import type { Locale } from "@/lib/i18n";
import type { SiteContent } from "./types";
import { en } from "./en";
import { ar } from "./ar";

export const content: Record<Locale, SiteContent> = { en, ar };
