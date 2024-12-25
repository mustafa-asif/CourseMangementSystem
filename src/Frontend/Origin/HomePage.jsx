
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';

const HomePage = () => {
  const navigate = useNavigate();

  // Route to Courses
  const handleCourses = () => {
    navigate('/Admin/courses');
  };

  // Route to Student Portal
  const handleStudentPortal = () => {
    navigate('/Student/StudentPortal');
  };

  // Route to Teacher Portal
  const handleTeacherPortal = () => {
    navigate('/Teacher/ViewCourses');
  };

  return (
    <Container textAlign="center" style={{ marginTop: '3rem' }}>
      <Header as="h1" style={{ marginBottom: '2rem' }}>
        Welcome to the Management System
      </Header>

      <Segment padded>
        <Button
          primary
          size="large"
          onClick={handleCourses}
          style={{ marginBottom: '1rem' }}
        >
          Go to Courses
        </Button>
      </Segment>

      <Segment padded>
        <Button
          secondary
          size="large"
          onClick={handleStudentPortal}
          style={{ marginBottom: '1rem' }}
        >
          Go to Student Portal
        </Button>
      </Segment>

      <Segment padded>
        <Button
          color="teal"
          size="large"
          onClick={handleTeacherPortal}
        >
          Go to Teacher Portal
        </Button>
      </Segment>
    </Container>
  );
};

export default HomePage;

