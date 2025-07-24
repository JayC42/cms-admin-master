import { format, isValid, parseISO } from 'date-fns';

export function formatDateTime(
  dateInIsoString: string | undefined | null,
  newFormat = 'dd/MM/yyyy hh:mma',
): string {
  try {
    if (dateInIsoString) {
      const date = parseISO(dateInIsoString);
      return format(date, newFormat).toLowerCase();
    } else {
      return 'N/A';
    }
  } catch (error) {
    return 'N/A';
  }
}

export function formatDate(
  dateInput: string | Date | undefined | null,
  newFormat = 'dd/MM/yyyy',
): string {
  try {
    if (!dateInput) {
      return 'N/A';
    }

    // Normalize input to a Date object
    let date: Date;

    if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      // Try parsing as ISO first, then fallback to normal date parsing
      date = parseISO(dateInput);
      if (!isValid(date)) {
        const normalizedInput = dateInput.replace(/-/g, '/');
        date = new Date(normalizedInput);
      }
    }

    // Validate the resulting Date object
    if (!isValid(date)) {
      return 'N/A';
    }

    // Format the valid date
    return format(date, newFormat).toLowerCase();
  } catch (error) {
    return 'N/A';
  }
}
