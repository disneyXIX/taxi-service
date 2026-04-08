export class UpdateDriverDto {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly birthDate?: string | null;
  readonly email?: string | null;
  readonly vehicleId?: number | null;
}
