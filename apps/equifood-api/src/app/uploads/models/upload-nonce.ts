export interface UploadNonce {
  id: string;
  expires: Date;
  maxSizeBytes: number;
  targetTable?: string;
  targetColumn?: string;
  targetWhere?: object;
}
