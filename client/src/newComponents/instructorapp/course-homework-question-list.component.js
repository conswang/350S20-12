import React from 'react'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'

import Homework from './homework.component'

export default class CourseHomeworkList extends React.Component {
  constructor() {
    super()

    this.state = {
      updated: false, 
      homeworks: []
    }
  }

  onClick = () => {
    axios.get(`http://localhost:5000/homeworks/`)
      .then( res => {
        let homeworksToShow = [];
        res.data.forEach((homework) => {
            if (homework.courseCode == this.props.course.joinCode) {
                console.log(homework)
                homeworksToShow.push(homework);
            }
        });
        this.setState({
          updated: true,
          homeworks : homeworksToShow
        });
      })
      .catch(err => console.log(err))
  }
  
  render () {
    let homeworkComponents = this.state.homeworks.map(
      (homework) => (
        <div>
          <Homework homework={homework} key={homework}/>
          <br />
        </div>
      )
    )
    homeworkComponents = (homeworkComponents.length == 0) ? <h6>No homeworks for this course!</h6> : homeworkComponents
    return (
      <React.Fragment>
        <Alert show={this.state.updated} variant="success" dismissible onClose={() => this.setState({updated: false})}>
          Homeworks were retrieved successfully!
        </Alert>
        <Button variant="outline-dark" type="button" onClick={this.onClick}>Get Homeworks</Button>
        <br/>
        <br/>
        { homeworkComponents }
      </React.Fragment>
    )
  }
}