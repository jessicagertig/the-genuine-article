export interface RequiredItemInfo {
  garmentTitle: string; //required
  beginYear: string; //required
  cultureCountry: string; // required
  collection: string; //required
  collectionUrl: string; //required
  itemCollectionNo: string; //required
}

export interface ItemInfo extends RequiredItemInfo {
  endYear: string;
  creator: string;
  source: string;
  description: string;
}

export interface ItemInfoData extends ItemInfo {
  id: number;
  decade: string;
  secondaryDecade: string;
}

export interface ImageUrls {
  mainImageUrl: string;
  largeUrl: string;
  displayUrl: string;
  thumbUrl: string;
  tinyDisplayUrl: string;
  tinyLargeUrl: string;
  tinyMainUrl: string;
  ratio: string;
}

export interface GarmentState {
  itemInfo: ItemInfo;
  itemColors: number[];
  itemMaterials: number[];
}

// export interface Garment {
//   itemInfo: ItemInfo;
//   colors: string[];
//   materials: string[];
//   imageUrls: {} | null;
// }

// format of each item returned from get garments
export interface GarmentData extends ItemInfoData {
  garmentTitleId: number;
  colors: string[];
  materials: string[];
  imageUrls: ImageUrls | null;
}

export interface GarmentErrors {
  garmentTitleError: string;
  beginYearError: string;
  cultureCountryError: string;
  collectionError: string;
  collectionUrlError: string;
  itemCollectionNoError: string;
  requestError: string;
}

interface Owner {
  username: string;
}

interface Media {
  pin_thumbnail_urls: string[];
  image_cover_url: string;
}

export interface PinterestBoard {
  pin_count: number;
  owner: Owner;
  collaborator_count: number;
  id: string;
  created_at: string;
  board_pins_modified_at: string;
  name: string;
  privacy: "PUBLIC" | "PRIVATE"; // Assuming privacy can be either "PUBLIC" or "PRIVATE"
  media: Media;
  follower_count: number;
  description: string;
}
