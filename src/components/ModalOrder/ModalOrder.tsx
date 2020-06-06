import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { OrderDto, ModalProps, ShowDto } from '../../types';
import { graphql, useStaticQuery } from 'gatsby';
import StepperOrder from './StepperOrder';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '75vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: 'scroll',
    height: '88vh',
    marginTop: '2vh'
  },
  modal: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const query = graphql`
  {
    allInternalShows(filter: { id: { ne: "dummy" } }) {
      edges {
        node {
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
`;

type InternalShowResult = {
  allInternalShows: {
    edges: { node: ShowDto }[];
  };
};

export default function ModalOrder({ opened, close }: ModalProps) {
  const classes = useStyles();
  const data: InternalShowResult = useStaticQuery(query);
  const shows: ShowDto[] = data.allInternalShows.edges.map(item => item.node);

  const body = (
    <div className={classes.paper}>
      <StepperOrder shows={shows} />
    </div>
  );

  const handleClose = () => {
    close();
  };

  return (
    <Modal
      open={opened || false}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <Fade in={opened}>{body}</Fade>
    </Modal>
  );
}
