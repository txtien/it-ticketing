import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeTicketType() {
  return {
    name: faker.person.fullName(),
    note: undefined,
  };
}
export function fakeTicketTypeComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    note: undefined,
    isActive: true,
  };
}
export function fakeDepartment() {
  return {
    name: faker.person.fullName(),
    note: undefined,
  };
}
export function fakeDepartmentComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    note: undefined,
    isActive: true,
  };
}
export function fakeCategory() {
  return {
    name: faker.person.fullName(),
    note: undefined,
  };
}
export function fakeCategoryComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    note: undefined,
    isActive: true,
  };
}
export function fakeUser() {
  return {
    name: faker.person.fullName(),
    externalId: faker.lorem.words(5),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    externalId: faker.lorem.words(5),
    isActive: true,
  };
}
export function fakeTicket() {
  return {
    name: faker.person.fullName(),
    comment: undefined,
    status: faker.lorem.words(5),
  };
}
export function fakeTicketComplete() {
  return {
    id: faker.number.int({min: 50, max: 5000}),
    name: faker.person.fullName(),
    comment: faker.lorem.words(20),
    userId: 1,
    departmentId: 1,
    categoryId: 1,
    ticketTypeId: 1,
    status: faker.lorem.words(5),
  };
}
