import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERR } from "src/app.utils";

export class UserRegistrationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(PASSWORD_REGEX, { message: PASSWORD_REGEX_ERR })
  password: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(PASSWORD_REGEX, { message: PASSWORD_REGEX_ERR })
  confirmPassword: string;
}