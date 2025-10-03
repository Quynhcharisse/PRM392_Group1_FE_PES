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

import ExportParent from './ExportParent.jsx'
import ParentDetail from './ParentDetail.jsx'
import {HRService} from '@services/HRService.jsx'

const colors = {
  primary: '#0b3f31',
  secondary: '#2c7a5e',
  surface: '#f8fffe'
}

function ParentHeader({total}) {
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
        <Typography variant="h6" sx={{fontWeight: 800}}>Parent Management</Typography>
        <Typography variant="body2" sx={{opacity: 0.9}}>Manage parent information and records</Typography>
      </Box>
      <Box sx={{textAlign: 'right'}}>
        <Typography variant="caption" sx={{opacity: 0.9}}>Total Parents</Typography>
        <Typography variant="h5" sx={{fontWeight: 800}}>{total}</Typography>
      </Box>
    </Box>
  )
}

function ParentActions({search, setSearch, onExport}) {
  return (
    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} sx={{mt: 2, mb: 2}} alignItems={{xs: 'stretch', sm: 'center'}}>
      <TextField
        fullWidth
        placeholder="Search parents by name, phone, or email"
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
      </Stack>
    </Stack>
  )
}

function ParentCard({parent, onView, onBan, onUnban}) {
  const initials = useMemo(() => (parent.name || 'U').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase(), [parent.name])
  
  // Determine if parent is banned (assuming status field exists)
  const isBanned = parent.status === 'ACCOUNT_INACTIVE'
  
  return (
    <Card sx={{borderRadius: 3, border: theme => `1px solid ${alpha('#0b3f31', 0.1)}`}}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{bgcolor: alpha(colors.primary, 0.1), color: colors.primary, fontWeight: 700}}>{initials}</Avatar>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{fontWeight: 700}}>{parent.name}</Typography>
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
              <Typography variant="caption" color="text.secondary">{parent.email}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={() => onView(parent)} title="View Details">
              <Visibility fontSize="small"/>
            </IconButton>
            {isBanned ? (
              <IconButton 
                size="small" 
                onClick={() => onUnban(parent)} 
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
                onClick={() => onBan(parent)} 
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
            <Typography variant="body2">{parent.phone || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="caption" color="text.secondary">Gender:</Typography>
            <Typography variant="body2">{parent.gender || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" color="text.secondary">Role:</Typography>
            <Box>
              <Chip size="small" label={parent.role || 'PARENT'} sx={{
                backgroundColor: alpha('#4caf50', 0.12), color: '#4caf50'
              }}/>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default function ParentList() {
  const [search, setSearch] = useState('')
  const [openExport, setOpenExport] = useState(false)
  const [viewParent, setViewParent] = useState(null)
  const [parents, setParents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Load parents from API
  useEffect(() => {
    loadParents()
  }, [])

  const loadParents = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await HRService.getParentList()
      
      if (response.success) {
        setParents(response.data || [])
      } else {
        setError(response.error || 'Failed to load parents')
      }
    } catch (error) {
      setError('Failed to load parents')
    } finally {
      setLoading(false)
    }
  }

  const handleBanParent = async (parent) => {
    if (actionLoading) return
    
    try {
      setActionLoading(true)
      const response = await HRService.banAccount(parent.id)
      
      if (response.success) {
        setSnackbar({
          open: true,
          message: `${parent.name} has been banned successfully`,
          severity: 'success'
        })
        
        // Update parent status locally
        setParents(prevParents => 
          prevParents.map(p => 
            p.id === parent.id ? { ...p, status: 'ACCOUNT_INACTIVE' } : p
          )
        )
      } else {
        setSnackbar({
          open: true,
          message: response.error || 'Failed to ban parent',
          severity: 'error'
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to ban parent. Please try again.',
        severity: 'error'
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleUnbanParent = async (parent) => {
    if (actionLoading) return
    
    try {
      setActionLoading(true)
      const response = await HRService.unbanAccount(parent.id)
      
      if (response.success) {
        setSnackbar({
          open: true,
          message: `${parent.name} has been unbanned successfully`,
          severity: 'success'
        })
        
        // Update parent status locally
        setParents(prevParents => 
          prevParents.map(p => 
            p.id === parent.id ? { ...p, status: 'ACCOUNT_ACTIVE' } : p
          )
        )
      } else {
        setSnackbar({
          open: true,
          message: response.error || 'Failed to unban parent',
          severity: 'error'
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to unban parent. Please try again.',
        severity: 'error'
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Filter parents based on search
  const filteredParents = useMemo(() => {
    if (!search) return parents
    return parents.filter(parent => 
      `${parent.name || ''} ${parent.email || ''} ${parent.phone || ''}`.toLowerCase().includes(search.toLowerCase())
    )
  }, [parents, search])

  if (loading) {
    return (
      <Box>
        <ParentHeader total={0}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress />
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <ParentHeader total={filteredParents.length}/>
      <ParentActions search={search} setSearch={setSearch} onExport={() => setOpenExport(true)}/>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        {filteredParents.map(parent => (
          <Grid key={parent.id} item xs={12} md={6} lg={4}>
            <ParentCard 
              parent={parent} 
              onView={(parent) => setViewParent(parent)}
              onBan={handleBanParent}
              onUnban={handleUnbanParent}
            />
          </Grid>
        ))}
        {filteredParents.length === 0 && !loading && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                {search ? 'No parents found matching your search' : 'No parents found'}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <ExportParent open={openExport} onClose={() => setOpenExport(false)}/>
      <ParentDetail open={!!viewParent} parent={viewParent} onClose={() => setViewParent(null)}/>
      
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