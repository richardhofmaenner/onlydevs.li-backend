import { Tag } from "./Tag.ts";

export interface TagDetailResponse {
  data: Tag[],
  pagination: {
    cursor: string
  }
}
