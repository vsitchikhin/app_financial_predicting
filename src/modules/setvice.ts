export class Service {
  protected apiHeaders: { [key: string]: string };

  public constructor() {
    this.apiHeaders = {};
  }
}