import { sheetAPI } from "gnos";
import { DataRowWithId } from "gnos/lib/interfaces";
import { exportToAgenda } from "../../utils/exportToAgenda";

type ExportToSheetProps = {
  data: DataRowWithId[];
  sheetId: string;
  tabName: string;
};

type ExportToSheetPort = (arg: ExportToSheetProps) => Promise<void>;

export const exportToSheetAdapter: ExportToSheetPort = async ({
  sheetId,
  tabName,
  data,
}) => await sheetAPI.appendToSheet({ sheetId, tabName, data });
// await exportToSheet(datas, sheetId);

type ExportToAgendaProps = {
  start: string;
  end: string;
};

type ExportToAgendaPort = (arg: ExportToAgendaProps) => Promise<void>;

export const exportToAgendaAdapter: ExportToAgendaPort = async ({
  start,
  end,
}) => await exportToAgenda({ start, end });
