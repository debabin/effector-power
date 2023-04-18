import { AxiosRequestConfig } from "axios";
import { api } from "./instance";

type MealType = "Lunch" | "Snack" | "Breakfast" | "Snack" | "Teatime";
type Diet =
  | "balanced"
  | "high-fiber"
  | "high-protein"
  | "low-carb"
  | "low-fat"
  | "low-sodium";
type Ingr = `${number}+` | `${number}-${number}` | number;
type Calories = `${number}+` | `${number}-${number}` | number;
type Time = `${number}+` | `${number}-${number}` | number;

interface RequestSearchRecipeParams {
  params: {
    q?: string;
    from?: number;
    mealType?: Array<MealType>;
    diet?: Array<Diet>;
    ingr?: Ingr;
    calories?: Calories;
    time?: Time;
  };
  config?: AxiosRequestConfig;
}

type Ingredient = {
  food: string;
  foodCategory: string;
  image: string;
  measure: string;
  quantity: number;
  text: string;
  weight: number;
};
export type Recipe = {
  calories: number;
  cautions: string[];
  cuisineType: string[];
  dietLabels: string[];
  dishType: string[];
  totalNutrients: {
    [key: string]: { label: string; quantity: number; unit: string };
  };
  healthLabels: string[];
  image: string;
  ingredientLines: string[];
  ingredients: Ingredient[];
  label: string;
  mealType: string[];
  shareAs: string;
  source: string;
  totalTime: number;
  totalWeight: number;
  uri: string;
  url: string;
};

type RequestSearchRecipeResponse = {
  from: number;
  to: number;
  q: string;
  count: number;
  hits: Recipe[];
  more: boolean;
};

export const requestSearchRecipe = ({
  params,
  config,
}: RequestSearchRecipeParams) =>
  api.get<RequestSearchRecipeResponse>("/", { ...config, params });
