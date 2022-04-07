export interface PageToken {
  start: number;
  end: number;
}

export const generateNextPageToken = (
  max: number,
  currentEnd: number,
  pageSize: number,
) => {
  const nextPageToken: PageToken = {
    start: currentEnd,
    end: Math.min(currentEnd + pageSize, max),
  };

  return max > currentEnd ? nextPageToken : undefined;
};
