import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class UuidEntity {
  constructor(id: string) {
    this.id = id;
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string = undefined;

  set(data: any, extraKeys?: [string]): void {
    if (data == null) {
      return;
    }

    for (const key in data) {
      if (
        (Object.prototype.hasOwnProperty.call(this, key) && key !== 'id') ||
        extraKeys.indexOf(key) > -1
      ) {
        this[key] = data[key];
      }
    }
  }

  isNew(): boolean {
    return this.id == null;
  }
}
