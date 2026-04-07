import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'Nombre completo del contacto',
    example: 'Ana Pérez',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'Número de teléfono (mínimo 8 dígitos, puede incluir +, espacios y guiones)',
    example: '+56912345678',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^\+?[\d\s\-()]{8,}$/, {
    message: 'phone debe ser un número de teléfono válido',
  })
  phone: string;

  @ApiProperty({
    description: 'Categoría del contacto',
    enum: ['family', 'work', 'friend'],
    example: 'family',
  })
  @IsIn(['family', 'work', 'friend'], {
    message: 'category debe ser: family, work o friend',
  })
  category: 'family' | 'work' | 'friend';

  @ApiProperty({
    description: '¿Es un contacto favorito?',
    example: true,
  })
  @IsBoolean()
  favorite: boolean;
}
