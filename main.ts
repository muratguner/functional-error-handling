import {
  InvalidCountError,
  Failure,
  Errors,
  HttpErrors,
  UnauthorizedError,
} from "./errors";
import { Either, success, error } from "./error-handling";

export class math {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  add() {
    return this.x + this.y;
  }
}

const sumPets = (
  firstPetCount: number,
  secondPetCount: number
): Either<Failure<Errors.INVALID_COUNT>, number> => {
  if (firstPetCount < 0 || secondPetCount < 0) {
    return error(InvalidCountError());
  }

  let calculate = new math(firstPetCount, secondPetCount);
  return success(calculate.add());
};

const getData = (request: string): Either<Failure<HttpErrors>, string> => {
  if (request === "403") return error(UnauthorizedError());
  return success("OK");
};

const report = (): void => {
  console.log("Success");
};

const petCountResult = sumPets(3, -2);
petCountResult.isSuccess() && console.log(petCountResult.value);
petCountResult.isError() && console.log(petCountResult.value);
petCountResult.applyOnSuccess(report);

const data = getData("403");

data.isError() && console.log(data.value);
data.isSuccess() && console.log(data.value);
