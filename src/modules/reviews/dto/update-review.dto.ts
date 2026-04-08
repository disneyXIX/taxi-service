export class UpdateReviewDto {
  readonly tripId?: number;
  readonly rating?: number;
  readonly comment?: string | null;
}
