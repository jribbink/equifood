export interface EntityMetadataRealtime {
  authFn: (
    ...args: any[]
  ) => (user: any, entity: any) => Promise<boolean> | boolean;
  relations: { [property: string]: boolean };
  dependencies: any;
}
