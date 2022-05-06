import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import React from 'react'

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts']

export const Sidebar = () => {
  return (
    <Drawer
        anchor='left'
        open={true}
        onClose={() => console.log('close')}    
    >
        <Box sx={{ width: 275  }}>
            <Box sx={{ padding: '5px 10px'  }}>
                <Typography variant='h4'>Menu</Typography>
            </Box>
            <List>
                {
                    menuItems.map((item, index) => (
                        <ListItem button key={item}>
                            <ListItemIcon>
                                { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }
                            </ListItemIcon>
                            <ListItemText primary= { item }/>
                        </ListItem>
                    ))
                }
            </List>

        </Box>  
    </Drawer>
  )
}
