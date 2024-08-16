import { sheetAPI } from "gnos";
import { TabDataItem } from "gnos/lib/interfaces";

export type ImportSheetPort = (arg: ImportSheetProps) => Promise<TabDataItem[]>;

type ImportSheetProps = {
  sheetId: string;
  tabName: string;
};

export const importSheetAdapter: ImportSheetPort = async ({
  sheetId,
  tabName,
}: ImportSheetProps) => await sheetAPI.getTabData({ sheetId, tabName });
