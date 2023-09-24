import { Entity } from '@core/entities/entity';
import { NutritionFacts } from './value-objects/nutrition-facts.value-object';
import { Ingredient } from './value-objects/ingredients.value-object';
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id';

export interface ProductProps {
  name: string;
  description: string;
  has3dModel?: boolean;
  imageUrl?: string;
  ingredients: Ingredient[];
  nutritionFacts?: NutritionFacts;
  price: number;
  unityModelId?: string;
}

export class Product extends Entity<ProductProps> {
  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get has3dModel(): boolean {
    return this.props.has3dModel;
  }

  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  get ingredients() {
    return this.props.ingredients;
  }

  get nutritionFacts() {
    return this.props.nutritionFacts;
  }

  get price() {
    return this.props.price;
  }

  get unityModelId() {
    return this.props.unityModelId;
  }

  static create(
    {
      name,
      description,
      has3dModel,
      imageUrl,
      ingredients,
      nutritionFacts,
      price,
      unityModelId,
    }: ProductProps,
    id?: UniqueEntityId,
  ) {
    return new Product(
      {
        name,
        description,
        has3dModel: has3dModel ? has3dModel : false,
        imageUrl: imageUrl ? imageUrl : undefined,
        ingredients,
        nutritionFacts: ingredients.length
          ? NutritionFacts.createFromIngredients(ingredients)
          : nutritionFacts,
        price,
        unityModelId,
      },
      id,
    );
  }
}
