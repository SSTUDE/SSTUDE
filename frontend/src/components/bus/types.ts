
export interface Station {
    citycode: string;
    gpslati: string;
    gpslong: string;
    nodeid: string;
    nodenm: string;
    nodeno: string;
  }
  

export interface BusState {
    stations: Station[] | null;
    station: string | null;
    busData: any;
    loading: boolean;
    error: any;
    gps: [number, number] | null;
  }