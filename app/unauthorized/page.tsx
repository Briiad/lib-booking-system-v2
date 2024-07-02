import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from '@/css/Unauthorized.module.css';

const Unauthorized = () => {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>401</div>
        <Title className={classes.title}>You did something bad...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          You are not authorized to access this page. Students are not allowed to access this page. If you insist to access this page, there will be consequences.
        </Text>
        <Group justify="center">
          <Button variant="white" size="md" component='a' href='/'>
            Back to Home
          </Button>
        </Group>
      </Container>
    </div>
  );
}

export default Unauthorized;