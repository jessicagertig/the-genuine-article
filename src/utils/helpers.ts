export const guid = (): string => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const camelToHumanReadable = (camelCaseString: string): string => {
  let brokenCamelCase = camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2");
  let words = brokenCamelCase.split(" ");
  words[0] = words[0][0].toUpperCase() + words[0].substring(1).toLowerCase();
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].toLowerCase();
  }
  return words.join(" ");
};

export interface PinterestQueryParams {
  pathname: string;
  pageNumber?: string;
  searchParams?: string;
}

export const constructPinterestQueryString = ({pathname, pageNumber, searchParams}: PinterestQueryParams) =>{
  let params = new URLSearchParams();
  params.append("returnTo", pathname);

  // Conditionally add pageNumber if it is defined
  if (pageNumber !== undefined) {
    params.append("pageNumber", pageNumber);
  }

  // Conditionally add searchParams if they are defined
  if (searchParams !== undefined) {
    Object.entries(searchParams).forEach(([key, value]: [string, string]) => {
      params.append(key, value);
    });
  }

  // Convert URLSearchParams to a string and prepend with '?'
  return "?" + params.toString();
}
