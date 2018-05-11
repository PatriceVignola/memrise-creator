/* @flow */

type LanguageJson = {
  id: number,
  slug: string,
  name: string,
  photo: string,
  parent_id: number,
  index: number,
  language_code: string,
};

type ThingColumnJson = {
  alts: string[],
  val: string,
  choices: string[],
  kind: string, // text, audio, etc.
  accepted: string[],
  typing_corrects: Object, // No idea what this is
};

export type ApiCourses = {
  courses: [{
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
    source: LanguageJson, // Known language
    target: LanguageJson, // Target language
    learned: number,
    review: number,
    ignored: number,
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
  }],
};

export type ApiLevels = {
  levels: [{
    id: number,
    index: number,
    kind: number,
    title: string,
    pool_id: number,
    column_a: number,
    column_b: number,
    thing_ids: number[],
    course_id: number,
    mission_id: ?number,
  }],
};

export type ApiThings = {
  things: [{
    id: number,
    pool_id: number,
    columns: {
      '1': ThingColumnJson, // Target (language to learn)
      '2': ThingColumnJson, // Source (known language)
    },
    attributes: Object, // No idea what this is
  }],
};

export type ApiUser = {
  user: {
    id: number,
    email: ?string,
    username: string,
    photo: string,
    photo_small: string,
    photo_large: string,
    is_authenticated: boolean,
    is_staff: boolean,
    url: string,
    num_followers: number,
    num_following: number,
    num_things_flowered: number,
    current_follows: boolean,
    follows_current: boolean,
    badges: {
      [key: string]: {
        level: number,
        achieved_date: string,
        name: string,
      },
    },
    is_premium: boolean,
    is_self: boolean,
  },
};

export type ApiLeaderboard = {
  rows: [{
    position: number,
    points: number,
    username: string,
    uid: number,
    photo: string,
    is_premium: boolean,
    following: boolean,
  }],
};
