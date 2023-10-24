export class TableInUseError extends Error {
  constructor(message: string) {
    super(message);
  }
}
