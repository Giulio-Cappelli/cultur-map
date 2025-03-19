export interface Tags {
  name: string;
  "addr:city"?: string;
  "addr:country"?: string;
  "addr:housenumber"?: string;
  "addr:postcode"?: string;
  "addr:street"?: string;
  amenity?: string;
  check_date?: string;
  "contact:email"?: string;
  "contact:phone"?: string;
  "contact:website"?: string;
  opening_hours?: string;
  operator?: string;
  outdoor_seating?: string;
  "ref:vatin"?: string;
  wheelchair?: string;
  tourism?: string;
  wikipedia?: string;
}

export interface Element {
  type: string;
  id: number;
  center: { lat: number; lon: number };
  nodes: number[];
  tags: Tags;
}

export interface OverpassData {
  version: number;
  generator: string;
  osm3s: {
    timestamp_osm_base: string;
    timestamp_areas_base: string;
    timestamp_osm_max: string;
    timestamp_areas_max: string;
    areas: {
      name: string;
      bbox: number[];
      geometries: string[];
    };
  };
  elements: Element[];
}
