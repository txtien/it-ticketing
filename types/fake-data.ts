import {  } from '/Users/tientran/mine/projects/it-helpdesk/prisma/generated/client';
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
    id: faker.number.int(),
    name: faker.person.fullName(),
    comment: undefined,
    userId: faker.number.int(),
    departmentId: faker.number.int(),
    categoryId: faker.number.int(),
    ticketTypeId: faker.number.int(),
    status: faker.lorem.words(5),
  };
}
