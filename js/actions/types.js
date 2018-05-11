/* @flow */

type CourseLanguage = {
  id: number,
  slug: string,
  name: string,
  photoUrl: string,
  parentId: number,
  index: number,
  languageCode: string,
};

export type Course = {
  id: number,
  name: string,
  slug: string,
  description: string,
  photoUrl: string,
  numWords: number,
  numLevels: number,
  numLearners: number,
  source: CourseLanguage,
  target: CourseLanguage,
};

type ThingLanguage = {
  word: string,
  kind: string, // TODO: Learn all the kinds and make an enum instead
  alts: string[],
};

export type Thing = {
  id: number,
  source: ThingLanguage,
  target: ThingLanguage,
};

export type CoursesThings = {
  [courseId: number]: Thing[],
};

export type User = {
  id: number,
  email: ?string,
  username: string,
  photoUrl: string,
};

export type Action =
  | { type: 'FETCHED_CURRENT_USER', user: User }
  | { type: 'FETCH_CURRENT_USER_FAILED', error: Error }
  | { type: 'FETCHED_COURSES', courses: Course[] }
  | { type: 'FETCH_COURSES_FAILED', error: Error }
  | { type: 'FETCHED_THINGS', coursesThings: CoursesThings }
  | { type: 'FETCH_THINGS_FAILED', error: Error }

export type ThunkAction = (dispatch: Action => void) => Promise<void>;
