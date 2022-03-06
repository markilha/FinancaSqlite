import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";


export const Total = (props) => (
  <Card {...props}>
    <CardContent> 
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >      
        <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {props.titulo}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            style={{color:props.cor}}
          >
            {props.total}
          </Typography>
        </Grid>      
      </Grid>     
      
      </Box>
    </CardContent>
  </Card>
);
