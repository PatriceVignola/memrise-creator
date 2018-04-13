/* @flow */

import type { Action } from './types';

type ResponseJson = {
  courses: Object[],
};

export default function fetchCoursesAsync(): (dispatch: Action => void) => Promise<Action> {
  // TODO: Add a way to fetch courses by patch (e.g. 1-20, 21-40, 41-60, etc.)
  const coursesUrl = 'https://www.memrise.com/ajax/courses/dashboard/?courses_filter=learning&category_id=8&offset=0&limit=1000';

  return dispatch => (
    fetch(coursesUrl)
      .then((response: Response) => {
        if (!response.ok) {
          throw Error(`response returned an error ${response.status}`);
        }

        return response.json();
      })
      .then((json: ResponseJson) => {
        dispatch({ type: 'FETCHED_COURSES', apiCourses: json.courses });
      })
      .catch((errorMessage: string) => {
        const error = Error(`Could not fetch courses from the API: ${errorMessage}`);
        dispatch({ type: 'FETCH_COURSES_FAILED', error });
      })
  );
}
