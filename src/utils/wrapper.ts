export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const responseWrapper = <T>(
  data: T,
  message?: string,
): ApiResponse<T> => {
  return {
    message,
    data,
    success: true,
  };
};
