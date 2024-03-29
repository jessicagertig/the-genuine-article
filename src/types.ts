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

// for POST request
// "item_info": {
//   "garment_title": "Dress",
//   "garment_type": "test",
//   "begin_year": 1872,
//   "end_year": 1874,
//   "decade": "1870s",
//   "secondary_decade": null,
//   "culture_country": "American",
//   "collection": "The Metropolitan Museum of Art",
//   "collection_url": "https://www.metmuseum.org/95",
//   "creator": "Unknown",
//   "source": " Brooklyn Museum Costume Collection at The Metropolitan Museum of Art, Gift of the Brooklyn Museum, 2009; Gift of Mrs. Clarence E. Van Buren, 1944",
//   "item_collection_no": "2009.300.683pf",
//   "description": "Test entry."
// },
// "item_colors": [ 22 ],
// "item_materials": [ 1, 13, 29 ]

//result of get by item id
// {
//     "info": {
//       "id": 3,
//       "garment_title": "Dress",
//       "garment_type": "One piece",
//       "begin_year": 1867,
//       "end_year": null,
//       "decade": "1860s",
//       "secondary_decade": null,
//       "culture_country": "Western",
//       "collection": "Colonial Williamsburg",
//       "collection_url": "https://emuseum.history.org/objects/5792/dress?ctx=146625e9a5ad296fe848b9f0f3aeb9ba7cee142b&idx=459",
//       "creator": "Unknown",
//       "source": "Gift of Tasha Tudor",
//       "item_collection_no": "1998-236",
//       "description": "Woman's gown of soft blue green ribbed changeable silk, woven with floral sprigs, trimmed with solid green silk fringe and puffed bands of self fabric. High round neckline and center front button closure. Upper sleeves trimmed with puffed and fringed self fabric with extra fringe at wrist. Flounced overskirt trimmed with fringe. Attached belt. Lined with glazed cotton. Characteristic of nineteenth-century dresses, this bodice is shaped by a series of boned darts from the waist to the bust. Some time after the dress was first made, the wearer had to enlarge the waist by opening the side seams; the waistline now measures 26 inches. "
//   },
//   "colors": [],
//   "materials": [],
//   "image_urls": null
// }

//one item in the get all items return
// {
//   "id": 17,
//   "garment_title": "Dress",
//   "garment_type": "test",
//   "begin_year": 1872,
//   "end_year": 1874,
//   "decade": "1870s",
//   "secondary_decade": null,
//   "culture_country": "American",
//   "collection": "The Metropolitan Museum of Art",
//   "collection_url": "https://www.metmuseum.org/95",
//   "creator": "Unknown",
//   "source": " Brooklyn Museum Costume Collection at The Metropolitan Museum of Art, Gift of the Brooklyn Museum, 2009; Gift of Mrs. Clarence E. Van Buren, 1944",
//   "item_collection_no": "20009.300.683pf",
//   "description": "Test entry.",
//   "materials": [
//       "cotton",
//       "silk",
//       "whale bone"
//   ],
//   "colors": [
//       "blue"
//   ],
//   "image_url": null
// },
