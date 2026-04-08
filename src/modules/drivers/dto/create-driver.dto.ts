export class CreateDriverDto {
  readonly firstName!: string;
  readonly lastName!: string;
  readonly birthDate?: string;
  readonly email?: string;
  readonly vehicleId?: number;
}
