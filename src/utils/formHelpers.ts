import dayjs, { Dayjs } from "dayjs";

export type Unit = "year" | "decade";

export const stringToDate = (unit: Unit, input: string | null): Dayjs => {
  if (input !== null && unit === "year") {
    const year = input + "-01-01";
    return dayjs(year);
  } else {
    return dayjs();
  }
};

export const dateToString = (unit: Unit, date: Dayjs): string => {
  if (unit === "year") {
    return date.format("YYYY");
  } else {
    return date.format();
  }
};

/* takes a shallow object with some values that are empty strings */
export const convertEmptyStringsToNull = <T extends Record<string, any>>(
  object: T
): T => {
  const newObj: T = { ...object };
  for (const key in object) {
    if (newObj.hasOwnProperty(key) && newObj[key] === "") {
      newObj[key] = null!;
    }
  }
  return newObj;
};

// menu helpers

export type Option = { value: number; label: string };

type MenusName = "colorMenu" | "materialsMenu" | "garmentTitlesMenu";

type Color = { id: number; color: string };
type Material = { id: number; material: string };
type Title = { id: number; garmentTitle: string };

export type Menus = {
  colorMenu: Color[];
  materialsMenu: Material[];
  garmentTitlesMenu: Title[];
};

export type ConvertedMenus = {
  colorMenu: Option[];
  materialsMenu: Option[];
  garmentTitlesMenu: Option[];
};

export const returnConvertedMenus = (menus: Menus) => {
  const names: MenusName[] = [
    "colorMenu",
    "materialsMenu",
    "garmentTitlesMenu",
  ];
  let menusObject = {
    colorMenu: [] as Option[],
    materialsMenu: [] as Option[],
    garmentTitlesMenu: [] as Option[],
  };
  if (menus as Menus) {
    names.forEach(name => {
      const menu = menus[name];
      const newMenu = convertObjectToOptions(menu, name);
      menusObject[name] = newMenu;
    });
  }
  return menusObject;
};

export const convertObjectToOptions = (optionsArray: any[], name: string) => {
  let convertedOptions: any[] = [];
  if (name === "colorMenu") {
    convertedOptions= optionsArray.map((item: Color) => {
      const newItem = { value: 0, label: "" };
      newItem.value = item.id;
      newItem.label = item.color;
      return newItem;
    });
  } else if (name === "materialsMenu") {
    convertedOptions = optionsArray.map((item: Material) => {
      const newItem = { value: 0, label: "" };
      newItem.value = item.id;
      newItem.label = item.material;
      return newItem;
    });
  } else if (name === "garmentTitlesMenu") {
    convertedOptions = optionsArray.map((item: Title) => {
      const newItem = { value: 0, label: "" };
      newItem.value = item.id;
      newItem.label = item.garmentTitle;
      return newItem;
    });
  }
  return convertedOptions;
};
