// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable react/jsx-no-useless-fragment */
import { EntityTypeSection } from '@econolite/shared/data-access/api-configuration';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface EntitySectionConfigProps {
  sections: EntityTypeSection[]
}

export function EntitySectionConfig(props: EntitySectionConfigProps) {
  const [checked, setChecked] = useState<Array<string>>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const renderTree = (nodes: EntityTypeSection, parent: string) => (
    <ListItem disableGutters key={`${parent}${nodes.name}`} sx={{display: 'inherit'}}>
      <ListItemButton>
        <ListItemText id={`${parent}/${nodes.name}`} primary={`${nodes.name}`} />
        <Switch
          edge="end"
          onChange={handleToggle(`${parent}/${nodes.name}`)}
          checked={checked.indexOf(`${parent}/${nodes.name}`) !== -1}
          inputProps={{
            'aria-labelledby': `switch-list-label-${parent}/${nodes.name}`,
          }}
        />
      </ListItemButton>
      {Array.isArray(nodes.sections)
        ? 
        (
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List dense sx={{paddingLeft: 2}}>
              {nodes.sections.map((node) => renderTree(node, `${parent}/${nodes.name}`))}
            </List>
          </Collapse>
        )
        : null}
    </ListItem>
  );

  return (
    <List subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Section Configuration
        </ListSubheader>
      }
      dense
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      >
        { props.sections.map((section) => renderTree(section, "")) }
    </List>
  );
}

export default EntitySectionConfig;
