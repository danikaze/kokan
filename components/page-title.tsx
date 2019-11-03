import { ReactNode } from 'react';
import { Typography, Theme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
}));

export function PageTitle({
  children,
}: Readonly<{ children?: ReactNode }>): JSX.Element {
  const classes = useStyles({});

  return (
    <Typography variant="h5" className={classes.title}>
      {children}
    </Typography>
  );
}
