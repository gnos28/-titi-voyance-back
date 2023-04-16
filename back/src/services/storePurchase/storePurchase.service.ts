import { StorePurchaseService } from "./storePurchase.api";
import {
  exportToAgendaAdapter,
  exportToSheetAdapter,
} from "./storePurchase.spi";

export const storePurchaseService: StorePurchaseService = async ({
  purchasingData,
}) => {
  // save data to google sheet
  const nbNew = await exportToSheetAdapter([purchasingData], "840247244");
  // create new agenda event
  const purchasingDataDate = purchasingData.date;
  const splittedHour = purchasingData.hour?.split(":") || [];
  const duration = purchasingData.prestationDuration;

  if (
    nbNew === 1 &&
    purchasingDataDate &&
    splittedHour?.length > 1 &&
    duration
  ) {
    const year = new Date(purchasingDataDate).getFullYear();
    const month = new Date(purchasingDataDate).getMonth();
    const day = new Date(purchasingDataDate).getDate();
    const hour = parseInt(splittedHour[0], 10);
    const minutes = parseInt(splittedHour[1], 10);

    const startDate = new Date(year, month, day, hour, minutes);
    console.log("startDate", startDate);

    const start = startDate.toISOString();
    console.log("start", start);
    console.log(
      "endDate",
      new Date(startDate.getTime() + duration * 60 * 1000)
    );

    const end = new Date(
      startDate.getTime() + duration * 60 * 1000
    ).toISOString();
    console.log("end", end);

    await exportToAgendaAdapter({ start, end });
  }

  // send mail to customer

  // const slots = await getSlotsByDate(monthYear);
};
