import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useAppDispatch} from '../../../core-store/hooks';
import {
  initialComments,
  useCommentsInitializer,
} from '../domain/comments-slice';
import CommentsList from './CommentsList';
import InitializingComments from './InitializingComments';

type RouteProps = RouteProp<StackParamList, 'Comments'>;

const Comments = () => {
  const {
    params: {storyId},
  } = useRoute<RouteProps>();

  const dispatch = useAppDispatch();

  const {loading} = useCommentsInitializer(storyId);

  React.useEffect(() => {
    dispatch(initialComments(storyId));
  }, [dispatch, storyId]);

  if (loading) {
    return <InitializingComments />;
  }

  return <CommentsList />;
};

export default Comments;
