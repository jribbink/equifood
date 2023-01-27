import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class OrderedItemDTO {
  @Field()
  id: string;

  @Field()
  quantity: number;
}
