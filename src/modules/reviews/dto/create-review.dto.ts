export class CreateReviewDto {
  readonly tripId!: number;
  readonly rating!: number;
  readonly comment?: string;
}
