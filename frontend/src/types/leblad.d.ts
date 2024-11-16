declare module "@dzcode-io/leblad" {
  export function getWilayaByCode(code: number): any;
  export function getBaladyiatsForWilaya(code: number): any[];
  export function getWilayas(): any[];
  export function getBaladyiats(): any[];
  export function getWilayaList(list: string[]): any[];
}
