import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';

import './ListSelect.css';

interface InteractionsPickerProps {
  interactions: string[];
  value: number;
  onChange: (newIndex: number) => void;
}

function ListSelect(props: InteractionsPickerProps) {
  return (
    <div>
      <List>
        {
          props.interactions.length > 0?
          props.interactions.map(
            (interactionName, index) => (
              <ListItem sx={{ p: "0px"}}>
                <ListItemButton
                  selected={index === props.value}
                  onClick={() => props.onChange(index)}
                  // sx={{
                  //   "&.Mui-selected": {
                  //     backgroundColor: "#FFAA00"
                  //   }
                  // }}
                >
                  <ListItemText primary={interactionName}/>
                </ListItemButton>
              </ListItem>
            )
          )
          : <Typography>(No conditions)</Typography>
        }
      </List>
    </div>
  )
}

export default ListSelect;
