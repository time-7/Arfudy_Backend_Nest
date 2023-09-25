import { Ingredient } from '@domain/menu/enterprise/entities/value-objects/ingredients.value-object';
import { NutritionFacts } from '@domain/menu/enterprise/entities/value-objects/nutrition-facts.value-object';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductRequestDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  ingredients: Ingredient[];

  @ApiProperty()
  nutritionFacts?: NutritionFacts;

  @IsBoolean()
  @ApiProperty()
  has3dModel: boolean;

  @IsString()
  @ApiProperty()
  imageUrl: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  unityModelId: string;
}
