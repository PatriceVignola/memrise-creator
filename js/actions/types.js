/* @flow */

type ApiLanguage = {
  id: number,
  slug: string,
  name: string,
  photo: string,
  parent_id: number,
  index: number,
  language_code: string,
};

// This is the raw course objects returned by the API calls to the memrise API
type ApiCourse = {
  id: number,
  name: string,
  slug: string,
  url: string,
  description: string,
  photo: string,
  photo_small: string,
  photo_large: string,
  num_things: number,
  num_levels: number,
  num_learners: number,
  source: ApiLanguage,
  target: ApiLanguage,
  learned: number,
  review: number,
  ltm: number,
  difficult: number,
  category: {
    name: string,
    photo: string,
  },
  next_session: {
    next_session: {
      session_type: string,
      is_enabled: boolean,
      counter: number,
      url: string,
      is_pro: boolean,
    },
    selector: [{
      session_type: string,
      is_enabled: boolean,
      counter: number,
      is_pro: boolean,
    }],
    is_unlocked: boolean,
  },
  percent_complete: number,
  goal: {
    goal: number,
    points: number,
    course_id: number,
    streak: number,
  },
};

export type Action =
  | { type: 'LOGGED_IN' }
  | { type: 'FETCHED_COURSES', apiCourses: ApiCourse[] }
  | { type: 'FETCH_COURSES_FAILED', error: Error }
