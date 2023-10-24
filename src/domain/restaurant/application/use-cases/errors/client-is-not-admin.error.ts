export class GivenClientIsNotAdminError extends Error {
  constructor(message: string) {
    super(message);
  }
}
