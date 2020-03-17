import FavoriteIcon from "@material-ui/icons/Favorite";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import PrintIcon from "@material-ui/icons/Print";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DurationPickerModal from "../../common/duration-picker-modal/DurationPickerModal";
import IntervalList from "../../common/intervals-list/IntervalList";
import TrainingSelector from "../../common/training-selector/TrainingSelector";
import { speak } from "../../utils/textToSpeechUtils";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <FavoriteIcon />, name: "Like" }
];

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2)
    }
  }
}));

const Home = () => {
  const classes = useStyles();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isDialOpened, setIsDialOpened] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState();

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const onTrainingSelection = (event, value) => {
    setSelectedTraining(value);
  };

  const onDialOpen = () => {
    setIsDialOpened(true);
  };

  const onDialClose = () => {
    setIsDialOpened(false);
  };

  return (
    <>
      <button onClick={speak}>Speech-to-text</button>

      <button onClick={handleOpenModal}>Open modal</button>

      <DurationPickerModal
        isModalOpened={isModalOpened}
        handleCloseModal={handleCloseModal}
      />

      <TrainingSelector onTrainingSelection={onTrainingSelection} />

      <IntervalList training={selectedTraining} />

      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={onDialClose}
        onOpen={onDialOpen}
        open={isDialOpened}
        direction="up"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={onDialClose}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default Home;
