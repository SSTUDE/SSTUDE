
export interface busStops {
    citycode: string;
    gpslati: string;
    gpslong: string;
    nodeid: string;
    nodenm: string;
    nodeno: string;
  }

  export interface bus {
    arrprevstationcnt: string;
    arrtime: string;
    nodeid: string;
    nodenm: string;
    routeid: string;
    routeno: string;
    routetp: string;
    vehicletp: string;
  }

export interface BusState {
    busStops: busStops[] | null;
    // station: string | null;
    busStop: any;
    loading: boolean;
    error: any;
    gps: [number, number] | null;
    busList: bus[] | null;
  }