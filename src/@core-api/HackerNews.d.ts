type HackerNewsItem = {
  /**
   * The item's unique id.
   */
  id: number;

  /**
   * true if the item is deleted.
   */
  deleted: boolean;

  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  /**
   * The username of the item's author.
   */
  by: string;

  /**
   * Creation date of the item, in Unix Time {@link https://en.wikipedia.org/wiki/Unix_time}.
   */
  time: number;

  /**
   * The comment, story or poll text. HTML.
   */
  text: string | undefined;

  /**
   * true if the item is dead.
   */
  dead: boolean;

  /**
   * The comment's parent: either another comment or the relevant story.
   */
  parent: number;

  /**
   * The pollopt's associated poll.
   */
  poll: number;

  /**
   * The ids of the item's comments, in ranked display order.
   */
  kids: Array<number> | undefined;

  /**
   * The URL of the story.
   */
  url: string | undefined;

  /**
   * The story's score, or the votes for a pollopt.
   */
  score: string;

  /**
   * The title of the story, poll or job. HTML.
   */
  title: string | undefined;

  /**
   * A list of related pollopts, in display order.
   */
  parts: Array<number>;

  /**
   * In the case of stories or polls, the total comment count.
   */
  descendants: number;
};
