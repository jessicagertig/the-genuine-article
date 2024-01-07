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
}

