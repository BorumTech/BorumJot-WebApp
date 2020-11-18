import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import circularProgress from "./circularProgress.module.css";

/**
 * Custom progress spinner to indicate loading state
 * 
 * Source: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/progress/CustomizedProgressBars.js
 */
export default function ProgressSpinner() {
  return (
    <div className={circularProgress.root}>
      <FacebookCircularProgress />
    </div>
  );
}

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
}));

function FacebookCircularProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}
