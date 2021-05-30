import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MdEdit } from 'react-icons/md';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: '4px 16px',
    margin: '4px 0px',
  },
  buttonPackage: {
    background: '#0e203d',
    minWidth: '20px',
    padding: '5px 5px',
  },
}));

export default function SimplePopover(props) {
  const { onDeleteClick, onEditClick, buttonName } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.buttonPackage}
      >
        <MdEdit />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography className={classes.typography}>
          <button className="button-none" onClick={onEditClick}>
            {buttonName}
          </button>
        </Typography>
        <Typography className={classes.typography}>
          <button className="button-none" onClick={onDeleteClick}>
            Delete
          </button>
        </Typography>
      </Popover>
    </div>
  );
}
