import React from 'react';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import {Button} from '@/components/ui/button';
import {ApplicationId} from '@/applications/types';
import {SelectionDetails} from '@zag-js/menu';

type AppMenuProps = {
  onMenuClick: (id: ApplicationId) => void;
};

const AppMenu = ({onMenuClick}: AppMenuProps) => {
  const handleSelect = (details: SelectionDetails) => {
    onMenuClick(details.value as ApplicationId);
  };

  return (
    <MenuRoot onSelect={handleSelect}>
      <MenuTrigger asChild>
        <Button variant="ghost" size="sm">
          App Menu
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value={ApplicationId.ABOUT_ME}>{'About me'}</MenuItem>
        <MenuItem value={ApplicationId.EXPERIENCES}>{'Experiences'}</MenuItem>
        <MenuItem value={ApplicationId.PROJECTS}>{'Projects'}</MenuItem>
        {/*<MenuItem value="new-txt-a">
          New Text File <MenuItemCommand>⌘E</MenuItemCommand>
        </MenuItem>
        <MenuItem value="new-file-a">
          New File... <MenuItemCommand>⌘N</MenuItemCommand>
        </MenuItem>
        <MenuItem value="new-win-a">
          New Window <MenuItemCommand>⌘⇧N</MenuItemCommand>
        </MenuItem>
        <MenuItem value="open-file-a">
          Open File... <MenuItemCommand>⌘O</MenuItemCommand>
        </MenuItem>
        <MenuItem value="export-a">
          Export <MenuItemCommand>⌘S</MenuItemCommand>
        </MenuItem>*/}
      </MenuContent>
    </MenuRoot>
  );
};

export default AppMenu;
