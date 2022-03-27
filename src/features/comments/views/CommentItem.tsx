import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import RenderHTML, {RenderersProps} from 'react-native-render-html';
import {colors, texts} from '../../../core-theme';
import Strings from '../../../core/Strings';
import {CommentViewState} from '../data/comments-slice';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  line: {
    borderEndColor: colors.secondary,
    borderEndWidth: 1,
    marginStart: 0,
    marginEnd: 16,
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'baseline',
    backgroundColor: colors.surfaceVariant,
    paddingTop: 2,
    paddingBottom: 3,
    paddingStart: 6,
    paddingEnd: 8,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  author: {
    ...texts.labelSmall,
    color: colors.onSurfaceVariant,
  },
  dot: {
    ...texts.labelSmall,
    color: colors.onSurfaceVariant,
    flex: 0,
    paddingHorizontal: 4,
  },
  created: {
    ...texts.labelSmall,
    color: colors.onSurfaceVariant,
  },
  content: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  text: {
    ...texts.bodySmall,
    marginTop: 6,
  },
});

const Lines: React.FC<{depth: number}> = ({depth}) => {
  const lines: JSX.Element[] = [];

  for (let d = 0; d < depth; d++) {
    lines.push(<View key={d} style={styles.line} />);
  }

  return <>{lines}</>;
};

const openLink = async (url: string) => {
  if (!(await InAppBrowser.isAvailable())) {
    if (await Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
    return;
  }

  InAppBrowser.open(url, {
    //ios options
    modalEnabled: true,
    // android options
    // we can have more favor to our Theme, but lets respect the user content to keep it as default
    // toolbarColor: colors.primary,
  });
};

const renderersProps: Partial<RenderersProps> = {
  a: {
    onPress: (_, href) => {
      openLink(href);
    },
  },
};

const CommentItem: React.FC<{
  state: CommentViewState;
}> = ({
  state: {
    comment: {by: author, text, time},
    depth,
  },
}) => {
  const created = Strings.fromTimestamp(time);

  return (
    <View style={styles.item}>
      <Lines depth={depth} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.created}>{created}</Text>
        </View>
        <RenderHTML
          source={{html: text!}}
          baseStyle={styles.text}
          contentWidth={0}
          renderersProps={renderersProps}
          emSize={6}
        />
      </View>
    </View>
  );
};

export default CommentItem;
