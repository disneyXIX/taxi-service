export class CreateClientDto {
  readonly firstName!: string;
  readonly lastName!: string;
  readonly birthDate?: string;
  readonly email?: string;
}
