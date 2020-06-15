import React from 'react';
import Dialog from '../Dialog/Dialog';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ModalProps, AccountDto, ShowDto } from '../../types';
import { graphql, useStaticQuery } from 'gatsby';
import StepperOrder from './StepperOrder';
import { getPerformances } from '../../utils';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core';

type InternalShowResult = {
  allInternalAccounts: {
    edges: { node: AccountDto }[];
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    }
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const query = graphql`
  {
    allInternalAccounts(filter: { id: { ne: "dummy" } }) {
      edges {
        node {
          shows {
            id
            alternative_id
            title
            slug
            featuredCover {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            performances {
              alternative_id
              show_id
              ticketing_opened
              programmed_closing
              datetime_closing
              programmed_opening
              datetime_opening
              date {
                timestamp
                default
                french
              }
              categories {
                alternative_id
                name
                nb_places
                prices {
                  alternative_id
                  amount
                  rate {
                    alternative_id
                    name
                    group_rate
                    min
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function ModalOrder({ opened, close }: ModalProps) {
  const classes = useStyles();
  const data: InternalShowResult = useStaticQuery(query);
  const shows: ShowDto[] = data.allInternalAccounts.edges[0].node.shows.filter(
    show => getPerformances(show).length > 0
  );

  const handleClose = () => {
    close();
  };

  return (
    <Dialog
      fullScreen
      open={opened}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Réservation
          </Typography>
        </Toolbar>
      </AppBar>
      <StepperOrder shows={shows} />
    </Dialog>
  );
}
