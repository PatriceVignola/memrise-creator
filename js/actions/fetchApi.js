/* @flow */

import type { ThunkAction } from './types';

import type {
  ApiCourses,
  ApiLevels,
  ApiUser,
  ApiLeaderboard,
  ApiThings,
} from './apiTypes';

// Good resource for hidden API calls:
// https://github.com/Shrugs/membot/blob/master/app/services/memrise.rb

// TODO: Export the API calls into an npm 'memrise-api' module

export function fetchCoursesAsync(): ThunkAction {
  // TODO: Add a way to fetch courses by patch (e.g. 1-20, 21-40, 41-60, etc.)
  const coursesUrl = 'https://www.memrise.com/ajax/courses/dashboard/?courses_filter=learning&category_id=8&offset=0&limit=1000';

  return async (dispatch) => {
    try {
      const response = await fetch(coursesUrl);

      if (!response.ok) {
        throw Error(`Response returned an error ${response.status}`);
      }

      const apiCourses: ApiCourses = await response.json();

      dispatch({
        type: 'FETCHED_COURSES',
        courses: apiCourses.courses.map(apiCourse => ({
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
            id: apiCourse.target.id,
            slug: apiCourse.target.slug,
            name: apiCourse.target.name,
            photoUrl: apiCourse.target.photo,
            parentId: apiCourse.target.parent_id,
            index: apiCourse.target.index,
            languageCode: apiCourse.target.language_code,
          },
        })),
      });
    } catch (error) {
      dispatch({ type: 'FETCH_COURSES_FAILED', error });
    }
  };
}

export function fetchThingsAsync(courseId: number): ThunkAction {
  const levelsUrl = `https://api.memrise.com/v3.0/courses/${courseId}/levels/`;
  const thingsUrl = 'https://api.memrise.com/v3.0/things';

  // TODO: We are probably limited by the length of the query string, so we should
  // spread the requests in reasonably small batches (like 50 by 50), or by level
  return async (dispatch) => {
    try {
      let response = await fetch(levelsUrl);

      if (!response.ok) {
        throw Error(`Response returned an error ${response.status}`);
      }

      const apiLevels: ApiLevels = await response.json();
      const thingIds: number[] = [];

      apiLevels.levels.forEach((apiLevel) => {
        thingIds.push(...apiLevel.thing_ids);
      });

      const thingIdString = thingIds.join(',');
      response = await fetch(`${thingsUrl}/${thingIdString}`);

      if (!response.ok) {
        throw Error(`Response returned an error ${response.status}`);
      }

      const apiThings: ApiThings = await response.json();

      dispatch({
        type: 'FETCHED_THINGS',
        coursesThings: {
          [courseId]: apiThings.things.map(apiThing => ({
            id: apiThing.id,
            source: {
              word: apiThing.columns['2'].val,
              kind: apiThing.columns['2'].kind,
              alts: apiThing.columns['2'].alts,
            },
            target: {
              word: apiThing.columns['1'].val,
              kind: apiThing.columns['1'].kind,
              alts: apiThing.columns['1'].alts,
            },
          })),
        },
      });
    } catch (error) {
      dispatch({ type: 'FETCH_THINGS_FAILED', error });
    }
  };
}

export function fetchCurrentUserAsync(): ThunkAction {
  // Since the leaderboards always contain the current user, by setting how_many=1, we know that
  // the only user in the list is the current user
  const leaderboardUrl = 'https://www.memrise.com/ajax/leaderboard/mempals/?how_many=1';
  const currentUserUrl = 'https://www.memrise.com/api/user/get';

  return async (dispatch) => {
    try {
      let response = await fetch(leaderboardUrl);

      if (!response.ok) {
        throw Error(`Response returned an error ${response.status}`);
      }

      const apiLeaderboard: ApiLeaderboard = await response.json();
      response = await fetch(`${currentUserUrl}?user_id=${apiLeaderboard.rows[0].uid}`);

      if (!response.ok) {
        throw Error(`Response returned an error ${response.status}`);
      }

      const apiUser: ApiUser = await response.json();

      dispatch({
        type: 'FETCHED_CURRENT_USER',
        user: {
          id: apiUser.user.id,
          email: apiUser.user.email,
          username: apiUser.user.username,
          photoUrl: apiUser.user.photo,
        },
      });
    } catch (error) {
      dispatch({ type: 'FETCH_CURRENT_USER_FAILED', error });
    }
  };
}
