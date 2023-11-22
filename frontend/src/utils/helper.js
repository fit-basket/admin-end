export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    // Truncate the text and append ellipsis
    return text.substring(0, maxLength).trim() + "...";
  }
}

export const handleValidation = (fields, obj) => {
  for (const field of fields) {
    if (obj[field].trim() === "") {
      return false;
    }
  }
  return true;
};
