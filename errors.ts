export interface Failure<FailureType extends string> {
  type: FailureType;
  reason: string;
}

export enum Errors {
  INVALID_COUNT = "Invalid count",
}

export enum HttpErrors {
  UNAUTHORIZED = "403",
}

export const InvalidCountError = (): Failure<Errors.INVALID_COUNT> => ({
  type: Errors.INVALID_COUNT,
  reason: "Pet count should be bigger than 0",
});

export const UnauthorizedError = (): Failure<HttpErrors.UNAUTHORIZED> => ({
  type: HttpErrors.UNAUTHORIZED,
  reason: "Unauthorized",
});