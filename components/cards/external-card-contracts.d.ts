declare module "@/lib/card-transforms" {
  export function transformCard<TItem>(
    item: TItem,
    payload: {
      action: "chip";
      value: string;
      chipId: string;
      label: string;
      cardType?: string;
    },
  ): Promise<TItem> | TItem;
}
