import React, {useEffect, useMemo, useState} from 'react'
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
  Divider,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material'
import {Add, Search, Upload, Visibility, Block, RemoveCircle} from '@mui/icons-material'

import CreateTeacher from './CreateTeacher.jsx'
import ExportTeacher from './ExportTeacher.jsx'
import TeacherDetail from './TeacherDetail.jsx'
import {HRService} from '@services/HRService.jsx'

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

function TeacherCard({teacher, onView, onBan, onUnban}) {
  const initials = useMemo(() => (teacher.name || 'U').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase(), [teacher.name])
  
  // Determine if teacher is banned (assuming status field exists)
  const isBanned = teacher.status === 'ACCOUNT_INACTIVE'
  
  return (
    <Card sx={{borderRadius: 3, border: theme => `1px solid ${alpha('#0b3f31', 0.1)}`}}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{bgcolor: alpha(colors.primary, 0.1), color: colors.primary, fontWeight: 700}}>{initials}</Avatar>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{fontWeight: 700}}>{teacher.name}</Typography>
                {isBanned && (
                  <Chip 
                    size="small" 
                    label="Banned" 
                    sx={{
                      backgroundColor: alpha('#ef4444', 0.12), 
                      color: '#ef4444',
                      fontSize: '0.7rem',
                      height: 18
                    }}
                  />
                )}
              </Stack>
              <Typography variant="caption" color="text.secondary">{teacher.email}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={() => onView(teacher)} title="View Details">
              <Visibility fontSize="small"/>
            </IconButton>
            {isBanned ? (
              <IconButton 
                size="small" 
                onClick={() => onUnban(teacher)} 
                title="Unban Account"
                sx={{ 
                  color: '#22c55e',
                  '&:hover': { 
                    backgroundColor: alpha('#22c55e', 0.1) 
                  }
                }}
              >
                <RemoveCircle fontSize="small"/>
              </IconButton>
            ) : (
              <IconButton 
                size="small" 
                onClick={() => onBan(teacher)} 
                title="Ban Account"
                sx={{ 
                  color: '#ef4444',
                  '&:hover': { 
                    backgroundColor: alpha('#ef4444', 0.1) 
                  }
                }}
              >
                <Block fontSize="small"/>
              </IconButton>
            )}
          </Stack>
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
            <Typography variant="caption" color="text.secondary">Role:</Typography>
            <Box>
              <Chip size="small" label={teacher.role || 'TEACHER'} sx={{
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
  const [viewTeacher, setViewTeacher] = useState(null)
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Load teachers from API
  useEffect(() => {
    loadTeachers()
  }, [])

  const loadTeachers = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await HRService.getTeacherList()
      
      if (response.success) {
        setTeachers(response.data || [])
      } else {
        setError(response.error || 'Failed to load teachers')
      }
    } catch (error) {
      setError('Failed to load teachers')
    } finally {
      setLoading(false)
    }
  }

  const handleBanTeacher = async (teacher) => {
    if (actionLoading) return
    
    try {
      setActionLoading(true)
      const response = await HRService.banAccount(teacher.id)
      
      if (response.success) {
        setSnackbar({
          open: true,
          message: `${teacher.name} has been banned successfully`,
          severity: 'success'
        })
        
        // Update teacher status locally
        setTeachers(prevTeachers => 
          prevTeachers.map(t => 
            t.id === teacher.id ? { ...t, status: 'ACCOUNT_INACTIVE' } : t
          )
        )
      } else {
        setSnackbar({
          open: true,
          message: response.error || 'Failed to ban teacher',
          severity: 'error'
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to ban teacher. Please try again.',
        severity: 'error'
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleUnbanTeacher = async (teacher) => {
    if (actionLoading) return
    
    try {
      setActionLoading(true)
      const response = await HRService.unbanAccount(teacher.id)
      
      if (response.success) {
        setSnackbar({
          open: true,
          message: `${teacher.name} has been unbanned successfully`,
          severity: 'success'
        })
        
        // Update teacher status locally
        setTeachers(prevTeachers => 
          prevTeachers.map(t => 
            t.id === teacher.id ? { ...t, status: 'ACCOUNT_ACTIVE' } : t
          )
        )
      } else {
        setSnackbar({
          open: true,
          message: response.error || 'Failed to unban teacher',
          severity: 'error'
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to unban teacher. Please try again.',
        severity: 'error'
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Filter teachers based on search
  const filteredTeachers = useMemo(() => {
    if (!search) return teachers
    return teachers.filter(teacher => 
      `${teacher.name || ''} ${teacher.email || ''} ${teacher.phone || ''}`.toLowerCase().includes(search.toLowerCase())
    )
  }, [teachers, search])

  if (loading) {
    return (
      <Box>
        <TeacherHeader total={0}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress />
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <TeacherHeader total={filteredTeachers.length}/>
      <TeacherActions search={search} setSearch={setSearch} onAdd={() => setOpenCreate(true)} onExport={() => setOpenExport(true)}/>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        {filteredTeachers.map(teacher => (
          <Grid key={teacher.id} item xs={12} md={6} lg={4}>
            <TeacherCard 
              teacher={teacher} 
              onView={(teacher) => setViewTeacher(teacher)}
              onBan={handleBanTeacher}
              onUnban={handleUnbanTeacher}
            />
          </Grid>
        ))}
        {filteredTeachers.length === 0 && !loading && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                {search ? 'No teachers found matching your search' : 'No teachers found'}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <CreateTeacher open={openCreate} onClose={() => {
        setOpenCreate(false)
        loadTeachers() // Refresh data after creating
      }}/>
      <ExportTeacher open={openExport} onClose={() => setOpenExport(false)}/>
      <TeacherDetail open={!!viewTeacher} teacherId={viewTeacher?.id} onClose={() => setViewTeacher(null)}/>
      
      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}


