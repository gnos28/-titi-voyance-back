import { PurchasingData } from "../../interfaces";

type StorePurchaseServiceProps = {
  purchasingData: PurchasingData;
};

export type StorePurchaseService = ({
  purchasingData,
}: StorePurchaseServiceProps) => Promise<void>;
export { PurchasingData };
