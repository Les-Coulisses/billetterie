import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Img from 'gatsby-image';
import { getShows } from '../../utils';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modal: {
    maxHeight: '95vh',
    top: '2.5vh !important',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll'
  }
}));

export default function SimpleModal({ opened, close }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const showsList = getShows();

  const body = (
    <div className={classes.paper}>
      <ul>
        {showsList.map(item => (
          <li style={{ width: 250 }} key={item.node.id}>
            <Img
              durationFadeIn={1000}
              draggable={false}
              fluid={item.node.featuredCover.childImageSharp.fluid}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <Modal
        open={opened}
        onClose={close}
        className={classes.modal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Fade in={opened}>{body}</Fade>
      </Modal>
    </div>
  );
}
