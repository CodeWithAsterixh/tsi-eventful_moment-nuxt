export function formatDate(dateStr: string, separator:string="-"): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // Return empty string or handle error if date is invalid
      return '';
    }
    const year = date.getFullYear();
    // Months are zero-based in JS, so we add 1 and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${separator}${month}${separator}${day}`;
  }
  

  export function daysFromNow(days: number): Date {
    const today = new Date();
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date;
  }

  export function parseDDMMYYYY(dateStr: string, separator='/'): Date | undefined {
    const parts = dateStr.split(separator);
    if (parts.length !== 3) return undefined;
    const [year,month, day ] = parts.map((part) => parseInt(part, 10));
    // Return a new Date (months are zero-indexed in JS)
    return new Date(year, month - 1, day);
  }