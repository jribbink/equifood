export abstract class SeederService {
  abstract seed(): Promise<void>;
}
