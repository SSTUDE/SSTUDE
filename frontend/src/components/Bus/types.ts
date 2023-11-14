export interface busStops {
  cityCode: number;
  latitude: string;
  longitude: string;
  nodeId: string;
  nodeName: string;
  nodeNo: number;
}

export interface bus {
  arrprevstationcnt: string | number;
  arrtime: string | number;
  nodeid: string;
  nodenm: string;
  routeid: string;
  routeno: string;
  routetp: string;
  vehicletp: string;
}

export interface busServer {
  endNodeNum: string | number;
  routeId: string;
  routeNo: string;
  routeType: string;
  startNodeNum: string;
}

export interface BusState {
  gps: [number, number] | null;
  busStops: busStops[] | null;
  busStop: any;
  busList: busServer[] | null;
  busSave: any;
  busRealTime: BusRealTimeData[] | null;
  loading: boolean;
  error: any;
}

export type SelectedBuses = {
  [key: string]: boolean;
};

export type BusButtonProps = {
  selected?: boolean;
  onClick?: () => void;
};

export interface BusRealTimeData {
  arrivalPrevStationCount: number;
  arrivalTime: number;
  nodeId: string;
  nodeName: string;
  routeId: string;
  routeNo: string;
  routeType: string;
  vehicleType: string;
}
