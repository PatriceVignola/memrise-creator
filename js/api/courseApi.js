/* @flow */

const coursesUrl = 'https://www.memrise.com/ajax/courses/dashboard/?courses_filter=learning&offset=0&category_id=8';

// TODO: Make a "Course" type

function getCoursesAsync() : Promise<Array<Object>> {
  return new Promise((resolve, reject) => {
    fetch(coursesUrl)
      .then((response) => {
        console.warn(response);
        return response.json();
      })
      .then((json) => {
        resolve(json.courses);
      })
      .catch((error) => {
        reject(Error(`Could not fetch courses: ${error}`));
      });
  });
}

export default getCoursesAsync;
