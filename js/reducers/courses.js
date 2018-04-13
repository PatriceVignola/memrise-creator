/* @flow */

import type { Action } from '../actions/types';

// TODO: Remove the parameters that are not used in our use cases
export type Language = {
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
  // TODO: Check if num_things from the API can be something else than words
  numWords: number,
  numLevels: number,
  numLearners: number,
  source: Language,
  target: Language,
};

const initialState = [];

function courses(state: Course[] = initialState, action: Action): Course[] {
  if (action.type === 'FETCHED_COURSES') {
    return action.apiCourses.map(apiCourse => ({
      id: apiCourse.id,
      name: apiCourse.name,
      slug: apiCourse.slug,
      description: apiCourse.description,
      photoUrl: apiCourse.photo,
      numWords: apiCourse.num_things,
      numLevels: apiCourse.num_levels,
      numLearners: apiCourse.num_learners,
      source: {
        id: apiCourse.source.id,
        slug: apiCourse.source.slug,
        name: apiCourse.source.name,
        photoUrl: apiCourse.source.photo,
        parentId: apiCourse.source.parent_id,
        index: apiCourse.source.index,
        languageCode: apiCourse.source.language_code,
      },
      target: {
        id: apiCourse.source.id,
        slug: apiCourse.source.slug,
        name: apiCourse.source.name,
        photoUrl: apiCourse.source.photo,
        parentId: apiCourse.source.parent_id,
        index: apiCourse.source.index,
        languageCode: apiCourse.source.language_code,
      },
    }));
  }

  return state;
}

export default courses;
