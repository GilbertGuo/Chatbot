import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./FeedbackList.css"
import Cookies from "js-cookie";
import axios from "axios";
import {toast} from "react-toastify";
import Page from "./PageFeedbackList";


export default class ControlledExpansionPanels extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      feedbackmsg:[],
      latestFeedback:[],
      pageOfItems: []

    };

    this.changeHandler = this.changeHandler.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  changeHandler = panel => (back, isExpanded) => {
    this.setState({expanded: isExpanded ? panel : false});
  };

  componentDidMount() {
    this.showFeedbacklist();

  }

  showFeedbacklist = async () => {

    let headers = {
      'Authorization': "Bearer " + Cookies.get('token')
    };

    try {
      await axios.get('http://localhost:8000/api/v1/feedbacks',{ headers: headers })
          .then(res => {
            //console.log(res);

            res.data.feedbacks.map(feedback=>{
              this.setState((prevState) => ({ feedbackmsg: prevState.feedbackmsg.concat(feedback.message)}));
              return null;
            });

            this.setState({latestFeedback:this.state.feedbackmsg.reverse()});

          });

    } catch (err) {
      //console.log(err);
      toast.error(err, { autoClose: 1000 });
    }
  };

  render() {

    const {expanded,latestFeedback,pageOfItems} = this.state;

    return (
        <div className="feedback_list">
        {
          pageOfItems.length ?
              pageOfItems.map((feedback, i) =>
                  <ExpansionPanel key={i} expanded={expanded === i} onChange={this.changeHandler(i)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} id={i}>
                      {/*<Typography className="User">User</Typography>*/}
                      <Typography className="User_Feedback">User's feedback</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        {feedback}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
              ) :
              <p>No feedbacks yet!</p>
        }
        <Page items={latestFeedback} onChangePage={this.onChangePage} />
        </div>

        /*<div className="feedback_list">
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.changeHandler('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} id="user1">
              <Typography className="User">User1</Typography>
              <Typography className="User_Feedback">User1's feedback</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                I love it!
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.changeHandler('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} id="user2">
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
          <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.changeHandler('panel3')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} id="user3"
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
        </div>*/
    );
  }
}
