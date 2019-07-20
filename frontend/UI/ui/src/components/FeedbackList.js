import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./FeedbackList.css"


export default function ControlledExpansionPanels() {
  const [expanded, setExpanded] = React.useState(false);
  const ChangeHandler = panel => (back, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="feedback_list">
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={ChangeHandler('panel1')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="user1" >
          <Typography className="User">User1</Typography>
          <Typography className="User_Feedback">User1's feedback</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            I love it!
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={ChangeHandler('panel2')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="user2">
          <Typography className="User">User2</Typography>
          <Typography className="User_Feedback">
            User2's feedback
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            I love it!
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={ChangeHandler('panel3')}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="user3"
        >
          <Typography className="User">User3</Typography>
          <Typography className="User_Feedback">
            User3's feedback
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            I love it!
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
