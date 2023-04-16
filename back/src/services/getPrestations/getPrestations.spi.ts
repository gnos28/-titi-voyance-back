import { sheetAPI } from "gnos";

export type ImportSheetPort = (arg: ImportSheetProps) => Promise<
  {
    [key: string]: string;
  }[]
>;

type ImportSheetProps = {
  sheetId: string;
  tabName: string;
};

export const importSheetAdapter: ImportSheetPort = async ({
  sheetId,
  tabName,
}: ImportSheetProps) => await sheetAPI.getTabData({ sheetId, tabName });

// await importSheet(sheetId);
