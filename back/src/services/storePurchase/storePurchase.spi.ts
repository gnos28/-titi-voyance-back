import { exportToAgenda } from "../../utils/exportToAgenda";
import { Data, exportToSheet } from "../../utils/exportToSheet";

type ExportToSheetPort = (
  datas: Data[],
  sheetId: string
) => Promise<number | undefined>;

export const exportToSheetAdapter: ExportToSheetPort = async (datas, sheetId) =>
  await exportToSheet(datas, sheetId);

type ExportToAgendaProps = {
  start: string;
  end: string;
};

type ExportToAgendaPort = (arg: ExportToAgendaProps) => Promise<void>;

export const exportToAgendaAdapter: ExportToAgendaPort = async ({
  start,
  end,
}) => await exportToAgenda({ start, end });
