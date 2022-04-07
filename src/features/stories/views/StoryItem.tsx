import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {replies} from '../../../@core-images/replies';
import {upvote} from '../../../@core-images/upvote';
import {colors, texts} from '../../../@core-theme';
import Strings from '../../../@core/Strings';

export type ToUrl = (url: string) => void;
export type ToHtml = (id: number) => void;
export type ToComments = (storyId: number) => void;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
  },
  title: {
    ...texts.bodyMedium,
    marginVertical: 8,
  },
  created: {
    ...texts.labelSmall,
    paddingBottom: 4,
  },
  headerBadge: {
    ...texts.labelSmall,
    alignSelf: 'baseline',
    backgroundColor: colors.surfaceVariant,
    color: colors.onSurfaceVariant,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginEnd: 6,
    maxWidth: 260,
  },
  bottomBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvoteBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvote: {
    tintColor: colors.secondary,
    width: 14,
    height: 14,
    marginEnd: 4,
  },
  dot: {
    ...texts.labelSmall,
    flex: 0,
    paddingHorizontal: 4,
  },
  author: {
    ...texts.labelMedium,
    color: colors.neutral,
    flexShrink: 1, // without this, ellipsizeMode won't work, add unit testing on this
  },
  replies: {
    tintColor: colors.onSurfaceVariant,
    width: 14,
    height: 14,
    marginEnd: 4,
  },
  commentsButton: {
    flex: 0,
    borderRadius: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 36,
    minHeight: 36,
    paddingHorizontal: 8,
    backgroundColor: colors.surfaceVariant,
  },
});

const CommentButton: React.FC<{
  story: HackerNewsItem;
  toComments: ToComments;
}> = ({story, toComments}) => {
  if (!story.descendants) {
    return null;
  }

  return (
    <RectButton
      onPress={() => {
        toComments(story.id);
      }}
      style={styles.commentsButton}>
      <Image source={replies} style={styles.replies} />
      <Text style={texts.labelSmall}>{`${story.descendants || 0}`}</Text>
    </RectButton>
  );
};

const StoryItem: React.FC<{
  story: HackerNewsItem;
  index: number;
  toUrl: ToUrl;
  toHtml: ToHtml;
  toComments: ToComments;
}> = ({index, story, toUrl, toHtml, toComments}) => {
  const hostname = Strings.findHostname(story.url) || story.text;

  const created = Strings.fromTimestamp(story.time);

  return (
    <RectButton
      style={styles.item}
      onPress={() => {
        if (story.url) {
          toUrl(story.url);
        } else if (story.text?.length) {
          toHtml(story.id);
        } else {
          toComments(story.id);
        }
      }}>
      <Text style={styles.headerBadge} numberOfLines={1}>
        {`${index + 1}. `}
        {hostname && (
          <Text
            numberOfLines={1}
            style={texts.labelSmall}>{`${hostname}`}</Text>
        )}
      </Text>

      <Text style={styles.title} numberOfLines={3} ellipsizeMode={'tail'}>
        {story.title}
      </Text>

      <Text style={styles.created}>{created}</Text>

      <View style={styles.bottomBar}>
        <View style={styles.upvoteBar}>
          <Image source={upvote} style={styles.upvote} />
          <Text style={texts.labelSmall}>{`${story.score || 0}`}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.author} numberOfLines={1} ellipsizeMode={'tail'}>
            {story.by}
          </Text>
        </View>

        <CommentButton story={story} toComments={toComments} />
      </View>
    </RectButton>
  );
};

export default StoryItem;
