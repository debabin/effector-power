import {ActionIcon, Badge, Button, Card, Group, Image, Table, Text} from '@mantine/core';
import {IconHeart} from '@tabler/icons-react';

import {Recipe} from '../utils';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({recipe}) => (
  <Card withBorder radius="md" p="sm">
    <Card.Section mt="md" p="md">
      <Image radius="md" src={recipe.image} alt={recipe.label} height={200} />
      <Group display="flex">
        {recipe.mealType && recipe.mealType.length && (
          <>
            {recipe.mealType.map((label) => (
              <Badge fz="xs" mt="xs" color="pink">
                {label}
              </Badge>
            ))}
          </>
        )}
      </Group>

      <Text fz="lg" fw={500} mt="xl" lineClamp={1}>
        {recipe.label}
      </Text>

      {recipe.healthLabels && !!recipe.healthLabels.length && (
        <Text fz="xs" mt="xs">
          {recipe.healthLabels
            .splice(0, 4)
            .map((label) => label.replace('-', ' '))
            .join(' • ')}
        </Text>
      )}
    </Card.Section>
    <Card.Section mt="md" px="md">
      <Text>⏰ {recipe.totalTime} minutes</Text>
      <Text>🔥 {Math.floor(recipe.calories)} calories</Text>
    </Card.Section>
    <Card.Section mt="sm" px="md">
      <Table>
        <tbody>
          <tr>
            <td>protein</td>
            <td>
              {Math.floor(recipe.totalNutrients.PROCNT.quantity)}{' '}
              {recipe.totalNutrients.PROCNT.unit}
            </td>
          </tr>
          <tr>
            <td>fat</td>
            <td>
              {Math.floor(recipe.totalNutrients.FAT.quantity)} {recipe.totalNutrients.FAT.unit}
            </td>
          </tr>
          <tr>
            <td>carb</td>
            <td>
              {Math.floor(recipe.totalNutrients.CHOCDF.quantity)}{' '}
              {recipe.totalNutrients.CHOCDF.unit}
            </td>
          </tr>
        </tbody>
      </Table>
    </Card.Section>
    <Group mt="xs">
      <Button radius="md" style={{flex: 1}}>
        Show details
      </Button>
      <ActionIcon variant="default" radius="md" size={36}>
        <IconHeart size="1.1rem" stroke={1.5} />
      </ActionIcon>
    </Group>
  </Card>
);
