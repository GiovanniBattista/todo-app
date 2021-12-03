import { TestBed } from "@angular/core/testing";

export interface TodoCreate {
  title: string;
  done?: boolean;
  due?: string;
}

export interface Todo extends TodoCreate {
  id: number;
}

export interface StrapiListResponse {
  data: StrapiData[]
}

export interface StrapiSingleResponse {
  data: StrapiData
}

export interface StrapiRequest {
  data: TodoCreate
}

export interface StrapiData {
  id: number
  attributes: Todo
}
