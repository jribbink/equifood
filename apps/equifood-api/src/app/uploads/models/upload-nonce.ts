export interface UploadNonce {
  previous_uuid: string;
  expires: Date;
  maxSizeBytes: number;
  targetTable?: string;
  targetColumn?: string;
  targetWhere?: object;
}
