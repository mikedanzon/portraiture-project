import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './Rundown';

function ProjectRundown(props) {
  const [data, setData] = useState(appointments);
  const currentDate = useState(new Date());

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      let newData = [...data, { id: startingAddedId, ...added }];
      setData(newData);
    }
    if (changed) {
      let newData = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
      setData(newData);
    }
    if (deleted !== undefined) {
      let newData = data.filter((appointment) => appointment.id !== deleted);
      setData(newData);
    }
    return { data };
  };

  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState currentDate={currentDate} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <DayView startDayHour={9} endDayHour={19} />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
}

export default ProjectRundown;
