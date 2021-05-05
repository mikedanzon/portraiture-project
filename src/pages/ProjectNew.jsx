import React from 'react'
import HeaderProps from '../components/HeaderProps'
import { Form, Button } from 'react-bootstrap';

function ProjectNew() {
	return (
		<>
		<HeaderProps title="Create Project" link="/" />
		<div className="project-new-container">
			<Form className="project-new-inner-container">
				<div className="project-new-pd">Project Details</div>
  				<Form.Group>
    				<Form.Label className="project-new-pt">Project Title*</Form.Label>
    				<Form.Control className="project-new-pt-input" type="text" placeholder="e.g. Leon & Stella" />
  				</Form.Group>
  				<Form.Group>
    				<Form.Label className="project-new-date">Date*</Form.Label>
    				<Form.Control className="project-new-date-input" type="date" placeholder="Select Date" />
  				</Form.Group>
    			<Form.Group controlId="exampleForm.ControlTextarea1">
    				<Form.Label className="project-new-desc">Description</Form.Label>
    				<Form.Control className="project-new-desc-input" as="textarea" rows={3} placeholder="Type collection description"/>
  				</Form.Group>
  				<div className="project-new-cd">Client Details</div>
  				<Form.Group>
    				<Form.Label className="project-new-cn">Client Name*</Form.Label>
    				<Form.Control className="project-new-cn-input" type="text" placeholder="e.g. Leon Handoko" />
  				</Form.Group>
   					<Form.Group controlId="exampleForm.ControlTextarea1">
    				<Form.Label className="project-new-ca">Client Address*</Form.Label>
    				<Form.Control className="project-new-ca-input" as="textarea" rows={3} placeholder="e.g. Sunset Boulevard, Pakuwon City Kecamatan Mulyorejo, Surabaya Jawa Timur 60111"/>
  				</Form.Group>
  				<div className="project-new-button-container">
  					<Button className="project-new-button" variant="primary" type="submit">Save</Button>
  				</div>
			</Form>
		</div>
		</>
	)
}

export default ProjectNew