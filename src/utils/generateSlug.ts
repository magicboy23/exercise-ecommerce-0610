export function generateSlug(text: string): string {
  return text
    .toLowerCase() // convert to lowercase
    .trim() // remove whitespace from both ends
    .replace(/[\s\W-]+/g, "-") // replace spaces and non-word chars with dashes
    .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
}
