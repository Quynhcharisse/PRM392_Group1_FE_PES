import React, {useMemo, useState} from 'react'
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Avatar,
  Chip,
  Divider
} from '@mui/material'
import {Add, Edit, Search, Upload} from '@mui/icons-material'

import CreateTeacher from './CreateTeacher.jsx'
import UpdateTeacher from './UpdateTeacher.jsx'
import ExportTeacher from './ExportTeacher.jsx'

const colors = {
  primary: '#0b3f31',
  secondary: '#2c7a5e',
  surface: '#f8fffe'
}

function TeacherHeader({total}) {
  return (
    <Box sx={{
      p: 3,
      borderRadius: 3,
      background: 'linear-gradient(135deg, #5b8def 0%, #7b61ff 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box>
        <Typography variant="h6" sx={{fontWeight: 800}}>Teacher Management</Typography>
        <Typography variant="body2" sx={{opacity: 0.9}}>Manage teacher information and records</Typography>
      </Box>
      <Box sx={{textAlign: 'right'}}>
        <Typography variant="caption" sx={{opacity: 0.9}}>Total Teachers</Typography>
        <Typography variant="h5" sx={{fontWeight: 800}}>{total}</Typography>
      </Box>
    </Box>
  )
}

function TeacherActions({search, setSearch, onAdd, onExport}) {
  return (
    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} sx={{mt: 2, mb: 2}} alignItems={{xs: 'stretch', sm: 'center'}}>
      <TextField
        fullWidth
        placeholder="Search teachers by name, phone, or email"
        value={search}
        onChange={e => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search/>
            </InputAdornment>
          )
        }}
      />
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="outlined" startIcon={<Upload/>} onClick={onExport}>Export</Button>
        <Button variant="contained" startIcon={<Add/>} onClick={onAdd} sx={{
          backgroundColor: colors.primary,
          '&:hover': {backgroundColor: '#073026'}
        }}>Add Teacher</Button>
      </Stack>
    </Stack>
  )
}

function TeacherCard({teacher, onEdit}) {
  const initials = useMemo(() => (teacher.name || 'U').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase(), [teacher.name])
  return (
    <Card sx={{borderRadius: 3, border: theme => `1px solid ${alpha('#0b3f31', 0.1)}`}}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{bgcolor: alpha(colors.primary, 0.1), color: colors.primary, fontWeight: 700}}>{initials}</Avatar>
            <Box>
              <Typography sx={{fontWeight: 700}}>{teacher.name}</Typography>
              <Typography variant="caption" color="text.secondary">{teacher.email}</Typography>
            </Box>
          </Stack>
          <IconButton size="small" onClick={() => onEdit(teacher)}><Edit fontSize="small"/></IconButton>
        </Stack>
        <Divider sx={{my: 2}}/>
        <Grid container spacing={1}>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">Phone:</Typography>
            <Typography variant="body2">{teacher.phone || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">Gender:</Typography>
            <Typography variant="body2">{teacher.gender || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" color="text.secondary">Status:</Typography>
            <Box>
              <Chip size="small" label={teacher.status || 'active'} sx={{
                backgroundColor: alpha('#22c55e', 0.12), color: '#22c55e'
              }}/>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default function TeacherList() {
  const [search, setSearch] = useState('')
  const [openCreate, setOpenCreate] = useState(false)
  const [openExport, setOpenExport] = useState(false)
  const [editTeacher, setEditTeacher] = useState(null)

  // Mock data; later replace with API call
  const teachers = useMemo(() => ([
    { id: 1, name: 'Teacher', email: 'teacher@gmail.com', gender: 'Male', status: 'active' },
    { id: 2, name: 'Nguyen Thanh Ha', email: 'systemteacher08+gv002@gmail.com', gender: 'Female', status: 'active' },
    { id: 3, name: 'Ho Ngoc Ha', email: 'systemteacher08+gv003@gmail.com', gender: 'Female', status: 'active' }
  ].filter(t => `${t.name} ${t.email}`.toLowerCase().includes(search.toLowerCase()))), [search])

  return (
    <Box>
      <TeacherHeader total={teachers.length}/>
      <TeacherActions search={search} setSearch={setSearch} onAdd={() => setOpenCreate(true)} onExport={() => setOpenExport(true)}/>

      <Grid container spacing={2}>
        {teachers.map(t => (
          <Grid key={t.id} item xs={12} md={6} lg={4}>
            <TeacherCard teacher={t} onEdit={(teacher) => setEditTeacher(teacher)}/>
          </Grid>
        ))}
      </Grid>

      <CreateTeacher open={openCreate} onClose={() => setOpenCreate(false)}/>
      <ExportTeacher open={openExport} onClose={() => setOpenExport(false)}/>
      <UpdateTeacher open={!!editTeacher} teacher={editTeacher} onClose={() => setEditTeacher(null)}/>
    </Box>
  )
}


