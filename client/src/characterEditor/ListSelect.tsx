import { ChangeEvent } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';

interface InteractionsPickerProps {
  interactions: string[];
  value: number;
  onChange: (newIndex: number) => void;
}

function ListSelect(props: InteractionsPickerProps) {
  return (
    <div>
      <List dense>
        {
          props.interactions.length > 0?
          props.interactions.map(
            (interactionName, index) => (
              <ListItem>
                <ListItemButton
                  selected={index === props.value}
                  onClick={() => props.onChange(index)}
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
