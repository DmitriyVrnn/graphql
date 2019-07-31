import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { addDirectorMutation, updateDirectorMutation } from "./mutation";
import { directorsQuery } from "../DirectorsTable/queries";

import { styles } from './styles';

const withGraphQLAdd = graphql(addDirectorMutation, {
  props: ({ mutate }) => ({
    addDirector: director => mutate({
      variables: director,
      refetchQueries: [{ query: directorsQuery }]
    }),
  }),
});

const withGraphQLUpdate = graphql(updateDirectorMutation, {
  props: ({ mutate }) => ({
    updateDirector: director => mutate({
      variables: director,
      refetchQueries: [{ query: directorsQuery }]
    }),
  }),
});

export default compose(withStyles(styles), withGraphQLAdd, withGraphQLUpdate);
