/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/**
 * Shared utility to map HTTP and connectivity errors to user-friendly messages.
 * Specifically identifies connection failures (status 0, ERR_CONNECTION_REFUSED).
 */
export const mapHttpError = (error: unknown): string => {
  if (!error) return 'An unknown error occurred.';

  const e = error as {
    status?: number;
    name?: string;
    message?: string;
    error?: { status?: number; message?: string };
  };

  const isConnectionFailure =
    e.status === 0 ||
    e.error?.status === 0 ||
    e.name === 'TimeoutError' ||
    e.message?.includes('status: 0') ||
    e.message?.includes('Unknown Error') ||
    e.message?.includes('Http failure response');

  if (isConnectionFailure) {
    return 'Cannot connect to the server. Please verify the server connection.';
  }

  if (e.status === 401) {
    return "You don't have permission to access this resource.";
  }

  if (e.status === 403) {
    return 'Access denied. You do not have the required permissions.';
  }

  if (e.status === 404) {
    return 'The requested resource was not found.';
  }

  if (e.status === 500) {
    return 'Server error. Please try again later.';
  }

  return e.error?.message ?? e.message ?? 'Something went wrong. Please try again later.';
};
