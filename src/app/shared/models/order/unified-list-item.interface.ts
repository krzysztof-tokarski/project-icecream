export interface UnifiedListData {
  icecreamName: string;
  units: UnifiedListUnit[];
}
export interface UnifiedListUnit {
  unitName: string;
  value: number;
  amount: number;
  calculated: number;
}
