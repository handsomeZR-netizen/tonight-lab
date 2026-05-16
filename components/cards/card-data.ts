import type { AiFeedCardBase, ChipOption } from "@/components/cards/AiCardShell";

export function textField<TItem extends AiFeedCardBase>(
  item: TItem,
  keys: string[],
  fallback = "",
) {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
    if (typeof value === "number") {
      return String(value);
    }
  }

  return fallback;
}

export function stringListField<TItem extends AiFeedCardBase>(
  item: TItem,
  keys: string[],
) {
  for (const key of keys) {
    const value = item[key];
    if (Array.isArray(value) && value.every((entry) => typeof entry === "string")) {
      return value;
    }
  }

  return [];
}

export function chipsOrFallback<TItem extends AiFeedCardBase>(
  item: TItem,
  fallback: ChipOption[],
) {
  return item.chips && item.chips.length > 0 ? item.chips : fallback;
}
