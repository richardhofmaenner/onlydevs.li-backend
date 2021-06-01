import { Stream } from "./Stream.ts";

export interface StreamsDetailResponse {
  data: Stream[],
  pagination: {
    cursor: string
  }
}
