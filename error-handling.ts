export type Either<E, S> = Success<E, S> | Error<E, S>;

export class Error<E, S> {
  readonly value: E;

  constructor(value: E) {
    this.value = value;
  }

  isError(): this is Error<E, S> {
    return true;
  }

  isSuccess(): this is Success<E, S> {
    return false;
  }

  applyOnSuccess<B>(_: (a: S) => B): Either<E, B> {
    return this as any;
  }
}

export class Success<E, S> {
  readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  isError(): this is Error<E, S> {
    return false;
  }

  isSuccess(): this is Success<E, S> {
    return true;
  }

  applyOnSuccess<B>(func: (a: S) => B): Either<E, B> {
    return new Success(func(this.value));
  }
}

export const success = <E, S>(l: S): Either<E, S> => {
  return new Success(l);
};

export const error = <E, S>(a: E): Either<E, S> => {
  return new Error<E, S>(a);
};
